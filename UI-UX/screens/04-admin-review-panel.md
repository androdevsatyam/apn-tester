# Screen Specification 04: Admin Review & Operations Panel

## 1. Operational Overview

The Admin Review Panel provides the APN Tester administrative team with tools to manage app verification, monitor Google Group health, oversee Razorpay transaction settlements, and maintain testing quality standards.

---

## 2. Admin Dashboard Modules

### 1. Verification Queue (`applications_under_process`)
- Displays submitted applications awaiting accessibility check:
  - App Name, Package Name, Publisher Email, Submission Time.
  - Automated Check Results:
    - Package URL Status: `HTTP 200 OK`
    - Google Group Permission: `Access Granted / Access Denied`
  - Actions:
    - **[ Test Link Simulator ]**: Simulates joining closed track via admin test account.
    - **[ Approve & Send Payment Link ]**: Advances app to payment stage.
    - **[ Reject with Feedback ]**: Sends email with actionable fix instructions.

### 2. Live Apps Health Monitor (`live_applications`)
- Real-time fleet monitor for all 14-day active campaigns:
  - Tester dropout alerts (e.g. if active testers drop below 14, system auto-assigns standby testers).
  - Daily active session completion percentages.
  - Day 14 graduation queue with certificate issuance.

### 3. Razorpay Settlement & Transaction Ledger
- Real-time transaction feed with `razorpay_payment_id`, publisher user, gross amount, GST, and settlement status.
