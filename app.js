/* ================================================================
   RUracio Invite — combined app logic (fixed for Supabase)
   - Translations
   - Shared helpers
   - Guest side (home, 3-step book, ticket, photos, info)
   - Admin dashboard
   - Routing + live data
   Requires supabase.js (the Supabase wrapper) loaded first.
   ================================================================ */

/* ================================================================
   1. TRANSLATIONS
   ================================================================ */
const T = {
  en: {
    // Header and menu
    kicker: "You are invited",
    lang: "Kiswahili",
    nHome: "Home",
    nBook: "Book seats",
    nTicket: "My ticket",
    nPhotos: "Photos",
    nAsk: "Questions",
    nAdmin: "Admin",
    bookNow: "Book your seats",
    noPhotos: "No photos yet.",
    copyLink: "Copy my ticket link",

    // Home page
    about: "About the event",
    when: "When",
    where: "Where",
    map: "Open map",
    cal: "Add to calendar",
    share: "Share",
    copied: "Link copied",
    nodate: "The date is not set yet.",
    seatsT: "Seats",
    left: "seats left",
    full: "Fully booked",

    // Booking form
    res: "Reserve your seats",
    ppl: "How many people?",
    nm: "Full name",
    ph: "Phone (or N/A)",
    mp: "M-Pesa confirmation code",
    send: "Send for confirmation",
    tot: "Total to pay",
    pay: "Pay to",

    // Ticket page
    chk: "Check my booking",
    chkBtn: "Check status",
    chkHint: "Enter the M-Pesa code you paid with. This page updates by itself once your payment is approved.",
    nf: "No booking found with that code yet.",
    pend: "Payment pending. We are confirming it. This page will update by itself.",
    rej: "This payment could not be confirmed. Please contact us.",
    dl: "Download my card",
    bad: "Fill every name and phone box (N/A allowed) and a valid M-Pesa code.",
    dup: "That M-Pesa code is already used.",
    fullm: "Not enough seats left.",
    ok: "Booking received. We will confirm your payment shortly.",

    // Ticket
    invite: "Your invitation",
    show: "Show this code at the entrance",

    // Info page
    ask: "Questions and feedback",
    askHint: "Ask the organisers anything or share your feedback.",
    askKind: "What is it?",
    kindQ: "Question",
    kindF: "Feedback",
    yname: "Your name (optional)",
    ycontact: "Phone or email so we can reply (optional)",
    ytext: "Your message",
    asend: "Send message",
    asent: "Thank you, your message was sent.",
    abad: "Please write your message first.",
    aerr: "Could not send. Please try again.",

    // FAQ
    faq: "Frequently asked questions",
    nofaq: "No questions answered yet.",

    // Photos / countdown
    gallery: "Photos",
    close: "Close",
    days: "days",
    hrs: "hrs",
    min: "min",
    sec: "sec",
    started: "The event has started",

    // New UI
    nInfo: "Info",
    viewAll: "View all",
    stepPeople: "People",
    stepDetails: "Details",
    stepPay: "Pay",
    next: "Next →",
    back: "← Back",
    nmTitle: "Who is coming?",
    payTitle: "Payment",
    footerAdmin: "Admin",
    footerShare: "Share",
  },

  sw: {
    kicker: "Umealikwa",
    lang: "English",
    nHome: "Nyumbani",
    nBook: "Weka viti",
    nTicket: "Tiketi yangu",
    nPhotos: "Picha",
    nAsk: "Maswali",
    nAdmin: "Msimamizi",
    bookNow: "Weka viti vyako",
    noPhotos: "Hakuna picha bado.",
    copyLink: "Nakili kiungo cha tiketi yangu",

    about: "Kuhusu tukio",
    when: "Lini",
    where: "Wapi",
    map: "Fungua ramani",
    cal: "Ongeza kwenye kalenda",
    share: "Shiriki",
    copied: "Kiungo kimenakiliwa",
    nodate: "Tarehe haijawekwa bado.",
    seatsT: "Viti",
    left: "viti vimebaki",
    full: "Viti vimejaa",

    res: "Weka nafasi yako",
    ppl: "Watu wangapi?",
    nm: "Jina kamili",
    ph: "Simu (au N/A)",
    mp: "Nambari ya uthibitisho wa M-Pesa",
    send: "Tuma kwa uthibitisho",
    tot: "Jumla ya kulipa",
    pay: "Lipa kwa",

    chk: "Angalia nafasi yangu",
    chkBtn: "Angalia hali",
    chkHint: "Weka nambari ya M-Pesa uliyolipia. Ukurasa huu utajisasisha malipo yakithibitishwa.",
    nf: "Hakuna nafasi iliyopatikana kwa nambari hiyo bado.",
    pend: "Malipo yanasubiri. Tunayathibitisha. Ukurasa huu utajisasisha.",
    rej: "Malipo hayakuthibitishwa. Tafadhali wasiliana nasi.",
    dl: "Pakua kadi yangu",
    bad: "Jaza kila jina na simu (N/A inaruhusiwa) na nambari sahihi ya M-Pesa.",
    dup: "Nambari hiyo ya M-Pesa imetumika.",
    fullm: "Viti havitoshi.",
    ok: "Nafasi imepokelewa. Tutathibitisha malipo yako hivi karibuni.",

    invite: "Mwaliko wako",
    show: "Onyesha nambari hii mlangoni",

    ask: "Maswali na maoni",
    askHint: "Waulize waandaaji chochote au toa maoni yako.",
    askKind: "Ni nini?",
    kindQ: "Swali",
    kindF: "Maoni",
    yname: "Jina lako (si lazima)",
    ycontact: "Simu au barua pepe ili tukujibu (si lazima)",
    ytext: "Ujumbe wako",
    asend: "Tuma ujumbe",
    asent: "Asante, ujumbe wako umetumwa.",
    abad: "Tafadhali andika ujumbe kwanza.",
    aerr: "Imeshindwa kutuma. Jaribu tena.",

    faq: "Maswali yanayoulizwa mara kwa mara",
    nofaq: "Hakuna maswali yaliyojibiwa bado.",

    gallery: "Picha",
    close: "Funga",
    days: "siku",
    hrs: "saa",
    min: "dak",
    sec: "sek",
    started: "Tukio limeanza",

    nInfo: "Taarifa",
    viewAll: "Ona zote",
    stepPeople: "Watu",
    stepDetails: "Maelezo",
    stepPay: "Lipa",
    next: "Endelea →",
    back: "← Rudi",
    nmTitle: "Nani anakuja?",
    payTitle: "Malipo",
    footerAdmin: "Msimamizi",
    footerShare: "Shiriki",
  },
};

