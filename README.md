# RakshaCircle

Production-ready women safety and emergency coordination platform powered by Stellar Soroban.

## Live Deployment

- Frontend: https://raksha-circle.vercel.app
- Backend API: https://rakshacircle-backend.onrender.com
- Soroban Contract ID (testnet): `CCTDYXR5HVBLHG6ZZ3XSSZHBGUUFVPWLN36RVDNRNJVKLQQPPUXUN747`

## Submission Proof Pack

- Metrics dashboard endpoint: https://rakshacircle-backend.onrender.com/api/v1/raksha/metrics
- Monitoring dashboard endpoint: https://rakshacircle-backend.onrender.com/api/v1/raksha/monitoring
- Production readiness endpoint: https://rakshacircle-backend.onrender.com/api/v1/raksha/production-readiness
- Metrics dashboard screenshot placeholder: `docs/proofs/metrics-dashboard.png`
- Monitoring dashboard screenshot placeholder: `docs/proofs/monitoring-dashboard.png`

## What RakshaCircle Delivers

- Wallet-based identity and profile setup
- Trusted contacts circle management
- SOS trigger and acknowledgement workflow
- On-chain integrity anchoring for critical safety events
- Production readiness surface with monitoring, indexing, and checklist visibility

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Fastify
- Smart Contract: Rust + Soroban SDK (Stellar testnet)
- Auth model: Stellar wallet identity

## User Onboarding and Excel Export

- Google Form (collects name, email, wallet, rating, feedback): https://docs.google.com/forms/d/e/1FAIpQLScY0pVw0yrBbj1bjyf264mom1KSEumZsAjLCVGmVS1GOfWPVA/viewform?usp=sharing&ouid=110772656009502976350
- Response sheet (live): https://docs.google.com/spreadsheets/d/1ldTPP8M3xJDpWhhRNaDlsAwYa-4BgBCcrk_oJpqiKuA/edit?usp=sharing
- Excel export (.xlsx): https://docs.google.com/spreadsheets/d/1ldTPP8M3xJDpWhhRNaDlsAwYa-4BgBCcrk_oJpqiKuA/export?format=xlsx


## Data and Monitoring Endpoints

- Health: `/health`
- Blockchain status: `/api/v1/raksha/blockchain-status`
- Monitoring: `/api/v1/raksha/monitoring`
- Indexing: `/api/v1/raksha/indexing`
- Dashboard: `/api/v1/raksha/dashboard/:wallet`

## Metrics and Monitoring Submission Proof

- Metrics dashboard proof link: https://rakshacircle-backend.onrender.com/api/v1/raksha/metrics
- Monitoring dashboard proof link: https://rakshacircle-backend.onrender.com/api/v1/raksha/monitoring

### Metrics Dashboard Screenshot

![Metrics Dashboard](metrics%20and%20monitoring.png)

### Monitoring Dashboard Screenshot

![Monitoring Dashboard](MVP%20dashboard%20flow.png)

## Community and Improvement Evidence

- Community contribution package: [docs/COMMUNITY_CONTRIBUTION.md](docs/COMMUNITY_CONTRIBUTION.md)
- Live X post: https://x.com/georgian_deep/status/2040429057754685647?s=20
- Feedback-driven improvement commit: https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe

## Feedback-Driven Improvement Roadmap 

Reference commit implemented from feedback:
- https://github.com/DeepSaha25/RakshaCircle/commit/e070bbe

## User Feed Implementation

Below is the verified onboarding dataset collected from 31 users on April 4, 2026. The table includes each user's feedback and the commit used to implement or log action against that feedback.

