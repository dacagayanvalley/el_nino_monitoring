// ═══════════════════════════════════════════════════════════════════
//  DA-RFO2 Monitoring System — Shared UI Utilities
// ═══════════════════════════════════════════════════════════════════

// ── Navigation config ─────────────────────────────────────────────
const APP_TITLE = 'iCAMMS - Integrated Climate Adaptation and Crisis Management Monitoring System (iCAMMS)';
const SYSTEM_OWNER = 'Department of Agriculture Regional Field Office 02 - PMED';
const APP_LOGO = 'assets/da-logo.png';

const NAV = [
  { group: 'Overview', items: [
    { label:'Executive Dashboard', href:'index.html',       icon:'grid' },
  ]},
  { group: 'Objectives', items: [
    { label:'SO1 – Planting & Mango', href:'objective1.html', icon:'seedling' },
    { label:'SO2 – Technologies',     href:'objective2.html', icon:'wrench' },
    { label:'SO3 – Biofert & BCAs',   href:'objective3.html', icon:'leaf' },
  ]},
  { group: 'Data Entry', items: [
    { label:'Municipality Validation', href:'municipalities.html', icon:'map' },
    { label:'Beneficiary Registry',   href:'beneficiaries.html', icon:'users' },
    { label:'Distribution Tracker',   href:'distributions.html', icon:'box' },
    { label:'Field Reports',          href:'fieldreports.html',  icon:'clipboard' },
    { label:'Pest Surveillance',      href:'pest.html',          icon:'bug' },
    { label:'Tech Monitoring',        href:'technology.html',    icon:'tool' },
  ]},
  { group: 'Analysis', items: [
    { label:'Map View',               href:'map.html',           icon:'map' },
    { label:'Issue Tracker',          href:'issues.html',        icon:'alert' },
  ]},
];

const ICONS = {
  grid:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  seedling:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V9M9 4C5 4 3 7 3 10c0 4 3.5 6 9 6"/><path d="M15 4c4 0 6 3 6 6 0 4-3.5 6-9 6"/></svg>`,
  wrench:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  leaf:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8C8 10 5.9 16.17 3.82 19.34c-.6.96.22 2.08 1.3 1.77C7.34 20.34 10 19 12 17c3.52-3.48 4-8 4-8s-2 8-6 10"/><path d="M17 8c1-1 2-5 3-7-2 0-5.5.5-8 3-5 5-5 13-5 13s5.52-1 10-9"/></svg>`,
  users:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  box:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>`,
  clipboard:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  bug:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2l1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z"/><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2M17.47 9C19.4 8.8 21 7.1 21 5"/><path d="M18 13h4M18.5 21c-1 1.5-3.4 2-6.5 2s-5.5-.5-6.5-2"/></svg>`,
  tool:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  map:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
  alert:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  edit:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  download:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  refresh:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  menu:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  moon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z"/></svg>`,
  sun:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
  cloud:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H7a5 5 0 1 1 1.2-9.85A7 7 0 0 1 21 12.5 3.5 3.5 0 0 1 17.5 19z"/></svg>`,
};

