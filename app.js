@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne:wght@400;600;700;800&display=swap');

:root {
  --bg: #f2ede6;
  --bg2: #ede8e0;
  --paper: #faf8f3;
  --ink: #1c1c1c;
  --ink2: #444;
  --ink3: #888;
  --border: #ddd8cf;
  --accent: #2d6a4f;
  --accent2: #1a3a6a;
  --accent3: #c0392b;
  --green-hi: rgba(120,220,120,0.4);
  --green-border: #4caf50;
  --yellow-hi: rgba(255,225,60,0.5);
  --yellow-border: #e6b800;
  --pink-hi: rgba(255,140,170,0.38);
  --pink-border: #e0547a;
  --blue-ink: #2255aa;
  --red-ink: #cc2200;
  --green-ink: #1a7a3a;
  --shadow: 0 2px 16px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.13);
  --radius: 10px;
  --transition: all 0.2s ease;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: 'Syne', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ===== SIDEBAR ===== */
#sidebar {
  position: fixed;
  top: 0; left: 0;
  width: 220px;
  height: 100vh;
  background: #1c1c1c;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-logo {
  padding: 24px 20px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sidebar-logo h1 {
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.sidebar-logo p {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.35);
  margin-top: 3px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sidebar-nav { padding: 12px 0; flex: 1; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: var(--transition);
  border-left: 3px solid transparent;
  text-decoration: none;
}

.nav-item:hover { background: rgba(255,255,255,0.06); }

.nav-item.active {
  background: rgba(255,255,255,0.1);
  border-left-color: var(--accent);
}

.nav-item .nav-icon { font-size: 1rem; width: 20px; text-align: center; }

.nav-item .nav-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  transition: var(--transition);
}

.nav-item.active .nav-label,
.nav-item:hover .nav-label { color: #fff; }

.nav-item .nav-count {
  margin-left: auto;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.4);
  border-radius: 20px;
  padding: 1px 7px;
  font-size: 0.62rem;
  font-family: 'Syne', sans-serif;
}

.nav-sub {
  padding: 2px 0 4px 50px;
}

.nav-sub-item {
  display: block;
  padding: 5px 12px;
  font-family: 'Syne', sans-serif;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  border-radius: 4px;
  transition: var(--transition);
}

.nav-sub-item:hover,
.nav-sub-item.active { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.06); }

/* ===== MAIN CONTENT ===== */
#main {
  margin-left: 220px;
  min-height: 100vh;
}

/* ===== TOP BAR ===== */
.topbar {
  position: sticky;
  top: 0;
  background: rgba(242,237,230,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
}

.topbar-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 10px;
}

.topbar-actions { display: flex; gap: 8px; align-items: center; }

.btn {
  font-family: 'Syne', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  letter-spacing: 0.02em;
}

.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: #235c43; }
.btn-danger { background: var(--accent3); color: #fff; }
.btn-danger:hover { background: #a93226; }
.btn-ghost { background: transparent; color: var(--ink2); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--border); }

/* ===== PAGE CONTENT ===== */
.page { padding: 32px; display: none; }
.page.active { display: block; }

/* ===== HOME PAGE ===== */
.home-header {
  margin-bottom: 32px;
}

.home-header h2 {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 6px;
}

.home-header p {
  font-family: 'Crimson Pro', serif;
  font-size: 1.05rem;
  color: var(--ink3);
}

.home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.home-card {
  background: var(--paper);
  border-radius: var(--radius);
  padding: 20px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.home-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 3px;
}

.home-card.lm::before { background: var(--accent); }
.home-card.mn::before { background: #888; }
.home-card.ipb::before { background: #e67e22; }
.home-card.nyt::before { background: var(--accent3); }
.home-card.sj::before { background: var(--accent2); }
.home-card.vb::before { background: var(--green-border); }
.home-card.bd::before { background: var(--yellow-border); }

.home-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }

.home-card-icon { font-size: 1.8rem; margin-bottom: 10px; }

.home-card-title {
  font-family: 'Syne', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
}

.home-card-count {
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  color: var(--ink3);
}

.home-card-count span {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--ink);
  display: block;
}

/* ===== SECTION TABS ===== */
.section-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
  padding-bottom: 0;
}