/* ================================================================
   2. HELPERS
   ================================================================ */
const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = (x) => "KES " + Number(x || 0).toLocaleString();

const DEFAULT_C = {
  title: "Your Event Title", host: "", description: "", when: "", venue: "", map: "",
  price: 1000, seats: 100, phone: "", paybill: "", account: "", whatsapp: "",
};

const S = { C: { ...DEFAULT_C }, taken: 0, faq: [], header: "", photos: [], sections: [], lg: "en" };
const t = (key) => T[S.lg][key];

function whenText() {
  if (!S.C.when) return "";
  const d = new Date(S.C.when);
  if (isNaN(d)) return S.C.when;
  return d.toLocaleString(S.lg == "sw" ? "sw-KE" : "en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/* ================================================================
   3. INTERFACE HELPERS
   ================================================================ */
function toast(text, kind = "ok") {
  const el = document.createElement("div");
  el.className = "toast " + (kind == "bad" ? "bad" : "");
  el.textContent = text;
  $("toast").appendChild(el);
  setTimeout(() => el.remove(), 3800);
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) {}
  try {
    const box = document.createElement("textarea");
    box.value = text; document.body.appendChild(box); box.select();
    const ok = document.execCommand("copy"); box.remove(); return ok;
  } catch (e) { return false; }
}

function ago(ms) {
  if (!ms) return "";
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + " min ago";
  if (s < 86400) return Math.floor(s / 3600) + " h ago";
  return Math.floor(s / 86400) + " d ago";
}

function resizeImage(file, max, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.width * r));
      c.height = Math.max(1, Math.round(img.height * r));
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      let q = quality, data = c.toDataURL("image/jpeg", q);
      while (data.length > 800000 && q > 0.35) { q -= 0.1; data = c.toDataURL("image/jpeg", q); }
      data.length > 800000
        ? reject(new Error("That picture is too large. Try a smaller one."))
        : resolve(data);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("That file is not a picture.")); };
    img.src = url;
  });
}

/* ================================================================
   4. GUEST STATE
   ================================================================ */
let people = 1;
let step = 1;
let unwatch = null;
let watching = false;
let last = null;
let curId = "";
let viewing = 0;

/* ================================================================
   5. DRAW (guest view)
   ================================================================ */
function draw() {
  const C = S.C;

  document.querySelectorAll("[data-t]").forEach((e) => (e.textContent = t(e.dataset.t)));
  document.querySelectorAll("[data-p]").forEach((e) => (e.placeholder = t(e.dataset.p)));

  $("lg").textContent = t("lang");
  $("flang").textContent = t("lang");
  $("hn").textContent = C.title;
  $("hh").textContent = C.host ? (S.lg == "sw" ? "Mwenyeji: " : "Hosted by ") + C.host : "";
  $("ab").textContent = C.description;
  $("ab").hidden = !C.description;
  $("mw").textContent = whenText() || "—";
  $("mv").textContent = C.venue || "—";

  const whenTxt = whenText();
  $("hwv").innerHTML = whenTxt
    ? `<b>${esc(whenTxt)}</b>${C.venue ? " · " + esc(C.venue) : ""}`
    : esc(C.venue || "");

  const okMap = /^https?:\/\//.test(C.map || "");
  $("amap").hidden = !okMap;
  if (okMap) $("amap").href = C.map;

  const left = Math.max(0, C.seats - S.taken);
  $("cnt").textContent = left ? left + " " + t("left") : t("full");
  $("sbar").style.width = Math.min(100, Math.round((S.taken / Math.max(1, C.seats)) * 100)) + "%";

  $("paybox").innerHTML =
    t("pay") + ": <b>" + esc(C.phone || "—") + "</b>" +
    (C.paybill ? `<br>Paybill <b>${esc(C.paybill)}</b> · Acc <b>${esc(C.account)}</b>` : "");

  // Home photo strip
  const strip = S.photos.slice(0, 6);
  $("gg-strip").innerHTML = strip.length
    ? strip.map((p, i) =>
        `<button class="ph" data-i="${i}"><img src="${p.data}" alt="${esc(p.caption)}" loading="lazy"></button>`).join("")
    : "";
  $("photoStripCard").hidden = !strip.length;
  $("viewAllLink").hidden = S.photos.length <= 6;

  // Full photo grid (photos page)
  $("gg").innerHTML = S.photos.length
    ? S.photos.map((p, i) =>
        `<button class="ph" data-i="${i}"><img src="${p.data}" alt="${esc(p.caption)}" loading="lazy"></button>`).join("")
    : `<p class="mut">${t("noPhotos")}</p>`;

  // Home FAQ preview
  const prev = S.faq.slice(0, 3);
  $("fq-preview").innerHTML = prev.length
    ? prev.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")
    : `<p class="mut">${t("nofaq")}</p>`;
  $("faqPreviewCard").hidden = !S.faq.length;

  // Info page: sections + full FAQ
  $("infoSections").innerHTML = S.sections.map((s) =>
    `<section class="card"><h2>${esc(s.title)}</h2><p class="desc">${esc(s.text)}</p></section>`).join("");
  $("fq").innerHTML = S.faq.length
    ? S.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")
    : `<p class="mut">${t("nofaq")}</p>`;

  // Hero background
  $("hero").style.backgroundImage = S.header
    ? `linear-gradient(rgba(10,30,20,.62), rgba(10,30,20,.85)), url("${S.header}")` : "";

  // Booking step 1
  drawPeopleGrid();

  // Ticket result (if watching)
  if (watching) renderResult(last);
  tick();
  redraw();
}

function drawPeopleGrid() {
  const left = Math.max(0, S.C.seats - S.taken);
  const max = Math.min(10, Math.max(1, left));
  if (people > max) people = max;
  $("peopleGrid").innerHTML = Array.from({ length: max }, (_, i) =>
    `<button data-n="${i + 1}" class="${i + 1 === people ? "on" : ""}">${i + 1}</button>`).join("");
  $("priceHint").textContent = t("tot") + ": " + money(people * S.C.price);
}