const AccessPolicy = {
  ACCOUNTS_KEY: 'darfo2_user_accounts',
  SESSION_KEY: 'darfo2_login_session',
  roles: {
    admin: 'Admin',
    executive: 'Executive View',
    officer: 'Report Officer',
    public: 'Public',
  },
  defaultAccounts: [
    { username: 'admin', password: 'admin123', displayName: 'System Administrator', role: 'admin' },
    { username: 'officer', password: 'officer123', displayName: 'Report Officer', role: 'officer' },
    { username: 'executive', password: 'view123', displayName: 'Executive Viewer', role: 'executive' },
    { username: 'public', password: 'public', displayName: 'Public Viewer', role: 'public' },
  ],
  accounts() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.ACCOUNTS_KEY) || '[]');
      return saved.length ? saved : this.defaultAccounts;
    } catch {
      return this.defaultAccounts;
    }
  },
  session() {
    try { return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null'); }
    catch { return null; }
  },
  isLoggedIn() { return !!this.session(); },
  currentRole() { return this.session()?.role || 'public'; },
  currentUser() { return this.session()?.displayName || this.roles[this.currentRole()] || 'Public Viewer'; },
  canWrite() { return ['admin', 'officer'].includes(this.currentRole()); },
  canAdmin() { return this.currentRole() === 'admin'; },
  isPublic() { return this.currentRole() === 'public'; },
  privateText(label = 'Withheld') { return this.isPublic() ? label : null; },
  personName(value, label = 'Beneficiary withheld') { return this.isPublic() ? label : (value || '—'); },
  identifier(value, label = 'Withheld') { return this.isPublic() ? label : (value || '—'); },
  narrative(value, label = 'Details withheld in Public view') { return this.isPublic() ? label : (value || '—'); },
  login(username, password) {
    const user = this.accounts().find(account =>
      account.username.toLowerCase() === String(username || '').trim().toLowerCase()
      && account.password === String(password || '')
    );
    if (!user) return false;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({
      username: user.username,
      displayName: user.displayName || user.username,
      role: user.role || 'public',
      loggedInAt: new Date().toISOString(),
    }));
    localStorage.setItem('darfo2_role', user.role || 'public');
    localStorage.setItem('darfo2_user', user.displayName || user.username);
    this.refreshAccessUI();
    return true;
  },
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.setItem('darfo2_role', 'public');
    localStorage.setItem('darfo2_user', this.roles.public);
    this.refreshAccessUI();
    refreshCurrentView();
    toast('Signed out. Public access is active.');
  },
  setRole(role) {
    if (!this.canAdmin()) {
      toast('Admin login is required to change access level.', 'error');
      return;
    }
    const session = this.session() || {};
    session.role = role;
    session.displayName = this.roles[role] || session.displayName || 'Current user';
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    localStorage.setItem('darfo2_role', role);
    localStorage.setItem('darfo2_user', session.displayName);
    this.refreshAccessUI();
    toast(`Access level: ${this.roles[role]}`);
  },
  refreshAccessUI() {
    document.querySelectorAll('.role-badge').forEach(el => { el.textContent = this.label(); });
    document.querySelectorAll('.current-user-label').forEach(el => { el.textContent = this.currentUser(); });
    document.querySelectorAll('.auth-state-label').forEach(el => { el.textContent = this.isLoggedIn() ? 'Signed in' : 'Public access'; });
    document.querySelectorAll('.auth-action-wrap').forEach(el => { el.innerHTML = authActionButton(el.dataset.variant || 'topbar'); });
    this.apply();
  },
  label() { return this.roles[this.currentRole()] || 'Public'; },
  apply() {
    document.body?.setAttribute('data-role', this.currentRole());
    document.querySelectorAll('[data-access]').forEach(el => {
      const access = el.dataset.access;
      const allowed = access === 'admin' ? this.canAdmin()
        : access === 'write' ? this.canWrite()
        : true;
      el.classList.toggle('access-hidden', !allowed);
      el.setAttribute('aria-hidden', String(!allowed));
    });
    document.querySelectorAll('input, select, textarea').forEach(el => {
      const inLogin = !!el.closest('#login-modal');
      const inModal = !!el.closest('.modal-box');
      if (inModal && !inLogin && !this.canWrite()) el.setAttribute('disabled', 'disabled');
      else if (!el.dataset.locked) el.removeAttribute('disabled');
    });
  }
};
window.AccessPolicy = AccessPolicy;

const Theme = {
  current() { return localStorage.getItem('darfo2_theme') || 'light'; },
  apply() { document.documentElement.setAttribute('data-theme', this.current()); },
  toggle() {
    localStorage.setItem('darfo2_theme', this.current() === 'dark' ? 'light' : 'dark');
    this.apply();
    document.querySelectorAll('.theme-toggle').forEach(btn => { btn.innerHTML = this.current()==='dark'?ICONS.sun:ICONS.moon; });
  }
};
window.Theme = Theme;
Theme.apply();