.section-tab {
  font-family: 'Syne', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px 18px;
  cursor: pointer;
  color: var(--ink3);
  border-bottom: 2px solid transparent;
  transition: var(--transition);
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
}

.section-tab:hover { color: var(--ink); }
.section-tab.active { color: var(--accent); border-bottom-color: var(--accent); }

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--ink3);
}

.empty-state .empty-icon { font-size: 3rem; margin-bottom: 16px; }
.empty-state h3 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 6px; color: var(--ink2); }
.empty-state p { font-family: 'Crimson Pro', serif; font-size: 0.95rem; }

/* ===== LEGEND ===== */
.legend {
  display: flex;
  gap: 16px;
  padding: 8px 0;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  color: var(--ink3);
}

.legend-dot {
  width: 12px; height: 9px;
  border-radius: 2px;
  display: inline-block;
}

/* ===== HIGHLIGHTS ===== */
.hi-green { background: var(--green-hi); border-radius: 3px; padding: 0 2px; border-bottom: 2px solid var(--green-border); cursor: pointer; position: relative; display: inline; }
.hi-yellow { background: var(--yellow-hi); border-radius: 3px; padding: 0 2px; border-bottom: 2px solid var(--yellow-border); cursor: pointer; position: relative; display: inline; }
.hi-pink { background: var(--pink-hi); border-radius: 3px; padding: 0 2px; border-bottom: 2px solid var(--pink-border); cursor: pointer; position: relative; display: inline; }
.hi-box { border: 2px solid var(--ink); border-radius: 3px; padding: 0 3px; cursor: pointer; position: relative; display: inline; }

/* ===== POPUP ===== */
.popup {
  display: none;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #1c1c1c;
  color: #fff;
  border-radius: 8px;
  padding: 10px 13px;
  min-width: 180px;
  max-width: 260px;
  font-family: 'Syne', sans-serif;
  font-size: 0.74rem;
  line-height: 1.6;
  box-shadow: 0 6px 24px rgba(0,0,0,0.4);
  z-index: 200;
  white-space: normal;
  pointer-events: none;
}

.popup::after {
  content: '';
  position: absolute;
  top: 100%; left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1c1c1c;
}

.hi-green:hover .popup,
.hi-yellow:hover .popup,
.hi-pink:hover .popup,
.hi-box:hover .popup { display: block; }

.popup-word { font-size: 0.88rem; font-weight: 700; color: #7de8a0; margin-bottom: 3px; }
.popup-meaning { color: #aac8ff; font-size: 0.78rem; margin-bottom: 4px; }
.popup-note { color: rgba(255,255,255,0.65); font-size: 0.72rem; }
.popup-syn { color: rgba(255,255,255,0.65); font-size: 0.72rem; }
.popup-syn b { color: #ffd97d; }

/* ===== HANDWRITTEN NOTES ===== */
.handnote {
  font-family: 'Caveat', cursive;
  font-size: 0.95rem;
  line-height: 1.3;
}
.handnote.blue { color: var(--blue-ink); }
.handnote.red { color: var(--red-ink); }
.handnote.green { color: var(--green-ink); }

/* ===== PAPER CARD ===== */
.paper-card {
  background: var(--paper);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  font-family: 'Crimson Pro', serif;
  font-size: 1rem;
  line-height: 1.85;
}

.paper-card-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
}

/* ===== PHRASE BOX ===== */
.phrase-card {
  background: var(--paper);
  border-radius: var(--radius);
  margin-bottom: 12px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  overflow: hidden;
}

.phrase-header {
  padding: 14px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.phrase-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.05rem;
  font-weight: 700;
  border: 2px solid var(--ink);
  border-radius: 4px;
  padding: 2px 8px;
  display: inline-block;
}

.phrase-zh {
  font-family: 'Syne', sans-serif;
  font-size: 0.75rem;
  color: var(--ink3);
  margin-left: 8px;
}

.phrase-body {
  padding: 0 20px 20px;
  border-top: 1px solid var(--border);
  display: none;
}

.phrase-body.open { display: block; }

.phrase-section-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink3);
  margin: 12px 0 6px;
}

