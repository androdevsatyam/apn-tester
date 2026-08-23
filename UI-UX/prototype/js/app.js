/**
 * APN Tester - Interactive Prototype Application Logic
 * Supports dual-platform responsive architectures (Android Phone & Web Desktop Dashboard)
 */

const STATE = {
  activeRole: 'publisher',    // 'publisher' | 'tester' | 'admin'
  activeView: 'dashboard',    // 'onboarding' | 'dashboard' | 'wizard' | 'tracker' | 'tester_hub' | 'admin'
  deviceMode: 'desktop',      // 'mobile' | 'desktop'
  theme: 'dark',              // 'dark' | 'light'
  
  // Onboarding Carousel State
  onboardingIndex: 0,
  
  // Wizard State
  wizardStep: 1,
  wizardData: {
    appName: 'EcoTracker - Carbon Footprint',
    packageName: 'com.ecotracker.app',
    category: 'Productivity',
    webUrl: 'https://play.google.com/apps/testing/com.ecotracker.app',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.ecotracker.app',
    instructions: 'Test carbon footprint calculation and PDF report export.'
  },

  // Active App Tracker State
  selectedAppId: 'app-001',
  selectedDay: 7,

  // Tester Timer Simulation State
  isTestingActive: false,
  timerSecondsRemaining: 120,
  timerInterval: null
};

// ==============================================================================
// DOM Ready Initialization
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  // Sync initial mode
  setDeviceMode('desktop');
  setRole('publisher');
});

function initEventListeners() {
  // Device Frame Toggles
  document.getElementById('btn-view-mobile')?.addEventListener('click', () => setDeviceMode('mobile'));
  document.getElementById('btn-view-desktop')?.addEventListener('click', () => setDeviceMode('desktop'));

  // Role Toggles
  document.getElementById('btn-role-publisher')?.addEventListener('click', () => setRole('publisher'));
  document.getElementById('btn-role-tester')?.addEventListener('click', () => setRole('tester'));
  document.getElementById('btn-role-admin')?.addEventListener('click', () => setRole('admin'));

  // Theme Toggle
  document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);
}

// ==============================================================================
// Global State Mutators
// ==============================================================================
function setDeviceMode(mode) {
  STATE.deviceMode = mode;
  document.getElementById('btn-view-mobile')?.classList.toggle('active', mode === 'mobile');
  document.getElementById('btn-view-desktop')?.classList.toggle('active', mode === 'desktop');
  
  const container = document.getElementById('device-shell-container');
  if (container) {
    if (mode === 'mobile') {
      container.className = 'phone-shell';
      document.getElementById('phone-chrome-top').style.display = 'flex';
      document.getElementById('phone-chrome-bottom').style.display = 'flex';
      document.getElementById('desktop-chrome-top').style.display = 'none';
    } else {
      container.className = 'desktop-shell';
      document.getElementById('phone-chrome-top').style.display = 'none';
      document.getElementById('phone-chrome-bottom').style.display = 'none';
      document.getElementById('desktop-chrome-top').style.display = 'flex';
    }
  }
  renderApp();
}

function setRole(role) {
  STATE.activeRole = role;
  STATE.onboardingIndex = 0;
  
  // Highlight toolbar button
  document.getElementById('btn-role-publisher')?.classList.toggle('active', role === 'publisher');
  document.getElementById('btn-role-tester')?.classList.toggle('active', role === 'tester');
  document.getElementById('btn-role-admin')?.classList.toggle('active', role === 'admin');

  // Default starting view for each role
  if (role === 'publisher') {
    STATE.activeView = 'dashboard';
  } else if (role === 'tester') {
    STATE.activeView = 'tester_hub';
  } else {
    STATE.activeView = 'admin';
  }
  
  renderApp();
  showToast(`Switched to ${role.toUpperCase()} Experience`);
}

function navigateTo(view) {
  STATE.activeView = view;
  renderApp();
}

function toggleTheme() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', STATE.theme);
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = STATE.theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

// ==============================================================================
// Master Render Function
// ==============================================================================
function renderApp() {
  const root = document.getElementById('app-screen-content');
  if (!root) return;

  if (STATE.deviceMode === 'desktop') {
    renderDesktopLayout(root);
  } else {
    renderMobileLayout(root);
  }
}

// ==============================================================================
// DESKTOP LAYOUT WRAPPER (Sidebar + Main Content Area)
// ==============================================================================
function renderDesktopLayout(root) {
  root.innerHTML = `
    <div class="web-dashboard-container">
      <!-- Left Sidebar Navigation -->
      <aside class="web-sidebar">
        <div class="sidebar-brand">
          <div class="logo-badge"><i class="fa-solid fa-play"></i></div>
          <div class="brand-text">
            <span class="brand-name">APN Tester</span>
            <span class="brand-sub">Web Console</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section-label">MAIN WORKSPACE</div>
          <div class="sidebar-link ${STATE.activeView === 'dashboard' ? 'active' : ''}" onclick="navigateTo('dashboard')">
            <i class="fa-solid fa-gauge-high"></i>
            <span>Dashboard</span>
          </div>
          <div class="sidebar-link ${STATE.activeView === 'wizard' ? 'active' : ''}" onclick="navigateTo('wizard')">
            <i class="fa-solid fa-circle-plus"></i>
            <span>Submit New App</span>
          </div>
          <div class="sidebar-link ${STATE.activeView === 'tracker' ? 'active' : ''}" onclick="navigateTo('tracker')">
            <i class="fa-solid fa-chart-line"></i>
            <span>14-Day Live Track</span>
          </div>
          <div class="sidebar-link ${STATE.activeView === 'tester_hub' ? 'active' : ''}" onclick="navigateTo('tester_hub')">
            <i class="fa-solid fa-gamepad"></i>
            <span>Tester Hub</span>
          </div>
          
          <div class="nav-section-label">SYSTEM & COMPLIANCE</div>
          <div class="sidebar-link ${STATE.activeView === 'onboarding' ? 'active' : ''}" onclick="navigateTo('onboarding')">
            <i class="fa-solid fa-book-open"></i>
            <span>Policy & Guide</span>
          </div>
          <div class="sidebar-link ${STATE.activeRole === 'admin' ? 'active' : ''}" onclick="setRole('admin')">
            <i class="fa-solid fa-user-shield"></i>
            <span>Admin Queue</span>
          </div>
        </nav>

        <!-- Sidebar Footer Status Card -->
        <div class="sidebar-footer-card">
          <div class="footer-card-header">
            <i class="fa-solid fa-shield-check" style="color:var(--success);"></i>
            <span>Google Group Connected</span>
          </div>
          <div class="footer-card-sub">16 Verified Testers Ready</div>
          <button class="btn-sidebar-copy" onclick="copyGroupEmail()">
            <i class="fa-solid fa-copy"></i> Copy Group Email
          </button>
        </div>
      </aside>

      <!-- Main Web Content Container -->
      <div class="web-main-content">
        <!-- Top Web Nav Header -->
        <header class="web-top-nav">
          <div class="web-search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search applications, package names, test logs...">
          </div>

          <div class="web-nav-right">
            <div class="group-live-pill" onclick="copyGroupEmail()">
              <span class="pulse-dot"></span>
              <span class="group-email-label">Group: testers-group@apntester.com</span>
              <i class="fa-solid fa-copy"></i>
            </div>

            <div class="icon-btn-circle" onclick="showToast('No unread notifications')">
              <i class="fa-regular fa-bell"></i>
              <span class="badge-dot"></span>
            </div>

            <div class="user-profile-dropdown">
              <img src="${MOCK_DATA.currentUser.avatar}" alt="User">
              <div class="user-info-text">
                <span class="user-name">${MOCK_DATA.currentUser.name}</span>
                <span class="user-role">${STATE.activeRole.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Dynamic Web View Content -->
        <div class="web-screen-body" id="web-screen-body">
          ${getDesktopViewHTML()}
        </div>
      </div>
    </div>
  `;
}

