# Supabase Secret Key Update Guide

## ⚠️ IMPORTANT: Update Environment Variable in Supabase Dashboard

You need to update the environment variable in your Supabase Edge Functions:

### Steps:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/bzsjivgykaclmmovugiz

2. **Navigate to Edge Functions Settings**:
   - Click on "Edge Functions" in the left sidebar
   - Click on "Settings" or "Manage secrets"

3. **Update the Secret**:
   - Find `SUPABASE_SERVICE_ROLE_KEY` (if it exists, delete it)
   - Add a new secret: `SUPABASE_SECRET_KEY`
   - Value: `sb_secret_oj0ftk52EEPO1Ymf9MQmbA_3m4r8s7A`

4. **Redeploy Edge Functions**:
   - After updating secrets, you may need to redeploy your edge functions
   - Go to each function (`stripe-webhook`, `create-checkout-session`)
   - Click "Deploy" or they may auto-redeploy

### Alternative: Use Supabase CLI

If you prefer to use the CLI:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login
supabase login

# Set the secret
supabase secrets set SUPABASE_SECRET_KEY=sb_secret_oj0ftk52EEPO1Ymf9MQmbA_3m4r8s7A --project-ref bzsjivgykaclmmovugiz

# Remove old secret (if exists)
supabase secrets unset SUPABASE_SERVICE_ROLE_KEY --project-ref bzsjivgykaclmmovugiz
```

## What Was Changed Locally:

✅ Updated `.env` to use `SUPABASE_SECRET_KEY`
✅ Updated `stripe-webhook/index.ts` to use `SUPABASE_SECRET_KEY`
✅ Updated `.env.example` to reflect new variable name

## Testing:

Once you've updated the Supabase dashboard secret, test the payment flow:
1. Complete a quiz
2. Click "Unlock Full Report"
3. Complete a test payment
4. Verify the entitlement is granted
