// ===== STATE =====
let data = null;
let currentPage = ‘home’;
let currentSubTab = {};
let editMode = false;

// ===== INIT =====
async function init() {
const indicator = document.getElementById(‘save-indicator’);

// Step 1: Load data.json immediately so page renders fast
try {
const res = await fetch(‘data.json’);
data = await res.json();
} catch (e) {
data = { languageMaster: { news: [], phrases: [], essays: [] }, mainNotes: [], ideaPowerBank: [], nytDiy: [], shuJai: [], vocabBook: [], baatDaap: [] };
}

renderAll();
navigate(‘home’);

// Step 2: Try Firebase in background (non-blocking)
if (indicator) { indicator.textContent = ‘Syncing…’; indicator.style.color = ‘#f0b429’; }
try {
await new Promise(resolve => setTimeout(resolve, 2000));
if (window.firebaseLoad) {
const cloudData = await window.firebaseLoad();
if (cloudData) {
data = cloudData;
renderAll();
navigate(currentPage);
}
}
if (indicator) { indicator.textContent = ‘Synced’; indicator.style.color = ‘#4caf50’; }
} catch (e) {
if (indicator) { indicator.textContent = ‘Local’; indicator.style.color = ‘#888’; }
}
}

// ===== AUTO SAVE TO FIREBASE =====
async function autoSave() {
const indicator = document.getElementById(‘save-indicator’);
if (indicator) { indicator.textContent = ‘⏳ Saving…’; indicator.style.color = ‘#f0b429’; }
if (window.firebaseSave) {
const success = await window.firebaseSave(data);
if (indicator) {
indicator.textContent = success ? ‘✅ Synced’ : ‘❌ Error’;
indicator.style.color = success ? ‘#4caf50’ : ‘#cc2200’;
}
}
}

// ===== NAVIGATION =====
function navigate(page, sub) {
currentPage = page;
document.querySelectorAll(’.nav-item’).forEach(el => el.classList.toggle(‘active’, el.dataset.page === page));
document.querySelectorAll(’.page’).forEach(el => el.classList.toggle(‘active’, el.id === ‘page-’ + page));
if (sub) showSubTab(page, sub);
updateTopbar(page);
window.scrollTo(0, 0);
}

function updateTopbar(page) {
const titles = {
home: ‘🏠 Home’,
languageMaster: ‘📚 Language Master’,
mainNotes: ‘📝 Main Notes’,
ideaPowerBank: ‘💡 Idea Power Bank’,
nytDiy: ‘📰 NYT DIY’,
shuJai: ‘📖 Shu Jai’,
vocabBook: ‘📗 Vocab Book’,
baatDaap: ‘📒 百搭句子’
};
document.getElementById(‘topbar-title’).textContent = titles[page] || page;
}

function showSubTab(page, sub) {
currentSubTab[page] = sub;
document.querySelectorAll(`[data-page="${page}"] .section-tab`).forEach(el => el.classList.toggle(‘active’, el.dataset.tab === sub));
document.querySelectorAll(`[data-page="${page}"] .tab-content`).forEach(el => el.style.display = el.dataset.tab === sub ? ‘block’ : ‘none’);
}

// ===== EDIT MODE =====
function toggleEditMode() {
editMode = !editMode;
const banner = document.getElementById(‘edit-banner’);
if (banner) banner.classList.toggle(‘show’, editMode);
const btn = document.getElementById(‘edit-toggle-btn’);
if (btn) {
btn.textContent = editMode ? ‘🔒 Lock’ : ‘✏️ Edit’;
btn.className = editMode ? ‘btn btn-danger’ : ‘btn btn-ghost’;
}
document.querySelectorAll(’.edit-btn’).forEach(el => el.style.display = editMode ? ‘inline-block’ : ‘none’);
}

// ===== HIGHLIGHT UTILS =====
function renderHighlightedText(text, highlights) {
if (!highlights || highlights.length === 0) return escapeHtml(text);
let result = escapeHtml(text);
highlights.forEach(h => {
const escaped = escapeHtml(h.word);
const popup = `<span class="popup"><span class="popup-word">${escaped}</span><span class="popup-meaning">${h.zh}</span>${h.note ? `<span class="popup-note">${h.note}</span>` : ''}</span>`;
result = result.replace(escaped, `<span class="hi-green">${escaped}${popup}</span>`);
});
return result;
}

function renderSegments(segments) {
if (!segments) return ‘’;
return segments.map(seg => {
if (seg.type === ‘text’) return escapeHtml(seg.content);
if (seg.type === ‘bold’) return `<strong>${escapeHtml(seg.content)}</strong>`;
if (seg.type === ‘highlight’) {
const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span>${seg.note ? `<span class="popup-note">${seg.note}</span>` : ''}</span>`;
return `<span class="hi-${seg.color}">${escapeHtml(seg.content)}${popup}</span>`;
}
if (seg.type === ‘box’) {
const syns = seg.synonyms ? seg.synonyms.map(s => `= ${s}`).join(’<br>’) : ‘’;
const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span>${syns ? `<span class="popup-syn"><b>Synonyms:</b><br>${syns}</span>` : ''}</span>`;
return `<span class="hi-box">${escapeHtml(seg.content)}${popup}</span>`;
}
return escapeHtml(seg.content || ‘’);
}).join(’’);
}

function escapeHtml(str) {
if (!str) return ‘’;
return str.replace(/&/g,’&’).replace(/</g,’<’).replace(/>/g,’>’).replace(/”/g,’"’);
}

// ===== RENDER ALL =====
function renderAll() {
renderHome();
renderLanguageMaster();
renderIdeaPowerBank();
renderNytDiy();
renderShuJai();
renderVocabBook();
renderBaatDaap();
renderMainNotes();
}

// ===== HOME =====
function renderHome() {
const lm = data.languageMaster;
const counts = {
languageMaster: (lm.news?.length || 0) + (lm.phrases?.length || 0) + (lm.essays?.length || 0),
mainNotes: data.mainNotes?.length || 0,
ideaPowerBank: data.ideaPowerBank?.length || 0,
nytDiy: data.nytDiy?.length || 0,
shuJai: data.shuJai?.length || 0,
vocabBook: data.vocabBook?.length || 0,
baatDaap: data.baatDaap?.length || 0,
};

const cards = [
{ id: ‘languageMaster’, cls: ‘lm’, icon: ‘📚’, title: ‘Language Master’, count: counts.languageMaster },
{ id: ‘mainNotes’, cls: ‘mn’, icon: ‘📝’, title: ‘Main Notes’, count: counts.mainNotes },
{ id: ‘ideaPowerBank’, cls: ‘ipb’, icon: ‘💡’, title: ‘Idea Power Bank’, count: counts.ideaPowerBank },
{ id: ‘nytDiy’, cls: ‘nyt’, icon: ‘📰’, title: ‘NYT DIY’, count: counts.nytDiy },
{ id: ‘shuJai’, cls: ‘sj’, icon: ‘📖’, title: ‘Shu Jai’, count: counts.shuJai },
{ id: ‘vocabBook’, cls: ‘vb’, icon: ‘📗’, title: ‘Vocab Book’, count: counts.vocabBook },
{ id: ‘baatDaap’, cls: ‘bd’, icon: ‘📒’, title: ‘百搭句子’, count: counts.baatDaap },
];

document.getElementById(‘home-grid’).innerHTML = cards.map(c => `<div class="home-card ${c.cls}" onclick="navigate('${c.id}')"> <div class="home-card-icon">${c.icon}</div> <div class="home-card-title">${c.title}</div> <div class="home-card-count"> <span>${c.count}</span> ${c.count === 1 ? 'item' : 'items'} </div> </div>`).join(’’);
}

// ===== LANGUAGE MASTER =====
function renderLanguageMaster() {
renderLMNews();
renderLMPhrases();
renderLMEssays();
// default sub tab
const firstTab = document.querySelector(’#page-languageMaster .section-tab’);
if (firstTab) firstTab.click();
}

function renderLMNews() {
const el = document.getElementById(‘lm-news-content’);
if (!el) return;
const news = data.languageMaster?.news || [];
if (news.length === 0) { el.innerHTML = emptyState(‘📰’, ‘No news yet’, ‘Scan and upload Language Master news pages’); return; }
el.innerHTML = news.map(n => `<div class="news-card"> <div class="news-header"> <div class="news-issue">${escapeHtml(n.issue || '')}</div> <div class="news-title">${escapeHtml(n.title)}</div> </div> <div class="news-body">${renderHighlightedText(n.newsText || '', n.newsHighlights || [])}</div> <div class="news-reflection"> <div class="news-reflection-label">💡 Reflection — Most Important</div> ${renderHighlightedText(n.reflectionText || '', n.reflectionHighlights || [])} </div> <div class="vocab-booster"> <div class="vocab-booster-label">📋 Thematic Vocab Booster</div> <div class="vocab-booster-grid"> ${(n.vocabBooster || []).map((v, i) =>`
<div class="vocab-booster-item">
<span class="vocab-booster-num">${i+1}.</span>
<span>${escapeHtml(v.en)} <span class="vocab-booster-zh">(${escapeHtml(v.zh)})</span></span>
</div>
`).join('')} </div> </div> </div> `).join(’’);
}

function renderLMPhrases() {
const el = document.getElementById(‘lm-phrases-content’);
if (!el) return;
const phrases = data.languageMaster?.phrases || [];
if (phrases.length === 0) { el.innerHTML = emptyState(‘🔑’, ‘No phrases yet’, ‘Scan and upload Language Spotlight pages’); return; }
el.innerHTML = phrases.map((p, idx) => `<div class="phrase-card"> <div class="phrase-header" onclick="togglePhrase(${idx})"> <div> <span class="phrase-title">${escapeHtml(p.phrase)}</span> <span class="phrase-zh">${escapeHtml(p.zh)}</span> </div> <div style="display:flex;gap:8px;align-items:center;"> <span style="background:${p.connotation==='negative'?'#ffeaea':p.connotation==='positive'?'#e8f5e9':'#f0f0f0'};color:${p.connotation==='negative'?'#c0392b':p.connotation==='positive'?'#2d6a4f':'#666'};border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.68rem;font-weight:600;">${escapeHtml(p.grammar || '')} · ${escapeHtml(p.connotation || '')}</span> <span id="phrase-arrow-${idx}" style="color:#aaa;font-size:0.8rem;">▼</span> </div> </div> <div class="phrase-body" id="phrase-body-${idx}"> <div class="phrase-section-label">Example</div> <div class="phrase-example">${renderHighlightedText(p.example?.sentence || '', p.example?.highlights || [])}</div> <div class="phrase-section-label">Synonyms</div> ${(p.synonyms || []).map(s =>`
<div class="synonym-row">
<span class="synonym-eq">=</span>
<span style="font-family:'Crimson Pro',serif;font-size:0.9rem;">${escapeHtml(s.word)}</span>
${s.grammar ? `<span class="synonym-grammar">${escapeHtml(s.grammar)}</span>` : ‘’}
${s.note ? `<span class="synonym-note">${escapeHtml(s.note)}</span>` : ‘’}
</div>
`).join('')} ${p.notes?.length ? `
<div class="phrase-section-label">✏️ Handwritten Notes</div>
<div style="background:#fffef0;border-radius:6px;padding:10px 12px;">
${p.notes.map(n => `<div class="handnote ${n.ink}">${escapeHtml(n.text)}</div>`).join(’’)}
</div>
`: ''} <div class="baat-daap-box"> <div class="baat-daap-label">⬜ 百搭位</div> <input class="baat-daap-input" placeholder="Fill in your 百搭 usage here..." /> </div> </div> </div>`).join(’’);
}

function togglePhrase(idx) {
const body = document.getElementById(‘phrase-body-’ + idx);
const arrow = document.getElementById(‘phrase-arrow-’ + idx);
if (!body) return;
const open = body.classList.toggle(‘open’);
if (arrow) arrow.textContent = open ? ‘▲’ : ‘▼’;
}

function renderLMEssays() {
const el = document.getElementById(‘lm-essays-content’);
if (!el) return;
const essays = data.languageMaster?.essays || [];
if (essays.length === 0) { el.innerHTML = emptyState(‘📝’, ‘No essays yet’, ‘Scan and upload sample essay pages’); return; }

el.innerHTML = `<div class="legend"> <div class="legend-item"><span class="legend-dot" style="background:var(--green-hi);border-bottom:2px solid var(--green-border);"></span>Vocab</div> <div class="legend-item"><span class="legend-dot" style="background:var(--yellow-hi);border-bottom:2px solid var(--yellow-border);"></span>百搭</div> <div class="legend-item"><span class="legend-dot" style="background:var(--pink-hi);border-bottom:2px solid var(--pink-border);"></span>Point</div> <div class="legend-item"><span class="legend-dot" style="border:2px solid #333;"></span>Phrase (tap)</div> </div>` + essays.map(e => `<div class="essay-card"> <div class="essay-meta"> <div class="essay-title-text">${escapeHtml(e.title)}</div> <div class="essay-info">${escapeHtml(e.meta || '')}</div> </div> <div class="essay-body"> ${(e.paragraphs || []).map(p =>`
<div class="essay-para">
${p.marginNote?.text ? `<div class="essay-margin-note"><span class="handnote ${p.marginNote.ink}">${escapeHtml(p.marginNote.text)}</span></div>` : ‘’}
<div class="essay-para-label">${escapeHtml(p.label || ‘’)}</div>
<div>${renderSegments(p.segments)}</div>
${p.handNotes?.length ? `<div class="essay-hand-notes">${p.handNotes.map(n => `<span class="handnote ${n.ink}">${escapeHtml(n.text)}</span>`).join('')}</div>` : ‘’}
</div>
`).join('')} </div> </div> `).join(’’);
}

// ===== IDEA POWER BANK =====
function renderIdeaPowerBank() {
const el = document.getElementById(‘ipb-content’);
if (!el) return;
const topics = data.ideaPowerBank || [];
if (topics.length === 0) { el.innerHTML = emptyState(‘💡’, ‘No topics yet’, ‘Scan and upload Idea Power Bank pages’); return; }
el.innerHTML = topics.map((topic, ti) => `<div class="topic-block" style="--topic-color:#e67e22;"> <div class="topic-header" style="background:#e67e22;" onclick="toggleTopic('ipb',${ti})"> <span class="topic-num">TOPIC ${topic.topicNum || ti+1}</span> <span class="topic-title">${escapeHtml(topic.title)}</span> <span id="ipb-arrow-${ti}" style="margin-left:auto;color:rgba(255,255,255,0.6);font-size:0.8rem;">▼</span> </div> <div id="ipb-topic-${ti}" style="display:none;"> <div style="padding:16px 20px;"> <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Part 1: Golden Ideas</div> ${(topic.goldenIdeas || []).map(idea =>`
<div class="ipb-idea">
<span class="ipb-num">${idea.id}.</span>
<span style="font-family:'Crimson Pro',serif;font-size:1rem;line-height:1.85;">${renderHighlightedText(idea.text, idea.highlights || [])}</span>
</div>
`).join('')} <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin:16px 0 12px;">Part 2: VN Diction Bank</div> <div style="background:var(--paper);border-radius:8px;overflow:hidden;border:1px solid var(--border);"> ${(topic.vnBank || []).map((v, i) => `
<div class="ipb-vn">
<span class="ipb-vn-num">${i+1}.</span>
<span>${escapeHtml(v.en)} <span class="ipb-vn-zh">(${escapeHtml(v.zh)})</span></span>
</div>
`).join('')} </div> </div> </div> </div> `).join(’’);
}

function toggleTopic(prefix, idx) {
const el = document.getElementById(`${prefix}-topic-${idx}`);
const arrow = document.getElementById(`${prefix}-arrow-${idx}`);
if (!el) return;
const open = el.style.display === ‘none’;
el.style.display = open ? ‘block’ : ‘none’;
if (arrow) arrow.textContent = open ? ‘▲’ : ‘▼’;
}

// ===== NYT DIY =====
function renderNytDiy() {
const el = document.getElementById(‘nyt-content’);
if (!el) return;
const volumes = data.nytDiy || [];
if (volumes.length === 0) { el.innerHTML = emptyState(‘📰’, ‘No volumes yet’, ‘Scan and upload NYT DIY pages’); return; }

el.innerHTML = volumes.map((vol, vi) => `
<div style="margin-bottom:32px;">
<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
<span style="font-family:'Syne',sans-serif;font-size:0.8rem;font-weight:800;color:var(--ink);">DIY Language Makeovers</span>
<span style="background:var(--accent3);color:#fff;border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.7rem;font-weight:700;">${escapeHtml(vol.volume)}</span>
</div>

```
  <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:var(--accent3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">1. Big News</div>
  <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);margin-bottom:20px;">
    <div class="nyt-header">
      <div class="nyt-news-label">Must-read News</div>
      <div class="nyt-news-title">${escapeHtml(vol.bigNews?.title || '')}</div>
      <div class="nyt-intro">${escapeHtml(vol.bigNews?.intro || '')}</div>
    </div>
    ${(vol.bigNews?.paragraphs || []).map(p => `
      <div class="nyt-para">
        <span class="nyt-para-num">[${p.id}]</span>
        ${renderHighlightedText(p.text, p.highlights || [])}
      </div>
    `).join('')}
    ${vol.bigNews?.source ? `<div class="nyt-source">${escapeHtml(vol.bigNews.source)}</div>` : ''}
  </div>

  <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:var(--accent3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">2. Advanced Phrases You Can't Live Without</div>
  <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);margin-bottom:20px;">
    ${(vol.advancedPhrases || []).map(p => `
      <div class="phrase-list-item">
        <span class="phrase-list-num">${p.id}.</span>
        <span class="phrase-list-text">${escapeHtml(p.phrase)}</span>
        <span class="phrase-list-zh">(${escapeHtml(p.zh)})</span>
        <div class="phrase-list-example">e.g. ${escapeHtml(p.example)}</div>
      </div>
    `).join('')}
  </div>

  <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:var(--accent3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">3. Vital Vocabulary from the NYT</div>
  <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);margin-bottom:20px;">
    ${(vol.vitalVocab || []).length === 0
      ? `<div style="padding:20px;text-align:center;font-family:'Syne',sans-serif;font-size:0.8rem;color:var(--ink3);">No vital vocabulary added yet</div>`
      : (vol.vitalVocab || []).map(v => `
        <div class="phrase-list-item">
          <span class="phrase-list-text" style="font-weight:400;">${escapeHtml(v.word)}</span>
          <span class="phrase-list-zh">(${escapeHtml(v.zh)})</span>
        </div>
      `).join('')
    }
  </div>
</div>
```

`).join(’’);
}

// ===== SHU JAI =====
function renderShuJai() {
const el = document.getElementById(‘shujai-content’);
if (!el) return;
const books = data.shuJai || [];
if (books.length === 0) { el.innerHTML = emptyState(‘📖’, ‘No books yet’, ‘Scan and upload Shu Jai pages’); return; }

el.innerHTML = books.map((book, bi) => `<div style="margin-bottom:32px;"> <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;"> <span style="font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:800;color:var(--ink);">${escapeHtml(book.title)}</span> ${book.series ?`<span style="background:var(--accent2);color:#fff;border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.68rem;font-weight:600;">${escapeHtml(book.series)}</span>`: ''} </div> ${(book.topics || []).map((topic, ti) =>`
<div class="topic-block" style="margin-bottom:12px;">
<div class="topic-header" onclick="toggleTopic('sj-${bi}',${ti})">
<span class="topic-num">TOPIC ${topic.id}</span>
<span class="topic-title">${escapeHtml(topic.title)}</span>
<span id="sj-${bi}-arrow-${ti}" style="margin-left:auto;color:rgba(255,255,255,0.6);font-size:0.8rem;">▼</span>
</div>
<div id="sj-${bi}-topic-${ti}" style="display:none;">
${renderShuJaiTwoCol(topic.items || [])}
</div>
</div>
`).join('')} </div> `).join(’’);
}

function renderShuJaiTwoCol(items) {
const half = Math.ceil(items.length / 2);
const left = items.slice(0, half);
const right = items.slice(half);
const rows = Math.max(left.length, right.length);
let html = ‘<div class="two-col-grid">’;
for (let i = 0; i < rows; i++) {
const l = left[i];
const r = right[i];
if (l) {
html += `<div class="two-col-cell"><span class="two-col-num">${l.id}.</span><span>${escapeHtml(l.en)} <span class="two-col-type">(${escapeHtml(l.type)})</span> <span class="two-col-zh">${escapeHtml(l.zh)}</span></span></div>`;
} else {
html += `<div class="two-col-cell"></div>`;
}
if (r) {
html += `<div class="two-col-cell two-col-right"><span class="two-col-num">${r.id}.</span><span>${escapeHtml(r.en)} <span class="two-col-type">(${escapeHtml(r.type)})</span> <span class="two-col-zh">${escapeHtml(r.zh)}</span></span></div>`;
} else {
html += `<div class="two-col-cell two-col-right"></div>`;
}
}
html += ‘</div>’;
return html;
}

// ===== VOCAB BOOK =====
function renderVocabBook() {
const el = document.getElementById(‘vocab-content’);
if (!el) return;
const vocab = data.vocabBook || [];
if (vocab.length === 0) { el.innerHTML = emptyState(‘📗’, ‘Vocab Book is empty’, ‘Green-highlighted words from your scans will appear here’); return; }

// Group by first letter
const groups = {};
vocab.forEach(v => {
const key = v.group || v.word[0].toUpperCase();
if (!groups[key]) groups[key] = [];
groups[key].push(v);
});

el.innerHTML = Object.entries(groups).sort().map(([key, words]) => `<div class="vocab-group"> <div class="vocab-group-title">${escapeHtml(key)}</div> ${words.map(v =>`
<div class="vocab-item">
<span class="vocab-word">${escapeHtml(v.word)}</span>
<span class="vocab-zh">${escapeHtml(v.zh)}</span>
${v.source ? `<span class="vocab-source">${escapeHtml(v.source)}</span>` : ‘’}
</div>
`).join('')} </div> `).join(’’);
}

// ===== 百搭句子 =====
function renderBaatDaap() {
const el = document.getElementById(‘baat-content’);
if (!el) return;
const items = data.baatDaap || [];
if (items.length === 0) { el.innerHTML = emptyState(‘📒’, ‘百搭句子 is empty’, ‘Yellow-highlighted sentences from your scans will appear here’); return; }

el.innerHTML = items.map(item => `<div class="baat-item"> <div class="baat-text">${escapeHtml(item.text)}</div> ${item.source ?`<div class="baat-source">📌 ${escapeHtml(item.source)}</div>`: ''} </div>`).join(’’);
}

// ===== MAIN NOTES =====
function renderMainNotes() {
const el = document.getElementById(‘mainnotes-content’);
if (!el) return;
el.innerHTML = emptyState(‘📝’, ‘Main Notes’, ‘Rules for this section are TBC — coming soon’);
}

// ===== EMPTY STATE =====
function emptyState(icon, title, desc) {
return `<div class="empty-state"> <div class="empty-icon">${icon}</div> <h3>${title}</h3> <p>${desc}</p> </div>`;
}

// ===== EXPOSE FUNCTIONS GLOBALLY =====
window.navigate = navigate;
window.toggleEditMode = toggleEditMode;
window.showSubTab = showSubTab;
window.togglePhrase = togglePhrase;
window.toggleTopic = toggleTopic;

// ===== START =====
window.addEventListener(‘DOMContentLoaded’, init);
