# RakshaCircle - Women Safety & Emergency Coordination Platform

**A blockchain-based platform for trustworthy emergency response using Stellar Soroban.**

## Overview

RakshaCircle enables women to create trusted safety circles, trigger immediate SOS alerts, and maintain tamper-proof emergency logs using decentralized smart contracts. Every alert and response is recorded on-chain, ensuring transparency and accountability.

### Key Features
- **Wallet-Based Identity**: Connect via Freighter wallet (Stellar)
- **Trusted Contacts**: Build a circle of emergency contacts
- **Immutable Alerts**: SOS events recorded permanently on Soroban blockchain
- **Instant Acknowledgment**: Contacts confirm receipt with one click
- **Verifiable Records**: All events linked to wallet signatures for authenticity
- **Hybrid Architecture**: Fast off-chain speed + on-chain immutability

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Backend** | Node.js, Fastify 5.x |
| **Blockchain** | Soroban (Rust), Stellar Testnet |
| **Auth** | Freighter Wallet |
| **Storage** | In-memory (MVP) / PostgreSQL (future) |

## User Feedback Response Sheet

Below is a summary table of user feedback collected during the 6-user validation phase. Each row represents a real test user, their feedback, and the commit ID where changes were made in response.

| User Name                | User Email                  | User Wallet Address                                              | User Feedback                                              | Commit ID |
|--------------------------|-----------------------------|------------------------------------------------------------------|------------------------------------------------------------|-----------|
| Anshuman                 | anshuman.92@gmail.com       | GDMB6R3BT2L2RA3NBHAYSC3PWPCFLQIJW6SV6SXKNXAM5TWV6ZYDRQUC         | The SOS button color is not prominent enough.               | 25a657c   |
| Khushi Yadav             | khushi.yadav07@gmail.com    | GAX22KE4S6AYUOGVMWLPSK3YOFOJ6Q66KZFQOTBRCGQDO4IICEX6NQ4L         | Add a tooltip to the Trusted Contacts input.                | 160bc1e   |
| Aryan Rathore            | aryan.rathore21@gmail.com   | GCEDE4E445YZTTMGPW4VOMFVU4RNU5IP2OXC5JHHV2AWQETFGFYAOGYP         | Dashboard should show last 5 SOS events.                    | c12b91b   |
| Sukhwinder Singh Jassi   | sukhwinder.sj88@gmail.com   | GD7VF3SFQQ7QZ6VL6KISIHDZFJXSV6L2GCXK7GJMC72NEKIF7ASVMT6Z         | Add loading spinner on profile form submit.                 | 7f5c568   |
| Mohan Kotwala            | mohan.kotwala19@gmail.com   | GAICSNTB2T4KCMZZPUW5TCLX3NFOOUYDREJYUO6NYFJBIHVCYBMXXITC         | Improve error message on wallet connection failure.          | dcdfaee   |
| Priyanka Singh           | priyanka.singh03@gmail.com  | GD5X7JWSLSLWNMUU37Q3S3CAB34XN2UIOJ5HMLKQ5ABEBITFQU7MLRCB         | Add privacy note to profile creation page.                  | 6f3c00f   |
 
