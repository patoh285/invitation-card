// supabase.js — Firebase-style wrapper over Supabase for the RUracio invite.
// Every table is { id text primary key, data jsonb }.

const SUPABASE_URL = 'https://ejapzxlkufwzvmxrepkd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_db9ilBSiVR97A3WIUWme0Q_Qz9Zz8K_';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
// Separate in-memory client used only to create other admins without logging the current one out.
const sb2 = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: 'sb-secondary' },
});

const BACKEND = 'supabase';
const mkAuth = (client) => ({ client, currentUser: null });
const auth = mkAuth(sb);
const secondaryAuth = mkAuth(sb2);
const db = {};

/* ---------- errors ---------- */
function fail(e) {
  const code = e && (e.code === '42501' ? 'permission-denied' : e.code);
  throw { code: code || 'error', message: (e && e.message) || 'Something went wrong.' };
}

/* ---------- refs & snapshots ---------- */
const doc = (_, col, id) => ({ col, id });
const collection = (_, col) => ({ col });
const newId = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10));

const docSnap = (row) => ({
  id: row ? row.id : undefined,
  exists: () => !!row,
  data: () => (row ? row.data : null),
});
const colSnap = (rows) => ({
  docs: rows.map((r) => ({ id: r.id, exists: () => true, data: () => r.data })),
});

/* ---------- reads & writes ---------- */
async function getDoc(r) {
  const { data, error } = await sb.from(r.col).select('*').eq('id', r.id).maybeSingle();
  if (error) fail(error);
  return docSnap(data);
}

async function setDoc(r, value) {
  const { error } = await sb.from(r.col).upsert({ id: r.id, data: value });
  if (error) fail(error);
}

async function updateDoc(r, value) {
  const current = await getDoc(r);
  if (!current.exists()) throw { code: 'not-found', message: 'Document not found.' };
  await setDoc(r, { ...current.data(), ...value });
}

async function deleteDoc(r) {
  const { data, error } = await sb.from(r.col).delete().eq('id', r.id).select('id');
  if (error) fail(error);
  if (!data || !data.length) throw { code: 'permission-denied', message: 'Nothing was deleted.' };
}

async function addDoc(c, value) {
  const id = newId();
  // No .select() here: guests can insert messages but RLS does not let them read them back.
  const { error } = await sb.from(c.col).insert({ id, data: value });
  if (error) fail(error);
  return { id };
}

async function rpc(name, args) {
  const { data, error } = await sb.rpc(name, args || {});
  if (error) fail(error);
  return data;
}
const ownerExists = () => rpc('owner_exists');
const claimOwner = () => rpc('claim_owner');

/* ---------- live data (realtime + slow fallback poll) ---------- */
let _chan = 0;
function onSnapshot(ref, onNext, onError) {
  let active = true, busy = false, lastJson = null;
  const isDoc = ref.id !== undefined;

  const load = async () => {
    if (!active || busy) return;
    busy = true;
    try {
      let q = sb.from(ref.col).select('*');
      let payload;
      if (isDoc) {
        const { data, error } = await q.eq('id', ref.id).maybeSingle();
        if (error) throw error;
        payload = data;
      } else {
        const { data, error } = await q;
        if (error) throw error;
        payload = data;
      }
      const json = JSON.stringify(payload);
      if (active && json !== lastJson) {
        lastJson = json;
        onNext(isDoc ? docSnap(payload) : colSnap(payload));
      }
    } catch (e) {
      if (active && onError) { try { onError(e); } catch (_) {} }
    }
    busy = false;
  };

  const opts = { event: '*', schema: 'public', table: ref.col };
  if (isDoc) opts.filter = 'id=eq.' + ref.id;
  const ch = sb.channel('rt-' + ref.col + '-' + (++_chan))
    .on('postgres_changes', opts, load)
    .subscribe();
  const timer = setInterval(load, 30000);
  load();

  return () => { active = false; clearInterval(timer); sb.removeChannel(ch); };
}

// Guest ticket lookup: goes through get_booking() so guests never read the bookings table.
function watchBooking(id, onNext) {
  let active = true, lastJson = null;
  const load = async () => {
    if (!active) return;
    try {
      const data = await rpc('get_booking', { p_id: id });
      const json = JSON.stringify(data);
      if (active && json !== lastJson) { lastJson = json; onNext(data || null); }
    } catch (e) {}
  };
  load();
  const timer = setInterval(load, 5000);
  return () => { active = false; clearInterval(timer); };
}

/* ---------- auth ---------- */
function onAuthStateChanged(authObj, cb) {
  let lastUid;
  const emit = (session) => {
    const uid = session ? session.user.id : null;
    if (uid === lastUid) return;           // ignore token-refresh / tab-focus repeats
    lastUid = uid;
    const user = session ? { uid, email: session.user.email } : null;
    authObj.currentUser = user;
    setTimeout(() => cb(user), 0);         // never call Supabase inside the auth callback itself
  };
  const { data: { subscription } } = authObj.client.auth.onAuthStateChange((_e, s) => emit(s));
  authObj.client.auth.getSession().then(({ data: { session } }) => emit(session));
  return () => subscription.unsubscribe();
}

async function createUserWithEmailAndPassword(authObj, email, pw) {
  const { data, error } = await authObj.client.auth.signUp({ email, password: pw });
  if (error) {
    const exists = error.code === 'user_already_exists' || /already registered/i.test(error.message);
    throw { code: exists ? 'auth/email-already-in-use' : (error.code || 'auth/error'), message: error.message };
  }
  if (!data.user) throw { code: 'auth/error', message: 'Could not create the user.' };
  if (!data.session && authObj === auth)
    throw { code: 'auth/confirm-email', message: 'Turn off "Confirm email" in Supabase Auth settings.' };
  return { user: { uid: data.user.id, email: data.user.email } };
}

async function signInWithEmailAndPassword(authObj, email, pw) {
  const { data, error } = await authObj.client.auth.signInWithPassword({ email, password: pw });
  if (error) throw { code: error.code || 'auth/error', message: error.message };
  return { user: { uid: data.user.id, email: data.user.email } };
}

async function signOut(authObj) {
  await authObj.client.auth.signOut();
}

/* ---------- expose ---------- */
Object.assign(window, {
  BACKEND, db, auth, secondaryAuth, doc, collection,
  getDoc, setDoc, updateDoc, deleteDoc, addDoc, onSnapshot, watchBooking,
  rpc, ownerExists, claimOwner,
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
});