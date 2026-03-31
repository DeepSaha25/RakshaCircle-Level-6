# RakshaCircle - Submission & Testing Guide

## Overview

This guide explains how to set up, test, and validate RakshaCircle for submission. It includes step-by-step instructions for:
1. Local development environment setup
2. Backend + Frontend deployment
3. End-to-end testing with demo data
4. User validation with 5 testnet users
5. Feedback collection and iteration
6. Submission package preparation

## Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Rust** 1.56+ (for contract building)
- **Soroban CLI** (optional, for contract deployment)
- **Freighter Wallet** browser extension
- **Stellar Testnet Account** (free from https://lab.stellar.org)

## Part 1: Local Setup

### 1.1 Backend Setup

```bash
cd RakshaCircle
npm install

# Configure environment
echo "PORT=3000" > backend/.env
echo "NODE_ENV=development" >> backend/.env
echo "SOROBAN_RPC_URL=https://soroban-testnet.stellar.org" >> backend/.env
# For now, leave SOROBAN_CONTRACT_ID empty (uses mock mode)

# Start backend
npm run dev
# Backend should start on http://localhost:3000
```

**Expected Output:**
```
{"level":30,"time":...,"msg":"Server listening at http://0.0.0.0:3000"}
```

### 1.2 Frontend Setup

```bash
cd frontend
npm install

# Configure environment
echo "VITE_API_BASE_URL=http://localhost:3000/api/v1" > .env

# Start frontend dev server
npm run dev
# Frontend should start on http://localhost:5173
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
```

## Part 2: Manual Testing

### Test 1: Check Backend Status

```bash
curl http://localhost:3000/health
```

**Expected Response:**
```json
{"status":"ok","timestamp":"2026-03-31T..."}
```

### Test 2: Create User Profile

```bash
curl -X POST http://localhost:3000/api/v1/raksha/profile \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
    "name": "Test User 1"
  }'
```

**Expected Response:**
```json
{
  "profile": {
    "walletAddress": "gaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawhf",
    "name": "Test User 1",
    "createdAt": "2026-03-31T...",
    "updatedAt": "2026-03-31T..."
  },
  "blockchain": {
    "success": true,
    "mock": true,
    "message": "Mock registration (Soroban contract not deployed)"
  }
}
```

### Test 3: Add Trusted Contacts

```bash
curl -X POST http://localhost:3000/api/v1/raksha/trusted-contacts \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
    "contacts": [
      {
        "name": "Mom",
        "walletAddress": "GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWYU"
      },
      {
        "name": "Sister",
        "walletAddress": "GCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGLH"
      }
    ]
  }'
```

**Expected Response:** 200 OK with contact list

### Test 4: Trigger SOS Event

```bash
curl -X POST http://localhost:3000/api/v1/raksha/sos \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
    "eventType": "SOS",
    "contextText": "Feeling unsafe near central market",
    "locationHint": "28.6139°N 77.2090°E"
  }'
```

**Expected Response:**
```json
{
  "message": "SOS recorded successfully",
  "event": {
    "id": "...",
    "walletAddress": "gaaaaa...",
    "eventType": "SOS",
    "contextHash": "abc123...",
    "status": "active",
    "timestamp": "2026-03-31T...",
    "acknowledgments": []
  },
  "blockchain": {...}
}
```

### Test 5: Acknowledge SOS (Trusted Contact)

```bash
# Get the event ID from previous response
EVENT_ID="..."

curl -X POST http://localhost:3000/api/v1/raksha/acknowledge \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "'$EVENT_ID'",
    "contactWallet": "GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWYU",
    "note": "I see your alert. I'm on my way."
  }'
```

**Expected Response:** 200 OK with updated event showing acknowledgment

### Test 6: View Dashboard

```bash
curl http://localhost:3000/api/v1/raksha/dashboard/GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF
```

**Expected Response:**
```json
{
  "walletAddress": "gaaaaa...",
  "totalEvents": 1,
  "acknowledgedEvents": 1,
  "activeEvents": 0,
  "totalAcknowledgments": 1
}
```

### Test 7: Blockchain Status

```bash
curl http://localhost:3000/api/v1/raksha/blockchain-status
```

**Expected Response:**
```json
{
  "isConfigured": false,
  "contractId": "NOT_CONFIGURED",
  "rpcUrl": "https://soroban-testnet.stellar.org",
  "network": "Stellar Testnet",
  "status": "⚠️ Contract not deployed",
  "deploymentNote": "To enable blockchain features: 1) Deploy Soroban contract 2) Set SOROBAN_CONTRACT_ID env var"
}
```

## Part 3: Frontend Manual Testing

1. **Open http://localhost:5173 in browser**
2. **Connect Wallet**: 
   - Install Freighter extension if not ready
   - Click "Connect Freighter Wallet"
   - Fallback to demo wallet if Freighter unavailable
3. **Create Profile**: Enter name and click "Create Profile"
4. **Add Contacts**: Add 2-3 trusted contacts
5. **Trigger SOS**: Enter description and click "Send SOS Alert"
6. **View History**: Check alert history and acknowledgments

## Part 4: Automation Tests

### Run Backend Smoke Test

```bash
cd RakshaCircle
node -e "import('./backend/app.js').then(async ({buildApp})=>{
  const app=await buildApp();
  await app.ready();
  
  const wallet='G' + 'A'.repeat(55);
  
  // Profile
  const profile = await app.inject({
    method:'POST',
    url:'/api/v1/raksha/profile',
    payload:{walletAddress:wallet, name:'Test'}
  });
  console.log('✓ Profile:', profile.statusCode === 200 ? 'PASS' : 'FAIL');
  
  // Contacts
  const contacts = await app.inject({
    method:'POST',
    url:'/api/v1/raksha/trusted-contacts',
    payload:{
      walletAddress:wallet,
      contacts:[{name:'Mom', walletAddress:'G'+' B'.repeat(27)}]
    }
  });
  console.log('✓ Contacts:', contacts.statusCode === 200 ? 'PASS' : 'FAIL');
  
  // SOS
  const sos = await app.inject({
    method:'POST',
    url:'/api/v1/raksha/sos',
    payload:{walletAddress:wallet, eventType:'SOS'}
  });
  console.log('✓ SOS:', sos.statusCode === 200 ? 'PASS' : 'FAIL');
  
  await app.close();
  process.exit(0);
}).catch(e=>{console.error(e); process.exit(1);})"
```

## Part 5: User Validation (5 Real Users)

### 5.1 Recruitment
- Ask 5 people with Stellar testnet accounts to test
- Provide them with testnet XLM via Stellar Lab
- Share landing page URL

### 5.2 Testing Script for Each User

**Session Duration: ~15 minutes**

1. **Setup** (2 min):
   - Connect Freighter wallet
   - Create profile
   - Add 2 trusted contacts with their addresses

2. **Demo** (5 min):
   - Trigger SOS alert
   - Share alert ID with one trusted contact
   - Wait for acknowledgment

3. **Feedback** (3 min):
   - Fill Google Form: [Link](#)
   - Rate experience (1-5)
   - Suggest improvements

### 5.3 Google Form Template

**Title**: RakshaCircle Safety Platform Feedback

**Questions:**
1. Was the setup process easy? (1-5 with comments)
2. Did you successfully trigger an alert? (Yes/No)
3. Did your trusted contact receive acknowledgment request? (Yes/No)
4. Did the blockchain features work? (Yes/No)
5. What could be improved? (Open text)
6. Would you use this for real? (Yes/No/Maybe)
7. Additional comments? (Open text)

### 5.4 Evidence Collection

Create a document with:
- **User Names/Wallets**: (anonymize if needed)
- **Test Timestamps**: When each user tested
- **Success Rate**: % of successful flows
- **Feedback Summary**: Key themes from responses
- **Screenshots**: 2-3 critical flow screenshots
- **Issues Found**: Any bugs or UX problems

## Part 6: Implementation of Feedback

### Example: "Dashboard is too minimal"

1. **Feedback**: Dashboard needs more stats visualization
2. **Decision**: Add charts for SOS frequency (Level 6 feature, skip for MVP)
3. **Actual Change**: Add last 5 events list to dashboard
4. **Implementation**: 
   - Backend: Return last 5 events in GET /dashboard
   - Frontend: Render event list with timestamps
5. **Time**: 30 minutes
6. **Document**: Add to submission: "Iteration 1: User requested event preview"

## Part 7: Submission Package Checklist

### Documentation Files
- [ ] **README.md**: Overview, quick start, tech stack
- [ ] **ARCHITECTURE.md**: System design, data flow, diagrams
- [ ] **DEPLOYMENT.md**: Detailed API docs, env vars, deployment steps
- [ ] **SUBMISSION_GUIDE.md**: This file + testing evidence
- [ ] **USER_FEEDBACK.md**: Summary of 5-user validation, form responses

### Code Files
- [ ] **Frontend**: Clean build, no dev dependencies
- [ ] **Backend**: Soroban integration, all endpoints working
- [ ] **Contract**: Deployed to testnet with contract ID
- [ ] **.env.example**: Template with all required vars

### Evidence Files
- [ ] **5 User Test Summary**: Names, timestamps, success/fail
- [ ] **Google Form Responses**: Screenshot or export
- [ ] **Screenshots**: 5-10 key flow screenshots
- [ ] **Demo Video**: 3-5 min screen recording of full flow
- [ ] **Feedback Iteration Log**: What was changed based on feedback

### Deployment Files
- [ ] **Backend**: Deployed URL (e.g., render.com)
- [ ] **Frontend**: Deployed URL (e.g., vercel.com)
- [ ] **Contract**: Contract ID on Stellar testnet
- [ ] **Instructions**: How to access live demo

## Part 8: Demo Video Script (5 min)

```
[0:00-0:30] Intro
"RakshaCircle is a blockchain-based women safety platform on Stellar Soroban.
We're demonstrating Level 5 MVP with 5 real testnet users."

[0:30-1:30] Setup
"First, I connect my Stellar wallet using Freighter, create my profile,
and add trusted emergency contacts."

[1:30-3:00] SOS Flow
"When I trigger an SOS alert, a record is created both off-chain for speed
and on-chain for immutability. My trusted contacts get notified."

[3:00-4:00] Acknowledgment
"Here,  my contact receives the alert and clicks acknowledge.
The timestamp and confirmation are recorded on-chain."

[4:00-4:30] Dashboard
"All events and acknowledgments appear in the dashboard.
The blockchain status confirms everything is recorded on Stellar Soroban."

[4:30-5:00] Conclusion
"This MVP proves the concept. For Level 6, we'll add 30+ users,
real notifications, and fee sponsorship."
```

## Part 9: Submission Checklist

- [ ] All tests passing locally
- [ ] 5 real users validated the MVP
- [ ] Feedback form completed with minimum 4/5 responses
- [ ] One feedback iteration implemented
- [ ] Demo video recorded and tested
- [ ] All documentation files created
- [ ] GitHub repo public with clean commit history
- [ ] .env.example provided (no secrets in repo)
- [ ] README has quick start (npm install → npm run dev)
- [ ] API endpoints tested and documented
- [ ] Contract deployed to testnet (or mock mode explained)
- [ ] Screenshots showing successful flows
- [ ] No console errors or warnings in browser/backend

## Troubleshooting

### Frontend won't connect to backend
```bash
# Check backend is running on correct port
lsof -i :3000

# Check CORS headers
curl -v http://localhost:3000/health
```

### Freighter wallet not connecting
```
1. Check Freighter is installed and enabled
2. Check network is set to Testnet in Freighter
3. Check URL is not blocked by policies
4. Use demo wallet fallback if needed
```

### Backend crashes on startup
```bash
# Check Node version
node --version  # Should be 18+

# Check all dependencies installed
npm install

# Check env vars
env | grep SOROBAN
```

### Soroban contract issues
```bash
# For now, MVP works in mock mode without deployed contract
# To deploy contract:
cd contracts/raksha-safety
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/raksha_safety.wasm --source <your-testnet-account> --network testnet
# Export contract ID to SOROBAN_CONTRACT_ID env var
```

## Success Criteria

✅ **MVP is submission-ready when:**
1. All 7 backend endpoints working (tested)
2. Frontend connects and displays data
3. 5 real users completed test sessions
4. Feedback form has 4+ responses
5. One feedback iteration documented
6. Demo video shows end-to-end flow
7. All documentation complete
8. Code is clean and well-commented
9. No security issues or hardcoded secrets
10. Time log shows realistic development effort

## Timeline

- **Day 1**: Local setup + manual tests (4 hours)
- **Day 2-3**: 5-user validation + feedback (8 hours)
- **Day 4**: Feedback iterations (2 hours)
- **Day 5**: Documentation + demo video (3 hours)
- **Day 6**: Final checks + submission (1 hour)

**Total: ~18 hours**

---

**Ready to submit?** Once all checkboxes are complete, create a PR or submit via your submission platform with:
1. Link to GitHub repo
2. Link to live demo (if deployed)
3. Screenshots + demo video
4. User feedback summary
5. Architecture overview
