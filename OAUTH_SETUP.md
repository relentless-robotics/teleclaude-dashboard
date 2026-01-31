# GitHub OAuth App Setup for TeleClaude Dashboard

## Manual Setup Instructions

1. Go to: https://github.com/settings/applications/new

2. Login with:
   - Username: `relentless-robotics`
   - Password: `Relentless@Robotics2026!`

3. Fill in the form:
   - **Application name:** TeleClaude Dashboard
   - **Homepage URL:** https://dashboard-app-black-kappa.vercel.app
   - **Application description:** (optional) Authentication for TeleClaude system monitoring dashboard
   - **Authorization callback URL:** https://dashboard-app-black-kappa.vercel.app/api/auth/callback/github

4. Click "Register application"

5. On the app details page:
   - Copy the **Client ID**
   - Click "Generate a new client secret"
   - Copy the **Client Secret** (you'll only see it once!)

6. Create `.env.local` file in this directory with:
```
NEXTAUTH_URL=https://dashboard-app-black-kappa.vercel.app
NEXTAUTH_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))">
GITHUB_CLIENT_ID=<your-client-id>
GITHUB_CLIENT_SECRET=<your-client-secret>
```

7. Set environment variables in Vercel:
```bash
vercel env add NEXTAUTH_URL production
# Enter: https://dashboard-app-black-kappa.vercel.app

vercel env add NEXTAUTH_SECRET production
# Enter: the generated secret from step 6

vercel env add GITHUB_CLIENT_ID production
# Enter: your client ID

vercel env add GITHUB_CLIENT_SECRET production
# Enter: your client secret
```

Or use the Vercel dashboard at: https://vercel.com/riley-andersons-projects-c1704491/dashboard-app/settings/environment-variables

## Quick NextAuth Secret Generation

Run this to generate a secure random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
