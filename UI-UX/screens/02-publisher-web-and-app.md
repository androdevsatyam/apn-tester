# Screen Specification 02: Publisher Web & Mobile Experience

## 1. Publisher Dashboard (Home)

### Top Summary Bar
- **Header**: "Welcome back, Developer"
- **Metric Cards**:
  - `Active Testing Apps`: `1 App Live (Day 7/14)`
  - `Enrolled Testers`: `16 Active Testers (100% Quota)`
  - `Completed Deployments`: `3 Apps Approved on Play Store`
  - `Action Button`: **[ + Submit New App ]** (Gradient CTA with Plus icon)

### App Status Tabs
- **Tab 1: Live Applications (1)**:
  - App Card: *TaskFlow Pro (com.productivity.taskflow)*
  - Circular Progress Indicator: `Day 7 of 14 (50%)`
  - Active Testers Gauge: `16 / 14 Testers Active Today`
  - Status Tag: `🟢 Live & Testing`
  - Quick Actions: `[ View 14-Day Dashboard ]` `[ View Tester Logs ]`
- **Tab 2: Under Process & Verifying (1)**:
  - App Card: *FitSync AI (com.fitsync.health)*
  - Status Tag: `🟡 Verifying Google Group Access`
  - Progress: Step 4 of 5 (Verification in progress)
- **Tab 3: Completed Apps (3)**:
  - Archive of past successful tests with downloadable Production Compliance Certificates.

---

## 2. Multi-Step App Submission Wizard

### Step 1: App Metadata & Category
- Input Fields:
  - **App Title**: e.g., `EcoTracker - Carbon Footprint`
  - **Package Name**: e.g., `com.ecotracker.app` (Real-time regex validator: `^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$`)
  - **Category**: Dropdown (Productivity, Tools, Health & Fitness, Finance, Games, etc.)
  - **App Icon**: File upload / URL input with live preview thumbnail.
  - **App Description**: Short summary for testers (100-200 characters).

### Step 2: Google Group Provisioning Assistant
- **Interactive Instruction Card**:
  - Step 2.1: Open Google Play Console > *Your App* > *Testing* > *Closed testing*.
  - Step 2.2: Under *Testers* tab, select *Google Groups*.
  - Step 2.3: Add group email:
    ```
    testers-group@apntester.com  [ 📋 Copy Email ]
    ```
  - Step 2.4: Save changes and copy the generated testing links.

### Step 3: Closed Testing URLs
- Input Fields:
  - **Web Join Link**: `https://play.google.com/apps/testing/com.ecotracker.app`
  - **Android Join Link**: `https://play.google.com/store/apps/details?id=com.ecotracker.app`
  - **Test Credentials / Demo Account** (Optional): Username & Password for apps with login screens.
  - **Special Test Instructions**: Key features to exercise (e.g., "Please test creating a new carbon entry and exporting PDF").

### Step 4: Verification & Readiness Check
- **Automated Validation Engine**:
  - [x] Package Name format valid
  - [x] Web join URL reachable
  - [x] Group permissions verified on Google Play
  - Status: `🟢 Verified & Ready for Tester Deployment`

### Step 5: Razorpay Checkout & Order Confirmation
- **Package Selection Card**:
  - **Standard 14-Day 14-Tester Guarantee Package**: ₹1,499
  - Benefits:
    - 14 Verified Testers + 2 Standby Backups (16 total)
    - 14 Continuous Testing Days with daily activity tracking
    - Daily feedback & bug report dashboard
    - Google Play Production Clearance Guarantee
- **Payment Button**: **[ Pay ₹1,499 with Razorpay ]**
- Opens Razorpay modal (UPI, NetBanking, Cards).

---

## 3. Live 14-Day Progress & Tester Tracking Screen

### 1. Countdown & Progress Ring
- Large radial gauge: `Day 7 of 14` with days remaining countdown (`7 Days 12 Hours Left`).
- Status Badge: `🟢 On Track for Google Play Approval`.

### 2. Daily Active Tester Heatmap
- 14 Day Blocks showing checkmarks for completed days and pulse for current day.
- Daily Session graph: Bar chart showing number of active tester sessions per day (average 15.8 sessions/day).

### 3. Tester Roster Table / Cards
- Lists all 16 assigned testers:
  - Tester Name & Avatar
  - Device Model (e.g. *Samsung S23, Google Pixel 8, OnePlus 11, Xiaomi 13*)
  - Android OS Version (Android 12, 13, 14, 15 Beta)
  - Daily Streak (`7/7 Days active`)
  - Last Active Timestamp (`15 mins ago`)
  - Feedback / Bug reports count.

### 4. Feedback & Crash Inbox
- Real-time tester reviews, ratings (1-5 stars), UI suggestions, and attached screenshots.
- One-click export: **[ Download Compliance Report for Google Play ]**.
