// ═══════════════════════════════════════════════════════════════════
//  DA-RFO2 Monitoring System — Shared UI Utilities
// ═══════════════════════════════════════════════════════════════════

// ── Navigation config ─────────────────────────────────────────────
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
  roles: {
    admin: 'Admin',
    executive: 'Executive View',
    officer: 'Report Officer',
  },
  currentRole() { return localStorage.getItem('darfo2_role') || 'admin'; },
  currentUser() { return localStorage.getItem('darfo2_user') || this.roles[this.currentRole()] || 'Current user'; },
  canWrite() { return ['admin', 'officer'].includes(this.currentRole()); },
  canAdmin() { return this.currentRole() === 'admin'; },
  setRole(role) {
    localStorage.setItem('darfo2_role', role);
    localStorage.setItem('darfo2_user', this.roles[role] || 'Current user');
    document.querySelectorAll('.role-badge').forEach(el => { el.textContent = this.label(); });
    this.apply();
    toast(`Access level: ${this.roles[role]}`);
  },
  label() { return this.roles[this.currentRole()] || 'Executive View'; },
  apply() {
    document.body?.setAttribute('data-role', this.currentRole());
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.textContent || '').toLowerCase();
      const action = (el.getAttribute('onclick') || '').toLowerCase();
      const href = (el.getAttribute('href') || '').toLowerCase();
      const writeIntent = /openadd|openfrmodal|opendistmodal|openmodal\('|save|edit/.test(action)
        || /\badd\b|submit report|record distribution|log issue|save/.test(text)
        || ['distributions.html', 'technology.html'].includes(href);
      const deleteIntent = /delete|del|remove|trash/.test(action) || /\bdelete\b|\bremove\b/.test(text);
      if (writeIntent || deleteIntent) {
        const allowed = deleteIntent ? this.canAdmin() : this.canWrite();
        el.classList.toggle('access-hidden', !allowed);
        el.setAttribute('aria-hidden', String(!allowed));
      }
    });
    document.querySelectorAll('input, select, textarea').forEach(el => {
      const inModal = !!el.closest('.modal-box');
      if (inModal && !this.canWrite()) el.setAttribute('disabled', 'disabled');
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

  const issues = DB.get(DB.KEYS.ISSUES).filter(i => i.status !== 'Resolved').length;
  const highPest = DB.get(DB.KEYS.PEST).filter(p => p.severity === 'High' || p.severity === 'Severe').length;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span style="font-size:.7rem;font-weight:700;color:rgba(255,255,255,.9)">DA-RFO2</span>
      </div>
      <div class="org-name">Department of Agriculture</div>
      <div class="sys-title">Climate Adaptation<br>Monitoring System</div>
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
      <label class="sidebar-control">
        <span>Access Level</span>
        <select onchange="AccessPolicy.setRole(this.value)">
          <option value="admin" ${AccessPolicy.currentRole()==='admin'?'selected':''}>Admin</option>
          <option value="executive" ${AccessPolicy.currentRole()==='executive'?'selected':''}>Executive View</option>
          <option value="officer" ${AccessPolicy.currentRole()==='officer'?'selected':''}>Report Officer</option>
        </select>
      </label>
      <button class="btn btn-secondary btn-sm sidebar-btn" onclick="openStorageSettings()">${ICONS.cloud} Google Sheet</button>
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
    <button class="btn btn-secondary btn-sm mobile-menu-btn" onclick="toggleMobileNav()" title="Menu">${ICONS.menu}</button>
    <span class="topbar-badge role-badge">${AccessPolicy.label()}</span>
    <button class="btn btn-secondary btn-sm theme-toggle" onclick="Theme.toggle()" title="Toggle dark mode">${Theme.current()==='dark'?ICONS.sun:ICONS.moon}</button>
  `;
  topbar.appendChild(tools);
}

function toggleMobileNav() {
  document.body.classList.toggle('nav-open');
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
        <div style="font-size:.74rem;color:var(--gray-500);margin-top:10px">Deploy the included google-apps-script.js in Google Apps Script, share the Drive folder with the team, then paste the Web App URL here.</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('storage-modal')">Cancel</button>
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

function saveStorageSettings() {
  DB.saveSettings({
    appsScriptEndpoint: document.getElementById('set-endpoint').value.trim(),
    googleDriveFolderUrl: document.getElementById('set-folder').value.trim(),
    googleSheetUrl: document.getElementById('set-sheet').value.trim(),
    syncEnabled: document.getElementById('set-enabled').checked,
  });
  toast('Google Sheet storage settings saved');
  closeModal('storage-modal');
}

async function pushDatabaseNow() {
  saveStorageSettings();
  const result = await DB.pushAllToGoogleSheet();
  if (result.ok) toast('Database pushed to Google Sheet');
  else toast(result.message || 'Google Sheet push failed', 'error');
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
  if (id !== 'storage-modal' && !AccessPolicy.canWrite()) {
    toast('Executive View is read-only. Switch to Report Officer or Admin to enter data.', 'error');
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
  pct:  n => `${n}%`,
  ha:   n => `${n} ha`,
  statusBadge: s => {
    const map = { 'Distributed':'green','Pending':'amber','Good':'green','Fair':'amber','Poor':'red',
      'Functional':'green','Non-functional':'red','Intermittent':'amber',
      'Submitted':'green','Open':'red','In Progress':'amber','Resolved':'green',
      'Treated':'green','Pending Induction':'amber',
      'Very High':'red','High':'amber','Moderate':'gray','Low':'gray',
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
  const keys = Object.keys(data[0]);
  const csv = [keys.join(','), ...data.map(r => keys.map(k => `"${(r[k]??'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = filename;
  a.click();
  toast(`Exported ${filename}`);
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
  const body = document.body;
  if (!body) return;
  const observer = new MutationObserver(() => AccessPolicy.apply());
  observer.observe(body, { childList: true, subtree: true });
});