**Full feedback sheet:** [Google Sheets Feedback Responses](https://docs.google.com/spreadsheets/d/1XqvaP9YFqiYNoTI3Z2BpzHsEh9QvrXPnfkscg_O1m3g/edit?usp=sharing)
 
## Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn
- Freighter Wallet browser extension
- Stellar Testnet account (free)

### Local Development (5 minutes)

```bash
# 1. Clone and install
git clone <repo>
cd RakshaCircle
npm install

# 2. Start backend
npm run dev
# Backend listens on http://localhost:3000

# 3. In another terminal, start frontend
cd frontend
npm run dev
# Frontend runs on http://localhost:5173

# 4. Open browser
# Navigate to http://localhost:5173
# Connect Freighter wallet
# Create profile → Add contacts → Trigger SOS
```

### Environment Variables

#### Backend (`.env`)
```env
PORT=3000
NODE_ENV=development
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
# Leave empty for mock mode, or set after deploying contract:
# SOROBAN_CONTRACT_ID=C...
```

#### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Project Structure

```
RakshaCircle/
├── frontend/                      # React UI
│   ├── src/
│   │   ├── pages/SubmissionMvp.tsx    # Main MVP page
│   │   ├── services/rakshaMvp.ts      # Backend API client
│   │   ├── components/                # UI components
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                       # Node.js API
│   ├── routes/raksha/index.js         # Core MVP endpoints
│   ├── services/
│   │   └── sorobanService.js          # Blockchain integration
│   ├── plugins/                       # Auth & rate-limiting
│   ├── app.js                         # Fastify app setup
│   ├── server.js                      # Entry point
│   └── package.json
│
├── contracts/raksha-safety/       # Soroban Smart Contract
│   ├── src/lib.rs                     # Contract code
│   ├── Cargo.toml
│   └── README.md
│
├── docs/
│   ├── ARCHITECTURE.md            # System design
│   ├── SUBMISSION_GUIDE.md         # Testing & validation
│   └── DEPLOYMENT.md              # API reference & deployment
│
└── README.md (this file)
```

## Core API Endpoints

### Profile Management
```
POST   /api/v1/raksha/profile              # Create user profile
GET    /api/v1/raksha/profile/:wallet      # Get user profile
```

### Trusted Contacts
```
POST   /api/v1/raksha/trusted-contacts     # Add trusted contacts
GET    /api/v1/raksha/trusted-contacts/:wallet
```

### SOS Alerts
```
POST   /api/v1/raksha/sos                  # Trigger SOS event
POST   /api/v1/raksha/acknowledge          # Acknowledge SOS
GET    /api/v1/raksha/events/:wallet       # Get user's events
```

### Dashboard & Status
```
GET    /api/v1/raksha/dashboard/:wallet    # User dashboard stats
GET    /api/v1/raksha/blockchain-status    # Blockchain integration status
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed endpoint documentation.

## Smart Contract

**Contract Name**: `raksha-safety`  
**Language**: Rust (compiled to WebAssembly)  
**Network**: Stellar Soroban Testnet  
**Status**: Ready for deployment

### Contract Functions

| Function | Purpose | Auth |
|----------|---------|------|
| `register_user` | Register on the platform | User |
| `add_trusted_contacts` | Store emergency contacts | User |
| `trigger_sos` | Create immutable SOS record | User |
| `acknowledge_sos` | Confirm receipt | Contact |
| `get_sos_event` | Query event details | Public |

See [contracts/raksha-safety/README.md](contracts/raksha-safety/README.md) for deployment instructions.

## Data Model

### User Profile (On-Chain)
```javascript
{
  wallet: Address,
  name: String,
  created_at: Unix timestamp
}
```

### SOS Event (On-Chain)
```javascript
{
  id: U256,
  user_wallet: Address,
  event_type: String,
  context_hash: SHA256,
  timestamp: Unix timestamp,
  acknowledged_by: [Address, ...]
}
```

### Off-Chain Data (Backend)
- Detailed user metadata
- Contact phone numbers
- Event descriptions & location hints
- Notification history

*Note*: Only critical verification data is stored on-chain. Detailed context is kept off-chain with cryptographic hashes for integrity.

## MVP Scope (Level 5)

This version includes:
✅ Wallet authentication (Freighter)  
✅ User profile creation  
✅ Trusted circle management  
✅ SOS alert triggering  
✅ Contact acknowledgment  
✅ Alert history dashboard  
✅ End-to-end testing with 5 users  
✅ Blockchain integration (mock mode ready, testnet deployable)

## Future Roadmap (Level 6)

- [ ] Scale to 30+ active users
- [ ] Real-time notifications (SMS/Email)
- [ ] Advanced metrics dashboard
- [ ] Gasless transactions (fee sponsorship)
- [ ] On-chain event indexing
- [ ] Mobile app
- [ ] Integration with emergency services
- [ ] Multi-language support

## Testing

### Manual Testing
```bash
# Start backend
npm run dev

# In another terminal, run integration tests
node -e "import('./backend/app.js').then(async ({buildApp})=>{...})"
```

### Frontend Testing
1. Open http://localhost:5173
2. Connect Freighter wallet
3. Create profile and add contacts
4. Trigger SOS and acknowledge

### Contract Testing
```bash
cd contracts/raksha-safety
cargo test
```

See [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md) for detailed testing procedures.

## Deployment

### Local Development
```bash
npm run dev       # Backend
npm run dev       # Frontend (separate terminal)
```

### Production Deployment

#### Frontend
```bash
# Build
cd frontend && npm run build

# Deploy to Vercel / Netlify
# Point to ./frontend/dist
```

#### Backend
```bash
# Deploy to Render, Railway, or Heroku
# Set environment variables
# npm start to run
```

#### Smart Contract
```bash
# Deploy to Stellar Testnet
cd contracts/raksha-safety
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/raksha_safety.wasm \
  --source <testnet-secret-key> \
  --network testnet
# Copy returned contract ID to SOROBAN_CONTRACT_ID env var
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for:
- System architecture diagram
- Data flow visualization
- Security model
- Scalability considerations
- Full API reference

## Security

- **Wallet-Based Auth**: No passwords, pure key signing
- **On-Chain Verification**: Events immutable, tamper-proof
- **Access Control**: Smart contracts enforce authorization
- **Privacy**: Sensitive data hashed, not stored on-chain
- **Rate Limiting**: Backend rate-limit plugin (10 req/min)

## Contribution

This is a submission project. For contributions or questions, please open an issue.

## Team

- **Project**: RakshaCircle MVP (Level 5)
- **Platform**: Stellar Soroban
- **Timeline**: March 2026

## License

MIT License - See LICENSE file

## Resources

- **Stellar Docs**: https://developers.stellar.org/
- **Soroban Docs**: https://soroban.stellar.org/
- **Freighter Wallet**: https://freighter.app/
- **Testnet Lab**: https://lab.stellar.org/