.phrase-example {
  background: #f0faf4;
  border-radius: 6px;
  padding: 10px 14px;
  font-family: 'Crimson Pro', serif;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 8px;
}

.synonym-row {
  display: flex;
  gap: 8px;
  align-items: baseline;
  margin-bottom: 4px;
  font-family: 'Crimson Pro', serif;
  font-size: 0.9rem;
}

.synonym-eq { color: var(--accent); font-weight: 700; }
.synonym-grammar { color: var(--ink3); font-family: 'Syne', sans-serif; font-size: 0.72rem; }
.synonym-note { color: var(--red-ink); font-family: 'Caveat', cursive; font-size: 0.88rem; }

.baat-daap-box {
  background: #f8f8f8;
  border: 1px dashed #ccc;
  border-radius: 6px;
  padding: 10px 12px;
  margin-top: 10px;
}

.baat-daap-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #aaa;
  margin-bottom: 4px;
}

.baat-daap-input {
  width: 100%;
  border: none;
  background: transparent;
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  color: var(--ink);
  outline: none;
}

/* ===== NEWS ===== */
.news-card { background: var(--paper); border-radius: var(--radius); margin-bottom: 24px; box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; }
.news-header { background: #1c1c1c; color: #fff; padding: 16px 20px; }
.news-issue { font-family: 'Syne', sans-serif; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
.news-title { font-family: 'Crimson Pro', serif; font-size: 1.15rem; font-weight: 700; line-height: 1.4; }
.news-body { padding: 20px; font-family: 'Crimson Pro', serif; font-size: 1rem; line-height: 1.85; }
.news-reflection { background: #f0faf4; border-left: 4px solid var(--accent); padding: 16px 20px; margin: 0 20px 20px; border-radius: 0 6px 6px 0; font-family: 'Crimson Pro', serif; font-size: 1rem; line-height: 1.85; }
.news-reflection-label { font-family: 'Syne', sans-serif; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 8px; }
.vocab-booster { padding: 0 20px 20px; }
.vocab-booster-label { font-family: 'Syne', sans-serif; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink3); margin-bottom: 10px; }
.vocab-booster-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
.vocab-booster-item { font-family: 'Syne', sans-serif; font-size: 0.76rem; display: flex; gap: 6px; }
.vocab-booster-num { color: var(--accent); font-weight: 700; min-width: 18px; }
.vocab-booster-zh { color: var(--ink3); font-size: 0.7rem; }

/* ===== ESSAY ===== */
.essay-card { background: var(--paper); border-radius: var(--radius); margin-bottom: 20px; box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; }
.essay-meta { padding: 14px 20px; border-bottom: 1px solid var(--border); }
.essay-title-text { font-family: 'Crimson Pro', serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 3px; }
.essay-info { font-family: 'Syne', sans-serif; font-size: 0.7rem; color: var(--ink3); }
.essay-body { padding: 20px; }
.essay-para { margin-bottom: 16px; position: relative; padding-left: 80px; }
.essay-para-label { font-family: 'Syne', sans-serif; font-size: 0.6rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
.essay-margin-note { position: absolute; left: 0; width: 72px; text-align: right; padding-right: 8px; }
.essay-hand-notes { margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border); display: flex; gap: 10px; flex-wrap: wrap; }

/* ===== TWO COLUMN (Shu Jai) ===== */
.two-col-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--paper); }
.two-col-cell { padding: 7px 10px; border-bottom: 1px solid var(--border); font-family: 'Crimson Pro', serif; font-size: 0.92rem; line-height: 1.5; display: flex; gap: 8px; }
.two-col-cell:last-child { border-bottom: none; }
.two-col-right { border-left: 1px solid var(--border); }
.two-col-num { color: var(--accent2); font-weight: 700; font-family: 'Syne', sans-serif; font-size: 0.75rem; min-width: 20px; }
.two-col-type { color: var(--accent2); font-family: 'Syne', sans-serif; font-size: 0.7rem; }
.two-col-zh { color: var(--ink3); font-family: 'Syne', sans-serif; font-size: 0.72rem; }