function drawRows() {
  const old = [...document.querySelectorAll("#rows input")].map((i) => i.value);
  $("rows").innerHTML = Array.from({ length: people }, (_, i) => `
    <div class="row2">
      <input placeholder="${t("nm")} ${i + 1}" value="${esc(old[i * 2] || "")}" maxlength="80">
      <input placeholder="${t("ph")}" inputmode="tel" value="${esc(old[i * 2 + 1] || "")}" maxlength="30">
    </div>`).join("");
  $("tot").textContent = t("tot") + ": " + money(people * S.C.price);
}

function say(id, text, good) {
  $(id).textContent = text;
  $(id).className = good ? "mut" : "err";
}

/* ================================================================
   6. COUNTDOWN
   ================================================================ */
function tick() {
  const el = $("cd");
  const ms = S.C.when ? new Date(S.C.when) - Date.now() : NaN;
  if (isNaN(ms)) { el.innerHTML = ""; return; }
  if (ms <= 0) { el.innerHTML = `<span>${t("started")}</span>`; return; }
  const s = Math.floor(ms / 1000);
  const parts = [
    [Math.floor(s / 86400), "days"],
    [Math.floor((s % 86400) / 3600), "hrs"],
    [Math.floor((s % 3600) / 60), "min"],
    [s % 60, "sec"],
  ];
  el.innerHTML = parts.map(([v, k]) => `<div><b>${v}</b><small>${t(k)}</small></div>`).join("");
}

/* ================================================================
   7. BOOKING (3-step flow)
   ================================================================ */
function goStep(n) {
  step = n;
  [1, 2, 3].forEach((k) => ($("step-" + k).hidden = k !== n));
  document.querySelectorAll("#steps li").forEach((li) => {
    const s = +li.dataset.step;
    li.classList.toggle("on", s === n);
    li.classList.toggle("done", s < n);
  });
  if (n === 1) drawPeopleGrid();
  if (n === 2) drawRows();
  if (n === 3) {
    $("tot").textContent = t("tot") + ": " + money(people * S.C.price);
  }
}

async function send() {
  const v = [...document.querySelectorAll("#rows input")].map((i) => i.value.trim());
  const mpesa = $("mp").value.trim().toUpperCase();
  if (v.some((x) => !x) || !/^[A-Z0-9]{8,12}$/.test(mpesa)) return say("msg", t("bad"));

  const list = Array.from({ length: people }, (_, i) => ({ n: v[i * 2], t: v[i * 2 + 1] }));
  $("go").disabled = true;
  try {
    // The database checks seats, price and duplicates in one atomic step.
    const res = await rpc("book_seats", { p_id: mpesa, p_people: list });
    if (!res || res.status !== "ok") throw (res && res.status) || "error";
    say("msg", "");
    toast(t("ok"));
    $("mp").value = "";
    location.hash = "#ticket-" + mpesa;
    watch(mpesa);
  } catch (e) {
    say("msg", e == "full" ? t("fullm") : e == "dup" ? t("dup") : e == "bad" ? t("bad") : t("aerr"));
  }
  $("go").disabled = false;
}

/* ================================================================
   8. TICKET
   ================================================================ */
function watch(raw) {
  const id = (raw || $("q").value).trim().toUpperCase();
  if (!id) return;
  if (unwatch) unwatch();
  curId = id;
  try { localStorage.setItem("event_code", id); } catch (e) {}
  watching = true;
  unwatch = watchBooking(id, (b) => { last = b; renderResult(b); });
}

function autoCheck() {
  let id = "";
  try { id = localStorage.getItem("event_code") || ""; } catch (e) {}
  if (id) { $("q").value = id; watch(id); }
}

function renderResult(b) {
  const C = S.C;
  if (!b) { $("res").innerHTML = `<p class="mut">${t("nf")}</p>`; return; }
  let html;
  if (b.status == "pending") {
    html = `<p><span class="badge pending">⏳ ${esc(b.code)}</span> ${t("pend")}</p>`;
  } else if (b.status == "rejected") {
    html = `<p class="err">${t("rej")}</p>`;
  } else {
    html = `
      <div class="ticket">
        <small class="mut">${esc(C.title)}</small>
        <h3>${t("invite")}</h3>
        ${b.people.map((p) => "<div><b>" + esc(p.n) + "</b></div>").join("")}
        <p class="mut">${esc(whenText())}<br>${esc(C.venue)}</p>
        <div class="code">${esc(b.code)}</div>
        <small class="mut">${t("show")}</small>
      </div>
      <button class="btn primary" id="dl">${t("dl")}</button>`;
  }
  $("res").innerHTML = html + `<p><button class="btn ghost sm" id="cl">${t("copyLink")}</button></p>`;
  if ($("dl")) $("dl").onclick = () => downloadCard(b);
  $("cl").onclick = async () => {
    const link = location.origin + location.pathname + "#ticket-" + curId;
    toast((await copyText(link)) ? t("copied") : link);
  };
}

function downloadCard(b) {
  const C = S.C;
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 420 + b.people.length * 40;
  const x = canvas.getContext("2d");
  x.fillStyle = "#fffdf6"; x.fillRect(0, 0, 800, canvas.height);
  x.fillStyle = "#123524"; x.fillRect(0, 0, 800, 120);
  x.strokeStyle = "#b8892f"; x.lineWidth = 8; x.strokeRect(14, 14, 772, canvas.height - 28);
  x.textAlign = "center";
  x.fillStyle = "#e0bb62"; x.font = "20px Georgia"; x.fillText("YOU ARE INVITED", 400, 60);
  x.fillStyle = "#f6efdc"; x.font = "bold 34px Georgia"; x.fillText(C.title.slice(0, 40), 400, 100);
  let y = 190;
  x.fillStyle = "#123524"; x.font = "bold 28px Georgia";
  b.people.forEach((p) => { x.fillText(p.n, 400, y); y += 40; });
  x.fillStyle = "#5d6b61"; x.font = "22px Georgia";
  x.fillText(whenText(), 400, y + 15);
  x.fillText(C.venue, 400, y + 50);
  x.fillStyle = "#b8892f"; x.font = "bold 48px Georgia"; x.fillText(b.code, 400, y + 120);
  x.fillStyle = "#5d6b61"; x.font = "18px Georgia"; x.fillText("Show this code at the entrance", 400, y + 155);
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "invitation-" + b.code + ".png";
  document.body.appendChild(a); a.click(); a.remove();
}

/* ================================================================
   9. CALENDAR & SHARE
   ================================================================ */
