import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Stripe } from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    httpClient: Stripe.createFetchHttpClient(),
})

const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
    const signature = req.headers.get('stripe-signature')

    try {
        const body = await req.text()
        const event = stripe.webhooks.constructEvent(
            body,
            signature ?? '',
            Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
        )

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as any

            if (!session.client_reference_id) {
                console.error('Missing client_reference_id in session')
                throw new Error('Missing client_reference_id')
            }

            // Store transaction
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    session_id: session.id,
                    customer_email: session.customer_details?.email,
                    amount_total: session.amount_total,
                    currency: session.currency,
                    status: 'completed'
                })

            if (txError) throw txError

            // Grant entitlement
            const { error: entError } = await supabase
                .from('entitlements')
                .insert({
                    customer_email: session.customer_details?.email,
                    product_id: 'report_full',
                    session_id: session.client_reference_id
                })

            if (entError) throw entError
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error) {
        console.error(`Webhook error: ${error.message}`)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