// ── Build sidebar ─────────────────────────────────────────────────
function buildSidebar(activePage) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  document.title = APP_TITLE;

  const issues = DB.get(DB.KEYS.ISSUES).filter(i => i.status !== 'Resolved').length;
  const highPest = DB.get(DB.KEYS.PEST).filter(p => p.severity === 'High' || p.severity === 'Severe').length;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-badge">
        <img src="${APP_LOGO}" alt="Department of Agriculture logo">
        <span>DA-RFO2</span>
      </div>
      <div class="org-name">${SYSTEM_OWNER}</div>
      <div class="sys-title">iCAMMS - Integrated Climate Adaptation and Crisis Management Monitoring System (iCAMMS)</div>
    </div>
    <nav class="sidebar-nav">
      ${NAV.map(group => `
        <div class="nav-group-label">${group.group}</div>
        ${group.items.map(item => {
          const isActive = item.href === activePage;
          const badge = item.href === 'issues.html' && issues > 0
            ? `<span style="background:var(--red-500);color:white;border-radius:10px;padding:1px 6px;font-size:.65rem;margin-left:auto">${issues}</span>` : '';
          const pestBadge = item.href === 'pest.html' && highPest > 0
            ? `<span style="background:var(--orange-500);color:white;border-radius:10px;padding:1px 6px;font-size:.65rem;margin-left:auto">${highPest}</span>` : '';
          return `<a class="nav-item${isActive?' active':''}" href="${item.href}">
            ${ICONS[item.icon]||''}
            <span>${item.label}</span>
            ${badge}${pestBadge}
          </a>`;
        }).join('')}
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="auth-panel">
        <span class="auth-state-label">${AccessPolicy.isLoggedIn() ? 'Signed in' : 'Public access'}</span>
        <strong class="current-user-label">${AccessPolicy.currentUser()}</strong>
        <span>${AccessPolicy.label()}</span>
        <span class="auth-action-wrap" data-variant="sidebar">${authActionButton('sidebar')}</span>
      </div>
      <span>DA-RFO2 | PMED</span>
      <span>v1.0 — May 2026</span>
      <span style="margin-top:6px">
        <a href="#" onclick="resetData()" style="color:rgba(255,255,255,.3);font-size:.68rem;text-decoration:none">Reset demo data</a>
      </span>
    </div>
  `;
  updateTopbarUtilities();
  AccessPolicy.apply();
}

// ── Toast ──────────────────────────────────────────────────────────
function updateTopbarUtilities() {
  const topbar = document.querySelector('.topbar');
  if (!topbar || topbar.querySelector('.topbar-tools')) return;
  const tools = document.createElement('div');
  tools.className = 'topbar-tools';
  tools.innerHTML = `
    <button class="btn btn-secondary btn-sm mobile-menu-btn" onclick="toggleMobileNav()" title="Toggle menu" aria-label="Toggle menu" aria-expanded="${document.body.classList.contains('nav-open')}">${ICONS.menu}</button>
    <span class="topbar-badge role-badge">${AccessPolicy.label()}</span>
    <span class="auth-action-wrap">${authActionButton()}</span>
    <button class="btn btn-secondary btn-sm theme-toggle" onclick="Theme.toggle()" title="Toggle dark mode">${Theme.current()==='dark'?ICONS.sun:ICONS.moon}</button>
  `;
  topbar.appendChild(tools);
}

function authActionButton(variant = 'topbar') {
  if (variant === 'sidebar') {
    return AccessPolicy.isLoggedIn()
      ? `<button class="sidebar-btn" onclick="AccessPolicy.logout()">Sign out</button>`
      : `<button class="sidebar-btn" onclick="openLoginModal()">Sign in</button>`;
  }
  return AccessPolicy.isLoggedIn()
    ? `<button class="btn btn-secondary btn-sm" onclick="AccessPolicy.logout()" title="Sign out">${ICONS.x}</button>`
    : `<button class="btn btn-secondary btn-sm" onclick="openLoginModal()" title="Sign in">${ICONS.users}</button>`;
}

function toggleMobileNav() {
  document.body.classList.toggle('nav-open');
  document.querySelectorAll('.mobile-menu-btn').forEach(btn => {
    btn.setAttribute('aria-expanded', String(document.body.classList.contains('nav-open')));
  });
}

function ensureStorageModal() {
  if (document.getElementById('storage-modal')) return;
  const settings = DB.settings();
  const wrap = document.createElement('div');
  wrap.className = 'modal-overlay hidden';
  wrap.id = 'storage-modal';
  wrap.innerHTML = `
    <div class="modal-box">
      <div class="modal-header"><span>Google Drive / Sheet Storage</span><button class="modal-close" onclick="closeModal('storage-modal')">x</button></div>
      <div class="modal-body">
        <div class="alert-banner green">
          ${ICONS.cloud}
          <div><strong>Shared database mode:</strong> all tables are mirrored to a Google Sheet in the shared Drive folder through a deployed Google Apps Script endpoint. Local storage remains an offline cache when the network is unavailable.</div>
        </div>
        <div class="form-grid cols-1">
          <div class="form-group"><label class="form-label">Google Apps Script Web App URL</label><input id="set-endpoint" value="${settings.appsScriptEndpoint}" placeholder="https://script.google.com/macros/s/.../exec"></div>
          <div class="form-group"><label class="form-label">Shared Google Drive Folder URL</label><input id="set-folder" value="${settings.googleDriveFolderUrl}" placeholder="https://drive.google.com/drive/folders/..."></div>
          <div class="form-group"><label class="form-label">Google Sheet URL</label><input id="set-sheet" value="${settings.googleSheetUrl}" placeholder="Created automatically if blank"></div>
          <label style="display:flex;gap:8px;align-items:center;font-size:.82rem"><input id="set-enabled" type="checkbox" style="width:auto" ${settings.syncEnabled?'checked':''}> Enable live Google Sheet sync</label>
        </div>
        <div class="sync-status" id="sync-status">${syncStatusText()}</div>
        <div style="font-size:.74rem;color:var(--gray-500);margin-top:10px">Deploy the included google-apps-script.js in Google Apps Script, share the Drive folder with the team, then paste the Web App URL here. Pull replaces the app cache with the current Google Sheet rows.</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('storage-modal')">Cancel</button>
        <button class="btn btn-secondary" onclick="pullDatabaseNow()">Pull from Google Sheet</button>
        <button class="btn btn-secondary" onclick="pushDatabaseNow()">Push All Tables</button>
        <button class="btn btn-primary" onclick="saveStorageSettings()">Save Settings</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);
}

function syncStatusText() {
  const pending = DB.getSyncQueue().length;
  const last = localStorage.getItem('darfo2_last_google_sync');
  const err = localStorage.getItem('darfo2_last_sync_error');
  if (err) return `Last sync error: ${err}`;
  if (last) return `Last synced: ${fmt.datetime(last)}. Pending events: ${pending}.`;
  return `Pending events: ${pending}. No Google Sheet sync has completed yet.`;
}

function openStorageSettings() {
  ensureStorageModal();
  openModal('storage-modal');
}

function ensureLoginModal() {
  if (document.getElementById('login-modal')) return;
  const wrap = document.createElement('div');
  wrap.className = 'modal-overlay hidden';
  wrap.id = 'login-modal';
  wrap.innerHTML = `
    <div class="modal-box auth-modal">
      <div class="modal-header"><span>User Login</span><button class="modal-close" onclick="closeModal('login-modal')">x</button></div>
      <div class="modal-body">
        <div class="login-brand">
          <img src="${APP_LOGO}" alt="Department of Agriculture logo">
          <div>
            <div class="login-system-title">iCAMMS - Integrated Climate Adaptation and Crisis Management Monitoring System (iCAMMS)</div>
            <div class="login-owner">${SYSTEM_OWNER}</div>
          </div>
        </div>
        <div class="form-grid cols-1">
          <div class="form-group"><label class="form-label">Username</label><input id="login-username" autocomplete="username"></div>
          <div class="form-group"><label class="form-label">Password</label><input id="login-password" type="password" autocomplete="current-password"></div>
        </div>
        <div class="sync-status">Access is granted according to the account role: Admin, Report Officer, Executive View, or Public.</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('login-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="submitLogin()">Sign in</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);
  wrap.addEventListener('keydown', event => {
    if (event.key === 'Enter') submitLogin();
  });
}

function openLoginModal() {
  ensureLoginModal();
  openModal('login-modal');
  setTimeout(() => document.getElementById('login-username')?.focus(), 0);
}

function submitLogin() {
  const username = document.getElementById('login-username')?.value || '';
  const password = document.getElementById('login-password')?.value || '';
  if (!AccessPolicy.login(username, password)) {
    toast('Invalid username or password.', 'error');
    return;
  }
  closeModal('login-modal');
  toast(`Signed in as ${AccessPolicy.currentUser()} (${AccessPolicy.label()})`);
  refreshCurrentView();
}

function saveStorageSettings(options = {}) {
  const endpoint = document.getElementById('set-endpoint');
  const folder = document.getElementById('set-folder');
  const sheet = document.getElementById('set-sheet');
  const enabled = document.getElementById('set-enabled');
  if (!endpoint || !folder || !sheet || !enabled) return DB.settings();
  DB.saveSettings({
    appsScriptEndpoint: endpoint.value.trim(),
    googleDriveFolderUrl: folder.value.trim(),
    googleSheetUrl: sheet.value.trim(),
    syncEnabled: enabled.checked,
  });
  toast('Google Sheet storage settings saved');
  if (options.close !== false) closeModal('storage-modal');
}

async function pushDatabaseNow(options = {}) {
  const closeSettings = options.closeSettings !== false;
  if (document.getElementById('set-endpoint')) {
    saveStorageSettings({ close: closeSettings });
  }
  const result = await DB.pushAllToGoogleSheet();
  if (result.ok) {
    toast('Database pushed to Google Sheet');
    const syncStatus = document.getElementById('sync-status');
    if (syncStatus) syncStatus.textContent = syncStatusText();
  } else {
    toast(result.message || 'Google Sheet push failed', 'error');
  }
}

async function pullDatabaseNow() {
  saveStorageSettings();
  const pending = DB.getSyncQueue().length;
  if (pending && !confirm(`${pending} local sync event(s) are still pending. Pulling will replace the local app cache with Google Sheet rows. Continue?`)) return;
  const result = await DB.pullFromGoogleSheet();
  if (result.ok) {
    toast('Database pulled from Google Sheet');
    document.getElementById('sync-status') && (document.getElementById('sync-status').textContent = syncStatusText());
    refreshCurrentView();
  } else {
    toast(result.message || 'Google Sheet pull failed', 'error');
  }
}

async function autoPullDatabaseOnLoad() {
  const settings = DB.settings();
  if (!settings.syncEnabled || !settings.appsScriptEndpoint || !settings.googleSheetUrl) return;

  const pending = DB.getSyncQueue().length;
  if (pending) {
    const pushed = await DB.syncQueue();
    if (!pushed.ok) return;
  }

  const result = await DB.pullFromGoogleSheet();
  if (!result.ok) {
    toast(result.message || 'Google Sheet pull failed', 'error');
    return;
  }
  refreshCurrentView();
}

function refreshCurrentView() {
  if (typeof renderAll === 'function') renderAll();
  else if (typeof render === 'function') render();
  enhanceSortableTables();
}

function enhanceSortableTables(root = document) {
  root.querySelectorAll('table').forEach(table => {
    if (table.dataset.sortableReady === 'true') return;
    const headerRow = table.tHead?.rows?.[0];
    const body = table.tBodies?.[0];
    if (!headerRow || !body || !body.rows.length) return;

    table.dataset.sortableReady = 'true';
    Array.from(headerRow.cells).forEach((th, index) => {
      if (th.colSpan > 1) return;
      th.classList.add('sortable-th');
      th.tabIndex = 0;
      th.setAttribute('role', 'button');
      th.setAttribute('aria-sort', 'none');
      th.title = 'Sort column';
      const sort = () => sortTableByColumn(table, index, th);
      th.addEventListener('click', sort);
      th.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          sort();
        }
      });
    });
  });
}

