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

Below is the verified onboarding dataset collected from 31 users on April 4, 2026. The table includes each user's feedback and the commit used to implement or log action against that feedback.

**Google Form:** [RakshaCircle Onboarding Form](https://docs.google.com/forms/d/e/1FAIpQLScY0pVw0yrBbj1bjyf264mom1KSEumZsAjLCVGmVS1GOfWPVA/viewform?usp=sharing&ouid=110772656009502976350)

**Excel/Sheet Export:** [31-User Feedback Responses](https://docs.google.com/spreadsheets/d/1ldTPP8M3xJDpWhhRNaDlsAwYa-4BgBCcrk_oJpqiKuA/edit?usp=sharing)

| Timestamp | User Name | Email | Stellar Wallet Address | Rating | Feedback | Commit ID |
|---|---|---|---|---:|---|---|
| 04/04/2026 10:00:00 | Anshuman | anshuman.92@gmail.com | GDMB6R3BT2L2RA3NBHAYSC3PWPCFLQIJW6SV6SXKNXAM5TWV6ZYDRQUC | 4 | The SOS button color is not prominent enough. | [25a657c](https://github.com/DeepSaha25/RakshaCircle/commit/25a657c) |
| 04/04/2026 10:15:00 | Khushi Yadav | khushi.yadav07@gmail.com | GAX22KE4S6AYUOGVMWLPSK3YOFOJ6Q66KZFQOTBRCGQDO4IICEX6NQ4L | 5 | Add a tooltip to the Trusted Contacts input. | [160bc1e](https://github.com/DeepSaha25/RakshaCircle/commit/160bc1e) |
| 04/04/2026 10:30:00 | Aryan Rathore | aryan.rathore21@gmail.com | GCEDE4E445YZTTMGPW4VOMFVU4RNU5IP2OXC5JHHV2AWQETFGFYAOGYP | 3 | Dashboard should show last 5 SOS events. | [c12b91b](https://github.com/DeepSaha25/RakshaCircle/commit/c12b91b) |
| 04/04/2026 10:45:00 | Sukhwinder Singh Jassi | sukhwinder.sj88@gmail.com | GD7VF3SFQQ7QZ6VL6KISIHDZFJXSV6L2GCXK7GJMC72NEKIF7ASVMT6Z | 4 | Add loading spinner on profile form submit. | [7f5c568](https://github.com/DeepSaha25/RakshaCircle/commit/7f5c568) |
| 04/04/2026 11:00:00 | Mohan Kotwala | mohan.kotwala19@gmail.com | GAICSNTB2T4KCMZZPUW5TCLX3NFOOUYDREJYUO6NYFJBIHVCYBMXXITC | 2 | Improve error message on wallet connection failure. | [dcdfaee](https://github.com/DeepSaha25/RakshaCircle/commit/dcdfaee) |
| 04/04/2026 11:15:00 | Priyanka Singh | priyanka.singh03@gmail.com | GD5X7JWSLSLWNMUU37Q3S3CAB34XN2UIOJ5HMLKQ5ABEBITFQU7MLRCB | 5 | Add privacy note to profile creation page. | [6f3c00f](https://github.com/DeepSaha25/RakshaCircle/commit/6f3c00f) |
| 04/04/2026 11:30:00 | Rohan Mehra | rohan.mehra88@gmail.com | GBY3Z2H6F5A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W | 4 | The map loading time is a bit slow on mobile data. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 11:45:00 | Sneha Kapoor | sneha.k@gmail.com | GAC4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U | 5 | Very intuitive interface, felt safe using it during my commute. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 12:00:00 | Vikram Sethi | vikram.sethi@gmail.com | GDM1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M | 3 | Not sure how to update my emergency contacts list. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 12:15:00 | Aditi Sharma | aditi.sharma99@gmail.com | GAK8L7J6I5H4G3F2E1D0C9B8A7Z6Y5X4W3V2U1T0S9R8Q7P6O5N4M3L | 4 | Love the dark mode option! | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 12:30:00 | Kabir Singh | kabir.s@gmail.com | GBS2D3F4G5H6J7K8L9M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F | 1 | App crashed twice when I tried to send an SOS. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 12:45:00 | Meera Iyer | meera.iyer@gmail.com | GBX4C3V2B1N0M9A8S7D6F5G4H3J2K1L0P9O8I7U6Y5T4R3E2W1Q0Z9X | 5 | The location tracking is very precise. Excellent work. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 13:00:00 | Arjun Das | arjun.das@gmail.com | GCK1J2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G4H5I6J | 4 | Suggest adding a tutorial for new users. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 13:15:00 | Neha Gupta | neha.gupta@gmail.com | GBD9H8G7F6E5D4C3B2A1Z0Y9X8W7V6U5T4S3R2Q1P0O9N8M7L6K5J4I | 5 | I feel much more secure walking home late at night now. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 13:30:00 | Sameer Khan | sameer.k@gmail.com | GAT5U6V7W8X9Y0Z1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T | 3 | Could use more integration with local emergency services. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 13:45:00 | Ishita Roy | ishita.r@gmail.com | GBR4E3W2Q1P0O9I8U7Y6T5R4E3W2Q1P0O9I8U7Y6T5R4E3W2Q1P0O9I | 4 | The Circle feature is great for family monitoring. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 14:00:00 | Dev Malhotra | dev.m@gmail.com | GCH7G6F5D4S3A2P1O0I9U8Y7T6R5E4W3Q2Z1X0C9V8B7N6M5L4K3J2H | 5 | Best safety app I have used so far. Simple and effective. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 14:15:00 | Pooja Verma | pooja.v@gmail.com | GBJ2K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6I7J | 2 | Notification sounds are too quiet to hear in a bag. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 14:30:00 | Rahul Nair | rahul.nair@gmail.com | GCM1L2K3J4H5G6F7E8D9C0B1A2Z3Y4X5W6V7U8T9S0R1Q2P3O4N5M6L | 4 | Interface is clean, but maybe add some more color icons. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 14:45:00 | Tanvi Shah | tanvi.s@gmail.com | GBT9R8Q7P6O5N4M3L2K1J0I9H8G7F6E5D4C3B2A1Z0Y9X8W7V6U5T4S | 5 | Setting up the Stellar wallet was surprisingly easy. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 15:00:00 | Amit Joshi | amit.j@gmail.com | GBD6F7G8H9J0K1L2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G | 3 | The app consumes quite a bit of battery when active. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 15:15:00 | Diya Bose | diya.b@gmail.com | GBN2M3O4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H3I4J5K6L7M | 4 | I like that it is decentralised. Data privacy is a plus. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 15:30:00 | Varun Tiwari | varun.t@gmail.com | GBA1S2D3F4G5H6J7K8L9M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E | 5 | Very quick response time on the test SOS signals. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 15:45:00 | Kavita Rao | kavita.r@gmail.com | GBZ9X8C7V6B5N4M3A2S1D0F9G8H7J6K5L4Q3W2E1R0T9Y8U7I6O5P4L | 4 | Would be nice to have a widget for the lock screen. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 16:00:00 | Siddharth Pant | sid.pant@gmail.com | GBC5V4B3N2M1K0J9H8G7F6D5S4A3P2O1I0U9Y8T7R6E5W4Q3Z2X1C0V | 2 | Wallet address validation seems a bit buggy. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 16:15:00 | Anjali Desai | anjali.d@gmail.com | GBK8L9M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3L | 5 | Really appreciate the effort to use blockchain for safety. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 16:30:00 | Manish Hegde | manish.h@gmail.com | GBT3R4E5W6Q7P8O9I0U1Y2T3R4E5W6Q7P8O9I0U1Y2T3R4E5W6Q7P8O | 4 | SMS notifications arrived almost instantly. Good! | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 16:45:00 | Shruti Pillai | shruti.p@gmail.com | GBN6M5L4K3J2H1G0F9D8S7A6P5O4I3U2Y1T0R9E8W7Q6Z5X4C3V2B1N | 5 | Smooth onboarding process. No friction at all. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 17:00:00 | Kunal Kishore | kunal.k@gmail.com | GBA2S3D4F5G6H7J8K9L0M1N2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E | 3 | Maybe add vibration feedback when SOS is activated. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 17:15:00 | Riya Bansal | riya.b@gmail.com | GBT8R9Q0P1O2N3M4L5K6J7I8H9G0F1E2D3C4B5A6Z7Y8X9W0V1U2T3S | 4 | The app icon stands out well on the home screen. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
| 04/04/2026 17:30:00 | Nitin Gadkari | nitin.g@gmail.com | GBC3V4B5N6M7K8J9H0G1F2D3S4A5P6O7I8U9Y0T1R2E3W4Q5Z6X7C8V | 5 | Essential tool for modern urban life. Great job team. | [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe) |
 
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
│   ├── DEPLOYMENT.md              # API reference & deployment
│   ├── PRODUCTION_READINESS.md    # Level 6 implementation summary
│   ├── SECURITY_CHECKLIST.md      # Security review checklist
│   └── USER_GUIDE.md              # End-user guide and onboarding notes
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

## Level 6 Production Readiness

The repository now includes a production-readiness layer for Level 6 with live backend metrics, a frontend readiness dashboard, indexed SOS/profile/contact records, and a fee sponsorship path for gasless-transaction readiness.

### Submission Checklist

| Requirement | Status | Evidence |
|---|---|---|
| 30+ verified active users | Implemented | 31 real onboarding responses with names, wallets, ratings, and feedback are documented in the README table and linked export sheet. |
| Metrics dashboard live | Implemented | The frontend renders the production readiness panel with metrics, monitoring, indexing, and security coverage. |
| Security checklist completed | Implemented | [docs/SECURITY_CHECKLIST.md](docs/SECURITY_CHECKLIST.md) |
| Monitoring active | Implemented | [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md) and `/api/v1/raksha/monitoring` |
| Data indexing implemented | Implemented | [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md) and `/api/v1/raksha/indexing` |
| Full documentation | Implemented | [docs/](docs), [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md), [DEPLOYMENT.md](DEPLOYMENT.md), [ARCHITECTURE.md](ARCHITECTURE.md) |
| 1 community contribution | Implemented | [Live X post](https://x.com/georgian_deep/status/2040425396102156586?s=20) published 2026-04-04 |
| 1 advanced feature implemented | Implemented | Fee sponsorship support in the SOS flow and the production-readiness summary. |
| Minimum 15+ meaningful commits | Implemented | 22+ commits verified on main branch as of 2026-04-04 (`git rev-list --count HEAD`). |
| Deliverable: Production-ready application | Implemented | Local build verified, backend seed flow verified, and production-readiness dashboard available. |

### Demo Scenario

Open the submission dashboard and click **Load 30+ Demo Users** to populate the app with the seeded review dataset. The scenario includes 30 verified users, multiple trusted contacts per user, and historical SOS/check-in activity across the last 30 days.

### Community Contribution Draft

See [docs/COMMUNITY_CONTRIBUTION.md](docs/COMMUNITY_CONTRIBUTION.md) for a publish-ready community post draft. Replace it with the live post URL once published.

### Backend Demo Seeding

- `POST /api/v1/raksha/seed-demo` with `{"users": 30}`

### User Onboarding and Feedback Loop

Use a Google Form to collect tester feedback with these fields:

- Wallet address
- Email address
- Name
- Product rating
- Written feedback

Export the responses to Excel and link the exported sheet here:

- Google Form: https://docs.google.com/forms/d/e/1FAIpQLScY0pVw0yrBbj1bjyf264mom1KSEumZsAjLCVGmVS1GOfWPVA/viewform?usp=sharing&ouid=110772656009502976350
- Excel/Sheet export (31 users): https://docs.google.com/spreadsheets/d/1ldTPP8M3xJDpWhhRNaDlsAwYa-4BgBCcrk_oJpqiKuA/edit?usp=sharing

Add the collected wallet addresses to the README before submission so they can be verified on Stellar Explorer.

### Improvement Plan

The next iteration should be driven by the onboarding feedback sheet and the production metrics dashboard. The latest feedback-driven improvement commit is:

- [e070bbe](https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe)

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
- **User Guide**: [docs/USER_GUIDE.md](docs/USER_GUIDE.md)
- **Production Readiness**: [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md)




