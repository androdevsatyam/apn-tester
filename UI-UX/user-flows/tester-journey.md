# Tester User Journey & Experience Architecture

This document defines the tester-side experience for the **APN Tester** Android and Web application.

---

## 1. User Persona

- **Name**: Alex Rivera
- **Role**: Tech Enthusiast, Beta Tester & Student
- **Motivation**: Enjoys discovering early-stage apps before public release, earning points redeemable for Google Play credits / gift cards, and helping indie creators build better software.
- **Key Behavior**: Uses Android phone daily, opens APN Tester app for 3-5 minutes every morning to complete daily app testing tasks.

---

## 2. Tester Lifecycle Flowchart

```mermaid
flowchart TD
    A[Download APN Tester App] --> B[Interactive Onboarding: Earn by Beta Testing]
    B --> C[Google Sign-in via Supabase]
    
    subgraph AccountSetup [Mandatory 2-Step Setup]
        C --> D[Step 1: Join APN Google Group with Active Gmail]
        D --> E[Step 2: Verify Play Store App is Logged In with Same Gmail]
    end
    
    E --> F[Tester Hub / Dashboard]
    
    subgraph DiscoveryAndTesting [App Discovery & Enrollment]
        F --> G[Browse Available Live Apps]
        G --> H[Select App & View Testing Rewards & Guidelines]
        H --> I[Tap 'Opt-In on Play Store' -> Opens Google Play Beta Page]
        I --> J[Accept Beta Invite & Install App to Device]
        J --> K[Return to APN Tester -> Confirm Installation]
    end
    
    subgraph DailyTestingLoop [14-Day Mandatory Testing Routine]
        K --> L[App Added to 'My Active Testing' List]
        L --> M[Daily Push Notification Reminder: 'Time to test Your Apps']
        M --> N[Open Tested App for minimum 2-3 minutes]
        N --> O[APN Background Heartbeat verifies app usage]
        O --> P[Day X Checked Off & Streak +1 Incremented]
        P --> Q[Optional: Submit Bug Report / Feedback for Bonus Points]
    end
    
    Q --> R{Day 14 Completed?}
    R -->|No| M
    R -->|Yes| S[14-Day Reward Bonus Credited to Wallet 🎉]
    S --> T[Redeem Points for Google Play Gift Cards / UPI Transfer]
```

---

## 3. Key Tester Experience Features

### 1. Zero-Confusion Account Matching
- Because Google Play closed testing strictly grants access to the specific Gmail address enrolled in the Google Group, the APN Tester onboarding explicitly highlights the active email:
  - *"You are logged in as `alex.rivera@gmail.com`. Please ensure your Google Play Store app is active with this exact account."*

### 2. Daily Testing Checklist & Timer
- Clear visual checklist of enrolled apps.
- Progress bar for the day: e.g. `3 of 4 apps tested today`.
- One-tap launcher button: Directly launches the tested app from within APN Tester.
- Daily usage validator: Detects app foreground activity and awards daily streak credit.

### 3. Feedback & Bug Reporter
- Built-in form allowing testers to report:
  - Device info (auto-filled: OS Version, Device Model, RAM).
  - Bug description, reproduction steps.
  - Screenshot attachment.
- Publishers receive this feedback in real-time.

### 4. Rewards & Gamification
- Points system:
  - Daily open: +50 points
  - 14-day completion streak bonus: +500 points
  - Quality bug report: +150 points
- Wallet screen with instant redemption for gift cards and direct payouts.
