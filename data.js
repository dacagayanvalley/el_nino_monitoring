// ═══════════════════════════════════════════════════════════════════
//  DA-RFO2 Monitoring System — Data Layer (localStorage-based)
// ═══════════════════════════════════════════════════════════════════

const EMBEDDED_GOOGLE_SHEET_CONFIG = {
  appsScriptEndpoint: 'https://script.google.com/macros/s/AKfycbxjAEu4CsmkwptWb_ZIlZOwvrLdvsLd4LiPJsFLm_s-mvI5Lcz23XD7fMHAxIZUmE9pFg/exec',
  googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1y0YQTyqSJJK-rG-CYLVPiGxGgvwHuXrBm5wpJI2L6hU/edit?gid=0#gid=0',
  googleDriveFolderUrl: 'https://drive.google.com/drive/folders/1SD0lmSk2S8YJEyBc4z27eZIU1J0Y5IGU?role=writer',
};

const DB = {
  // ── Keys ──────────────────────────────────────────────────────────
  KEYS: {
    MUNICIPALITIES: 'darfo2_municipalities',
    BENEFICIARIES:  'darfo2_beneficiaries',
    DISTRIBUTIONS:  'darfo2_distributions',
    MANGO:          'darfo2_mango',
    TECH:           'darfo2_technology',
    TRIALS:         'darfo2_trials',
    BIOFERT:        'darfo2_biofert',
    PEST:           'darfo2_pest',
    FIELD_REPORTS:  'darfo2_fieldreports',
    ISSUES:         'darfo2_issues',
    TIMELINE:       'darfo2_weekly_timeline',
  },

  SETTINGS_KEY: 'darfo2_system_settings',
  SYNC_QUEUE_KEY: 'darfo2_google_sheet_sync_queue',

  defaultSettings: {
    storageMode: 'google_sheet',
    googleSheetUrl: '',
    googleDriveFolderUrl: '',
    appsScriptEndpoint: '',
    syncEnabled: false,
  },

  embeddedSettings() {
    const cfg = window.ICAMMS_GOOGLE_SHEET_CONFIG || EMBEDDED_GOOGLE_SHEET_CONFIG;
    const settings = {};
    if (cfg.appsScriptEndpoint) settings.appsScriptEndpoint = cfg.appsScriptEndpoint;
    if (cfg.googleSheetUrl) settings.googleSheetUrl = cfg.googleSheetUrl;
    if (cfg.googleDriveFolderUrl) settings.googleDriveFolderUrl = cfg.googleDriveFolderUrl;
    if (settings.appsScriptEndpoint) settings.syncEnabled = true;
    return settings;
  },

  settings() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.SETTINGS_KEY) || '{}');
      const embedded = this.embeddedSettings();
      const settings = { ...this.defaultSettings, ...saved, ...embedded };
      if (settings.appsScriptEndpoint) settings.syncEnabled = true;
      return settings;
    }
    catch {
      const settings = { ...this.defaultSettings, ...this.embeddedSettings() };
      if (settings.appsScriptEndpoint) settings.syncEnabled = true;
      return settings;
    }
  },

  saveSettings(patch) {
    const settings = { ...this.settings(), ...patch };
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  },

  now() { return new Date().toISOString(); },
  actor() { return (window.AccessPolicy?.currentUser?.() || 'Current user').trim(); },
  stamp(record, isNew = false) {
    const now = this.now();
    if (isNew && !record.createdAt) record.createdAt = now;
    if (isNew && !record.createdBy) record.createdBy = this.actor();
    record.updatedAt = now;
    record.updatedBy = this.actor();
    return record;
  },

  getSyncQueue() {
    try { return JSON.parse(localStorage.getItem(this.SYNC_QUEUE_KEY) || '[]'); }
    catch { return []; }
  },

  queueSync(action, table, record) {
    const settings = this.settings();
    if (!settings.syncEnabled || !settings.appsScriptEndpoint) return;
    const queue = this.getSyncQueue();
    queue.push({ action, table, record, queuedAt: this.now() });
    localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
    this.syncQueue();
  },

  async syncQueue() {
    const settings = this.settings();
    const queue = this.getSyncQueue();
    if (!settings.syncEnabled || !settings.appsScriptEndpoint || !queue.length) return { ok: false, message: 'Google Sheet sync is not configured.' };
    try {
      const res = await fetch(settings.appsScriptEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          mode: 'queue',
          sheetUrl: settings.googleSheetUrl,
          driveFolderUrl: settings.googleDriveFolderUrl,
          events: queue,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json().catch(() => ({ ok: true }));
      if (result.ok === false) throw new Error(result.message || 'Sync failed');
      if (result.sheetUrl) this.saveSettings({ googleSheetUrl: result.sheetUrl, syncEnabled: true });
      localStorage.removeItem(this.SYNC_QUEUE_KEY);
      localStorage.setItem('darfo2_last_google_sync', this.now());
      localStorage.removeItem('darfo2_last_sync_error');
      return { ok: true, result };
    } catch (err) {
      localStorage.setItem('darfo2_last_sync_error', `${this.now()} ${err.message}`);
      return { ok: false, message: err.message };
    }
  },

  async pushAllToGoogleSheet() {
    const settings = this.settings();
    if (!settings.appsScriptEndpoint) return { ok: false, message: 'Paste the Google Apps Script Web App URL first.' };
    const tables = Object.entries(this.KEYS).reduce((acc, [name, key]) => {
      acc[name] = this.get(key);
      return acc;
    }, {});
    try {
      const res = await fetch(settings.appsScriptEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          mode: 'replaceAll',
          sheetUrl: settings.googleSheetUrl,
          driveFolderUrl: settings.googleDriveFolderUrl,
          tables,
          pushedAt: this.now(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json().catch(() => ({ ok: true }));
      if (result.ok === false) throw new Error(result.message || 'Push failed');
      if (result.sheetUrl) this.saveSettings({ googleSheetUrl: result.sheetUrl, syncEnabled: true });
      localStorage.setItem('darfo2_last_google_sync', this.now());
      localStorage.removeItem('darfo2_last_sync_error');
      return { ok: true, result };
    } catch (err) {
      localStorage.setItem('darfo2_last_sync_error', `${this.now()} ${err.message}`);
      return { ok: false, message: err.message };
    }
  },

  // ── CRUD helpers ──────────────────────────────────────────────────
  async pullFromGoogleSheet() {
    const settings = this.settings();
    if (!settings.appsScriptEndpoint) return { ok: false, message: 'Paste the Google Apps Script Web App URL first.' };
    if (!settings.googleSheetUrl) return { ok: false, message: 'Paste the Google Sheet URL before pulling records.' };
    try {
      const url = new URL(settings.appsScriptEndpoint);
      url.searchParams.set('mode', 'read');
      url.searchParams.set('sheetUrl', settings.googleSheetUrl);
      const res = await fetch(url.toString(), { method: 'GET', mode: 'cors' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json().catch(() => ({ ok: false, message: 'Invalid response from Google Apps Script.' }));
      if (result.ok === false) throw new Error(result.message || 'Pull failed');

      const tables = result.tables || {};
      Object.entries(this.KEYS).forEach(([name, key]) => {
        const rows = tables[name] || tables[this.tableNameFromKey(key)] || tables[key] || [];
        this.set(key, Array.isArray(rows) ? rows : []);
      });

      if (result.sheetUrl) this.saveSettings({ googleSheetUrl: result.sheetUrl, syncEnabled: true });
      localStorage.removeItem(this.SYNC_QUEUE_KEY);
      localStorage.setItem('darfo2_last_google_sync', this.now());
      localStorage.removeItem('darfo2_last_sync_error');
      return { ok: true, result };
    } catch (err) {
      localStorage.setItem('darfo2_last_sync_error', `${this.now()} ${err.message}`);
      return { ok: false, message: err.message };
    }
  },

  tableNameFromKey(key) {
    return String(key || '').replace(/^darfo2_/, '').replace(/[^a-z0-9_]/gi, '_').toUpperCase();
  },

  get(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  add(key, record) {
    if (window.AccessPolicy && !AccessPolicy.canWrite()) { window.toast?.('Report Officer or Admin access is required to enter data.', 'error'); return null; }
    const arr = this.get(key);
    record.id = record.id || Date.now() + Math.random().toString(36).slice(2);
    this.stamp(record, true);
    arr.push(record);
    this.set(key, arr);
    this.queueSync('upsert', key, record);
    return record;
  },
  update(key, id, patch) {
    if (window.AccessPolicy && !AccessPolicy.canWrite()) { window.toast?.('Report Officer or Admin access is required to update data.', 'error'); return null; }
    const arr = this.get(key);
    const idx = arr.findIndex(r => r.id == id);
    if (idx >= 0) {
      arr[idx] = this.stamp({ ...arr[idx], ...patch }, false);
      this.set(key, arr);
      this.queueSync('upsert', key, arr[idx]);
      return arr[idx];
    }
    return null;
  },
  remove(key, id) {
    if (window.AccessPolicy && !AccessPolicy.canAdmin()) { window.toast?.('Admin access is required to delete records.', 'error'); return; }
    const arr = this.get(key).filter(r => r.id != id);
    this.set(key, arr);
    this.queueSync('remove', key, { id });
  },
  clear(key) { localStorage.removeItem(key); },

  ensureTimestamps() {
    Object.values(this.KEYS).forEach(key => {
      const rows = this.get(key);
      let changed = false;
      rows.forEach(row => {
        if (!row.createdAt) { row.createdAt = this.now(); changed = true; }
        if (!row.updatedAt) { row.updatedAt = row.createdAt; changed = true; }
        if (!row.createdBy) { row.createdBy = 'Seed data'; changed = true; }
        if (!row.updatedBy) { row.updatedBy = row.createdBy; changed = true; }
      });
      if (changed) this.set(key, rows);
    });
  },

  // ── Seed demo data ─────────────────────────────────────────────────
  seed() {
    if (localStorage.getItem('darfo2_seeded')) return;

    // Municipalities
    const munis = [
      { id:'m1', province:'Isabela', municipality:'Cauayan City',     crvaRisk:'Very High', confirmed:true,  crops:['Mungbean','Peanut','Watermelon'], tech:['INS-2hp','Rain Shelter'], createdAt:'2026-05-01' },
      { id:'m2', province:'Isabela', municipality:'Ilagan City',      crvaRisk:'Very High', confirmed:true,  crops:['Mungbean','Peanut','Ube'],         tech:['INS-1hp','SPIS'],        createdAt:'2026-05-01' },
      { id:'m3', province:'Isabela', municipality:'Santiago City',    crvaRisk:'High',      confirmed:true,  crops:['Peanut','Onion'],                  tech:['Rain Shelter'],          createdAt:'2026-05-02' },
      { id:'m4', province:'Isabela', municipality:'Tumauini',         crvaRisk:'High',      confirmed:true,  crops:['Mungbean','Ube'],                  tech:['INS-3hp'],               createdAt:'2026-05-02' },
      { id:'m5', province:'Isabela', municipality:'Cabagan',          crvaRisk:'Very High', confirmed:true,  crops:['Mungbean','Peanut'],               tech:['INS-1hp'],               createdAt:'2026-05-03' },
      { id:'m6', province:'Cagayan', municipality:'Tuguegarao City',  crvaRisk:'High',      confirmed:true,  crops:['Watermelon','Onion','Mango'],       tech:['Rain Shelter','SPIS'],   createdAt:'2026-05-03' },
      { id:'m7', province:'Cagayan', municipality:'Aparri',           crvaRisk:'High',      confirmed:true,  crops:['Mungbean','Peanut'],               tech:['INS-2hp'],               createdAt:'2026-05-04' },
      { id:'m8', province:'Cagayan', municipality:'Lallo',            crvaRisk:'High',      confirmed:true,  crops:['Peanut','Mango'],                  tech:['INS-1hp'],               createdAt:'2026-05-04' },
      { id:'m9', province:'Nueva Vizcaya', municipality:'Bayombong', crvaRisk:'High',      confirmed:true,  crops:['Mungbean','Ube'],                  tech:['INS-2hp'],               createdAt:'2026-05-05' },
      { id:'m10',province:'Quirino', municipality:'Cabarroguis',      crvaRisk:'Moderate',  confirmed:false, crops:['Peanut'],                          tech:[],                        createdAt:'2026-05-05' },
    ];
    this.set(this.KEYS.MUNICIPALITIES, munis);

    // Beneficiaries
    const benes = [
      { id:'b1',  name:'Maria Santos',      rsbsa:'02-001-001', sex:'Female', ageGroup:'36-59', municipality:'Cauayan City',    province:'Isabela',        farmSize:0.25, crop:'Mungbean',   fca:'Cauayan FCA',     ip:false, pwd:false, gida:false, interventions:['Mungbean Seeds','Biofertilizer'], createdAt:'2026-05-06' },
      { id:'b2',  name:'Juan dela Cruz',    rsbsa:'02-001-002', sex:'Male',   ageGroup:'36-59', municipality:'Cauayan City',    province:'Isabela',        farmSize:0.50, crop:'Peanut',     fca:'Cauayan FCA',     ip:false, pwd:false, gida:false, interventions:['Peanut Seeds','BCA'],            createdAt:'2026-05-06' },
      { id:'b3',  name:'Lucia Ramirez',     rsbsa:'02-001-003', sex:'Female', ageGroup:'60+',   municipality:'Cauayan City',    province:'Isabela',        farmSize:0.30, crop:'Watermelon', fca:'None',            ip:false, pwd:false, gida:false, interventions:['Watermelon Seeds'],              createdAt:'2026-05-06' },
      { id:'b4',  name:'Pedro Aquino',      rsbsa:'02-002-001', sex:'Male',   ageGroup:'18-35', municipality:'Ilagan City',     province:'Isabela',        farmSize:0.40, crop:'Mungbean',   fca:'Ilagan FCA',      ip:false, pwd:false, gida:false, interventions:['Mungbean Seeds','INS-1hp'],      createdAt:'2026-05-07' },
      { id:'b5',  name:'Rosa Mangubat',     rsbsa:'02-002-002', sex:'Female', ageGroup:'36-59', municipality:'Ilagan City',     province:'Isabela',        farmSize:0.20, crop:'Ube',        fca:'Ilagan FCA',      ip:true,  pwd:false, gida:false, interventions:['Ube Planting Materials'],         createdAt:'2026-05-07' },
      { id:'b6',  name:'Carlos Bautista',   rsbsa:'02-003-001', sex:'Male',   ageGroup:'60+',   municipality:'Santiago City',   province:'Isabela',        farmSize:0.50, crop:'Onion',      fca:'Santiago FCA',    ip:false, pwd:false, gida:false, interventions:['Onion Materials'],               createdAt:'2026-05-07' },
      { id:'b7',  name:'Elena Padua',       rsbsa:'02-003-002', sex:'Female', ageGroup:'36-59', municipality:'Santiago City',   province:'Isabela',        farmSize:0.35, crop:'Peanut',     fca:'None',            ip:false, pwd:false, gida:true,  interventions:['Peanut Seeds','Biofertilizer'],  createdAt:'2026-05-08' },
      { id:'b8',  name:'Antonio Viray',     rsbsa:'02-004-001', sex:'Male',   ageGroup:'36-59', municipality:'Tumauini',        province:'Isabela',        farmSize:0.45, crop:'Mungbean',   fca:'Tumauini FCA',    ip:false, pwd:false, gida:false, interventions:['Mungbean Seeds','INS-3hp'],      createdAt:'2026-05-08' },
      { id:'b9',  name:'Felisa Torres',     rsbsa:'02-005-001', sex:'Female', ageGroup:'18-35', municipality:'Cabagan',         province:'Isabela',        farmSize:0.25, crop:'Peanut',     fca:'None',            ip:false, pwd:false, gida:false, interventions:['Peanut Seeds'],                  createdAt:'2026-05-09' },
      { id:'b10', name:'Roberto Lim',       rsbsa:'02-006-001', sex:'Male',   ageGroup:'36-59', municipality:'Tuguegarao City', province:'Cagayan',        farmSize:0.40, crop:'Mango',      fca:'Cagayan Mango FCA',ip:false,pwd:false, gida:false, interventions:['Mango Induction'],               createdAt:'2026-05-09' },
      { id:'b11', name:'Natividad Cruz',    rsbsa:'02-006-002', sex:'Female', ageGroup:'60+',   municipality:'Tuguegarao City', province:'Cagayan',        farmSize:0.30, crop:'Watermelon', fca:'None',            ip:false, pwd:true,  gida:false, interventions:['Watermelon Seeds','Rain Shelter'],createdAt:'2026-05-09' },
      { id:'b12', name:'Gregorio Manuel',   rsbsa:'02-007-001', sex:'Male',   ageGroup:'36-59', municipality:'Aparri',          province:'Cagayan',        farmSize:0.50, crop:'Mungbean',   fca:'Aparri FCA',      ip:false, pwd:false, gida:false, interventions:['Mungbean Seeds'],                createdAt:'2026-05-10' },
      { id:'b13', name:'Divina Soriano',    rsbsa:'02-008-001', sex:'Female', ageGroup:'18-35', municipality:'Lallo',           province:'Cagayan',        farmSize:0.25, crop:'Peanut',     fca:'Lallo FCA',       ip:true,  pwd:false, gida:true,  interventions:['Peanut Seeds','BCA'],            createdAt:'2026-05-10' },
      { id:'b14', name:'Marcelo Pascual',   rsbsa:'02-009-001', sex:'Male',   ageGroup:'36-59', municipality:'Bayombong',       province:'Nueva Vizcaya',  farmSize:0.45, crop:'Mungbean',   fca:'Bayombong FCA',   ip:false, pwd:false, gida:false, interventions:['Mungbean Seeds','Biofertilizer'],createdAt:'2026-05-10' },
      { id:'b15', name:'Cora Fernandez',    rsbsa:'02-009-002', sex:'Female', ageGroup:'36-59', municipality:'Bayombong',       province:'Nueva Vizcaya',  farmSize:0.20, crop:'Ube',        fca:'Bayombong FCA',   ip:false, pwd:false, gida:false, interventions:['Ube Planting Materials','INS-2hp'],createdAt:'2026-05-11' },
    ];
    this.set(this.KEYS.BENEFICIARIES, benes);

    // Distributions
    const dists = [
      { id:'d1',  beneficiaryId:'b1',  beneficiaryName:'Maria Santos',    municipality:'Cauayan City',    province:'Isabela',   inputType:'Seed',         product:'Mungbean (Pag-asa 7)',   quantity:5,  unit:'kg',    distributionDate:'2026-05-20', focalPerson:'Engr. Rolando Pedro', status:'Distributed', establishment:'Good', createdAt:'2026-05-20' },
      { id:'d2',  beneficiaryId:'b2',  beneficiaryName:'Juan dela Cruz',   municipality:'Cauayan City',    province:'Isabela',   inputType:'Seed',         product:'Peanut',                 quantity:8,  unit:'kg',    distributionDate:'2026-05-20', focalPerson:'Dr. Bryan Sibayan',   status:'Distributed', establishment:'Good', createdAt:'2026-05-20' },
      { id:'d3',  beneficiaryId:'b3',  beneficiaryName:'Lucia Ramirez',    municipality:'Cauayan City',    province:'Isabela',   inputType:'Seed',         product:'Watermelon',             quantity:2,  unit:'packs', distributionDate:'2026-05-21', focalPerson:'Ms. Bethzaida Duruin',status:'Distributed', establishment:'Fair', createdAt:'2026-05-21' },
      { id:'d4',  beneficiaryId:'b4',  beneficiaryName:'Pedro Aquino',     municipality:'Ilagan City',     province:'Isabela',   inputType:'Seed',         product:'Mungbean (Pag-asa 7)',   quantity:5,  unit:'kg',    distributionDate:'2026-05-21', focalPerson:'Engr. Rolando Pedro', status:'Distributed', establishment:'Good', createdAt:'2026-05-21' },
      { id:'d5',  beneficiaryId:'b5',  beneficiaryName:'Rosa Mangubat',    municipality:'Ilagan City',     province:'Isabela',   inputType:'Planting Mat', product:'Ube (NVES)',             quantity:50, unit:'pcs',   distributionDate:'2026-05-22', focalPerson:'NVES Manager',        status:'Distributed', establishment:'Good', createdAt:'2026-05-22' },
      { id:'d6',  beneficiaryId:'b7',  beneficiaryName:'Elena Padua',      municipality:'Santiago City',   province:'Isabela',   inputType:'Seed',         product:'Peanut',                 quantity:6,  unit:'kg',    distributionDate:'2026-05-22', focalPerson:'Dr. Bryan Sibayan',   status:'Distributed', establishment:'Good', createdAt:'2026-05-22' },
      { id:'d7',  beneficiaryId:'b8',  beneficiaryName:'Antonio Viray',    municipality:'Tumauini',        province:'Isabela',   inputType:'Seed',         product:'Mungbean (Pag-asa 7)',   quantity:5,  unit:'kg',    distributionDate:'2026-05-23', focalPerson:'Engr. Rolando Pedro', status:'Distributed', establishment:'Fair', createdAt:'2026-05-23' },
      { id:'d8',  beneficiaryId:'b9',  beneficiaryName:'Felisa Torres',    municipality:'Cabagan',         province:'Isabela',   inputType:'Seed',         product:'Peanut',                 quantity:5,  unit:'kg',    distributionDate:'2026-05-23', focalPerson:'Dr. Bryan Sibayan',   status:'Distributed', establishment:'Good', createdAt:'2026-05-23' },
      { id:'d9',  beneficiaryId:'b12', beneficiaryName:'Gregorio Manuel',  municipality:'Aparri',          province:'Cagayan',   inputType:'Seed',         product:'Mungbean (Pag-asa 7)',   quantity:5,  unit:'kg',    distributionDate:'2026-05-24', focalPerson:'Engr. Rolando Pedro', status:'Distributed', establishment:'Poor', createdAt:'2026-05-24' },
      { id:'d10', beneficiaryId:'b13', beneficiaryName:'Divina Soriano',   municipality:'Lallo',           province:'Cagayan',   inputType:'Seed',         product:'Peanut',                 quantity:5,  unit:'kg',    distributionDate:'2026-05-24', focalPerson:'Dr. Bryan Sibayan',   status:'Distributed', establishment:'Good', createdAt:'2026-05-24' },
      { id:'d11', beneficiaryId:'b14', beneficiaryName:'Marcelo Pascual',  municipality:'Bayombong',       province:'Nueva Vizcaya',inputType:'Seed',       product:'Mungbean (Pag-asa 7)',   quantity:5,  unit:'kg',    distributionDate:'2026-05-25', focalPerson:'Engr. Rolando Pedro', status:'Distributed', establishment:'Good', createdAt:'2026-05-25' },
      { id:'d12', beneficiaryId:'b1',  beneficiaryName:'Maria Santos',     municipality:'Cauayan City',    province:'Isabela',   inputType:'Biofertilizer',product:'Biofertilizer (BFAR)',   quantity:1,  unit:'kg',    distributionDate:'2026-05-20', focalPerson:'Banner Program',      status:'Distributed', establishment:'',    createdAt:'2026-05-20' },
      { id:'d13', beneficiaryId:'b7',  beneficiaryName:'Elena Padua',      municipality:'Santiago City',   province:'Isabela',   inputType:'Biofertilizer',product:'Biofertilizer (BFAR)',   quantity:1,  unit:'kg',    distributionDate:'2026-05-22', focalPerson:'Banner Program',      status:'Distributed', establishment:'',    createdAt:'2026-05-22' },
      { id:'d14', beneficiaryId:'b14', beneficiaryName:'Marcelo Pascual',  municipality:'Bayombong',       province:'Nueva Vizcaya',inputType:'Biofertilizer',product:'Biofertilizer (BFAR)', quantity:1,  unit:'kg',    distributionDate:'2026-05-25', focalPerson:'Banner Program',      status:'Distributed', establishment:'',    createdAt:'2026-05-25' },
      { id:'d15', beneficiaryId:'b2',  beneficiaryName:'Juan dela Cruz',   municipality:'Cauayan City',    province:'Isabela',   inputType:'BCA',          product:'Trichoderma',            quantity:1,  unit:'sachet',distributionDate:'2026-05-20', focalPerson:'Regulatory Div.',     status:'Distributed', establishment:'',    createdAt:'2026-05-20' },
      { id:'d16', beneficiaryId:'b13', beneficiaryName:'Divina Soriano',   municipality:'Lallo',           province:'Cagayan',   inputType:'BCA',          product:'Trichoderma',            quantity:1,  unit:'sachet',distributionDate:'2026-05-24', focalPerson:'Regulatory Div.',     status:'Distributed', establishment:'',    createdAt:'2026-05-24' },
    ];
    this.set(this.KEYS.DISTRIBUTIONS, dists);

    // Mango induction
    const mangos = [
      { id:'mg1', municipality:'Tuguegarao City', province:'Cagayan', farmer:'Roberto Lim', rsbsa:'02-006-001', treesAssessed:20, treesReady:18, treesTreated:18, ageClass:'16-30 years', inducerUsed:'2kg KNO3+4kg Ca(NO3)2', inductionDate:'2026-05-25', day45Flowering:72, day90FruitSet:0, status:'Treated', createdAt:'2026-05-25' },
      { id:'mg2', municipality:'Lallo',           province:'Cagayan', farmer:'Miguel Santos (FCA)',rsbsa:'02-008-002', treesAssessed:35, treesReady:30, treesTreated:30, ageClass:'10-15 years', inducerUsed:'6kg CaNO3 (alternative)', inductionDate:'2026-05-26', day45Flowering:0, day90FruitSet:0, status:'Treated', createdAt:'2026-05-26' },
    ];
    this.set(this.KEYS.MANGO, mangos);

    // Technology
    const techs = [
      { id:'t1', type:'INS-1hp', municipality:'Ilagan City',     province:'Isabela',       beneficiary:'Pedro Aquino',   installDate:'2026-05-28', functional:true,  areaServed:0.8, issue:'',                     lastCheck:'2026-06-01', createdAt:'2026-05-28' },
      { id:'t2', type:'INS-2hp', municipality:'Cauayan City',    province:'Isabela',       beneficiary:'Cauayan FCA',    installDate:'2026-05-29', functional:true,  areaServed:2.0, issue:'',                     lastCheck:'2026-06-01', createdAt:'2026-05-29' },
      { id:'t3', type:'INS-3hp', municipality:'Tumauini',        province:'Isabela',       beneficiary:'Tumauini FCA',   installDate:'2026-05-30', functional:false, areaServed:0,   issue:'Broken pump seal',      lastCheck:'2026-06-01', createdAt:'2026-05-30' },
      { id:'t4', type:'Rain Shelter', municipality:'Cauayan City', province:'Isabela',     beneficiary:'Cauayan FCA',    installDate:'2026-05-29', functional:true,  areaServed:0.5, issue:'',                     lastCheck:'2026-06-01', createdAt:'2026-05-29' },
      { id:'t5', type:'Rain Shelter', municipality:'Tuguegarao City', province:'Cagayan',  beneficiary:'Natividad Cruz', installDate:'2026-05-30', functional:true,  areaServed:0.3, issue:'',                     lastCheck:'2026-06-01', createdAt:'2026-05-30' },
      { id:'t6', type:'SPIS',    municipality:'Ilagan City',     province:'Isabela',       beneficiary:'Ilagan FCA',     installDate:'2026-05-31', functional:true,  areaServed:1.5, issue:'',                     lastCheck:'2026-06-01', createdAt:'2026-05-31' },
      { id:'t7', type:'INS-1hp', municipality:'Lallo',           province:'Cagayan',       beneficiary:'Lallo FCA',      installDate:'2026-06-01', functional:false, areaServed:0,   issue:'Water source insufficient',lastCheck:'2026-06-01', createdAt:'2026-06-01' },
      { id:'t8', type:'INS-2hp', municipality:'Bayombong',       province:'Nueva Vizcaya', beneficiary:'Bayombong FCA',  installDate:'2026-06-01', functional:true,  areaServed:1.8, issue:'',                     lastCheck:'2026-06-01', createdAt:'2026-06-01' },
    ];
    this.set(this.KEYS.TECH, techs);

    // Superimposed trials
    const trials = [
      { id:'tr1', municipality:'Cauayan City',  province:'Isabela',      crop:'Mungbean', variety:'Pag-asa 7', pot:'Zero Tillage + Biofertilizer', plantingDate:'2026-05-21', farmer:'Cauayan FCA', baseline:'Drought-affected, loam soil', currentStatus:'Vegetative', yieldEst:0, costConventional:4500, costPOT:2800, lessonsNoted:'Zero tillage reduced land prep cost significantly', createdAt:'2026-05-21' },
      { id:'tr2', municipality:'Ilagan City',   province:'Isabela',      crop:'Mungbean', variety:'Pag-asa 7', pot:'Zero Tillage only',            plantingDate:'2026-05-22', farmer:'Pedro Aquino',farmer:'Ilagan FCA', baseline:'Sandy loam, low rainfall', currentStatus:'Vegetative', yieldEst:0, costConventional:4200, costPOT:2600, lessonsNoted:'Good germination with zero tillage', createdAt:'2026-05-22' },
      { id:'tr3', municipality:'Bayombong',     province:'Nueva Vizcaya',crop:'Mungbean', variety:'Pag-asa 7', pot:'Biofertilizer + BCA',          plantingDate:'2026-05-25', farmer:'Bayombong FCA',baseline:'Moderate drought, clay loam', currentStatus:'Germination', yieldEst:0, costConventional:5000, costPOT:3200, lessonsNoted:'BCA application at emergence stage observed', createdAt:'2026-05-25' },
    ];
    this.set(this.KEYS.TRIALS, trials);

    // Biofert & BCA
    const bioferts = [
      { id:'bf1', beneficiaryId:'b1',  beneficiaryName:'Maria Santos',   municipality:'Cauayan City',    province:'Isabela',       product:'Biofertilizer (BFAR)', type:'Biofertilizer', qty:1, unit:'kg', distDate:'2026-05-20', applied:true,  applyDate:'2026-05-22', areaApplied:0.25, cropResponse:'Improved leaf color observed', pestStatus:'None', createdAt:'2026-05-20' },
      { id:'bf2', beneficiaryId:'b7',  beneficiaryName:'Elena Padua',     municipality:'Santiago City',   province:'Isabela',       product:'Biofertilizer (BFAR)', type:'Biofertilizer', qty:1, unit:'kg', distDate:'2026-05-22', applied:true,  applyDate:'2026-05-24', areaApplied:0.35, cropResponse:'No visible difference yet',    pestStatus:'Mild aphid', createdAt:'2026-05-22' },
      { id:'bf3', beneficiaryId:'b14', beneficiaryName:'Marcelo Pascual', municipality:'Bayombong',       province:'Nueva Vizcaya', product:'Biofertilizer (BFAR)', type:'Biofertilizer', qty:1, unit:'kg', distDate:'2026-05-25', applied:false, applyDate:'',          areaApplied:0,    cropResponse:'',                             pestStatus:'', createdAt:'2026-05-25' },
      { id:'bf4', beneficiaryId:'b2',  beneficiaryName:'Juan dela Cruz',  municipality:'Cauayan City',    province:'Isabela',       product:'Trichoderma',          type:'BCA',           qty:1, unit:'sachet', distDate:'2026-05-20', applied:true,  applyDate:'2026-05-21', areaApplied:0.50, cropResponse:'Good plant vigour',           pestStatus:'None', createdAt:'2026-05-20' },
      { id:'bf5', beneficiaryId:'b13', beneficiaryName:'Divina Soriano',  municipality:'Lallo',           province:'Cagayan',       product:'Trichoderma',          type:'BCA',           qty:1, unit:'sachet', distDate:'2026-05-24', applied:true,  applyDate:'2026-05-25', areaApplied:0.25, cropResponse:'Early detection BCA applied',pestStatus:'Low armyworm', createdAt:'2026-05-24' },
    ];
    this.set(this.KEYS.BIOFERT, bioferts);

    // Pest surveillance
    const pests = [
      { id:'ps1', aew:'AEW-Cauayan-01', province:'Isabela',       municipality:'Cauayan City',    barangay:'Poblacion',    date:'2026-06-01', crop:'Mungbean',   growthStage:'Vegetative', pestObserved:'Aphids',         severity:'Low',      pctAffected:5,  cropCondition:'Healthy',  interventionReceived:true,  lat:16.9324, lng:121.7754, createdAt:'2026-06-01' },
      { id:'ps2', aew:'AEW-Ilagan-01',  province:'Isabela',       municipality:'Ilagan City',     barangay:'San Felipe',   date:'2026-06-01', crop:'Mungbean',   growthStage:'Vegetative', pestObserved:'Thrips',         severity:'Low',      pctAffected:8,  cropCondition:'Healthy',  interventionReceived:true,  lat:17.1441, lng:121.8894, createdAt:'2026-06-01' },
      { id:'ps3', aew:'AEW-Santiago-01',province:'Isabela',       municipality:'Santiago City',   barangay:'Centro',       date:'2026-06-02', crop:'Peanut',     growthStage:'Vegetative', pestObserved:'Leaf curl virus', severity:'Moderate', pctAffected:15, cropCondition:'Stressed', interventionReceived:true,  lat:16.6882, lng:121.5497, createdAt:'2026-06-02' },
      { id:'ps4', aew:'AEW-Tumauini-01',province:'Isabela',       municipality:'Tumauini',        barangay:'Rizal',        date:'2026-06-02', crop:'Mungbean',   growthStage:'Vegetative', pestObserved:'None',           severity:'None',     pctAffected:0,  cropCondition:'Stressed', interventionReceived:true,  lat:17.2735, lng:121.8018, createdAt:'2026-06-02' },
      { id:'ps5', aew:'AEW-Tugue-01',   province:'Cagayan',       municipality:'Tuguegarao City', barangay:'Ugac Norte',   date:'2026-06-02', crop:'Mango',      growthStage:'Flowering',  pestObserved:'Mango hoppers',  severity:'Low',      pctAffected:10, cropCondition:'Healthy',  interventionReceived:true,  lat:17.6131, lng:121.7270, createdAt:'2026-06-02' },
      { id:'ps6', aew:'AEW-Aparri-01',  province:'Cagayan',       municipality:'Aparri',          barangay:'Poblacion',    date:'2026-06-03', crop:'Mungbean',   growthStage:'Germination',pestObserved:'Damping off',    severity:'High',     pctAffected:25, cropCondition:'Wilting',  interventionReceived:false, lat:18.3549, lng:121.6387, createdAt:'2026-06-03' },
      { id:'ps7', aew:'AEW-Lallo-01',   province:'Cagayan',       municipality:'Lallo',           barangay:'Centro',       date:'2026-06-03', crop:'Peanut',     growthStage:'Vegetative', pestObserved:'Armyworm',       severity:'Moderate', pctAffected:12, cropCondition:'Stressed', interventionReceived:true,  lat:18.2071, lng:121.6432, createdAt:'2026-06-03' },
      { id:'ps8', aew:'AEW-Bayombong-01',province:'Nueva Vizcaya',municipality:'Bayombong',       barangay:'Poblacion',    date:'2026-06-03', crop:'Mungbean',   growthStage:'Vegetative', pestObserved:'None',           severity:'None',     pctAffected:0,  cropCondition:'Healthy',  interventionReceived:true,  lat:16.4832, lng:121.1543, createdAt:'2026-06-03' },
    ];
    this.set(this.KEYS.PEST, pests);

    // Field reports
    const reports = [
      { id:'fr1', aew:'AEW-Cauayan-01', province:'Isabela', municipality:'Cauayan City', periodStart:'2026-05-26', periodEnd:'2026-06-01', distributionsSummary:'12 beneficiaries received mungbean seeds; 3 received biofertilizer', establishmentSummary:'8 plots visited; 7 Good, 1 Fair establishment', pestSummary:'Low aphid incidence in 2 plots; no action needed', techSummary:'INS-2hp functional, Rain Shelter functional', issues:'Road to Barangay Dammang flooded for 2 days — 2 farms not visited', actions:'Will visit missed farms this week', status:'Submitted', createdAt:'2026-06-01' },
      { id:'fr2', aew:'AEW-Ilagan-01',  province:'Isabela', municipality:'Ilagan City',  periodStart:'2026-05-26', periodEnd:'2026-06-01', distributionsSummary:'8 beneficiaries received mungbean seeds; 2 received ube materials', establishmentSummary:'6 plots visited; all Good establishment', pestSummary:'Low thrips observed in 1 plot; advisory given', techSummary:'INS-1hp functional; SPIS operational', issues:'None', actions:'Continue regular monitoring', status:'Submitted', createdAt:'2026-06-01' },
      { id:'fr3', aew:'AEW-Aparri-01',  province:'Cagayan', municipality:'Aparri',       periodStart:'2026-05-26', periodEnd:'2026-06-01', distributionsSummary:'5 beneficiaries received mungbean seeds', establishmentSummary:'3 plots visited; 2 Good, 1 Poor (replanting recommended)', pestSummary:'HIGH: Damping off detected in 1 plot — 25% affected; BCA deployment requested', techSummary:'No technology installed in this municipality yet', issues:'Damping off outbreak in Brgy. Poblacion requires urgent BCA deployment', actions:'Requested BCA deployment from Regulatory; filed pest report', status:'Submitted', createdAt:'2026-06-02' },
    ];
    this.set(this.KEYS.FIELD_REPORTS, reports);

    // Issues
    const issues = [
      { id:'is1', dateDetected:'2026-05-30', description:'INS-3hp unit in Tumauini non-functional due to broken pump seal', responsible:'RAED / PAO-Isabela', status:'In Progress', action:'Procurement of spare part initiated; expected repair June 10', dateResolved:'', createdAt:'2026-05-30' },
      { id:'is2', dateDetected:'2026-06-01', description:'INS-1hp in Lallo has insufficient water source — pump not operational', responsible:'RAED', status:'Open', action:'Site re-validation being conducted for alternative water source', dateResolved:'', createdAt:'2026-06-01' },
      { id:'is3', dateDetected:'2026-06-02', description:'High damping off incidence (25%) in Aparri Brgy. Poblacion — BCA deployment needed urgently', responsible:'Regulatory / PAO-Cagayan', status:'Open', action:'BCA deployment order raised; AEW notified', dateResolved:'', createdAt:'2026-06-02' },
      { id:'is4', dateDetected:'2026-05-25', description:'Biofertilizer not yet applied by Marcelo Pascual (Bayombong) 10 days after distribution', responsible:'AEW-Bayombong-01', status:'In Progress', action:'Follow-up visit scheduled; extension advisory to be provided', dateResolved:'', createdAt:'2026-05-25' },
    ];
    this.set(this.KEYS.ISSUES, issues);

    // Weekly intervention timeline targets
    const timeline = [
      { id:'wk1', week:'Week 1', startDate:'2026-05-18', endDate:'2026-05-24', objective:'SO1', intervention:'Validated targeting and beneficiary enrollment', target:'Finalize CRVA-validated municipalities, confirm RSBSA beneficiaries, prepare distribution lists', owner:'PMED / Banner Programs / PAOs', status:'Completed', createdAt:'2026-05-18' },
      { id:'wk2', week:'Week 2', startDate:'2026-05-25', endDate:'2026-05-31', objective:'SO1', intervention:'Seeds, planting materials, and mango induction', target:'Distribute mitigation crop inputs; conduct mango tree assessment and induction for ready trees', owner:'HVCDP / Banner Programs / AEWs', status:'In Progress', createdAt:'2026-05-25' },
      { id:'wk3', week:'Week 3', startDate:'2026-06-01', endDate:'2026-06-07', objective:'SO2', intervention:'Technology installation and functionality checks', target:'Install or validate INS, rain shelters, SPIS, and mechanization sites; log non-functional units for action', owner:'RAED / PAOs / AEWs', status:'In Progress', createdAt:'2026-06-01' },
      { id:'wk4', week:'Week 4', startDate:'2026-06-08', endDate:'2026-06-14', objective:'SO3', intervention:'Biofertilizer, BCA, and pest surveillance rollout', target:'Record biofertilizer/BCA distribution and application; submit pest surveillance reports with GPS', owner:'Regulatory / Banner Programs / AEWs', status:'Pending', createdAt:'2026-06-08' },
      { id:'wk5', week:'Week 5', startDate:'2026-06-15', endDate:'2026-06-21', objective:'SO2', intervention:'Superimposed trials and POT monitoring', target:'Establish or update POT trial plots; record baseline, cost comparison, and crop growth stage', owner:'Research Division / PAOs', status:'Pending', createdAt:'2026-06-15' },
      { id:'wk6', week:'Week 6', startDate:'2026-06-22', endDate:'2026-06-28', objective:'ALL', intervention:'Weekly consolidation and corrective action review', target:'Submit weekly field reports, update issue tracker, and escalate overdue corrective actions', owner:'PMED / Management / Report Officers', status:'Pending', createdAt:'2026-06-22' },
    ];
    this.set(this.KEYS.TIMELINE, timeline);

    localStorage.setItem('darfo2_seeded', '1');
    console.log('Demo data seeded.');
  },

  // ── Computed summaries ─────────────────────────────────────────────
  summary() {
    const munis = this.get(this.KEYS.MUNICIPALITIES);
    const benes = this.get(this.KEYS.BENEFICIARIES);
    const dists = this.get(this.KEYS.DISTRIBUTIONS);
    const mangos = this.get(this.KEYS.MANGO);
    const techs  = this.get(this.KEYS.TECH);
    const trials = this.get(this.KEYS.TRIALS);
    const bioferts = this.get(this.KEYS.BIOFERT);
    const pests  = this.get(this.KEYS.PEST);

    const seedDists = dists.filter(d => d.inputType === 'Seed' || d.inputType === 'Planting Mat');
    const bioDistrib = bioferts.filter(b => b.type === 'Biofertilizer');
    const bcaDistrib = bioferts.filter(b => b.type === 'BCA');

    const totalAreaPlanted = seedDists.reduce((s,d) => {
      const b = benes.find(b => b.id === d.beneficiaryId);
      return s + (b ? b.farmSize : 0);
    }, 0);

    const estGood  = seedDists.filter(d => d.establishment === 'Good').length;
    const estTotal = seedDists.filter(d => d.establishment).length;
    const estRate  = estTotal > 0 ? Math.round(estGood/estTotal*100) : 0;

    const funcTech   = techs.filter(t => t.functional).length;
    const techRate   = techs.length > 0 ? Math.round(funcTech/techs.length*100) : 0;
    const areaServed = techs.filter(t=>t.functional).reduce((s,t) => s + (t.areaServed||0), 0);

    const bioApplied = bioDistrib.filter(b => b.applied).length;
    const bcaApplied = bcaDistrib.filter(b => b.applied).length;
    const bioRate    = bioDistrib.length > 0 ? Math.round(bioApplied/bioDistrib.length*100) : 0;
    const bcaRate    = bcaDistrib.length > 0 ? Math.round(bcaApplied/bcaDistrib.length*100) : 0;

    const womenCount    = benes.filter(b => b.sex === 'Female').length;
    const smallholdersCount = benes.filter(b => b.farmSize <= 0.5).length;
    const financeRows = [...dists, ...mangos, ...techs, ...trials, ...bioferts].filter(r =>
      r.budgetAmount || r.obligatedAmount || r.disbursedAmount
    );
    const budgetTotal = financeRows.reduce((s,r) => s + (+r.budgetAmount || 0), 0);
    const obligatedTotal = financeRows.reduce((s,r) => s + (+r.obligatedAmount || 0), 0);
    const disbursedTotal = financeRows.reduce((s,r) => s + (+r.disbursedAmount || 0), 0);

    return {
      munisValidated: munis.filter(m=>m.confirmed).length,
      munisTotal: munis.length,
      beneficiariesCount: benes.length,
      fcasCount: [...new Set(benes.map(b=>b.fca).filter(f=>f&&f!=='None'))].length,
      areaPlantedHa: +totalAreaPlanted.toFixed(2),
      seedsDistributed: seedDists.length,
      mangoTreesTreated: mangos.reduce((s,m)=>s+m.treesTreated,0),
      techSitesCount: techs.length,
      bioDistributed: bioDistrib.length,
      bcaDistributed: bcaDistrib.length,
      pestReports: pests.length,
      cropEstablishmentRate: estRate,
      techFunctionalityRate: techRate,
      areaServedHa: +areaServed.toFixed(2),
      biofertAdoptionRate: bioRate,
      bcaAdoptionRate: bcaRate,
      trialsEstablished: trials.length,
      womenCount,
      womenPct: benes.length > 0 ? Math.round(womenCount/benes.length*100) : 0,
      smallholdersCount,
      smallholdersPct: benes.length > 0 ? Math.round(smallholdersCount/benes.length*100) : 0,
      budgetTotal: +budgetTotal.toFixed(2),
      obligatedTotal: +obligatedTotal.toFixed(2),
      disbursedTotal: +disbursedTotal.toFixed(2),
      financeRecordsCount: financeRows.length,
      obligationRate: budgetTotal > 0 ? Math.round(obligatedTotal/budgetTotal*100) : 0,
      disbursementRate: obligatedTotal > 0 ? Math.round(disbursedTotal/obligatedTotal*100) : 0,
    };
  }
};

// Auto-seed on first load
document.addEventListener('DOMContentLoaded', () => {
  DB.seed();
  DB.ensureTimestamps();
});