function getDesktopViewHTML() {
  switch (STATE.activeView) {
    case 'onboarding':
      return getDesktopOnboardingHTML();
    case 'dashboard':
      return getDesktopDashboardHTML();
    case 'wizard':
      return getDesktopWizardHTML();
    case 'tracker':
      return getDesktopTrackerHTML();
    case 'tester_hub':
      return getDesktopTesterHubHTML();
    case 'admin':
      return getDesktopAdminHTML();
    default:
      return getDesktopDashboardHTML();
  }
}

// ==============================================================================
// 1. DESKTOP DASHBOARD
// ==============================================================================
function getDesktopDashboardHTML() {
  const app = MOCK_DATA.liveApplications[0];
  const pending = MOCK_DATA.applicationsUnderProcess[0];

  return `
    <div class="web-page-wrapper">
      <!-- Breadcrumb & Header Title -->
      <div class="web-page-header">
        <div>
          <h1 class="web-title">Publisher Testing Dashboard</h1>
          <p class="web-subtitle">Monitor your Google Play 14-day closed testing tracks and verified tester engagement.</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" onclick="navigateTo('onboarding')">
            <i class="fa-solid fa-circle-question"></i> Policy Guide
          </button>
          <button class="btn-primary" onclick="navigateTo('wizard')">
            <i class="fa-solid fa-plus"></i> Submit New App
          </button>
        </div>
      </div>

      <!-- 4 Top KPI Metric Cards -->
      <div class="web-metric-grid">
        <div class="web-kpi-card success">
          <div class="kpi-icon-wrap"><i class="fa-solid fa-rocket"></i></div>
          <div class="kpi-meta">
            <span class="kpi-label">Active Testing Track</span>
            <span class="kpi-value">1 App Live</span>
            <span class="kpi-trend positive"><i class="fa-solid fa-arrow-trend-up"></i> Day 7 of 14 (50% complete)</span>
          </div>
        </div>

        <div class="web-kpi-card primary">
          <div class="kpi-icon-wrap"><i class="fa-solid fa-users-viewfinder"></i></div>
          <div class="kpi-meta">
            <span class="kpi-label">Enrolled Testers</span>
            <span class="kpi-value">16 Active</span>
            <span class="kpi-trend positive"><i class="fa-solid fa-shield-check"></i> 14 Required + 2 Safety Backups</span>
          </div>
        </div>

        <div class="web-kpi-card cyan">
          <div class="kpi-icon-wrap"><i class="fa-solid fa-heart-pulse"></i></div>
          <div class="kpi-meta">
            <span class="kpi-label">Daily Retention Rate</span>
            <span class="kpi-value">100%</span>
            <span class="kpi-trend positive"><i class="fa-solid fa-check"></i> 16/16 Active Sessions Today</span>
          </div>
        </div>

        <div class="web-kpi-card purple">
          <div class="kpi-icon-wrap"><i class="fa-solid fa-award"></i></div>
          <div class="kpi-meta">
            <span class="kpi-label">Production Clearance</span>
            <span class="kpi-value">7 Days Left</span>
            <span class="kpi-trend neutral"><i class="fa-solid fa-clock"></i> Target: Aug 31, 2026</span>
          </div>
        </div>
      </div>

      <!-- Main 2-Column Responsive Dashboard Layout -->
      <div class="web-columns-grid">
        <!-- Left Column: Live Testing & Pending Tracks (65%) -->
        <div class="web-col-main">
          
          <!-- Live App Card -->
          <div class="web-card">
            <div class="web-card-header">
              <div class="card-header-left">
                <h3 class="card-title">Live Testing Track (1)</h3>
                <span class="badge-status-live"><span class="pulse-dot-green"></span> Live Testing</span>
              </div>
              <button class="btn-text-action" onclick="navigateTo('tracker')">
                View Full Telemetry <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div class="web-app-row">
              <img src="${app.icon}" class="web-app-icon" alt="${app.name}">
              <div class="web-app-details">
                <div class="app-title-row">
                  <span class="app-title-text">${app.name}</span>
                  <span class="category-tag">${app.category}</span>
                </div>
                <div class="pkg-name-text">${app.packageName}</div>
                <div class="track-info-row">
                  <span><i class="fa-brands fa-google-play"></i> Closed Testing Track</span>
                  <span>•</span>
                  <span>Published: ${app.datePublished}</span>
                  <span>•</span>
                  <span>Ends: ${app.lastDateTesting}</span>
                </div>
              </div>
            </div>

            <!-- 14-Day Progress Bar Ribbon -->
            <div class="web-progress-wrapper">
              <div class="progress-labels-row">
                <span class="progress-start">Day 1</span>
                <span class="progress-current"><i class="fa-solid fa-location-dot"></i> Today: Day ${app.currentDay} of ${app.targetDays} (7 Days Remaining)</span>
                <span class="progress-end">Day 14 (Clearance)</span>
              </div>
              <div class="web-progress-track">
                <div class="web-progress-fill" style="width: ${(app.currentDay / app.targetDays) * 100}%;"></div>
              </div>
              <div class="progress-sub-metrics">
                <span class="metric-pill"><i class="fa-solid fa-circle-check" style="color:var(--success);"></i> 16/14 Verified Testers Active</span>
                <span class="metric-pill"><i class="fa-solid fa-mobile-screen"></i> 14 Distinct Android Models</span>
                <span class="metric-pill"><i class="fa-solid fa-bug-slash"></i> 0 Fatal Crashes</span>
              </div>
            </div>

            <!-- Action Bar -->
            <div class="web-card-actions">
              <button class="btn-primary" onclick="navigateTo('tracker')">
                <i class="fa-solid fa-chart-pie"></i> Open 14-Day Live Monitor
              </button>
              <button class="btn-secondary" onclick="showFeedbackSheet()">
                <i class="fa-solid fa-comment-dots"></i> Tester Feedback & Bug Inbox (3)
              </button>
              <button class="btn-secondary" onclick="showToast('Play Store Link copied to clipboard')">
                <i class="fa-solid fa-share-nodes"></i> Copy Test Link
              </button>
            </div>
          </div>

          <!-- Pending Verification Card -->
          ${pending ? `
            <div class="web-card subtle-border">
              <div class="web-card-header">
                <div class="card-header-left">
                  <h3 class="card-title">Applications Under Process</h3>
                  <span class="badge-status-verifying"><i class="fa-solid fa-arrows-rotate fa-spin"></i> Verifying Access</span>
                </div>
                <span class="time-tag">Submitted 6 hours ago</span>
              </div>

              <div class="web-pending-row">
                <img src="${pending.icon}" class="web-app-icon" alt="${pending.name}">
                <div class="web-app-details">
                  <div class="app-title-text">${pending.name}</div>
                  <div class="pkg-name-text">${pending.packageName}</div>
                  <div class="verifying-status-box">
                    <i class="fa-solid fa-circle-notch fa-spin" style="color:var(--warning);"></i>
                    <span>${pending.verificationNotes}</span>
                  </div>
                </div>
                <div class="pending-actions">
                  <button class="btn-secondary" onclick="showTroubleshootModal()">
                    <i class="fa-solid fa-wrench"></i> Troubleshoot
                  </button>
                </div>
              </div>
            </div>
          ` : ''}

        </div>

        <!-- Right Column: Heatmap, Group Sync & Tester Feed (35%) -->
        <div class="web-col-side">
          
          <!-- 14-Day Mini Heatmap Card -->
          <div class="web-card">
            <div class="web-card-header">
              <h4 class="card-title-sm">14-Day Compliance Heatmap</h4>
              <span class="compliance-badge">7/14 Days ✅</span>
            </div>
            
            <div class="mini-heatmap-grid">
              ${Array.from({ length: 14 }, (_, i) => {
                const day = i + 1;
                const isPassed = day < app.currentDay;
                const isToday = day === app.currentDay;
                return `
                  <div class="mini-day-cell ${isPassed ? 'passed' : (isToday ? 'today' : 'future')}" title="Day ${day}">
                    <span class="day-label">D${day}</span>
                    <span class="day-icon">${isPassed ? '✓' : (isToday ? '●' : '—')}</span>
                  </div>
                `;
              }).join('')}
            </div>
            <div class="heatmap-footer-text">
              <i class="fa-solid fa-shield-check" style="color:var(--success);"></i> Google requires 14 continuous days with 14+ active testers.
            </div>
          </div>

          <!-- Google Group Quick Box -->
          <div class="web-card group-gradient-card">
            <div class="group-card-top">
              <i class="fa-solid fa-users-gear group-big-icon"></i>
              <div>
                <div class="group-title">Play Console Group</div>
                <div class="group-sub">Paste into Closed Track Testers</div>
              </div>
            </div>
            <div class="group-copy-widget">
              <code>${MOCK_DATA.googleGroupEmail}</code>
              <button class="btn-copy-widget" onclick="copyGroupEmail()">Copy</button>
            </div>
          </div>

          <!-- Recent Tester Activity Feed -->
          <div class="web-card">
            <div class="web-card-header">
              <h4 class="card-title-sm">Live Tester Check-ins</h4>
              <span class="realtime-badge"><span class="pulse-dot"></span> Live</span>
            </div>
            <div class="tester-feed-list">
              ${app.testers.slice(0, 4).map(t => `
                <div class="feed-item">
                  <img src="${t.avatar}" class="feed-avatar" alt="${t.name}">
                  <div class="feed-info">
                    <div class="feed-name">${t.name}</div>
                    <div class="feed-device">${t.device} • ${t.os}</div>
                  </div>
                  <div class="feed-time">${t.lastPing}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

// ==============================================================================
// 2. DESKTOP SUBMISSION WIZARD (2-Column Split Layout with Live Card Preview)
// ==============================================================================
function getDesktopWizardHTML() {
  return `
    <div class="web-page-wrapper">
      <div class="web-page-header">
        <div>
          <h1 class="web-title">Submit App for 14-Day Testing</h1>
          <p class="web-subtitle">Follow our streamlined 5-step wizard to provision Google Group testers and deploy your campaign.</p>
        </div>
        <button class="btn-secondary" onclick="navigateTo('dashboard')">
          <i class="fa-solid fa-xmark"></i> Cancel
        </button>
      </div>

      <div class="wizard-split-layout">
        <!-- Left 1/3: Stepper List & Live Preview Card -->
        <div class="wizard-sidebar-col">
          <!-- Vertical Stepper -->
          <div class="web-card stepper-nav-card">
            <div class="wizard-step-item ${STATE.wizardStep === 1 ? 'active' : (STATE.wizardStep > 1 ? 'done' : '')}">
              <div class="step-num">${STATE.wizardStep > 1 ? '✓' : '1'}</div>
              <div class="step-meta">
                <div class="step-heading">App Information</div>
                <div class="step-desc">Name, Package ID & Category</div>
              </div>
            </div>

            <div class="wizard-step-item ${STATE.wizardStep === 2 ? 'active' : (STATE.wizardStep > 2 ? 'done' : '')}">
              <div class="step-num">${STATE.wizardStep > 2 ? '✓' : '2'}</div>
              <div class="step-meta">
                <div class="step-heading">Google Group Setup</div>
                <div class="step-desc">Play Console Closed Track</div>
              </div>
            </div>

            <div class="wizard-step-item ${STATE.wizardStep === 3 ? 'active' : (STATE.wizardStep > 3 ? 'done' : '')}">
              <div class="step-num">${STATE.wizardStep > 3 ? '✓' : '3'}</div>
              <div class="step-meta">
                <div class="step-heading">Testing URLs</div>
                <div class="step-desc">Web & Android Join Links</div>
              </div>
            </div>

            <div class="wizard-step-item ${STATE.wizardStep === 4 ? 'active' : (STATE.wizardStep > 4 ? 'done' : '')}">
              <div class="step-num">${STATE.wizardStep > 4 ? '✓' : '4'}</div>
              <div class="step-meta">
                <div class="step-heading">Verification Check</div>
                <div class="step-desc">Automated Group Validation</div>
              </div>
            </div>

            <div class="wizard-step-item ${STATE.wizardStep === 5 ? 'active' : ''}">
              <div class="step-num">5</div>
              <div class="step-meta">
                <div class="step-heading">Payment & Launch</div>
                <div class="step-desc">Razorpay 14-Day Guarantee</div>
              </div>
            </div>
          </div>

          <!-- Live App Card Preview -->
          <div class="web-card preview-card">
            <div class="preview-header"><i class="fa-solid fa-eye"></i> Live Listing Preview</div>
            <div class="preview-body">
              <div class="preview-top">
                <div class="preview-icon"><i class="fa-brands fa-android"></i></div>
                <div>
                  <div class="preview-title" id="prev-title">${STATE.wizardData.appName}</div>
                  <div class="preview-pkg" id="prev-pkg">${STATE.wizardData.packageName}</div>
                </div>
              </div>
              <div class="preview-tag" id="prev-cat">${STATE.wizardData.category}</div>
              <div class="preview-badge"><i class="fa-solid fa-users"></i> 16 Assigned Testers</div>
            </div>
          </div>
        </div>

        <!-- Right 2/3: Form Content Card -->
        <div class="wizard-form-col">
          <div class="web-card form-content-card">
            ${getWizardStepHTML()}

            <!-- Wizard Bottom Action Controls -->
            <div class="wizard-footer-bar">
              ${STATE.wizardStep > 1 ? `
                <button class="btn-secondary" onclick="prevWizardStep()">
                  <i class="fa-solid fa-arrow-left"></i> Previous Step
                </button>
              ` : `<div></div>`}

              ${STATE.wizardStep < 5 ? `
                <button class="btn-primary" onclick="nextWizardStep()">
                  ${STATE.wizardStep === 4 ? 'Confirm & Go to Payment' : 'Save & Continue'} <i class="fa-solid fa-arrow-right"></i>
                </button>
              ` : `
                <button class="btn-primary" style="background:linear-gradient(135deg,#01875F,#0B6647);" onclick="openRazorpayCheckout()">
                  <i class="fa-solid fa-credit-card"></i> Pay ₹1,499 with Razorpay
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==============================================================================
// 3. DESKTOP 14-DAY LIVE MONITOR (3-Column Layout)
// ==============================================================================
function getDesktopTrackerHTML() {
  const app = MOCK_DATA.liveApplications[0];

  return `
    <div class="web-page-wrapper">
      <!-- Header Banner -->
      <div class="web-page-header">
        <div style="display:flex;align-items:center;gap:16px;">
          <button class="btn-circle-back" onclick="navigateTo('dashboard')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <div style="display:flex;align-items:center;gap:10px;">
              <h1 class="web-title">${app.name}</h1>
              <span class="badge-status-live"><span class="pulse-dot-green"></span> Day ${app.currentDay} of 14</span>
            </div>
            <p class="web-subtitle">${app.packageName} • Target: Google Play Production Clearance</p>
          </div>
        </div>

        <div class="header-actions">
          <button class="btn-secondary" onclick="showFeedbackSheet()">
            <i class="fa-solid fa-comment-dots"></i> Feedback Inbox (3)
          </button>
          <button class="btn-playstore" onclick="showExportCertificateModal()">
            <i class="fa-solid fa-file-pdf"></i> Export Compliance Report
          </button>
        </div>
      </div>

      <!-- 3-Column Monitor Grid -->
      <div class="tracker-3col-grid">
        
        <!-- Col 1: Radial Progress & Health Metrics (28%) -->
        <div class="tracker-col">
          <div class="web-card text-center-card">
            <div class="gauge-hero-desktop">
              <div class="radial-progress-wrapper" style="width:160px;height:160px;">
                <svg width="160" height="160" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12"></circle>
                  <circle cx="70" cy="70" r="58" fill="none" stroke="url(#primaryGrad)" stroke-width="12"
                    stroke-dasharray="364.4" stroke-dashoffset="${364.4 - (364.4 * (app.currentDay / 14))}" stroke-linecap="round"></circle>
                  <defs>
                    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#4F46E5" />
                      <stop offset="100%" stop-color="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="radial-center-text">
                  <span class="radial-day-big">Day ${app.currentDay}</span>
                  <span class="radial-day-sub">of 14 Days</span>
                </div>
              </div>
              <h3 style="font-size:16px;font-weight:700;margin-top:12px;">50% Testing Completed</h3>
              <p style="font-size:12px;color:var(--text-muted);">7 Days 14 Hours Remaining</p>
            </div>

            <div class="tracker-stats-box">
              <div class="stat-item">
                <span class="stat-lbl">Active Testers</span>
                <span class="stat-num" style="color:var(--success);">16 / 14</span>
              </div>
              <div class="stat-item">
                <span class="stat-lbl">Dropout Buffer</span>
                <span class="stat-num">+2 Standby</span>
              </div>
              <div class="stat-item">
                <span class="stat-lbl">Compliance Score</span>
                <span class="stat-num">100%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 2: Interactive 14-Day Calendar Heatmap & Bar Chart (36%) -->
        <div class="tracker-col">
          <div class="web-card">
            <div class="web-card-header">
              <h3 class="card-title">14-Day Verification Heatmap</h3>
              <span style="font-size:12px;color:var(--success);font-weight:600;"><i class="fa-solid fa-circle-check"></i> Days 1-7 Verified</span>
            </div>

            <div class="heatmap-calendar-desktop">
              ${Array.from({ length: 14 }, (_, i) => {
                const dayNum = i + 1;
                const isCompleted = dayNum < app.currentDay;
                const isActive = dayNum === app.currentDay;
                return `
                  <div class="day-box-desktop ${isCompleted ? 'completed' : (isActive ? 'active-day' : 'future')}" onclick="inspectDay(${dayNum})">
                    <div class="day-top-row">
                      <span class="day-num-badge">Day ${dayNum}</span>
                      <span class="day-sessions">${isCompleted ? '16/16' : (isActive ? '16/16' : '0/14')}</span>
                    </div>
                    <div class="day-status-indicator">
                      ${isCompleted ? '<i class="fa-solid fa-circle-check"></i> Passed' : (isActive ? '<i class="fa-solid fa-spinner fa-spin"></i> In Progress' : '<i class="fa-solid fa-clock"></i> Scheduled')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Daily Pings Bar Chart Visualization -->
            <div class="pings-chart-wrapper">
              <div style="font-size:13px;font-weight:700;margin-bottom:8px;">Daily Active Tester Sessions</div>
              <div class="bar-chart-row">
                ${app.dailyTesterPings.map((p, i) => `
                  <div class="chart-col">
                    <div class="chart-bar ${p > 0 ? 'active-bar' : 'empty-bar'}" style="height: ${p > 0 ? (p / 16) * 60 : 4}px;" title="Day ${i+1}: ${p} Sessions"></div>
                    <span class="chart-lbl">D${i+1}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Col 3: Live Active Testers Roster (36%) -->
        <div class="tracker-col">
          <div class="web-card">
            <div class="web-card-header">
              <div class="card-header-left">
                <h3 class="card-title">Assigned Testers (16)</h3>
                <span class="badge-status-live">16 Active</span>
              </div>
              <input type="text" placeholder="Filter testers..." class="table-search-input">
            </div>

            <div class="desktop-roster-table">
              ${app.testers.map(t => `
                <div class="roster-row">
                  <img src="${t.avatar}" class="roster-avatar" alt="${t.name}">
                  <div class="roster-info">
                    <div class="roster-name">${t.name}</div>
                    <div class="roster-device"><i class="fa-brands fa-android" style="color:var(--playstore-green);"></i> ${t.device} (${t.os})</div>
                  </div>
                  <div class="roster-stats">
                    <span class="streak-tag">${t.streak}</span>
                    <span class="ping-time">${t.lastPing}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ==============================================================================
// 4. DESKTOP TESTER HUB
// ==============================================================================
function getDesktopTesterHubHTML() {
  return `
    <div class="web-page-wrapper">
      <div class="web-page-header">
        <div>
          <h1 class="web-title">Android Tester Community Hub</h1>
          <p class="web-subtitle">Discover exciting beta apps, test for 2 minutes daily, and earn Google Play credits.</p>
        </div>
        <div class="header-actions">
          <div class="wallet-pill-desktop">
            <i class="fa-solid fa-coins" style="color:#FBBF24;"></i>
            <span>1,450 Points (₹145)</span>
            <button class="btn-redeem-mini" onclick="showToast('Redemption request sent!')">Redeem</button>
          </div>
        </div>
      </div>

      <!-- Daily Testing Mission Card -->
      <div class="web-card mission-hero-card">
        <div class="mission-left">
          <span class="badge-status-verifying"><i class="fa-solid fa-fire"></i> Today's Testing Mission</span>
          <h2 style="font-size:20px;font-weight:800;margin:8px 0 4px 0;">TaskFlow Pro - AI Planner (Day 7 of 14)</h2>
          <p style="font-size:13px;color:var(--text-muted);max-width:550px;">Keep the app open and test features for 2 minutes today to maintain your 7-day testing streak.</p>
          
          <div class="mission-actions">
            ${!STATE.isTestingActive ? `
              <button class="btn-primary" onclick="startDailyTestTimer()">
                <i class="fa-solid fa-play"></i> Launch App & Start 2-Min Timer
              </button>
            ` : `
              <button class="btn-primary" style="background:var(--warning);" onclick="pauseDailyTestTimer()">
                <i class="fa-solid fa-pause"></i> Pause Timer
              </button>
            `}
            <button class="btn-secondary" onclick="showFeedbackSheet()">
              <i class="fa-solid fa-bug"></i> Submit Bug Feedback (+100 Pts)
            </button>
          </div>
        </div>

        <div class="mission-right">
          <div class="mission-timer-box">
            <span class="timer-tag">Session Remaining</span>
            <div class="timer-countdown" id="timer-display">${formatSeconds(STATE.timerSecondsRemaining)}</div>
            <span class="streak-reward-tag">+50 Points upon completion</span>
          </div>
        </div>
      </div>

      <!-- Explore Apps Grid -->
      <div style="margin-top:24px;">
        <div class="section-header">
          <h3 class="section-title">Explore New Apps Needing Testers</h3>
          <span style="font-size:13px;color:var(--text-muted);">2 Open Campaigns</span>
        </div>

        <div class="web-apps-grid">
          ${MOCK_DATA.testerAvailableApps.map(app => `
            <div class="web-card app-explore-card">
              <div class="explore-top">
                <img src="${app.icon}" class="web-app-icon" alt="${app.name}">
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:16px;">${app.name}</div>
                  <div style="font-size:12px;color:var(--text-muted);">${app.developer} • ${app.category}</div>
                </div>
                <span class="points-badge">+${app.pointsReward} Pts</span>
              </div>
              <p style="font-size:13px;color:var(--text-muted);line-height:1.5;">${app.description}</p>
              
              <div class="explore-footer">
                <span style="font-size:12px;color:var(--text-main);font-weight:600;"><i class="fa-solid fa-users"></i> ${app.enrolledTesters}/${app.requiredTesters} Testers Enrolled</span>
                <button class="btn-playstore" onclick="showToast('Opting in on Google Play Beta...')">
                  <i class="fa-brands fa-google-play"></i> Join Beta on Play Store
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==============================================================================
// 5. DESKTOP ONBOARDING (Split Hero Layout)
// ==============================================================================
function getDesktopOnboardingHTML() {
  const slides = STATE.activeRole === 'tester' ? MOCK_DATA.onboardingSlides.tester : MOCK_DATA.onboardingSlides.publisher;
  const currentSlide = slides[STATE.onboardingIndex] || slides[0];
  const isLast = STATE.onboardingIndex === slides.length - 1;

  return `
    <div class="web-page-wrapper">
      <div class="web-card onboarding-split-card">
        <!-- Left Column: Visual / Interactive Demo -->
        <div class="onboard-left-hero">
          <div class="hero-art-container" style="width:240px;height:240px;">
            <i class="fa-solid ${currentSlide.icon} hero-art-icon" style="font-size:84px;"></i>
          </div>
          <div class="hero-metric-tag" style="font-size:14px;padding:10px 20px;">
            <i class="fa-solid fa-circle-check"></i> ${currentSlide.metric}
          </div>
        </div>

        <!-- Right Column: Narrative & Next Controls -->
        <div class="onboard-right-content">
          <div>
            <span class="hero-pill-badge"><i class="fa-solid ${currentSlide.icon}"></i> ${currentSlide.badge}</span>
            <h1 class="hero-title" style="font-size:32px;margin:12px 0;">${currentSlide.title}</h1>
            <p class="hero-desc" style="font-size:16px;max-width:540px;line-height:1.6;">${currentSlide.description}</p>
          </div>

          <div style="margin-top:30px;">
            <div class="carousel-indicators" style="justify-content:flex-start;margin-bottom:20px;">
              ${slides.map((_, i) => `
                <div class="indicator-dot ${i === STATE.onboardingIndex ? 'active' : ''}" onclick="setOnboardingIndex(${i})"></div>
              `).join('')}
            </div>

            <div style="display:flex;gap:12px;max-width:360px;">
              ${isLast ? `
                <button class="btn-primary" onclick="navigateTo('${STATE.activeRole === 'tester' ? 'tester_hub' : 'dashboard'}')">
                  Go to Dashboard <i class="fa-solid fa-arrow-right"></i>
                </button>
              ` : `
                <button class="btn-primary" onclick="nextOnboardingSlide()">
                  Next Step <i class="fa-solid fa-arrow-right"></i>
                </button>
              `}
              <button class="btn-secondary" onclick="navigateTo('dashboard')">Skip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==============================================================================
// 6. DESKTOP ADMIN PANEL
// ==============================================================================
function getDesktopAdminHTML() {
  const pending = MOCK_DATA.applicationsUnderProcess[0];

  return `
    <div class="web-page-wrapper">
      <div class="web-page-header">
        <div>
          <h1 class="web-title">Admin Operations & Verification Queue</h1>
          <p class="web-subtitle">Review incoming closed test tracks, verify Google Group permissions, and manage settlements.</p>
        </div>
        <span class="badge-status-live"><i class="fa-solid fa-server"></i> FastAPI / Supabase Online</span>
      </div>

      <div class="web-card">
        <div class="web-card-header">
          <h3 class="card-title">Pending Applications Awaiting Access Clearance (1)</h3>
        </div>

        <div class="admin-table-row">
          <img src="${pending.icon}" class="web-app-icon" alt="${pending.name}">
          <div style="flex:1;">
            <div style="font-weight:700;font-size:16px;">${pending.name}</div>
            <div class="pkg-name-text">${pending.packageName}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Submitted by: developer@fitsync.ai</div>
          </div>
          <div class="admin-checks">
            <span class="metric-pill"><i class="fa-solid fa-check" style="color:var(--success);"></i> HTTP 200 Link OK</span>
            <span class="metric-pill"><i class="fa-solid fa-check" style="color:var(--success);"></i> Group Access Granted</span>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn-primary" style="background:var(--success);" onclick="showToast('Application Approved! Razorpay invoice sent.')">
              <i class="fa-solid fa-check"></i> Approve
            </button>
            <button class="btn-secondary" style="color:var(--danger);" onclick="showToast('Application rejected with feedback.')">
              <i class="fa-solid fa-xmark"></i> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==============================================================================
// MOBILE VIEW RENDERER (Clean Android Pixel 8 Shell Layout)
// ==============================================================================
function renderMobileLayout(root) {
  switch (STATE.activeView) {
    case 'onboarding':
      renderOnboardingScreen(root);
      break;
    case 'dashboard':
      renderMobilePublisherDashboard(root);
      break;
    case 'wizard':
      renderSubmissionWizard(root);
      break;
    case 'tracker':
      render14DayTracker(root);
      break;
    case 'tester_hub':
      renderTesterHub(root);
      break;
    case 'admin':
      renderAdminPanel(root);
      break;
    default:
      renderMobilePublisherDashboard(root);
  }
}

function renderMobilePublisherDashboard(root) {
  const app = MOCK_DATA.liveApplications[0];
  const pending = MOCK_DATA.applicationsUnderProcess[0];

  root.innerHTML = `
    <div class="mobile-screen-wrapper">
      <header class="app-header">
        <div class="app-logo">
          <div class="logo-badge" style="width:28px;height:28px;font-size:13px;"><i class="fa-solid fa-play"></i></div>
          <span>APN Tester</span>
        </div>
        <div class="user-badge-profile">
          <img src="${MOCK_DATA.currentUser.avatar}" alt="Avatar">
          <span class="user-name">${MOCK_DATA.currentUser.name}</span>
        </div>
      </header>

      <div class="mobile-scroll-content dashboard-view">
      <div class="metric-grid">
        <div class="metric-card success">
          <span class="metric-label">Active Testing Track</span>
          <span class="metric-val">1 App Live</span>
          <span class="metric-sub"><i class="fa-solid fa-arrow-trend-up"></i> Day 7 of 14 (50%)</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Enrolled Testers</span>
          <span class="metric-val">16 Active</span>
          <span class="metric-sub"><i class="fa-solid fa-shield-check"></i> 100% Quota Met</span>
        </div>
      </div>

      <div>
        <div class="section-header">
          <h3 class="section-title">Live Testing Track</h3>
          <button class="btn-secondary" style="padding:6px 12px;font-size:12px;" onclick="navigateTo('wizard')">
            <i class="fa-solid fa-plus"></i> Submit App
          </button>
        </div>

        <div class="app-card">
          <div class="app-card-top">
            <img src="${app.icon}" class="app-icon-img" alt="${app.name}">
            <div class="app-info-col">
              <div class="app-name-title">${app.name}</div>
              <div class="app-pkg-sub">${app.packageName}</div>
            </div>
            <span class="status-badge live"><i class="fa-solid fa-circle-dot"></i> Live</span>
          </div>

          <div class="progress-container">
            <div class="progress-header">
              <span>Day ${app.currentDay} of ${app.targetDays} (7 Days Left)</span>
              <span style="color:var(--success); font-weight:700;">16/14 Active</span>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: ${(app.currentDay / app.targetDays) * 100}%;"></div>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <button class="btn-primary" style="padding:12px 16px; font-size:13px;" onclick="navigateTo('tracker')">
              <i class="fa-solid fa-chart-line"></i> 14-Day Monitor
            </button>
            <button class="btn-secondary" style="padding:12px 14px; font-size:13px;" onclick="showFeedbackSheet()">
              <i class="fa-solid fa-comment-dots"></i> Feedback (3)
            </button>
          </div>
        </div>
      </div>

      ${pending ? `
        <div>
          <div class="section-header">
            <h3 class="section-title">Under Process</h3>
            <span class="status-badge verifying"><i class="fa-solid fa-arrows-rotate fa-spin"></i> Verifying</span>
          </div>

          <div class="app-card" style="border-style:dashed;">
            <div class="app-card-top">
              <img src="${pending.icon}" class="app-icon-img" alt="${pending.name}">
              <div class="app-info-col">
                <div class="app-name-title">${pending.name}</div>
                <div class="app-pkg-sub">${pending.packageName}</div>
                <div style="font-size:11px;color:var(--warning);margin-top:4px;">
                  <i class="fa-solid fa-clock"></i> ${pending.verificationNotes}
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
      </div>

      <nav class="mobile-bottom-nav">
        <div class="nav-item active" onclick="navigateTo('dashboard')">
          <i class="fa-solid fa-house"></i>
          <span>Home</span>
        </div>
        <div class="nav-item" onclick="navigateTo('wizard')">
          <i class="fa-solid fa-circle-plus"></i>
          <span>Submit</span>
        </div>
        <div class="nav-item" onclick="navigateTo('tracker')">
          <i class="fa-solid fa-chart-pie"></i>
          <span>14-Day</span>
        </div>
        <div class="nav-item" onclick="navigateTo('onboarding')">
          <i class="fa-solid fa-circle-question"></i>
          <span>Guide</span>
        </div>
      </nav>
    </div>
  `;
}

// Mobile Shared Renderers
function renderOnboardingScreen(root) {
  const slides = STATE.activeRole === 'tester' ? MOCK_DATA.onboardingSlides.tester : MOCK_DATA.onboardingSlides.publisher;
  const currentSlide = slides[STATE.onboardingIndex] || slides[0];
  const isLast = STATE.onboardingIndex === slides.length - 1;

  root.innerHTML = `
    <div class="onboarding-screen">
      <div class="onboard-top-controls">
        <span class="hero-pill-badge"><i class="fa-solid ${currentSlide.icon}"></i> ${currentSlide.badge}</span>
        <button class="skip-btn" onclick="navigateTo('${STATE.activeRole === 'tester' ? 'tester_hub' : 'dashboard'}')">Skip</button>
      </div>

      <div class="carousel-viewport">
        <div class="onboarding-card">
          <div class="hero-art-container">
            <i class="fa-solid ${currentSlide.icon} hero-art-icon"></i>
          </div>
          <h2 class="hero-title">${currentSlide.title}</h2>
          <p class="hero-desc">${currentSlide.description}</p>
          <div class="hero-metric-tag"><i class="fa-solid fa-circle-check"></i> ${currentSlide.metric}</div>
        </div>
      </div>

      <div>
        <div class="carousel-indicators">
          ${slides.map((_, i) => `
            <div class="indicator-dot ${i === STATE.onboardingIndex ? 'active' : ''}" onclick="setOnboardingIndex(${i})"></div>
          `).join('')}
        </div>

        ${isLast ? `
          <button class="btn-primary" onclick="navigateTo('${STATE.activeRole === 'tester' ? 'tester_hub' : 'dashboard'}')">
            Get Started Now <i class="fa-solid fa-arrow-right"></i>
          </button>
        ` : `
          <button class="btn-primary" onclick="nextOnboardingSlide()">
            Continue <i class="fa-solid fa-arrow-right"></i>
          </button>
        `}
      </div>
    </div>
  `;
}

function renderSubmissionWizard(root) {
  root.innerHTML = `
    <header class="app-header">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="btn-secondary" style="padding:6px 10px;border-radius:50%;" onclick="navigateTo('dashboard')">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <span style="font-weight:700;font-size:16px;">Submit App for Testing</span>
      </div>
      <span style="font-size:12px;color:var(--text-muted);">Step ${STATE.wizardStep} of 5</span>
    </header>

    <div class="wizard-view">
      <div class="wizard-stepper">
        <div class="step-node ${STATE.wizardStep >= 1 ? (STATE.wizardStep > 1 ? 'completed' : 'active') : ''}">
          <div class="step-circle">${STATE.wizardStep > 1 ? '✓' : '1'}</div>
          <span class="step-title-label">Details</span>
        </div>
        <div class="step-node ${STATE.wizardStep >= 2 ? (STATE.wizardStep > 2 ? 'completed' : 'active') : ''}">
          <div class="step-circle">${STATE.wizardStep > 2 ? '✓' : '2'}</div>
          <span class="step-title-label">Group</span>
        </div>
        <div class="step-node ${STATE.wizardStep >= 3 ? (STATE.wizardStep > 3 ? 'completed' : 'active') : ''}">
          <div class="step-circle">${STATE.wizardStep > 3 ? '✓' : '3'}</div>
          <span class="step-title-label">URLs</span>
        </div>
        <div class="step-node ${STATE.wizardStep >= 4 ? (STATE.wizardStep > 4 ? 'completed' : 'active') : ''}">
          <div class="step-circle">${STATE.wizardStep > 4 ? '✓' : '4'}</div>
          <span class="step-title-label">Verify</span>
        </div>
        <div class="step-node ${STATE.wizardStep >= 5 ? 'active' : ''}">
          <div class="step-circle">5</div>
          <span class="step-title-label">Launch</span>
        </div>
      </div>

      <div class="wizard-card">
        ${getWizardStepHTML()}
      </div>

      <div style="display:flex;gap:12px;">
        ${STATE.wizardStep > 1 ? `
          <button class="btn-secondary" style="flex:1;" onclick="prevWizardStep()">
            <i class="fa-solid fa-arrow-left"></i> Back
          </button>
        ` : ''}
        
        ${STATE.wizardStep < 5 ? `
          <button class="btn-primary" style="flex:2;" onclick="nextWizardStep()">
            ${STATE.wizardStep === 4 ? 'Confirm & Proceed' : 'Continue'} <i class="fa-solid fa-arrow-right"></i>
          </button>
        ` : `
          <button class="btn-primary" style="flex:2;background:linear-gradient(135deg,#01875F,#0B6647);" onclick="openRazorpayCheckout()">
            <i class="fa-solid fa-credit-card"></i> Pay ₹1,499 with Razorpay
          </button>
        `}
      </div>
    </div>
  `;
}

function render14DayTracker(root) {
  const isMobile = STATE.deviceMode === 'mobile';
  const app = MOCK_DATA.liveApplications[0];

  root.innerHTML = `
    <div class="mobile-screen-wrapper">
      <header class="app-header">
        <div style="display:flex;align-items:center;gap:12px;">
          <button class="btn-secondary" style="padding:6px 10px;border-radius:50%;" onclick="navigateTo('dashboard')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <div style="font-weight:700;font-size:15px;">${app.name}</div>
            <div style="font-size:11px;color:var(--text-muted);">14-Day Compliance Monitor</div>
          </div>
        </div>
        <button class="btn-playstore" style="padding:6px 12px;font-size:12px;" onclick="showExportCertificateModal()">
          <i class="fa-solid fa-file-arrow-down"></i> Export
        </button>
      </header>

      <div class="mobile-scroll-content tracker-view">
      <div class="gauge-hero">
        <div class="radial-progress-wrapper">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12"></circle>
            <circle cx="70" cy="70" r="58" fill="none" stroke="url(#primaryGrad)" stroke-width="12"
              stroke-dasharray="364.4" stroke-dashoffset="${364.4 - (364.4 * (app.currentDay / 14))}" stroke-linecap="round"></circle>
            <defs>
              <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4F46E5" />
                <stop offset="100%" stop-color="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <div class="radial-center-text">
            <span class="radial-day-big">Day ${app.currentDay}</span>
            <span class="radial-day-sub">of 14 Days</span>
          </div>
        </div>

        <div style="font-size:13px;font-weight:600;color:var(--text-main);">
          <i class="fa-solid fa-circle-check" style="color:var(--success);"></i> 100% Daily Quota Maintained
        </div>
        <div style="font-size:12px;color:var(--text-muted);">7 Days Remaining until Production Access</div>
      </div>

      <div class="app-card">
        <div class="section-header">
          <h4 style="font-size:14px;font-weight:700;">14-Day Heatmap</h4>
          <span style="font-size:11px;color:var(--success);font-weight:600;">7 Days Verified</span>
        </div>

        <div class="heatmap-calendar">
          ${Array.from({ length: 14 }, (_, i) => {
            const dayNum = i + 1;
            const isCompleted = dayNum < app.currentDay;
            const isActive = dayNum === app.currentDay;
            return `
              <div class="day-box ${isCompleted ? 'completed' : (isActive ? 'active-day' : '')}" onclick="inspectDay(${dayNum})">
                <span class="day-num">D${dayNum}</span>
                <span class="day-status-icon">
                  ${isCompleted ? '✓' : (isActive ? '●' : '—')}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div>
        <div class="section-header">
          <h4 style="font-size:15px;font-weight:700;">Assigned Testers (16 Total)</h4>
          <span class="status-badge live">16/14 Online</span>
        </div>

        <div class="roster-list">
          ${app.testers.slice(0, 5).map(t => `
            <div class="tester-item">
              <img src="${t.avatar}" class="tester-avatar" alt="${t.name}">
              <div class="tester-meta">
                <div class="tester-name">${t.name}</div>
                <div class="tester-device"><i class="fa-brands fa-android" style="color:var(--playstore-green);"></i> ${t.device}</div>
              </div>
              <div style="text-align:right;">
                <span class="status-badge live" style="font-size:10px;">${t.streak}</span>
                <div style="font-size:10px;color:var(--text-muted);">${t.lastPing}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderTesterHub(root) {
  root.innerHTML = `
    <div class="mobile-screen-wrapper">
      <header class="app-header">
        <div class="app-logo">
          <div class="logo-badge" style="background:var(--playstore-green);"><i class="fa-solid fa-fire"></i></div>
          <span>APN Tester Hub</span>
        </div>
        <div class="user-badge-profile">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80" alt="Avatar">
          <span class="user-name">Alex Rivera</span>
        </div>
      </header>

      <div class="mobile-scroll-content tester-hub-view">
      <div class="wallet-card">
        <div>
          <div style="font-size:12px;color:#C7D2FE;font-weight:600;">Reward Wallet</div>
          <div class="wallet-points">1,450 Pts</div>
          <div style="font-size:11px;color:#A5B4FC;margin-top:4px;">🔥 7 Days Streak Active</div>
        </div>
        <button class="btn-secondary" style="background:rgba(255,255,255,0.15);border:none;color:white;" onclick="showToast('Redeem request submitted!')">
          Redeem
        </button>
      </div>

      <div class="daily-timer-box">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="status-badge verifying"><i class="fa-solid fa-stopwatch"></i> Daily Task</span>
          <span style="font-size:13px;font-weight:700;">Test: TaskFlow Pro</span>
        </div>

        <div class="timer-countdown" id="timer-display">
          ${formatSeconds(STATE.timerSecondsRemaining)}
        </div>
        <div style="font-size:12px;color:var(--text-muted);">Spend at least 2 minutes inside the app</div>

        <div style="display:flex;gap:10px;width:100%;">
          ${!STATE.isTestingActive ? `
            <button class="btn-primary" style="flex:1;" onclick="startDailyTestTimer()">
              <i class="fa-solid fa-play"></i> Launch Test
            </button>
          ` : `
            <button class="btn-primary" style="flex:1;background:var(--warning);" onclick="pauseDailyTestTimer()">
              <i class="fa-solid fa-pause"></i> Pause
            </button>
          `}
          <button class="btn-secondary" onclick="showFeedbackSheet()">
            <i class="fa-solid fa-bug"></i> Feedback
          </button>
        </div>
      </div>

      <div>
        <div class="section-header">
          <h3 class="section-title">Explore Beta Apps</h3>
          <span style="font-size:12px;color:var(--text-muted);">2 Open</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          ${MOCK_DATA.testerAvailableApps.map(app => `
            <div class="app-card">
              <div class="app-card-top">
                <img src="${app.icon}" class="app-icon-img" alt="${app.name}">
                <div class="app-info-col">
                  <div class="app-name-title">${app.name}</div>
                  <div style="font-size:11px;color:var(--text-muted);">${app.category}</div>
                </div>
                <span class="status-badge live">+${app.pointsReward} Pts</span>
              </div>
              <p style="font-size:12px;color:var(--text-muted);">${app.description}</p>
              <button class="btn-playstore" onclick="showToast('Opting in on Play Store...')">
                <i class="fa-brands fa-google-play"></i> Join Beta (${app.enrolledTesters}/${app.requiredTesters})
              </button>
            </div>
          `).join('')}
        </div>
      </div>
      </div>

      <nav class="mobile-bottom-nav">
        <div class="nav-item active" onclick="navigateTo('tester_hub')">
          <i class="fa-solid fa-gamepad"></i>
          <span>Tester</span>
        </div>
        <div class="nav-item" onclick="navigateTo('onboarding')">
          <i class="fa-solid fa-circle-question"></i>
          <span>Guide</span>
        </div>
      </nav>
    </div>
  `;
}

function renderAdminPanel(root) {
  root.innerHTML = `
    <header class="app-header">
      <div class="app-logo">
        <div class="logo-badge" style="background:#DC2626;"><i class="fa-solid fa-user-shield"></i></div>
        <span>APN Admin Command</span>
      </div>
      <span class="status-badge live"><i class="fa-solid fa-server"></i> Online</span>
    </header>

    <div class="dashboard-view">
      <div class="section-header">
        <h3 class="section-title">Pending Verification</h3>
      </div>

      <div class="app-card">
        <div class="app-card-top">
          <img src="${MOCK_DATA.applicationsUnderProcess[0].icon}" class="app-icon-img" alt="FitSync">
          <div class="app-info-col">
            <div class="app-name-title">${MOCK_DATA.applicationsUnderProcess[0].name}</div>
            <div class="app-pkg-sub">${MOCK_DATA.applicationsUnderProcess[0].packageName}</div>
          </div>
        </div>

        <div style="background:var(--bg-input);padding:12px;border-radius:var(--radius-md);font-size:11px;">
          <div style="color:var(--success);">Group Access Check: GRANTED</div>
        </div>

        <div style="display:flex;gap:10px;">
          <button class="btn-primary" style="flex:1;background:var(--success);" onclick="showToast('App Approved!')">
            <i class="fa-solid fa-check"></i> Approve
          </button>
          <button class="btn-secondary" style="color:var(--danger);" onclick="showToast('App Rejected.')">
            <i class="fa-solid fa-xmark"></i> Reject
          </button>
        </div>
      </div>
    </div>
  `;
}

// Wizard Steps
function getWizardStepHTML() {
  switch (STATE.wizardStep) {
    case 1:
      return `
        <h3 style="font-size:18px;font-weight:700;">Step 1: App Metadata</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Enter your app information as registered in Google Play Console.</p>

        <div class="form-grid-2col">
          <div class="form-group">
            <label class="form-label">App Title *</label>
            <input type="text" class="form-input" id="wiz-appname" value="${STATE.wizardData.appName}" oninput="updateLivePreview()">
          </div>

          <div class="form-group">
            <label class="form-label">Category *</label>
            <select class="form-select" id="wiz-cat" onchange="updateLivePreview()">
              <option value="Productivity" ${STATE.wizardData.category === 'Productivity' ? 'selected' : ''}>Productivity</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Tools">Tools</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-top:12px;">
          <label class="form-label">Application Package ID *</label>
          <input type="text" class="form-input" id="wiz-pkg" value="${STATE.wizardData.packageName}" oninput="updateLivePreview()">
        </div>
      `;
    
    case 2:
      return `
        <h3 style="font-size:18px;font-weight:700;">Step 2: Add Google Group to Play Console</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Grant our testing community access to your Google Play Closed track.</p>

        <div class="group-copy-box">
          <span style="font-size:13px;font-weight:700;color:var(--text-main);">APN Tester Official Group Email:</span>
          <div class="copy-row">
            <span class="copy-email-text">${MOCK_DATA.googleGroupEmail}</span>
            <button class="btn-copy" onclick="copyGroupEmail()">
              <i class="fa-solid fa-copy"></i> Copy Email
            </button>
          </div>
          <span style="font-size:12px;color:var(--text-muted);"><i class="fa-solid fa-circle-info"></i> Paste in: Play Console > Testing > Closed testing > Testers > Google Groups</span>
        </div>
      `;

    case 3:
      return `
        <h3 style="font-size:18px;font-weight:700;">Step 3: Play Store Join Links</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Paste the generated closed testing URLs from Google Play Console.</p>

        <div class="form-group">
          <label class="form-label">Play Store Web Join Link *</label>
          <input type="text" class="form-input" id="wiz-weburl" value="${STATE.wizardData.webUrl}">
        </div>

        <div class="form-group" style="margin-top:12px;">
          <label class="form-label">Play Store Android Opt-in Link *</label>
          <input type="text" class="form-input" id="wiz-androidurl" value="${STATE.wizardData.androidUrl}">
        </div>
      `;

    case 4:
      return `
        <h3 style="font-size:18px;font-weight:700;">Step 4: Automated Verification</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Validating Google Group permissions and Play Store track reachability.</p>

        <div style="background:var(--bg-input);padding:18px;border-radius:var(--radius-lg);display:flex;flex-direction:column;gap:12px;border:1px solid var(--border-main);">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:13px;font-weight:600;">Package Name Validation</span>
            <span style="color:var(--success);font-size:12px;font-weight:700;"><i class="fa-solid fa-circle-check"></i> Passed</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:13px;font-weight:600;">Play Store Web URL Reachable</span>
            <span style="color:var(--success);font-size:12px;font-weight:700;"><i class="fa-solid fa-circle-check"></i> HTTP 200 OK</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:13px;font-weight:600;">Google Group Member Access</span>
            <span style="color:var(--success);font-size:12px;font-weight:700;"><i class="fa-solid fa-circle-check"></i> 16 Testers Verified</span>
          </div>
        </div>

        <div class="badge-status-live" style="margin-top:14px;padding:10px;justify-content:center;font-size:13px;">
          <i class="fa-solid fa-shield-check"></i> All Checks Passed - Ready for Live Testing!
        </div>
      `;

    case 5:
      return `
        <h3 style="font-size:18px;font-weight:700;">Step 5: Activate 14-Day Campaign</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Deploy 16 dedicated daily-active Android testers with full compliance guarantee.</p>

        <div style="background:linear-gradient(135deg,rgba(79,70,229,0.15) 0%,rgba(6,182,212,0.1) 100%);border:1px solid var(--primary);border-radius:var(--radius-lg);padding:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <div>
              <div style="font-weight:800;font-size:18px;">14-Day 14-Tester Guarantee Package</div>
              <div style="font-size:12px;color:var(--text-muted);">Includes 14 required + 2 safety fallback testers</div>
            </div>
            <div style="font-size:26px;font-weight:800;color:var(--primary-light);">₹1,499</div>
          </div>
          <ul style="font-size:13px;color:var(--text-main);line-height:1.8;padding-left:20px;">
            <li>14 Verified Real Android Testers guaranteed</li>
            <li>+2 Free Standby Testers for zero dropout risk</li>
            <li>Full 14 continuous testing days compliance</li>
            <li>Daily active telemetry & bug feedback dashboard</li>
            <li>Google Play Production Compliance Certificate</li>
          </ul>
        </div>
      `;
  }
}

function updateLivePreview() {
  const name = document.getElementById('wiz-appname')?.value || 'New App';
  const pkg = document.getElementById('wiz-pkg')?.value || 'com.app';
  const cat = document.getElementById('wiz-cat')?.value || 'Productivity';

  STATE.wizardData.appName = name;
  STATE.wizardData.packageName = pkg;
  STATE.wizardData.category = cat;

  const tEl = document.getElementById('prev-title');
  const pEl = document.getElementById('prev-pkg');
  const cEl = document.getElementById('prev-cat');

  if (tEl) tEl.innerText = name;
  if (pEl) pEl.innerText = pkg;
  if (cEl) cEl.innerText = cat;
}

function nextWizardStep() {
  if (STATE.wizardStep < 5) {
    STATE.wizardStep++;
    renderApp();
  }
}

function prevWizardStep() {
  if (STATE.wizardStep > 1) {
    STATE.wizardStep--;
    renderApp();
  }
}

function nextOnboardingSlide() {
  const slides = STATE.activeRole === 'tester' ? MOCK_DATA.onboardingSlides.tester : MOCK_DATA.onboardingSlides.publisher;
  if (STATE.onboardingIndex < slides.length - 1) {
    STATE.onboardingIndex++;
    renderApp();
  }
}

function setOnboardingIndex(idx) {
  STATE.onboardingIndex = idx;
  renderApp();
}

function copyGroupEmail() {
  navigator.clipboard?.writeText(MOCK_DATA.googleGroupEmail);
  showToast('Copied testers-group@apntester.com to clipboard!');
}

function inspectDay(dayNum) {
  showToast(`Day ${dayNum} Inspection: 16 verified test sessions logged.`);
}

function startDailyTestTimer() {
  STATE.isTestingActive = true;
  showToast('Launching TaskFlow Pro... Timer started!');
  renderApp();

  clearInterval(STATE.timerInterval);
  STATE.timerInterval = setInterval(() => {
    if (STATE.timerSecondsRemaining > 0) {
      STATE.timerSecondsRemaining--;
      const display = document.getElementById('timer-display');
      if (display) display.innerText = formatSeconds(STATE.timerSecondsRemaining);
    } else {
      clearInterval(STATE.timerInterval);
      STATE.isTestingActive = false;
      showToast('🎉 Daily test completed! +50 Points awarded to your wallet!');
      renderApp();
    }
  }, 1000);
}

function pauseDailyTestTimer() {
  STATE.isTestingActive = false;
  clearInterval(STATE.timerInterval);
  showToast('Test paused.');
  renderApp();
}

function formatSeconds(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Razorpay Modal & Toasts
function openRazorpayCheckout() {
  const modal = document.createElement('div');
  modal.id = 'razorpay-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="razorpay-sheet">
      <div class="razorpay-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="background:#0052FF;padding:6px;border-radius:6px;font-weight:800;font-size:13px;">R</div>
          <span style="font-weight:700;font-size:15px;">Razorpay Trusted Gateway</span>
        </div>
        <button onclick="closeModal('razorpay-modal')" style="background:none;border:none;color:white;cursor:pointer;font-size:16px;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="razorpay-body">
        <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.06);padding:14px;border-radius:12px;">
          <div>
            <div style="font-size:12px;color:#93C5FD;">Order #ORD-APN-8942</div>
            <div style="font-weight:700;font-size:14px;">14-Day 14-Tester Guarantee</div>
          </div>
          <div style="font-size:22px;font-weight:800;color:#60A5FA;">₹1,499</div>
        </div>

        <div style="font-size:13px;font-weight:700;">Select Payment Mode:</div>

        <div class="payment-method-item" onclick="simulatePaymentSuccess()">
          <i class="fa-brands fa-google-pay" style="font-size:24px;color:#4285F4;"></i>
          <div style="flex:1;">
            <div style="font-weight:600;font-size:13px;">UPI (Google Pay / PhonePe / Paytm)</div>
            <div style="font-size:11px;color:#94A3B8;">Instant verification & live launch</div>
          </div>
          <i class="fa-solid fa-chevron-right" style="font-size:12px;color:#64748B;"></i>
        </div>

        <div class="payment-method-item" onclick="simulatePaymentSuccess()">
          <i class="fa-solid fa-credit-card" style="font-size:20px;color:#38BDF8;"></i>
          <div style="flex:1;">
            <div style="font-weight:600;font-size:13px;">Credit / Debit Cards / NetBanking</div>
            <div style="font-size:11px;color:#94A3B8;">Visa, MasterCard, RuPay, HDFC, SBI</div>
          </div>
          <i class="fa-solid fa-chevron-right" style="font-size:12px;color:#64748B;"></i>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function simulatePaymentSuccess() {
  closeModal('razorpay-modal');
  showToast('💳 Payment ₹1,499 captured! App is now LIVE with 16 testers!');
  STATE.wizardStep = 1;
  navigateTo('tracker');
}

function showFeedbackSheet() {
  const modal = document.createElement('div');
  modal.id = 'feedback-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="razorpay-sheet" style="background:var(--bg-card);color:var(--text-main);">
      <div class="razorpay-header" style="background:var(--bg-card-subtle);">
        <span style="font-weight:700;">Tester Feedback & Bug Logs</span>
        <button onclick="closeModal('feedback-modal')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="razorpay-body">
        ${MOCK_DATA.liveApplications[0].feedbackList.map(f => `
          <div style="background:var(--bg-input);padding:12px;border-radius:var(--radius-md);border:1px solid var(--border-main);">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-weight:700;font-size:13px;">${f.user}</span>
              <span style="color:#F59E0B;font-size:11px;">${'★'.repeat(f.rating)}</span>
            </div>
            <p style="font-size:12px;color:var(--text-muted);line-height:1.4;">${f.text}</p>
            <div style="font-size:10px;color:var(--text-dim);margin-top:6px;">${f.time} • <span style="color:var(--primary);">${f.badge}</span></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showExportCertificateModal() {
  showToast('📄 Generated Google Play Compliance Certificate (PDF) downloaded!');
}

function showTroubleshootModal() {
  showToast('Troubleshoot: Ensure Google Group testers-group@apntester.com is added under Play Console Closed track.');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.remove();
}

function showToast(msg) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--success);"></i> ${msg}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
