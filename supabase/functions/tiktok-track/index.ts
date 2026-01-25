import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const TIKTOK_PIXEL_ID = "D5QIDNRC77U5QAK8QE40";
// FIXED: Correct TikTok Events API endpoint
const TIKTOK_EVENTS_API_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

interface TikTokEventPayload {
    event: string;
    event_id?: string;
    timestamp?: string;
    properties?: {
        content_id?: string;
        content_name?: string;
        content_type?: string;
        value?: number;
        currency?: string;
        description?: string;
    };
    context?: {
        page?: {
            url?: string;
            referrer?: string;
        };
    };
    test_event_code?: string;
}

Deno.serve(async (req: Request) => {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    };

    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        const accessToken = Deno.env.get("TIKTOK_ACCESS_TOKEN");
        if (!accessToken) {
            console.error("TIKTOK_ACCESS_TOKEN not configured");
            return new Response(
                JSON.stringify({ error: "Server configuration error" }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const payload: TikTokEventPayload = await req.json();

        const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") || "";
        const userAgent = req.headers.get("user-agent") || "";

        // Build correct TikTok Events API payload format
        const tiktokPayload: any = {
            event_source: "web",
            event_source_id: TIKTOK_PIXEL_ID,
            data: [{
                event: payload.event,
                event_time: Math.floor(Date.now() / 1000),
                event_id: payload.event_id || crypto.randomUUID(),
                user: {
                    ip: clientIp,
                    user_agent: userAgent,
                },
                page: {
                    url: payload.context?.page?.url || "",
                    referrer: payload.context?.page?.referrer || "",
                },
                properties: {
                    contents: payload.properties?.content_id ? [{
                        content_id: payload.properties.content_id,
                        content_type: payload.properties.content_type || "product",
                        content_name: payload.properties.content_name || "",
                    }] : undefined,
                    value: payload.properties?.value,
                    currency: payload.properties?.currency || "USD",
                },
            }],
        };

        if (payload.test_event_code) {
            tiktokPayload.test_event_code = payload.test_event_code;
        }

        console.log(`Sending ${payload.event} to TikTok...`);

        // Use AbortController for a 5 second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch(TIKTOK_EVENTS_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Token": accessToken,
                },
                body: JSON.stringify(tiktokPayload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const responseData = await response.json();

            if (!response.ok || responseData.code !== 0) {
                console.error("TikTok API error:", JSON.stringify(responseData));
                return new Response(
                    JSON.stringify({ error: "TikTok API error", details: responseData }),
                    { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                );
            }

            return new Response(
                JSON.stringify({ success: true, event: payload.event }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        } catch (fetchError) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                console.error("TikTok API timeout after 8s");
                return new Response(
                    JSON.stringify({ error: "TikTok API timeout" }),
                    { status: 504, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                );
            }
            throw fetchError;
        }

    } catch (error) {
        console.error("Internal Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error", message: String(error) }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