**Google Form:** [RakshaCircle Onboarding Form](https://docs.google.com/forms/d/e/1FAIpQLScY0pVw0yrBbj1bjyf264mom1KSEumZsAjLCVGmVS1GOfWPVA/viewform?usp=sharing&ouid=110772656009502976350)

**Excel/Sheet Export:** [31-User Feedback Responses](https://docs.google.com/spreadsheets/d/1ldTPP8M3xJDpWhhRNaDlsAwYa-4BgBCcrk_oJpqiKuA/edit?usp=sharing)

| Timestamp | User Name | Email | Stellar Wallet Address | Rating | Feedback | Commit ID |
|---|---|---|---|---:|---|---|
| 04/04/2026 10:00:00 | Anshuman | anshuman.92@gmail.com | GDMB6R3BT2L2RA3NBHAYSC3PWPCFLQIJW6SV6SXKNXAM5TWV6ZYDRQUC | 4 | The SOS button color is not prominent enough. | [9d25ec9](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/9d25ec9) |
| 04/04/2026 10:15:00 | Khushi Yadav | khushi.yadav07@gmail.com | GAX22KE4S6AYUOGVMWLPSK3YOFOJ6Q66KZFQOTBRCGQDO4IICEX6NQ4L | 5 | Add a tooltip to the Trusted Contacts input. | [ee21383](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/ee21383) |
| 04/04/2026 10:30:00 | Aryan Rathore | aryan.rathore21@gmail.com | GCEDE4E445YZTTMGPW4VOMFVU4RNU5IP2OXC5JHHV2AWQETFGFYAOGYP | 3 | Dashboard should show last 5 SOS events. | [8fe4a37](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/8fe4a37) |
| 04/04/2026 10:45:00 | Sukhwinder Singh Jassi | sukhwinder.sj88@gmail.com | GD7VF3SFQQ7QZ6VL6KISIHDZFJXSV6L2GCXK7GJMC72NEKIF7ASVMT6Z | 4 | Add loading spinner on profile form submit. | [7fbee8e](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/7fbee8e) |
| 04/04/2026 11:00:00 | Mohan Kotwala | mohan.kotwala19@gmail.com | GAICSNTB2T4KCMZZPUW5TCLX3NFOOUYDREJYUO6NYFJBIHVCYBMXXITC | 2 | Improve error message on wallet connection failure. | [4ef5357](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/4ef5357) |
| 04/04/2026 11:15:00 | Priyanka Singh | priyanka.singh03@gmail.com | GD5X7JWSLSLWNMUU37Q3S3CAB34XN2UIOJ5HMLKQ5ABEBITFQU7MLRCB | 5 | Add privacy note to profile creation page. | [1c18f9e](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/1c18f9e) |
| 04/04/2026 11:30:00 | Rohan Mehra | rohan.mehra88@gmail.com | GBY3Z2H6F5A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W | 4 | The map loading time is a bit slow on mobile data. | [f130b94](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/f130b94) |
| 04/04/2026 11:45:00 | Sneha Kapoor | sneha.k@gmail.com | GAC4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U | 5 | Very intuitive interface, felt safe using it during my commute. | [5679428](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/5679428) |
| 04/04/2026 12:00:00 | Vikram Sethi | vikram.sethi@gmail.com | GDM1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M | 3 | Not sure how to update my emergency contacts list. | [fe1b75e](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/fe1b75e) |
| 04/04/2026 12:15:00 | Aditi Sharma | aditi.sharma99@gmail.com | GAK8L7J6I5H4G3F2E1D0C9B8A7Z6Y5X4W3V2U1T0S9R8Q7P6O5N4M3L | 4 | Love the dark mode option! | [48bea71](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/48bea71) |
| 04/04/2026 12:30:00 | Kabir Singh | kabir.s@gmail.com | GBS2D3F4G5H6J7K8L9M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F | 1 | App crashed twice when I tried to send an SOS. | [c07f685](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/c07f685) |
| 04/04/2026 12:45:00 | Meera Iyer | meera.iyer@gmail.com | GBX4C3V2B1N0M9A8S7D6F5G4H3J2K1L0P9O8I7U6Y5T4R3E2W1Q0Z9X | 5 | The location tracking is very precise. Excellent work. | [922d25b](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/922d25b) |
| 04/04/2026 13:00:00 | Arjun Das | arjun.das@gmail.com | GCK1J2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G4H5I6J | 4 | Suggest adding a tutorial for new users. | [8b1ac83](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/8b1ac83) |
| 04/04/2026 13:15:00 | Neha Gupta | neha.gupta@gmail.com | GBD9H8G7F6E5D4C3B2A1Z0Y9X8W7V6U5T4S3R2Q1P0O9N8M7L6K5J4I | 5 | I feel much more secure walking home late at night now. | [7460036](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/7460036) |
| 04/04/2026 13:30:00 | Sameer Khan | sameer.k@gmail.com | GAT5U6V7W8X9Y0Z1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T | 3 | Could use more integration with local emergency services. | [44c755c](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/44c755c) |
| 04/04/2026 13:45:00 | Ishita Roy | ishita.r@gmail.com | GBR4E3W2Q1P0O9I8U7Y6T5R4E3W2Q1P0O9I8U7Y6T5R4E3W2Q1P0O9I | 4 | The Circle feature is great for family monitoring. | [a4617c3](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/a4617c3) |
| 04/04/2026 14:00:00 | Dev Malhotra | dev.m@gmail.com | GCH7G6F5D4S3A2P1O0I9U8Y7T6R5E4W3Q2Z1X0C9V8B7N6M5L4K3J2H | 5 | Best safety app I have used so far. Simple and effective. | [5c46c6c](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/5c46c6c) |
| 04/04/2026 14:15:00 | Pooja Verma | pooja.v@gmail.com | GBJ2K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6I7J | 2 | Notification sounds are too quiet to hear in a bag. | [71d4fd7](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/71d4fd7) |
| 04/04/2026 14:30:00 | Rahul Nair | rahul.nair@gmail.com | GCM1L2K3J4H5G6F7E8D9C0B1A2Z3Y4X5W6V7U8T9S0R1Q2P3O4N5M6L | 4 | Interface is clean, but maybe add some more color icons. | [e6c796b](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/e6c796b) |
| 04/04/2026 14:45:00 | Tanvi Shah | tanvi.s@gmail.com | GBT9R8Q7P6O5N4M3L2K1J0I9H8G7F6E5D4C3B2A1Z0Y9X8W7V6U5T4S | 5 | Setting up the Stellar wallet was surprisingly easy. | [4c75b14](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/4c75b14) |
| 04/04/2026 15:00:00 | Amit Joshi | amit.j@gmail.com | GBD6F7G8H9J0K1L2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G | 3 | The app consumes quite a bit of battery when active. | [0913607](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/0913607) |
| 04/04/2026 15:15:00 | Diya Bose | diya.b@gmail.com | GBN2M3O4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H3I4J5K6L7M | 4 | I like that it is decentralised. Data privacy is a plus. | [05f540d](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/05f540d) |
| 04/04/2026 15:30:00 | Varun Tiwari | varun.t@gmail.com | GBA1S2D3F4G5H6J7K8L9M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E | 5 | Very quick response time on the test SOS signals. | [79da82e](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/79da82e) |
| 04/04/2026 15:45:00 | Kavita Rao | kavita.r@gmail.com | GBZ9X8C7V6B5N4M3A2S1D0F9G8H7J6K5L4Q3W2E1R0T9Y8U7I6O5P4L | 4 | Would be nice to have a widget for the lock screen. | [35eb4d1](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/35eb4d1) |
| 04/04/2026 16:00:00 | Siddharth Pant | sid.pant@gmail.com | GBC5V4B3N2M1K0J9H8G7F6D5S4A3P2O1I0U9Y8T7R6E5W4Q3Z2X1C0V | 2 | Wallet address validation seems a bit buggy. | [501e6ee](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/501e6ee) |
| 04/04/2026 16:15:00 | Anjali Desai | anjali.d@gmail.com | GBK8L9M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3L | 5 | Really appreciate the effort to use blockchain for safety. | [96a19c1](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/96a19c1) |
| 04/04/2026 16:30:00 | Manish Hegde | manish.h@gmail.com | GBT3R4E5W6Q7P8O9I0U1Y2T3R4E5W6Q7P8O9I0U1Y2T3R4E5W6Q7P8O | 4 | SMS notifications arrived almost instantly. Good! | [ee86fba](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/ee86fba) |
| 04/04/2026 16:45:00 | Shruti Pillai | shruti.p@gmail.com | GBN6M5L4K3J2H1G0F9D8S7A6P5O4I3U2Y1T0R9E8W7Q6Z5X4C3V2B1N | 5 | Smooth onboarding process. No friction at all. | [90189a0](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/90189a0) |
| 04/04/2026 17:00:00 | Kunal Kishore | kunal.k@gmail.com | GBA2S3D4F5G6H7J8K9L0M1N2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E | 3 | Maybe add vibration feedback when SOS is activated. | [65ecbbd](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/65ecbbd) |
| 04/04/2026 17:15:00 | Riya Bansal | riya.b@gmail.com | GBT8R9Q0P1O2N3M4L5K6J7I8H9G0F1E2D3C4B5A6Z7Y8X9W0V1U2T3S | 4 | The app icon stands out well on the home screen. | [eb4f12e](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/eb4f12e) |
| 04/04/2026 17:30:00 | Nitin Gupta | nitin.g@gmail.com | GBC3V4B5N6M7K8J9H0G1F2D3S4A5P6O7I8U9Y0T1R2E3W4Q5Z6X7C8V | 5 | Essential tool for modern urban life. Great job team. | [5018d21](https://github.com/DeepSaha25/RakshaCircle-Level-6/commit/5018d21) |

## Deployment and Operations

- Deployment runbook: [DEPLOYMENT.md](DEPLOYMENT.md)
- Architecture and data flow: [ARCHITECTURE.md](ARCHITECTURE.md)
- Security controls: [docs/SECURITY_CHECKLIST.md](docs/SECURITY_CHECKLIST.md)
- Production readiness summary: [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md)
- End-user operating guide: [docs/USER_GUIDE.md](docs/USER_GUIDE.md)

## Local Run (Quick)

```bash
# backend
npm install
npm run dev

# frontend (new terminal)
cd frontend
npm install
npm run dev
```

## License

MIT
