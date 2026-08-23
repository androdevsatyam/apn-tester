/**
 * APN Tester - Mock Data Store
 * Provides realistic initial state for live apps, pending apps, testers, and analytics.
 */

const MOCK_DATA = {
  currentUser: {
    name: "Priya Sharma",
    email: "priya.developer@gmail.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    role: "publisher", // 'publisher' | 'tester' | 'admin'
    walletBalance: 1450, // For tester mode
    googleGroupJoined: true
  },

  googleGroupEmail: "testers-group@apntester.com",

  onboardingSlides: {
    publisher: [
      {
        id: 1,
        badge: "Google Play 2024 Policy Ready",
        title: "Publish to Google Play Without Rejection Anxiety",
        description: "Google now strictly requires personal developer accounts to run closed testing with 14 testers for 14 continuous days. We provide verified, real active testers guaranteed.",
        icon: "fa-shield-halved",
        metric: "14+ Testers • 14 Days • 100% Guaranteed",
        previewType: "policy_graphic"
      },
      {
        id: 2,
        badge: "1-Click Setup",
        title: "Zero-Hassle Google Group Configuration",
        description: "No need to gather individual emails. Just copy our automated tester group email into your Google Play Console Closed Track with one click.",
        icon: "fa-users-gear",
        metric: "testers-group@apntester.com",
        previewType: "group_graphic"
      },
      {
        id: 3,
        badge: "Real-Time Tracking",
        title: "Live 14-Day Progress & Tester Heartbeat",
        description: "Track daily tester open rates, device types, Android OS versions, and bug reports in real time with our automated compliance dashboard.",
        icon: "fa-chart-line",
        metric: "16 Assigned (14 Required + 2 Safety Backups)",
        previewType: "dashboard_graphic"
      },
      {
        id: 4,
        badge: "Production Clearance",
        title: "Ready for Full Play Store Production",
        description: "Receive a verified Testing Completion Certificate and exportable test logs specifically formatted for Google Play's production application questionnaire.",
        icon: "fa-certificate",
        metric: "Instant Production Clearance Ready",
        previewType: "certificate_graphic"
      }
    ],
    tester: [
      {
        id: 1,
        badge: "Discover & Earn",
        title: "Shape the Next Big Android Apps",
        description: "Get early access to exclusive pre-release Android apps. Test innovative features, report bugs, and earn reward points redeemable for Google Play credits.",
        icon: "fa-mobile-screen-button",
        metric: "+500 Points per 14-Day App Completed",
        previewType: "tester_discover"
      },
      {
        id: 2,
        badge: "Mandatory Match",
        title: "Match Your Play Store Account",
        description: "Join our Google Group with 1-tap using the same Gmail account you use for the Google Play Store on your Android device.",
        icon: "fa-circle-check",
        metric: "1-Tap Group Enrollment",
        previewType: "tester_match"
      },
      {
        id: 3,
        badge: "Daily Routine",
        title: "Test Just 2 Minutes a Day",
        description: "Open your assigned testing apps for at least 2 minutes daily to maintain your testing streak and earn daily point bonuses.",
        icon: "fa-fire",
        metric: "🔥 Daily Streaks & Cash/Gift Rewards",
        previewType: "tester_streak"
      }
    ]
  },

  liveApplications: [
    {
      id: "app-001",
      name: "TaskFlow Pro - AI Planner",
      packageName: "com.productivity.taskflow",
      category: "Productivity",
      icon: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      description: "Smart task planner with AI auto-scheduling, Pomodoro timers, and cloud synchronization.",
      currentDay: 7,
      targetDays: 14,
      requiredTesters: 14,
      activeTestersCount: 16,
      datePublished: "2026-08-17",
      lastDateTesting: "2026-08-31",
      status: "active",
      healthScore: 98,
      playStoreWebUrl: "https://play.google.com/apps/testing/com.productivity.taskflow",
      playStoreAndroidUrl: "https://play.google.com/store/apps/details?id=com.productivity.taskflow",
      dailyTesterPings: [16, 16, 15, 16, 16, 15, 16, 0, 0, 0, 0, 0, 0, 0],
      testers: [
        { id: "t1", name: "Alex Rivera", device: "Pixel 8 Pro", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "18m ago", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80" },
        { id: "t2", name: "Sarah Chen", device: "Samsung Galaxy S24", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "42m ago", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80" },
        { id: "t3", name: "Marcus Vance", device: "OnePlus 12", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "1h ago", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80" },
        { id: "t4", name: "Elena Rostova", device: "Xiaomi 14", os: "Android 14", streak: "6/7 Days", status: "Active Today", lastPing: "2h ago", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" },
        { id: "t5", name: "David Kim", device: "Nothing Phone (2)", os: "Android 13", streak: "7/7 Days", status: "Active Today", lastPing: "3h ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" },
        { id: "t6", name: "Ananya Patel", device: "Samsung S23 FE", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "3h ago", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80" },
        { id: "t7", name: "Liam O'Connor", device: "Pixel 7a", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "4h ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" },
        { id: "t8", name: "Fatima Al-Sayed", device: "Motorola Edge 40", os: "Android 13", streak: "7/7 Days", status: "Active Today", lastPing: "5h ago", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80" },
        { id: "t9", name: "Lucas Silva", device: "Pixel 6a", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "5h ago", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80" },
        { id: "t10", name: "Zoe Martinez", device: "Realme GT 5", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "6h ago", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80" },
        { id: "t11", name: "Hiroshi Tanaka", device: "Sony Xperia 5 V", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "7h ago", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80" },
        { id: "t12", name: "Chloe Dupont", device: "Samsung S22", os: "Android 13", streak: "7/7 Days", status: "Active Today", lastPing: "7h ago", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&auto=format&fit=crop&q=80" },
        { id: "t13", name: "Vikram Malhotra", device: "iQOO 12", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "8h ago", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&auto=format&fit=crop&q=80" },
        { id: "t14", name: "Amara Nwosu", device: "Tecno Camon 30", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "8h ago", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&q=80" },
        { id: "t15", name: "Oliver Weber [Backup 1]", device: "Pixel 7", os: "Android 14", streak: "7/7 Days", status: "Active Today", lastPing: "9h ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80" },
        { id: "t16", name: "Maya Lin [Backup 2]", device: "OnePlus Nord 3", os: "Android 13", streak: "7/7 Days", status: "Active Today", lastPing: "9h ago", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=80&auto=format&fit=crop&q=80" }
      ],
      feedbackList: [
        { id: "f1", user: "Sarah Chen", rating: 5, time: "2 hours ago", text: "AI scheduling works flawlessly! Very snappy on Android 14. Tested dark mode toggle and task categories.", badge: "Verified Tester" },
        { id: "f2", user: "Marcus Vance", rating: 4, time: "5 hours ago", text: "Found a minor layout glitch when landscape mode is enabled on the timer screen. Overall very smooth.", badge: "Bug Report" },
        { id: "f3", user: "Elena Rostova", rating: 5, time: "Yesterday", text: "Notifications arrive exactly at scheduled reminder times. No battery drain noticed.", badge: "Performance" }
      ]
    }
  ],

  applicationsUnderProcess: [
    {
      id: "app-pending-01",
      name: "FitSync AI - Calorie & Workout",
      packageName: "com.fitsync.health",
      category: "Health & Fitness",
      icon: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=120&auto=format&fit=crop&q=80",
      submittedAt: "2026-08-23 18:30",
      verificationStatus: "verifying", // 'pending' | 'verifying' | 'approved' | 'rejected'
      playStoreWebUrl: "https://play.google.com/apps/testing/com.fitsync.health",
      playStoreAndroidUrl: "https://play.google.com/store/apps/details?id=com.fitsync.health",
      testInstructions: "Please test barcode scanning for food items and Bluetooth heart rate monitor sync.",
      verificationNotes: "Automated group access check in progress (80% complete)..."
    }
  ],

  testerAvailableApps: [
    {
      id: "app-explore-01",
      name: "SoundScape Studio",
      packageName: "com.soundscape.audio",
      developer: "Aura Sound Labs",
      category: "Music & Audio",
      icon: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=80",
      description: "High-definition spatial audio equalizer and ambient white noise mixer.",
      pointsReward: 500,
      enrolledTesters: 12,
      requiredTesters: 14,
      daysLeft: 14,
      playStoreUrl: "https://play.google.com/apps/testing/com.soundscape.audio"
    },
    {
      id: "app-explore-02",
      name: "CryptoVault Pro",
      packageName: "com.cryptovault.defi",
      developer: "Krypton Systems",
      category: "Finance",
      icon: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=120&auto=format&fit=crop&q=80",
      description: "Non-custodial multi-chain wallet with biometric key protection.",
      pointsReward: 550,
      enrolledTesters: 10,
      requiredTesters: 14,
      daysLeft: 14,
      playStoreUrl: "https://play.google.com/apps/testing/com.cryptovault.defi"
    }
  ],

  pricingPackages: {
    title: "14-Day 14-Tester Guarantee Package",
    amountINR: 1499,
    amountUSD: 18,
    currency: "INR",
    features: [
      "14 Verified Daily-Active Testers guaranteed",
      "+2 Standby Backup Testers assigned (16 total)",
      "Full 14 Continuous Testing Days compliance",
      "Daily open-rate ping logs & telemetry",
      "Integrated Bug & Feedback collection inbox",
      "Google Play Production Compliance Certificate",
      "100% Money-back Guarantee if rejected by Google for testing count"
    ]
  }
};