function addToCalendar() {
  if (!S.C.when || isNaN(new Date(S.C.when))) return toast(t("nodate"), "bad");
  const start = new Date(S.C.when), end = new Date(+start + 3 * 3600e3);
  const f = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART:" + f(start), "DTEND:" + f(end),
    "SUMMARY:" + S.C.title, "LOCATION:" + (S.C.venue || ""), "END:VEVENT", "END:VCALENDAR"];
  download("event.ics", lines.join("\r\n"), "text/calendar");
}

async function share() {
  const url = location.origin + location.pathname;
  if (navigator.share) { try { await navigator.share({ title: S.C.title, url }); } catch (e) {} return; }
  toast((await copyText(url)) ? t("copied") : url);
}

/* ================================================================
   10. ASK A QUESTION
   ================================================================ */
async function ask() {
  const text = $("at").value.trim();
  if (text.length < 3) return say("am", t("abad"));
  $("as").disabled = true;
  try {
    await addDoc(collection(db, "messages"), {
      kind: $("ak").value, name: $("an").value.trim().slice(0, 80),
      contact: $("ac").value.trim().slice(0, 80),
      text: text.slice(0, 1000), created: Date.now(), status: "new",
    });
    ["an", "ac", "at"].forEach((i) => ($(i).value = ""));
    say("am", ""); toast(t("asent"));
  } catch (e) { say("am", t("aerr")); }
  $("as").disabled = false;
}

/* ================================================================
   11. PHOTO VIEWER
   ================================================================ */
function openPhoto(i) {
  if (!S.photos.length) return;
  viewing = (i + S.photos.length) % S.photos.length;
  $("lbi").src = S.photos[viewing].data;
  $("lbc").textContent = S.photos[viewing].caption || "";
  $("lb").hidden = false;
}

/* ================================================================
   12. GUEST WIRING
   ================================================================ */
function initGuest() {
  $("peopleGrid").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-n]");
    if (!b) return;
    people = +b.dataset.n;
    drawPeopleGrid();
  });

  document.querySelectorAll("[data-next]").forEach((b) =>
    b.addEventListener("click", () => {
      if (step === 2) {
        const vals = [...document.querySelectorAll("#rows input")].map((i) => i.value.trim());
        if (vals.some((v) => !v)) return say("msg", t("bad"));
      }
      goStep(+b.dataset.next);
    })
  );
  document.querySelectorAll("[data-back]").forEach((b) =>
    b.addEventListener("click", () => goStep(+b.dataset.back))
  );

  $("go").onclick = send;
  $("ck").onclick = () => watch();
  $("q").onkeydown = (e) => { if (e.key === "Enter") watch(); };
  $("bcal").onclick = addToCalendar;
  $("bshare").onclick = share;
  $("fshare").onclick = share;
  $("flang").onclick = () => { S.lg = S.lg === "en" ? "sw" : "en"; draw(); };
  $("as").onclick = ask;

  const openFrom = (sel) => (e) => {
    const b = e.target.closest(sel + " .ph");
    if (b) openPhoto(+b.dataset.i);
  };
  $("gg-strip").addEventListener("click", openFrom("#gg-strip"));
  $("gg").addEventListener("click", openFrom("#gg"));

  $("lbx").onclick = () => ($("lb").hidden = true);
  $("lbp").onclick = () => openPhoto(viewing - 1);
  $("lbn").onclick = () => openPhoto(viewing + 1);
  document.addEventListener("keydown", (e) => {
    if ($("lb").hidden) return;
    if (e.key === "Escape") $("lb").hidden = true;
    if (e.key === "ArrowLeft") openPhoto(viewing - 1);
    if (e.key === "ArrowRight") openPhoto(viewing + 1);
  });

  $("lg").onclick = () => { S.lg = S.lg === "en" ? "sw" : "en"; draw(); };

  setInterval(tick, 1000);
  goStep(1);
}

/* ================================================================
   13. ADMIN
   ================================================================ */
let role = null;
let tab = "";
let bookings = [], messages = [], admins = [];
let unsubscribe = [];
let flt = "all", mflt = "new", bq = "", dq = "";
let dirty = false;
let claiming = false; // true while the first-time owner account is being created

const isFull = () => role == "full";
const TABS = {
  full: [["overview", "Overview"], ["bookings", "Bookings"], ["door", "Door"], ["messages", "Messages"], ["content", "Content"], ["event", "Event"], ["team", "Team"]],
  door: [["door", "Door"], ["guests", "Guests"]],
};
const FIELDS = [
  ["title", "Event title", "text"], ["host", "Host / organiser", "text"],
  ["description", "About the event (guests read this)", "textarea"],
  ["when", "Date and time", "datetime-local"], ["venue", "Venue", "text"], ["map", "Map link (optional, starts with https://)", "url"],
  ["price", "Price per person (KES)", "number"], ["seats", "Total seats", "number"],
  ["phone", "Phone number that receives payments", "tel"], ["paybill", "Paybill number (optional)", "text"],
  ["account", "Paybill account name (optional)", "text"], ["whatsapp", "Contact WhatsApp number (optional)", "tel"],
];
const peopleText = (b) => b.people.map((p) => esc(p.n) + " (" + esc(p.t) + ")").join(", ");
const get = (id) => bookings.find((b) => b.id == id);
const errText = (e) => e && e.code
  ? (e.code == "permission-denied" ? "You don't have permission to do that." : "Something went wrong (" + e.code + ").")
  : (e && e.message) || "Something went wrong.";

function initAdmin() {
  $("app").addEventListener("click", onClick);
  $("app").addEventListener("input", onInput);
  $("app").addEventListener("change", onChange);
  $("app").addEventListener("keydown", onKey);
  document.addEventListener("focusout", () => setTimeout(() => { if (dirty && !typing()) redraw(); }, 80));
  onAuthStateChanged(auth, (user) => { if (!claiming) loadUser(user); });
}

async function loadUser(user) {
  unsubscribe.forEach((stop) => stop());
  unsubscribe = []; role = null; bookings = []; messages = []; admins = []; tab = "";
  flt = "all"; mflt = "new"; bq = ""; dq = "";
  if (!user) return showLogin();

  let snap;
  try { snap = await getDoc(doc(db, "admins", user.uid)); }
  catch (e) { return showNoAccess(); }
  role = snap.exists() ? snap.data().role : null;
  if (!role) return showNoAccess();

  const listen = (name, set) => unsubscribe.push(onSnapshot(collection(db, name), (s) => {
    set(s.docs.map((d) => ({ id: d.id, ...d.data() })));
    redraw();
  }, () => {}));
  if (isFull()) {
    try { await createCounterIfMissing(); } catch (e) {}
    listen("admins", (l) => (admins = l));
    listen("messages", (l) => (messages = l));
  }
  listen("bookings", (l) => (bookings = l));
}