function sortTableByColumn(table, index, activeHeader) {
  const body = table.tBodies?.[0];
  if (!body) return;
  const current = activeHeader.dataset.sortDirection === 'asc' ? 'desc' : 'asc';
  const rows = Array.from(body.rows).filter(row => row.cells.length > 1);

  table.querySelectorAll('th').forEach(th => {
    th.dataset.sortDirection = '';
    th.setAttribute('aria-sort', 'none');
  });

  rows.sort((a, b) => compareTableCells(a.cells[index], b.cells[index], current));
  rows.forEach(row => body.appendChild(row));
  activeHeader.dataset.sortDirection = current;
  activeHeader.setAttribute('aria-sort', current === 'asc' ? 'ascending' : 'descending');
}

function compareTableCells(aCell, bCell, direction) {
  const a = parseSortableValue(aCell?.innerText || '');
  const b = parseSortableValue(bCell?.innerText || '');
  const result = a.type === 'number' && b.type === 'number'
    ? a.value - b.value
    : String(a.value).localeCompare(String(b.value), undefined, { numeric: true, sensitivity: 'base' });
  return direction === 'asc' ? result : -result;
}

function parseSortableValue(text) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  const numeric = Number(clean.replace(/[,%₱,]/g, '').replace(/^—$/, ''));
  if (clean && Number.isFinite(numeric)) return { type: 'number', value: numeric };
  const date = Date.parse(clean);
  if (clean && Number.isFinite(date)) return { type: 'number', value: date };
  return { type: 'text', value: clean };
}