.topic-header { background: var(--accent2); color: #fff; padding: 10px 18px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
.topic-num { background: rgba(255,255,255,0.2); color: #fff; border-radius: 4px; padding: 2px 8px; font-family: 'Syne', sans-serif; font-size: 0.68rem; font-weight: 700; }
.topic-title { font-family: 'Syne', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; }
.topic-block { margin-bottom: 16px; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); }

/* ===== NYT ===== */
.nyt-header { background: #1c1c1c; color: #fff; padding: 18px 22px; border-radius: var(--radius) var(--radius) 0 0; margin-bottom: 0; }
.nyt-news-label { font-family: 'Syne', sans-serif; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); margin-bottom: 6px; }
.nyt-news-title { font-family: 'Crimson Pro', serif; font-size: 1.1rem; font-weight: 700; line-height: 1.5; margin-bottom: 8px; }
.nyt-intro { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 0.95rem; color: rgba(255,255,255,0.7); line-height: 1.7; }
.nyt-para { padding: 10px 14px; background: var(--paper); border-bottom: 1px solid var(--border); font-family: 'Crimson Pro', serif; font-size: 0.97rem; line-height: 1.85; }
.nyt-para-num { color: var(--accent); font-weight: 700; font-family: 'Syne', sans-serif; font-size: 0.75rem; margin-right: 8px; }
.nyt-source { font-family: 'Syne', sans-serif; font-size: 0.7rem; color: var(--ink3); text-align: right; padding: 10px 14px; font-style: italic; }

.phrase-list-item { padding: 12px 14px; background: var(--paper); border-bottom: 1px solid var(--border); }
.phrase-list-num { color: var(--accent3); font-weight: 700; font-family: 'Syne', sans-serif; font-size: 0.78rem; margin-right: 6px; }
.phrase-list-text { font-family: 'Crimson Pro', serif; font-size: 0.97rem; font-weight: 700; }
.phrase-list-zh { font-family: 'Syne', sans-serif; font-size: 0.75rem; color: var(--ink3); margin-left: 6px; }
.phrase-list-example { font-family: 'Crimson Pro', serif; font-size: 0.9rem; font-style: italic; color: var(--ink2); margin-top: 4px; }

/* ===== VOCAB BOOK ===== */
.vocab-group { margin-bottom: 20px; }
.vocab-group-title { font-family: 'Syne', sans-serif; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--border); }
.vocab-item { display: flex; gap: 10px; align-items: baseline; padding: 6px 10px; background: var(--paper); border-radius: 6px; margin-bottom: 4px; }
.vocab-word { font-family: 'Crimson Pro', serif; font-size: 1rem; font-weight: 700; }
.vocab-zh { font-family: 'Syne', sans-serif; font-size: 0.76rem; color: var(--ink3); }
.vocab-source { font-family: 'Syne', sans-serif; font-size: 0.65rem; color: var(--accent); background: rgba(45,106,79,0.1); border-radius: 10px; padding: 1px 7px; margin-left: auto; }

/* ===== 百搭 ===== */
.baat-item { background: var(--paper); border-radius: var(--radius); padding: 14px 18px; margin-bottom: 10px; box-shadow: var(--shadow); border-left: 3px solid var(--yellow-border); }
.baat-text { font-family: 'Crimson Pro', serif; font-size: 1rem; line-height: 1.7; margin-bottom: 6px; }
.baat-source { font-family: 'Syne', sans-serif; font-size: 0.68rem; color: var(--ink3); }