async function createCounterIfMissing() {
  const ref = doc(db, "stats", "counter");
  if (!(await getDoc(ref)).exists()) await setDoc(ref, { taken: 0 });
}

async function showLogin() {
  let hasOwner = true;
  try { hasOwner = await ownerExists(); } catch (e) {}
  $("app").innerHTML = `
    <div class="card">
      <h2>Sign in</h2>
      ${BACKEND == "stub" ? '<p class="mut">Test mode: accounts are saved in memory only.</p>' : ""}
      <input id="em" type="email" placeholder="Email" autocomplete="username">
      <input id="pw" type="password" placeholder="Password" autocomplete="current-password">
      <div id="le" class="err"></div>
      <button class="btn primary" data-act="login">Sign in</button>
    </div>` + (hasOwner ? "" : `
    <div class="card">
      <h2>First time? Create the owner account</h2>
      <p class="mut">Only one owner account can be created.</p>
      <input id="oe" type="email" placeholder="Your email">
      <input id="op" type="password" placeholder="Password (6+ characters)">
      <div id="oerr" class="err"></div>
      <button class="btn primary" data-act="owner">Create owner account</button>
    </div>`);
}

function showNoAccess() {
  $("app").innerHTML = `<div class="card"><p>This account has no admin access.</p><button class="btn primary" data-act="out">Sign out</button></div>`;
}

const typing = () => { const f = document.activeElement; return !!(f && f.dataset && f.dataset.keep !== undefined); };

function redraw() {
  if (!role) return;
  if (typing()) { dirty = true; return; }
  dirty = false;
  const tabs = TABS[role];
  if (!tabs.some((x) => x[0] == tab)) tab = tabs[0][0];

  const f = document.activeElement, fid = f && f.id, caret = f && f.selectionStart;
  const view = { overview: vOverview, bookings: () => vBookings(false), guests: () => vBookings(true), door: vDoor, messages: vMessages, content: vContent, event: vEvent, team: vTeam }[tab];
  $("app").innerHTML = `
    <div class="bar-top"><div><b>${esc(S.C.title)}</b> <span class="mut">· ${esc(role)}</span></div>
      <button class="btn ghost sm" data-act="out">Sign out</button></div>
    <nav class="tabs">${tabs.map(([k, label]) =>
      `<button class="tab ${k == tab ? "on" : ""}" data-act="tab" data-id="${k}">${label}${badge(k)}</button>`).join("")}</nav>
    <div>${view()}</div>`;
  if (fid && $(fid)) {
    const el = $(fid); el.focus();
    if (caret != null && el.setSelectionRange) try { el.setSelectionRange(caret, caret); } catch (e) {}
  }
}

function badge(k) {
  const n = k == "bookings" ? bookings.filter((b) => b.status == "pending").length
    : k == "messages" ? messages.filter((m) => m.status == "new").length : 0;
  return n ? `<i class="dot">${n}</i>` : "";
}

const stat = (label, value, sub = "") => `<div class="stat"><small>${label}</small><b>${value}</b><span>${sub}</span></div>`;
const sum = (list, f) => list.reduce((s, b) => s + f(b), 0);

function vOverview() {
  const ap = bookings.filter((b) => b.status == "approved"), pe = bookings.filter((b) => b.status == "pending");
  const pct = Math.min(100, Math.round((S.taken / Math.max(1, S.C.seats)) * 100));
  const seen = sum(ap.filter((b) => b.admitted), (b) => b.people.length), all = sum(ap, (b) => b.people.length);
  const latest = bookings.slice().sort((a, b) => b.created - a.created).slice(0, 5);
  return `
    <div class="stats">
      ${stat("Seats booked", S.taken + " / " + S.C.seats, `<div class="bar"><div class="fill" style="width:${pct}%"></div></div>`)}
      ${stat("Pending payments", pe.length, money(sum(pe, (b) => b.paid)) + " to confirm")}
      ${stat("Confirmed income", money(sum(ap, (b) => b.paid)), ap.length + " bookings")}
      ${stat("Checked in", seen + " / " + all, "people at the door")}
      ${stat("New messages", messages.filter((m) => m.status == "new").length, "questions and feedback")}
      ${stat("Seats left", Math.max(0, S.C.seats - S.taken), "")}
    </div>
    <div class="card"><h2>Quick actions</h2><div class="actions">
      <button class="btn ghost sm" data-act="copylink">Copy guest link</button>
      <button class="btn ghost sm" data-act="washare">Share on WhatsApp</button>
      <button class="btn ghost sm" data-act="csv">Export guest list (CSV)</button></div></div>
    <div class="card"><h2>Latest bookings</h2>${latest.map((b) =>
      `<p><b>${esc(b.code)}</b> <span class="badge ${esc(b.status)}">${esc(b.status)}</span><br><span class="mut">${peopleText(b)} · ${ago(b.created)}</span></p>`).join("") || '<p class="mut">No bookings yet.</p>'}</div>`;
}

function matches(b) {
  const text = (b.code + " " + b.id + " " + b.people.map((p) => p.n + " " + p.t).join(" ")).toLowerCase();
  return !bq || text.includes(bq.toLowerCase());
}

function vBookings(locked) {
  const list = bookings.filter((b) => (locked ? b.status == "approved" : flt == "all" || b.status == flt) && matches(b))
    .sort((a, b) => b.created - a.created);
  const chips = locked ? "" : `<div class="chips">${["all", "pending", "approved", "rejected"].map((k) =>
    `<button class="chip ${k == flt ? "on" : ""}" data-act="flt" data-id="${k}">${k}</button>`).join("")}</div>`;
  return `
    <div class="card"><input id="bq" placeholder="Search by name, phone, code or M-Pesa code" value="${esc(bq)}">${chips}
      ${isFull() ? `<button class="btn ghost sm" data-act="csv">Export CSV</button>` : ""}</div>
    ${list.map(bookingCard).join("") || '<p class="mut">Nothing to show.</p>'}`;
}

