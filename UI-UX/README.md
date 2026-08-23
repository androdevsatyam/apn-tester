# APN Tester — UI/UX Design System & Interactive Prototype

> **Production-grade UI/UX specification and interactive prototype for Google Play 14-Tester Closed Testing Compliance platform (Android & Web).**

---

## 📌 Executive Summary & Problem Solved

Google Play Console enforces a mandatory requirement for all new personal developer accounts:
> **Developers must run a Closed Test with at least 14 opt-in testers continuously for at least 14 days before applying for Production release access.**

### Why Developers Struggle:
1. **Tester Dropout Risk**: Friends and personal contacts install the app on Day 1 but forget to open it or uninstall it after a few days, causing Google to disqualify the 14-day test cycle.
2. **Operational Friction**: Manually collecting 14 individual Gmail addresses, inviting them, and chasing daily testing confirmations is tedious and unreliable.
3. **Production Questionnaire Anxiety**: Google asks specific questions during the production access request about tester feedback and bug resolutions.

### The APN Tester Solution:
**APN Tester** automates the entire closed testing lifecycle:
- **1-Click Google Group Provisioning**: Developers simply paste our automated Google Group email (`testers-group@apntester.com`) into Google Play Console.
- **Guaranteed 14+ Real Active Testers**: We automatically assign 16 testers (14 required + 2 safety reserves) with daily active session verification.
- **Live 14-Day Progress Monitor**: Real-time heartbeat logs, device distribution graphs, and crash/feedback inbox.
- **Production Compliance Certificate**: Ready-to-use structured feedback summary for Google's questionnaire.

---

## 🗂 Project Structure (`UI-UX/`)

```
UI-UX/
├── README.md                          # Master UI/UX Architecture & Documentation
├── design-system/
│   ├── design-tokens.json             # Color palette, typography, elevation, spacing tokens
│   ├── design-tokens.css              # Ready-to-import CSS variables & theme tokens
│   └── components-spec.md             # Standardized component library specifications
├── user-flows/
│   ├── publisher-journey.md           # Publisher step-by-step UX & decision tree
│   ├── tester-journey.md              # Tester onboarding, testing lifecycle, daily check-in UX
│   └── system-architecture-flows.md   # Supabase schema, FastAPI & Razorpay payment flows
├── screens/
│   ├── 01-onboarding-experience.md    # Informative & attractive onboarding UX (Publisher & Tester)
│   ├── 02-publisher-web-and-app.md    # Submission form, Google Group wizard, payment & tracker
│   ├── 03-tester-mobile-experience.md # Group join, app catalog, 14-day streak, daily task tracker
│   └── 04-admin-review-panel.md       # App approval queue, group sync, tester metrics
└── prototype/
    ├── index.html                     # Full interactive web & mobile prototype application
    ├── css/
    │   └── styles.css                 # Modern styling with glassmorphism, micro-interactions
    ├── js/
    │   ├── app.js                     # Prototype state management, screen routing & interactions
    │   └── mockData.js                # Realistic mock datasets for apps, testers, and stats
    └── assets/                        # Design assets
```

---

## 🎨 Design System Highlights

- **Primary Color (Electric Indigo `#4F46E5`)**: Conveys technological confidence, reliability, and precision.
- **Google Play Signature Green (`#01875F`)**: Direct alignment with Google Play branding for test links and opt-in CTAs.
- **Cyber Cyan (`#06B6D4`)**: Used for secondary telemetry metrics, real-time counters, and live timers.
- **Dual-Theme Support**: Flawless switching between Dark Mode (`#0B0F19`) and Light Mode (`#F8FAFC`).
- **Typography**: Google's `Plus Jakarta Sans` for clean UI readability and `JetBrains Mono` for package IDs and code snippets.

---

## 🚀 Interactive Live Prototype Features

The interactive prototype located at `UI-UX/prototype/index.html` allows you to test and demonstrate all user journeys:

1. **Dual Platform View Switcher**:
   - **Android Pixel 8 Mobile Frame**: Realistic status bar, camera notch, and gesture pill.
   - **Web Desktop Dashboard**: High-resolution browser window layout.
2. **Multi-Role Experience Switcher**:
   - **Publisher Role**: Walkthrough onboarding -> Dashboard -> 5-Step App Submission -> Automated Verification check -> Razorpay payment modal -> 14-Day Live Progress Monitor.
   - **Tester Role**: Onboarding -> Tester Hub -> Active Testing Timer (2-minute countdown with reward sound/toast) -> New App Discovery.
   - **Admin Role**: Application review queue with 1-click test link verification, approval, and settlement ledger.
3. **Interactive 14-Day Calendar Heatmap**:
   - Click any day block (Day 1 to 14) to inspect verified session logs and active tester counts.
4. **Simulated Razorpay Gateway Checkout**:
   - Complete payment sheet simulation supporting UPI, NetBanking, and Card transactions with instant state transition to Live deployment.

---

## 💻 How to View the Prototype

To launch the interactive prototype locally:
```bash
# Option 1: Direct browser opening
open UI-UX/prototype/index.html

# Option 2: Local HTTP server
cd UI-UX/prototype && python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## 📱 Technical Mapping (Flutter / Jetpack Compose & Supabase)

- **Frontend**: Jetpack Compose (Material 3) / Flutter design components with reactive state.
- **Backend**: FastAPI microservices handling Google Play link crawler and Razorpay webhooks.
- **Database**: Supabase Realtime Postgres with tables: `users`, `applications_under_process`, `live_applications`, `payments`, `daily_test_logs`.
