# APN Tester Design System - Component Specifications

This document outlines the standard UI components, interaction models, and styling patterns used across both Android (Material 3 / Jetpack Compose) and Web responsive layouts for the **APN Tester** platform.

---

## 1. Action Buttons

### Primary CTA Button (Electric Indigo Gradient)
- **Use Case**: Primary actions such as *Submit App for Verification*, *Proceed to Payment*, *Join Google Group*, *Start 14-Day Test*.
- **Visuals**:
  - Background: `linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)`
  - Hover / Active: `linear-gradient(135deg, #6366F1 0%, #4338CA 100%)` + box-shadow glow
  - Padding: `14px 28px` (Web/Desktop) / `16px 24px` (Android full-width pill)
  - Border Radius: `var(--radius-lg)` (16px) or `var(--radius-full)` (9999px for mobile pills)
  - Typography: `font-weight: 600`, `font-size: 15px`, `letter-spacing: -0.01em`

### Play Store Action Button (Play Store Green)
- **Use Case**: Direct Play Store opt-in and download triggers.
- **Visuals**:
  - Background: `#01875F`
  - Icon: Google Play brand glyph (SVG) on left
  - Text: "Opt-in on Google Play" / "Install via Play Store"
  - Badge: Shows app size and version tag.

### Secondary & Ghost Buttons
- **Use Case**: "Copy Group Email", "View Test Instructions", "Save as Draft".
- **Visuals**:
  - Border: `1px solid var(--border-color)`
  - Background: `transparent` / `var(--bg-card)`
  - Hover: `var(--bg-card-hover)`

---

## 2. Google Group 1-Tap Provisioning Widget

A central component designed to reduce publisher onboarding friction and tester confusion.

### Publisher View (Copy & Guide Mode)
- **Header**: "Step 2: Add our Google Group to Closed Track"
- **Interactive Box**:
  - Displays: `testers-group@apntester.com`
  - Action: **[ 📋 Copy Email ]** button with instant ripple + "Copied to Clipboard!" toast
  - Subtext: "Paste this email into Google Play Console > Testing > Closed testing > Testers tab > Google Groups."
  - Direct Link: External link "Open Play Console ↗"

### Tester View (1-Tap Join Mode)
- **Header**: "Step 1: Join APN Testers Group"
- **Action**: Single tap opens Google Groups join confirmation with Google Account picker.
- **Status Indicator**:
  - 🟡 *Checking membership...*
  - 🟢 *Verified: Joined with `tester.alex@gmail.com`*

---

## 3. 14-Day Testing Progress Gauge & Activity Heatmap

The core monitoring dashboard widget for tracking Google Play's 14-day mandatory testing threshold.

### Structure:
1. **Circular Progress Ring / Linear Stepper**:
   - Displays `Day X of 14` with progress percentage (e.g. `57% Complete`).
   - Countdown timer: `7 Days 14 Hours Remaining until Production Readiness`.
2. **Tester Quota Pill**:
   - Status: `16 / 14 Active Testers` (Displays in Emerald Green when >= 14, Amber when < 14).
   - Dropout Buffer: Automatically provisions +2 fallback testers (16 total) to guarantee compliance.
3. **14-Day Calendar Heatmap**:
   - 14 interactive day blocks (Day 1 through Day 14).
   - Color code:
     - 🟢 **Green (Checkmark)**: Required >= 14 daily active tester sessions logged.
     - 🟡 **Amber (Pulse)**: Current ongoing day in progress.
     - ⚪ **Muted Grey**: Upcoming scheduled days.

---

## 4. Tester Engagement Card & Roster Item

Displays individual tester health, active streak, device model, and last ping timestamp.

### Anatomy:
```
+-------------------------------------------------------------+
| [Avatar] Alex Rivera (Pixel 7 - Android 14)       [🟢 Active]|
| Streak: 7/14 Days  | Last active: 22 mins ago  | Ping: OK   |
| [View Test Log]  [Send Feedback Reminder]                   |
+-------------------------------------------------------------+
```

---

## 5. Verification & Payment Step Cards

### Verification Status Pill:
- **Pending**: Animated pulsing cyan radar ring + *"Verifying Google Group Access..."*
- **Approved**: Solid emerald badge with checkmark + *"Ready for Deployment"*
- **Issue Detected**: Crimson border with troubleshoot modal *"Google Group not added to track"*

### Razorpay Payment Summary Modal:
- Shows transparent itemization:
  - Base 14-Day 14-Tester Guarantee: ₹1,499 ($18)
  - +2 Standby Backup Testers: Included (Free)
  - Daily Crash & Log Reports: Included (Free)
  - Production Application Certificate: Included
  - Total with GST: ₹1,499
- Instant Payment Methods: UPI (GPay, PhonePe, Paytm), Net Banking, Cards.

---

## 6. Informative Onboarding Hero Cards

Dynamic onboarding cards designed with fluid gesture animations, high-contrast badges, and interactive preview animations.

- **Hero 1**: Google Policy Simplified (Visual comparison of Rejection vs Guaranteed Approval).
- **Hero 2**: Zero-Friction Group Sync (How our automated system tracks installs).
- **Hero 3**: 14 Days Peace of Mind (Daily automated reminders to testers to launch the app).