/* ===== IDEA POWER BANK ===== */
.ipb-idea { display: flex; gap: 12px; padding: 12px 16px; background: var(--paper); border-radius: 8px; margin-bottom: 10px; box-shadow: 0 1px 6px rgba(0,0,0,0.05); }
.ipb-num { color: #e67e22; font-weight: 700; font-family: 'Syne', sans-serif; font-size: 0.82rem; min-width: 22px; padding-top: 3px; }
.ipb-vn { display: flex; gap: 8px; padding: 7px 10px; border-bottom: 1px solid var(--border); font-family: 'Crimson Pro', serif; font-size: 0.92rem; line-height: 1.5; }
.ipb-vn-num { color: #e67e22; font-weight: 700; font-family: 'Syne', sans-serif; font-size: 0.75rem; min-width: 22px; }
.ipb-vn-zh { color: var(--ink3); font-family: 'Syne', sans-serif; font-size: 0.72rem; }

/* ===== EDIT MODE ===== */
.edit-banner { background: #fff8e1; border-bottom: 2px solid var(--yellow-border); padding: 8px 32px; font-family: 'Syne', sans-serif; font-size: 0.75rem; color: #b7791f; display: none; }
.edit-banner.show { display: block; }
.edit-btn { background: none; border: 1px solid #ccc; border-radius: 4px; padding: 2px 8px; font-size: 0.62rem; color: #888; cursor: pointer; font-family: 'Syne', sans-serif; margin-left: 8px; }
.edit-btn:hover { border-color: var(--accent); color: var(--accent); }
.edit-input { width: 100%; font-family: 'Crimson Pro', serif; font-size: 1rem; line-height: 1.85; border: 1px dashed var(--green-border); border-radius: 4px; padding: 6px; background: #fffff8; resize: vertical; outline: none; }
.edit-save { background: var(--accent); color: #fff; border: none; border-radius: 6px; padding: 4px 14px; font-size: 0.73rem; font-family: 'Syne', sans-serif; cursor: pointer; margin-right: 6px; margin-top: 6px; }
.edit-cancel { background: #eee; color: #555; border: none; border-radius: 6px; padding: 4px 14px; font-size: 0.73rem; font-family: 'Syne', sans-serif; cursor: pointer; margin-top: 6px; }

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  #sidebar { width: 60px; }
  #sidebar .nav-label, #sidebar .nav-count, .sidebar-logo p, .sidebar-logo h1 { display: none; }
  #main { margin-left: 60px; }
  .page { padding: 20px 16px; }
  .home-grid { grid-template-columns: repeat(2, 1fr); }
  .vocab-booster-grid { grid-template-columns: 1fr; }
  .two-col-grid { grid-template-columns: 1fr; }
  .two-col-right { border-left: none; }
  .essay-para { padding-left: 0; }
  .essay-margin-note { display: none; }
}

/* ===== ANIMATIONS ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.page.active { animation: fadeIn 0.25s ease; }

/* ===== STICKY NOTES ===== */
.sticky-note { font-family: 'Caveat', cursive; font-size: 0.85rem; line-height: 1.4; padding: 4px 6px; border-radius: 4px; margin: 4px 0; display: inline-block; max-width: 100%; }
.sticky-left { display: block; border-left: 3px solid; padding-left: 6px; margin-bottom: 6px; }
.sticky-below { display: block; border-left: 3px solid; padding-left: 8px; margin-top: 6px; background: rgba(0,0,0,0.02); border-radius: 0 4px 4px 0; }
.sticky-note.ink-blue { color: #1a5276; border-color: #1a5276; }
.sticky-note.ink-red { color: #c0392b; border-color: #c0392b; }
.sticky-note.ink-green { color: #1e8449; border-color: #1e8449; }
.news-margin, .essay-margin-col { width: 80px; min-width: 80px; flex-shrink: 0; padding-right: 8px; }
.add-note-btn { font-family: inherit; }