function bookingCard(b) {
  let buttons = "";
  if (b.status == "pending" && isFull())
    buttons = `<button class="btn good sm" data-act="ok" data-id="${esc(b.id)}">Approve</button><button class="btn danger sm" data-act="no" data-id="${esc(b.id)}">Reject</button>`;
  if (b.status == "approved")
    buttons = `<button class="btn ghost sm" data-act="in" data-id="${esc(b.id)}">${b.admitted ? "Undo admit" : "Admit"}</button>` +
      (isFull() ? `<button class="btn danger sm" data-act="no" data-id="${esc(b.id)}">Cancel and release seats</button>` : "");
  if (b.status == "rejected" && isFull())
    buttons = `<button class="btn danger sm" data-act="del" data-id="${esc(b.id)}">Delete</button>`;
  return `
    <div class="card item"><div class="between"><b>${esc(b.code)}</b><span class="badge ${esc(b.status)}">${esc(b.status)}</span></div>
      <div class="mut">M-Pesa ${esc(b.id)} · ${money(b.paid)} · ${ago(b.created)}${b.admitted ? " · admitted ✓" : ""}</div>
      <div>${peopleText(b)}</div><div class="actions">${buttons}</div></div>`;
}

function vDoor() {
  const code = dq.trim().toUpperCase();
  const f = bookings.find((b) => b.code == code);
  const ap = bookings.filter((b) => b.status == "approved");
  const seen = sum(ap.filter((b) => b.admitted), (b) => b.people.length), all = sum(ap, (b) => b.people.length);
  let result = "";
  if (f && f.status == "approved") {
    result = `<div class="verdict ${f.admitted ? "warn" : "good"}"><h2>${f.admitted ? "ALREADY ADMITTED" : "VALID"}</h2>
      <b>${esc(f.code)}</b> · ${f.people.length} ${f.people.length == 1 ? "person" : "people"}<br>${peopleText(f)}
      ${f.admitted ? `<br><span class="mut">at ${new Date(f.admittedAt).toLocaleTimeString()}</span>` : `<br><button class="btn good" data-act="in" data-id="${esc(f.id)}">Admit ${f.people.length}</button>`}</div>`;
  } else if (f) {
    result = `<div class="verdict bad"><h2>NOT VALID</h2>Payment is ${esc(f.status)}.</div>`;
  } else if (code.length >= 8) {
    result = `<div class="verdict bad"><h2>CODE NOT FOUND</h2></div>`;
  }
  return `<div class="card"><h2>Door check-in</h2><p class="mut">${seen} of ${all} approved guests are in.</p>
    <input id="dq" class="big" placeholder="EVT-1234" autocapitalize="characters" autocomplete="off" value="${esc(dq)}">${result}</div>`;
}

function vMessages() {
  const list = messages.filter((m) => m.status == mflt).sort((a, b) => b.created - a.created);
  const cards = list.map((m) => `
    <div class="card item"><div class="between"><span><span class="badge ${esc(m.status)}">${esc(m.kind)}</span> <b>${esc(m.name || "Anonymous")}</b></span><span class="mut">${ago(m.created)}</span></div>
      <p>${esc(m.text)}</p>${m.contact ? `<p class="mut">Contact: ${esc(m.contact)}</p>` : ""}
      ${m.kind == "question" ? `<textarea id="r_${esc(m.id)}" data-keep placeholder="Write your answer"></textarea>` : ""}
      <div class="actions">
        ${m.kind == "question" ? `<button class="btn good sm" data-act="pub" data-id="${esc(m.id)}">Publish to FAQ</button><button class="btn ghost sm" data-act="wareply" data-id="${esc(m.id)}">Reply on WhatsApp</button>` : ""}
        ${m.status == "new" ? `<button class="btn ghost sm" data-act="done" data-id="${esc(m.id)}">Mark done</button>` : ""}
        <button class="btn danger sm" data-act="delm" data-id="${esc(m.id)}">Delete</button></div></div>`).join("");
  const faqs = S.faq.map((f) => `<div class="item"><b>${esc(f.q)}</b><p>${esc(f.a)}</p>
    <button class="btn danger sm" data-act="faqdel" data-id="${esc(f.id)}">Remove</button></div>`).join("");
  return `
    <div class="chips">${["new", "done"].map((k) => `<button class="chip ${k == mflt ? "on" : ""}" data-act="mflt" data-id="${k}">${k}</button>`).join("")}</div>
    ${cards || '<p class="mut">No messages here.</p>'}
    <div class="card"><h2>Published FAQ</h2>${faqs || '<p class="mut">Nothing published yet.</p>'}
      <h3>Add a question and answer</h3>
      <input id="fq_q" data-keep placeholder="Question"><textarea id="fq_a" data-keep placeholder="Answer"></textarea>
      <button class="btn primary" data-act="faqadd">Add to FAQ</button></div>`;
}

function vContent() {
  const photos = S.photos.map((p) => `
    <div class="item"><img class="thumb" src="${p.data}" alt="">
      <input id="cap_${esc(p.id)}" data-keep value="${esc(p.caption)}" placeholder="Caption">
      <div class="actions"><button class="btn ghost sm" data-act="capsave" data-id="${esc(p.id)}">Save caption</button>
        <button class="btn danger sm" data-act="photodel" data-id="${esc(p.id)}">Delete</button></div></div>`).join("");
  const sections = S.sections.map((s) => `
    <div class="item"><input id="sec_t_${esc(s.id)}" data-keep value="${esc(s.title)}">
      <textarea id="sec_x_${esc(s.id)}" data-keep>${esc(s.text)}</textarea>
      <div class="actions"><button class="btn ghost sm" data-act="secsave" data-id="${esc(s.id)}">Save</button>
        <button class="btn danger sm" data-act="secdel" data-id="${esc(s.id)}">Remove</button></div></div>`).join("");
  return `
    <div class="card"><h2>Header picture</h2>
      ${S.header ? `<img class="thumb wide" src="${S.header}" alt="">` : '<p class="mut">No header picture yet.</p>'}
      <label for="hdr">Choose a picture</label>
      <input id="hdr" type="file" accept="image/*">
      ${S.header ? '<button class="btn danger sm" data-act="hdrdel">Remove header picture</button>' : ""}</div>
    <div class="card"><h2>Event photos (${S.photos.length} / 12)</h2>
      <label for="pcap">Caption for the photos you are about to add (optional)</label>
      <input id="pcap" data-keep placeholder="e.g. Graduation day with the family">
      <label for="phs">Add photos</label>
      <input id="phs" type="file" accept="image/*" multiple>${photos}</div>
    <div class="card"><h2>Extra sections</h2>
      <p class="mut">Add text blocks such as Programme, Dress code, Directions.</p>${sections}
      <h3>Add a section</h3>
      <input id="sn_t" data-keep placeholder="Title"><textarea id="sn_x" data-keep placeholder="Text"></textarea>
      <button class="btn primary" data-act="secadd">Add section</button></div>`;
}