function toast(msg, type='success') {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `${type==='success'?ICONS.check:ICONS.x} <span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ── Modal helpers ─────────────────────────────────────────────────
function openModal(id)  {
  if (!['storage-modal', 'login-modal'].includes(id) && !AccessPolicy.canWrite()) {
    toast('This access level is read-only. Switch to Report Officer or Admin to enter data.', 'error');
    return;
  }
  document.getElementById(id)?.classList.remove('hidden');
  AccessPolicy.apply();
}
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

// ── Formatting helpers ────────────────────────────────────────────
const fmt = {
  date: d => d ? new Date(d).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}) : '—',
  datetime: d => d ? new Date(d).toLocaleString('en-PH',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—',
  num:  n => Number(n).toLocaleString(),
  money: n => `PHP ${Number(n || 0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}`,
  pct:  n => `${n}%`,
  ha:   n => `${n} ha`,
  statusBadge: s => {
    const map = { 'Distributed':'green','Pending':'amber','Good':'green','Fair':'amber','Poor':'red',
      'Functional':'green','Non-functional':'red','Intermittent':'amber',
      'Submitted':'green','Open':'red','In Progress':'amber','Resolved':'green',
      'Treated':'green','Pending Induction':'amber',
      'Very High':'red','High':'amber','Moderate':'gray','Low':'gray','Very Low':'green','For Validation':'blue','For validation':'blue',
      'None':'green','Severe':'red' };
    const c = map[s] || 'gray';
    return `<span class="badge ${c}">${s}</span>`;
  },
  gedsiChips: b => {
    let chips = '';
    if (b.sex==='Female') chips += `<span class="chip w">W</span>`;
    if (b.ageGroup==='60+') chips += `<span class="chip sr">Sr</span>`;
    if (b.ageGroup==='18-35') chips += `<span class="chip yt">Yt</span>`;
    if (b.ip)   chips += `<span class="chip ip">IP</span>`;
    if (b.pwd)  chips += `<span class="chip pw">PWD</span>`;
    if (b.gida) chips += `<span class="chip gi">GIDA</span>`;
    return chips;
  }
};

// ── Rate color ─────────────────────────────────────────────────────
function rateColor(pct) {
  if (pct >= 80) return 'green';
  if (pct >= 60) return 'amber';
  return 'red';
}

// ── Reset ─────────────────────────────────────────────────────────
function resetData() {
  if (!confirm('Reset all data to demo state?')) return;
  localStorage.clear();
  location.reload();
}

// ── Export CSV ────────────────────────────────────────────────────
function exportCSV(data, filename) {
  if (!data.length) { toast('No data to export', 'error'); return; }
  const rows = AccessPolicy.isPublic() ? data.map(redactRecordForPublic) : data;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${(r[k]??'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = filename;
  a.click();
  toast(`Exported ${filename}`);
}

function redactRecordForPublic(record) {
  const privateKeys = new Set([
    'name', 'beneficiaryName', 'beneficiary', 'farmer', 'rsbsa', 'beneficiaryId',
    'aew', 'barangay', 'lat', 'lng', 'createdBy', 'updatedBy',
    'description', 'action', 'resolutionNotes'
  ]);
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [
    key,
    privateKeys.has(key) ? 'Withheld' : value
  ]));
}

// ── Simple bar chart (canvas-free, CSS-based) ──────────────────────
function renderBarChart(containerId, labels, values, color='var(--green-500)', maxOverride) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const max = maxOverride || Math.max(...values, 1);
  el.innerHTML = `
    <div style="display:flex;align-items:flex-end;gap:8px;height:120px;padding:0 4px">
      ${labels.map((l,i) => {
        const h = Math.round((values[i]/max)*110);
        return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <div style="font-size:.66rem;color:var(--gray-500);font-family:var(--font-mono)">${values[i]}</div>
          <div style="width:100%;height:${h}px;background:${color};border-radius:3px 3px 0 0;min-height:2px;transition:height .4s"></div>
          <div style="font-size:.62rem;color:var(--gray-500);text-align:center;word-break:break-word;line-height:1.1">${l}</div>
        </div>`;
      }).join('')}
    </div>
  `;
}

// ── Donut chart (SVG) ─────────────────────────────────────────────
function renderDonut(containerId, value, total, color='var(--green-500)', label='') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const pct = total > 0 ? value/total : 0;
  const r = 40, cx = 50, cy = 50;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const gap  = circ - dash;
  const col  = pct >= .8 ? '#27944f' : pct >= .6 ? '#c9912b' : '#c0392b';
  el.innerHTML = `
    <svg viewBox="0 0 100 100" style="width:100%;max-width:120px;display:block;margin:auto">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--gray-200)" stroke-width="12"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="12"
        stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${circ*.25}"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>
      <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
        fill="${col}" font-size="18" font-weight="700" font-family="monospace">${Math.round(pct*100)}%</text>
      ${label?`<text x="${cx}" y="${cy+14}" text-anchor="middle" fill="var(--gray-500)" font-size="7">${label}</text>`:''}
    </svg>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  Theme.apply();
  AccessPolicy.apply();
  enhanceSortableTables();
  autoPullDatabaseOnLoad();
  const body = document.body;
  if (!body) return;
  const observer = new MutationObserver(() => {
    AccessPolicy.apply();
    enhanceSortableTables();
  });
  observer.observe(body, { childList: true, subtree: true });
});
