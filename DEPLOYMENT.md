# Deployment Guide (First-Time Setup)

This guide is written for a fresh deployment where nothing is deployed yet.

## Final Architecture

- Backend API: Render Web Service
- Frontend App: Vercel Project
- Smart Contract: Soroban on Stellar Testnet

## Step 0: Prepare Required Accounts and Tools

1. Create accounts:
- Render
- Vercel
- Stellar testnet wallet (for Soroban deploy)

2. Install tools locally:
- Node.js 20+
- npm
- Rust + cargo
- Soroban CLI

3. Keep these secrets ready:
- APP_API_KEY (one shared key for backend and frontend)
- GOOGLE_MAPS_API_KEY (server key for backend)
- VITE_GOOGLE_MAPS_API_KEY (browser key for frontend)
- GEMINI_API_KEY
- Stellar source account secret (for contract deploy)

## Step 1: Configure Backend Environment

Use this exact backend env template:

```env
PORT=8000
NODE_ENV=production

APP_API_KEY=replace_with_shared_app_key
GOOGLE_MAPS_API_KEY=replace_with_google_maps_server_key
GEMINI_API_KEY=replace_with_gemini_key

# Set this to your deployed Vercel app URL after frontend deploy.
# Example: https://your-app.vercel.app
CORS_ORIGIN=https://your-frontend.vercel.app

ENABLE_DEMO_SEED=false

# Contract settings (set SOROBAN_CONTRACT_ID after Step 3)
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
SOROBAN_CONTRACT_ID=

# Optional advanced settings
NIRBHAYA_SERVICE_URL=
SERVER_PUBLIC_KEY=
SERVER_SECRET_KEY=
FEE_SPONSOR_WALLET=
```

Notes:
- `APP_API_KEY` and frontend `VITE_API_KEY` must be identical.
- If `SOROBAN_CONTRACT_ID` is empty, backend runs in mock on-chain mode.

## Step 2: Deploy Backend on Render

1. Open Render -> New -> Web Service
2. Connect this GitHub repository
3. Configure:
- Name: `rakshacircle-backend`
- Runtime: `Node`
- Branch: `main`
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`
- Health Check Path: `/health`
4. Add backend environment variables from Step 1
5. Deploy

Verify backend:
- `GET https://your-backend-url.onrender.com/health`

Expected:
- status is ok

## Step 3: Deploy Soroban Smart Contract

From repository root:

1. Build contract

```bash
cd contracts/raksha-safety
cargo build --target wasm32-unknown-unknown --release
```

2. Deploy to testnet

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/raksha_safety.wasm \
  --source <your-account-secret> \
  --network testnet
```

3. Copy returned contract id (starts with `C`)
4. In Render backend env, set `SOROBAN_CONTRACT_ID=<that_contract_id>`
5. Redeploy backend

## Step 4: Configure Frontend Environment

Use this exact frontend env template:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_API_KEY=replace_with_same_app_api_key
VITE_GOOGLE_MAPS_API_KEY=replace_with_google_maps_browser_key
```

Notes:
- No trailing slash in `VITE_API_BASE_URL`.
- `VITE_API_KEY` must match backend `APP_API_KEY` exactly.

## Step 5: Deploy Frontend on Vercel

1. Open Vercel -> Add New Project
2. Import this repository
3. Set Root Directory: `frontend`
4. Add frontend env variables from Step 4
5. Deploy

After frontend URL is generated:
1. Set backend `CORS_ORIGIN` to that exact Vercel URL
2. Redeploy backend once

## Step 6: Run Smoke Checks

Local backend smoke check:

```bash
npm run backend:smoke
```

Production checks:

1. `GET https://your-backend-url.onrender.com/health`
2. Open frontend Vercel URL
3. Create profile
4. Save trusted contacts
5. Trigger SOS
6. Acknowledge event
7. Check readiness endpoints:
- `/api/v1/raksha/metrics`
- `/api/v1/raksha/monitoring`
- `/api/v1/raksha/indexing`
- `/api/v1/raksha/production-readiness`

## Common Mistakes

1. 401 errors on API
- Cause: `APP_API_KEY` and `VITE_API_KEY` mismatch

2. CORS blocked in browser
- Cause: wrong `CORS_ORIGIN`
- Fix: set exact frontend URL (including https)

3. On-chain data not recorded
- Cause: `SOROBAN_CONTRACT_ID` missing
- Fix: complete Step 3 and redeploy backend

4. Route/chat issues
- Cause: missing Maps or Gemini keys
- Fix: verify backend env values and redeploy

## Security Checklist

- Do not commit real secrets
- Rotate keys if exposed
- Use separate local and production keys
- Restrict Google Maps browser key by referrer