function vEvent() {
  const inputs = FIELDS.map(([k, label, type]) => type == "textarea"
    ? `<label for="f_${k}">${label}</label><textarea id="f_${k}" data-keep>${esc(S.C[k])}</textarea>`
    : `<label for="f_${k}">${label}</label><input id="f_${k}" data-keep type="${type}" value="${esc(S.C[k])}">`).join("");
  return `<div class="card"><h2>Event details</h2>${inputs}<button class="btn primary" data-act="save">Save event</button></div>
    <div class="card"><h2>Start a new event</h2>
      <p class="mut">Deletes all bookings and messages and resets the seat counter.</p>
      <button class="btn danger" data-act="reset">Delete bookings and start fresh</button></div>`;
}

function vTeam() {
  const me = auth.currentUser && auth.currentUser.uid;
  return `<div class="card"><h2>Admins</h2>${admins.map((a) => `
      <p>${esc(a.email || a.id)} · <b>${esc(a.role)}</b> ${a.id == me ? "(you)" : `<button class="btn danger sm" data-act="rmadm" data-id="${esc(a.id)}">Remove</button>`}</p>`).join("")}
    <h3>Add an admin</h3>
    <input id="ae" data-keep type="email" placeholder="Their email">
    <input id="ap" data-keep type="text" placeholder="Temporary password (6+ characters)">
    <select id="ar" data-keep><option value="door">Door (check-in only)</option><option value="full">Full (everything)</option></select>
    <div id="tm" class="err"></div><button class="btn primary" data-act="addadm">Add admin</button></div>`;
}

function onInput(e) {
  if (e.target.id == "dq") { dq = e.target.value; redraw(); }
  if (e.target.id == "bq") { bq = e.target.value; redraw(); }
}

async function onChange(e) {
  if (!e.target || e.target.type != "file") return;
  try {
    if (e.target.id == "hdr") await uploadHeader(e.target.files[0]);
    if (e.target.id == "phs") await uploadPhotos([...e.target.files]);
  } catch (err) { toast(errText(err), "bad"); }
  if (e.target && e.target.type == "file") e.target.value = "";
}

async function uploadHeader(file) {
  if (!file) return;
  const data = await resizeImage(file, 1600, 0.75);
  await setDoc(doc(db, "media", "header"), { data, created: Date.now() });
  toast("Header picture saved");
}

async function uploadPhotos(files) {
  if (!files.length) return;
  const room = 12 - S.photos.length;
  if (room <= 0) throw new Error("You already have 12 photos. Delete one first.");
  const caption = ($("pcap").value || "").trim().slice(0, 200);
  let n = 0;
  for (const f of files.slice(0, room)) {
    const data = await resizeImage(f, 1000, 0.72);
    await addDoc(collection(db, "photos"), { data, caption, created: Date.now() + n++ });
  }
  toast(n + (n == 1 ? " photo added" : " photos added"));
  if (files.length > room) toast("Only " + room + " fit. The rest were skipped.", "bad");
}

function onKey(e) {
  if (e.key != "Enter") return;
  if (["em", "pw"].includes(e.target.id)) H.login();
  if (["oe", "op"].includes(e.target.id)) H.owner();
}

async function onClick(e) {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  try { await H[el.dataset.act](el.dataset.id, el); } catch (err) { toast(errText(err), "bad"); }
}

const H = {
  tab: (id) => { tab = id; redraw(); },
  flt: (id) => { flt = id; redraw(); },
  mflt: (id) => { mflt = id; redraw(); },
  out: () => signOut(auth),

  login: () => signInWithEmailAndPassword(auth, $("em").value.trim(), $("pw").value)
    .catch(() => ($("le").textContent = "Wrong email or password.")),

  owner: async () => {
    const email = $("oe").value.trim(), pw = $("op").value;
    if (!email || pw.length < 6) return ($("oerr").textContent = "Enter your email and a password of at least 6 characters.");
    claiming = true;
    try {
      await createUserWithEmailAndPassword(auth, email, pw);
      if (!(await claimOwner())) throw new Error("An owner already exists.");
      claiming = false;
      await loadUser(auth.currentUser);
    } catch (err) {
      claiming = false;
      $("oerr").textContent = err.code == "auth/email-already-in-use"
        ? "That email already has an account."
        : err.code == "auth/confirm-email"
          ? err.message
          : "Could not create the account. An owner may already exist.";
    }
  },

  ok: async (id) => { await updateDoc(doc(db, "bookings", id), { status: "approved" }); toast("Payment approved"); },
  no: async (id) => {
    const b = get(id);
    if (!b) return;
    if (!confirm(b.status == "approved" ? "Cancel this booking and release its seats?" : "Reject this payment and release its seats?")) return;
    await rpc("reject_booking", { p_id: id });
    toast("Seats released");
  },
  in: async (id) => {
    const b = get(id);
    if (!b) return;
    await rpc("set_admitted", { p_id: id, p_admitted: !b.admitted });
    toast(b.admitted ? "Admit undone" : "Admitted " + b.people.length);
  },
  del: async (id) => { if (confirm("Delete this booking?")) await deleteDoc(doc(db, "bookings", id)); },

  copylink: async () => toast((await copyText(location.origin + location.pathname)) ? "Guest link copied" : "Could not copy", "ok"),
  washare: () => window.open("https://wa.me/?text=" + encodeURIComponent(S.C.title + " - book your seat here: " + location.origin + location.pathname), "_blank"),
  csv: () => {
    const safe = (c) => { c = String(c ?? ""); return /^[=+\-@]/.test(c) ? "'" + c : c; };
    const rows = [["Code", "M-Pesa", "Status", "Amount", "Name", "Phone", "Admitted"]];
    bookings.forEach((b) => b.people.forEach((p, i) => rows.push([b.code, b.id, b.status, i ? "" : b.paid, p.n, p.t, b.admitted ? "yes" : "no"])));
    download("guest-list.csv", rows.map((r) => r.map((c) => '"' + safe(c).replace(/"/g, '""') + '"').join(",")).join("\n"), "text/csv");
  },

  pub: async (id) => {
    const m = messages.find((x) => x.id == id), a = ($("r_" + id).value || "").trim();
    if (!a) return toast("Write an answer first", "bad");
    await addDoc(collection(db, "faq"), { q: m.text, a, created: Date.now() });
    await updateDoc(doc(db, "messages", id), { status: "done" });
    toast("Published to the FAQ");
  },
  wareply: (id) => {
    const m = messages.find((x) => x.id == id);
    let n = (m.contact || "").replace(/\D/g, "");
    if (n.length < 9) return toast("This person did not leave a phone number", "bad");
    if (n.startsWith("0")) n = "254" + n.slice(1);
    window.open("https://wa.me/" + n + "?text=" + encodeURIComponent($("r_" + id).value || ""), "_blank");
  },
  done: async (id) => { await updateDoc(doc(db, "messages", id), { status: "done" }); toast("Marked as done"); },
  delm: async (id) => { if (confirm("Delete this message?")) await deleteDoc(doc(db, "messages", id)); },
  faqdel: async (id) => { if (confirm("Remove this FAQ?")) await deleteDoc(doc(db, "faq", id)); },
  faqadd: async () => {
    const q = $("fq_q").value.trim(), a = $("fq_a").value.trim();
    if (!q || !a) return toast("Enter both a question and an answer", "bad");
    await addDoc(collection(db, "faq"), { q, a, created: Date.now() });
    $("fq_q").value = ""; $("fq_a").value = ""; toast("Added to the FAQ");
  },

  hdrdel: async () => { if (confirm("Remove the header picture?")) await deleteDoc(doc(db, "media", "header")); },
  capsave: async (id) => { await updateDoc(doc(db, "photos", id), { caption: $("cap_" + id).value.trim().slice(0, 200) }); toast("Caption saved"); },
  photodel: async (id) => { if (confirm("Delete this photo?")) await deleteDoc(doc(db, "photos", id)); },
  secadd: async () => {
    const title = $("sn_t").value.trim(), text = $("sn_x").value.trim();
    if (!title || !text) return toast("Enter a title and some text", "bad");
    await addDoc(collection(db, "sections"), { title: title.slice(0, 80), text: text.slice(0, 3000), created: Date.now() });
    $("sn_t").value = ""; $("sn_x").value = ""; toast("Section added");
  },
  secsave: async (id) => {
    const title = $("sec_t_" + id).value.trim(), text = $("sec_x_" + id).value.trim();
    if (!title || !text) return toast("Title and text cannot be empty", "bad");
    await updateDoc(doc(db, "sections", id), { title: title.slice(0, 80), text: text.slice(0, 3000) });
    toast("Section saved");
  },
  secdel: async (id) => { if (confirm("Remove this section?")) await deleteDoc(doc(db, "sections", id)); },

  save: async () => {
    const v = {};
    FIELDS.forEach(([k, , type]) => { const raw = $("f_" + k).value.trim(); v[k] = type == "number" ? Number(raw) : raw; });
    if (!v.title) throw new Error("Enter an event title.");
    if (!(v.price > 0) || !(v.seats > 0)) throw new Error("Price and seats must be more than zero.");
    if (v.seats < S.taken) throw new Error("Seats cannot be fewer than the " + S.taken + " already booked.");
    if (v.map && !/^https?:\/\//.test(v.map)) throw new Error("The map link must start with https://");
    await setDoc(doc(db, "settings", "main"), v);
    toast("Event saved");
  },
  reset: async () => {
    if (prompt("This deletes ALL bookings and messages. Type RESET to continue.") != "RESET") return;
    await rpc("reset_event");
    toast("Ready for a new event");
  },

  addadm: async () => {
    const email = $("ae").value.trim(), pw = $("ap").value, r = $("ar").value;
    if (!email || pw.length < 6) return ($("tm").textContent = "Enter their email and a password of at least 6 characters.");
    try {
      const cred = await createUserWithEmailAndPassword(secondaryAuth, email, pw);
      await setDoc(doc(db, "admins", cred.user.uid), { role: r, email });
      await signOut(secondaryAuth);
      $("ae").value = ""; $("ap").value = ""; $("tm").textContent = "";
      toast("Admin added. Give them the email and temporary password.");
    } catch (err) {
      $("tm").textContent = err.code == "auth/email-already-in-use"
        ? "That email already has an account. Use a different email."
        : "Could not add the admin.";
    }
  },
  rmadm: async (id) => { if (confirm("Remove this admin's access?")) await deleteDoc(doc(db, "admins", id)); },
};

/* ================================================================
   14. ROUTING
   ================================================================ */
const PAGES = ["home", "book", "ticket", "photos", "info", "admin"];

function route() {
  let page = location.hash.replace("#", "") || "home";
  let code = "";
  const m = page.match(/^ticket-(.+)$/);
  if (m) { page = "ticket"; code = m[1]; }
  if (!PAGES.includes(page)) page = "home";

  PAGES.forEach((p) => ($("p-" + p).hidden = p != page));
  document.querySelectorAll(".topnav a, .tabbar a").forEach((a) =>
    a.classList.toggle("on", a.dataset.page == page));
  document.body.classList.toggle("compact", page != "home");
  window.scrollTo(0, 0);

  if (page == "ticket") {
    if (code) { $("q").value = code.toUpperCase(); watch(code); }
    else if (!watching) autoCheck();
  }
}
addEventListener("hashchange", route);

/* ================================================================
   15. START
   ================================================================ */
onSnapshot(doc(db, "settings", "main"), (snap) => {
  S.C = { ...DEFAULT_C, ...(snap.exists() ? snap.data() : {}) };
  document.title = S.C.title;
  draw();
});
onSnapshot(doc(db, "stats", "counter"), (snap) => {
  S.taken = snap.exists() ? snap.data().taken : 0;
  draw();
});
onSnapshot(collection(db, "faq"), (snap) => {
  S.faq = snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => b.created - a.created);
  draw();
});

const byCreated = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => a.created - b.created);
onSnapshot(doc(db, "media", "header"), (snap) => {
  S.header = snap.exists() ? snap.data().data : "";
  draw();
});
onSnapshot(collection(db, "photos"), (snap) => { S.photos = byCreated(snap); draw(); });
onSnapshot(collection(db, "sections"), (snap) => { S.sections = byCreated(snap); draw(); });

initGuest();
initAdmin();
route();