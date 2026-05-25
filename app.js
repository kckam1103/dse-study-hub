// ===== STATE =====
let data = null;
let currentPage = 'home';
let currentSubTab = {};
let editMode = false;

// ===== INIT =====
async function init() {
  try {
    const res = await fetch('data.json');
    data = await res.json();
  } catch (e) {
    data = { languageMaster: { news: [], phrases: [], essays: [] }, mainNotes: [], ideaPowerBank: [], nytDiy: [], shuJai: [], vocabBook: [], baatDaap: [] };
  }
  if (!data.stickyNotes) data.stickyNotes = {};
  renderAll();
  navigate('home');
}

// ===== NAVIGATION =====
function navigate(page, sub) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.querySelectorAll('.page').forEach(el => el.classList.toggle('active', el.id === 'page-' + page));
  if (sub) showSubTab(page, sub);
  updateTopbar(page);
  window.scrollTo(0, 0);
}

function updateTopbar(page) {
  const titles = {
    home: '🏠 Home', languageMaster: '📚 Language Master', mainNotes: '📝 Main Notes',
    ideaPowerBank: '💡 Idea Power Bank', nytDiy: '📰 NYT DIY', shuJai: '📖 Shu Jai',
    vocabBook: '📗 Vocab Book', baatDaap: '📒 百搭句子'
  };
  document.getElementById('topbar-title').textContent = titles[page] || page;
}

function showSubTab(page, sub) {
  currentSubTab[page] = sub;
  document.querySelectorAll(`[data-page="${page}"] .section-tab`).forEach(el => el.classList.toggle('active', el.dataset.tab === sub));
  document.querySelectorAll(`[data-page="${page}"] .tab-content`).forEach(el => el.style.display = el.dataset.tab === sub ? 'block' : 'none');
}

// ===== EDIT MODE =====
function toggleEditMode() {
  editMode = !editMode;
  const banner = document.getElementById('edit-banner');
  if (banner) banner.classList.toggle('show', editMode);
  const btn = document.getElementById('edit-toggle-btn');
  if (btn) {
    btn.textContent = editMode ? '🔒 Lock' : '✏️ Edit';
    btn.className = editMode ? 'btn btn-danger' : 'btn btn-ghost';
  }
  document.querySelectorAll('.edit-btn').forEach(el => el.style.display = editMode ? 'inline-block' : 'none');
  document.querySelectorAll('.add-note-btn').forEach(el => el.style.display = editMode ? 'inline-block' : 'none');
}

// ===== MODAL =====
function showModal(html, onSave) {
  let modal = document.getElementById('edit-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'edit-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div style="background:var(--paper);border-radius:12px;padding:24px;width:90%;max-width:560px;max-height:85vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.2);">
      ${html}
      <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end;">
        <button onclick="closeModal()" style="padding:8px 18px;border-radius:8px;border:1px solid var(--border);background:transparent;cursor:pointer;font-family:inherit;">Cancel</button>
        <button id="modal-save-btn" style="padding:8px 18px;border-radius:8px;border:none;background:var(--accent);color:#fff;cursor:pointer;font-family:inherit;font-weight:600;">Save</button>
      </div>
    </div>`;
  modal.style.display = 'flex';
  document.getElementById('modal-save-btn').onclick = () => { onSave(); closeModal(); };
}

function closeModal() {
  const modal = document.getElementById('edit-modal');
  if (modal) modal.style.display = 'none';
}

// ===== DOWNLOAD JSON =====
function downloadJson() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.json';
  a.click();
}

// ===== STICKY NOTES =====
// key = any string like "news-0", "phrase-2", "essay-0-para-1", "vocab-5", "baat-3"
function getStickyNotes(key) {
  return (data.stickyNotes && data.stickyNotes[key]) || [];
}

function addStickyNote(key, position, rerenderFn) {
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Add Sticky Note</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Note</label>
    <textarea id="sn-text" rows="4" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;" placeholder="Write your note here..."></textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Ink Colour</label>
    <div style="display:flex;gap:10px;margin-bottom:12px;">
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="sn-ink" value="blue" checked> <span style="color:#1a5276;font-weight:600;">Blue</span></label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="sn-ink" value="red"> <span style="color:#c0392b;font-weight:600;">Red</span></label>
      <label style="display:flex;align-items:center;gap=6px;cursor:pointer;"><input type="radio" name="sn-ink" value="green"> <span style="color:#1e8449;font-weight:600;">Green</span></label>
    </div>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Position</label>
    <select id="sn-pos" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="left" ${position==='left'?'selected':''}>Left (margin)</option>
      <option value="below" ${position==='below'?'selected':''}>Below (inline)</option>
    </select>
  `, () => {
    const text = document.getElementById('sn-text').value.trim();
    if (!text) return;
    const ink = document.querySelector('input[name="sn-ink"]:checked')?.value || 'blue';
    const pos = document.getElementById('sn-pos').value;
    if (!data.stickyNotes[key]) data.stickyNotes[key] = [];
    data.stickyNotes[key].push({ text, ink, position: pos });
    rerenderFn();
    if (editMode) document.querySelectorAll('.edit-btn, .add-note-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function editStickyNote(key, idx, rerenderFn) {
  const note = data.stickyNotes[key][idx];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Sticky Note</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Note</label>
    <textarea id="sn-text" rows="4" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(note.text)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Ink Colour</label>
    <div style="display:flex;gap:10px;margin-bottom:12px;">
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="sn-ink" value="blue" ${note.ink==='blue'?'checked':''}> <span style="color:#1a5276;font-weight:600;">Blue</span></label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="sn-ink" value="red" ${note.ink==='red'?'checked':''}> <span style="color:#c0392b;font-weight:600;">Red</span></label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="radio" name="sn-ink" value="green" ${note.ink==='green'?'checked':''}> <span style="color:#1e8449;font-weight:600;">Green</span></label>
    </div>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Position</label>
    <select id="sn-pos" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;">
      <option value="left" ${note.position==='left'?'selected':''}>Left (margin)</option>
      <option value="below" ${note.position==='below'?'selected':''}>Below (inline)</option>
    </select>
    <button onclick="deleteStickyNote('${key}',${idx},arguments[0])" style="padding:6px 14px;border-radius:8px;border:1px solid #c0392b;color:#c0392b;background:transparent;cursor:pointer;font-family:inherit;">🗑 Delete Note</button>
  `, () => {
    data.stickyNotes[key][idx].text = document.getElementById('sn-text').value;
    data.stickyNotes[key][idx].ink = document.querySelector('input[name="sn-ink"]:checked')?.value || 'blue';
    data.stickyNotes[key][idx].position = document.getElementById('sn-pos').value;
    rerenderFn();
    if (editMode) document.querySelectorAll('.edit-btn, .add-note-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function deleteStickyNote(key, idx, e) {
  if (e) e.preventDefault();
  data.stickyNotes[key].splice(idx, 1);
  closeModal();
}

function renderStickyNotes(key, rerenderFn) {
  const notes = getStickyNotes(key);
  const leftNotes = notes.filter((n, i) => n.position === 'left' ? n._idx = i || true : false);
  const belowNotes = notes.filter((n, i) => n.position !== 'left');
  // Assign original indices
  notes.forEach((n, i) => n._idx = i);
  const left = notes.filter(n => n.position === 'left');
  const below = notes.filter(n => n.position === 'below' || !n.position);

  let leftHtml = left.map(n => `
    <div class="sticky-note sticky-left ink-${n.ink}">
      <span>${escapeHtml(n.text)}</span>
      <button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${n._idx},${rerenderFn.name || 'renderAll'})">✏️</button>
    </div>`).join('');

  let belowHtml = below.map(n => `
    <div class="sticky-note sticky-below ink-${n.ink}">
      <span>${escapeHtml(n.text)}</span>
      <button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${n._idx},${rerenderFn.name || 'renderAll'})">✏️</button>
    </div>`).join('');

  return { leftHtml, belowHtml };
}

function renderStickyBlock(key, rerenderFn) {
  const notes = getStickyNotes(key);
  notes.forEach((n, i) => n._idx = i);
  const left = notes.filter(n => n.position === 'left');
  const below = notes.filter(n => n.position !== 'left');
  const addBtn = `<button class="add-note-btn" style="display:none;font-size:0.65rem;padding:2px 8px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;color:var(--ink3);" onclick="addStickyNote('${key}','left',${rerenderFn})">＋ Note</button>`;
  const leftHtml = left.map(n => `<div class="sticky-note sticky-left ink-${n.ink}">${escapeHtml(n.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${n._idx},${rerenderFn})">✏️</button></div>`).join('');
  const belowHtml = below.map(n => `<div class="sticky-note sticky-below ink-${n.ink}">${escapeHtml(n.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${n._idx},${rerenderFn})">✏️</button></div>`).join('');
  return { leftHtml, belowHtml, addBtn };
}

// ===== ESCAPE =====
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
  const actions = document.querySelector('.topbar-actions');
  if (actions && !document.getElementById('download-btn')) {
    const btn = document.createElement('button');
    btn.id = 'download-btn';
    btn.className = 'btn btn-ghost';
    btn.textContent = '⬇️ Export JSON';
    btn.onclick = downloadJson;
    actions.insertBefore(btn, actions.firstChild);
  }
}

// ===== HOME =====
function renderHome() {
  const lm = data.languageMaster;
  const counts = {
    languageMaster: (lm.news?.length||0)+(lm.phrases?.length||0)+(lm.essays?.length||0),
    mainNotes: data.mainNotes?.length||0, ideaPowerBank: data.ideaPowerBank?.length||0,
    nytDiy: data.nytDiy?.length||0, shuJai: data.shuJai?.length||0,
    vocabBook: data.vocabBook?.length||0, baatDaap: data.baatDaap?.length||0,
  };
  const cards = [
    {id:'languageMaster',cls:'lm',icon:'📚',title:'Language Master',count:counts.languageMaster},
    {id:'mainNotes',cls:'mn',icon:'📝',title:'Main Notes',count:counts.mainNotes},
    {id:'ideaPowerBank',cls:'ipb',icon:'💡',title:'Idea Power Bank',count:counts.ideaPowerBank},
    {id:'nytDiy',cls:'nyt',icon:'📰',title:'NYT DIY',count:counts.nytDiy},
    {id:'shuJai',cls:'sj',icon:'📖',title:'Shu Jai',count:counts.shuJai},
    {id:'vocabBook',cls:'vb',icon:'📗',title:'Vocab Book',count:counts.vocabBook},
    {id:'baatDaap',cls:'bd',icon:'📒',title:'百搭句子',count:counts.baatDaap},
  ];
  document.getElementById('home-grid').innerHTML = cards.map(c=>`
    <div class="home-card ${c.cls}" onclick="navigate('${c.id}')">
      <div class="home-card-icon">${c.icon}</div>
      <div class="home-card-title">${c.title}</div>
      <div class="home-card-count"><span>${c.count}</span> ${c.count===1?'item':'items'}</div>
    </div>`).join('');
}

// ===== LANGUAGE MASTER =====
function renderLanguageMaster() {
  renderLMNews(); renderLMPhrases(); renderLMEssays();
  const firstTab = document.querySelector('#page-languageMaster .section-tab');
  if (firstTab) firstTab.click();
}

// ===== NEWS =====
function renderLMNews() {
  const el = document.getElementById('lm-news-content');
  if (!el) return;
  const news = data.languageMaster?.news || [];
  if (!news.length) { el.innerHTML = emptyState('📰','No news yet','Scan and upload Language Master news pages'); return; }
  el.innerHTML = news.map((n,ni) => {
    const key = `news-${ni}`;
    const notes = getStickyNotes(key);
    notes.forEach((x,i)=>x._idx=i);
    const leftNotes = notes.filter(x=>x.position==='left').map(x=>`<div class="sticky-note sticky-left ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${x._idx},renderLMNews)">✏️</button></div>`).join('');
    const belowNotes = notes.filter(x=>x.position!=='left').map(x=>`<div class="sticky-note sticky-below ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${x._idx},renderLMNews)">✏️</button></div>`).join('');
    return `
    <div class="news-card">
      <div style="display:flex;gap:12px;">
        <div class="news-margin">${leftNotes}<button class="add-note-btn" style="display:none;font-size:0.6rem;padding:2px 6px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;color:var(--ink3);margin-top:4px;" onclick="addStickyNote('${key}','left',renderLMNews)">＋</button></div>
        <div style="flex:1;">
          <div class="news-header">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
              <div><div class="news-issue">${escapeHtml(n.issue||'')}</div><div class="news-title">${escapeHtml(n.title)}</div></div>
              <div style="display:flex;gap:6px;">
                <button class="edit-btn" style="display:none;font-size:0.7rem;padding:2px 8px;" onclick="editNewsTitle(${ni})">✏️ Title</button>
                <button class="add-note-btn" style="display:none;font-size:0.7rem;padding:2px 8px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;" onclick="addStickyNote('${key}','below',renderLMNews)">＋ Note</button>
              </div>
            </div>
          </div>
          <div class="news-body" style="position:relative;">
            ${renderHighlightedText(n.newsText||'',n.newsHighlights||[])}
            <button class="edit-btn" style="display:none;font-size:0.65rem;padding:2px 8px;margin-left:6px;" onclick="editNewsText(${ni})">✏️ Edit</button>
          </div>
          <div class="news-reflection">
            <div class="news-reflection-label" style="display:flex;align-items:center;justify-content:space-between;">
              <span>💡 Reflection — Most Important</span>
              <button class="edit-btn" style="display:none;font-size:0.65rem;padding:2px 8px;" onclick="editNewsReflection(${ni})">✏️ Edit</button>
            </div>
            ${renderHighlightedText(n.reflectionText||'',n.reflectionHighlights||[])}
          </div>
          <div class="vocab-booster">
            <div class="vocab-booster-label">📋 Thematic Vocab Booster</div>
            <div class="vocab-booster-grid">
              ${(n.vocabBooster||[]).map((v,vi)=>`
                <div class="vocab-booster-item" style="display:flex;align-items:center;gap:6px;">
                  <span class="vocab-booster-num">${vi+1}.</span>
                  <span>${escapeHtml(v.en)} <span class="vocab-booster-zh">(${escapeHtml(v.zh)})</span></span>
                  <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;" onclick="editVocabBooster(${ni},${vi})">✏️</button>
                </div>`).join('')}
            </div>
          </div>
          ${belowNotes}
        </div>
      </div>
    </div>`; }).join('');
}

function editNewsTitle(ni) {
  const n = data.languageMaster.news[ni];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Title</h3>
    <input id="nt-title" value="${escapeHtml(n.title)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">`,
  ()=>{ data.languageMaster.news[ni].title=document.getElementById('nt-title').value; rerender('news'); });
}

function editNewsText(ni) {
  const n = data.languageMaster.news[ni];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit News Text</h3>
    <textarea id="nt-text" rows="6" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.newsText||'')}</textarea>`,
  ()=>{ data.languageMaster.news[ni].newsText=document.getElementById('nt-text').value; rerender('news'); });
}

function editNewsReflection(ni) {
  const n = data.languageMaster.news[ni];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Reflection</h3>
    <textarea id="nt-ref" rows="8" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.reflectionText||'')}</textarea>`,
  ()=>{ data.languageMaster.news[ni].reflectionText=document.getElementById('nt-ref').value; rerender('news'); });
}

function editVocabBooster(ni,vi) {
  const v = data.languageMaster.news[ni].vocabBooster[vi];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Vocab Booster</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">English</label>
    <input id="vb-en" value="${escapeHtml(v.en)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese</label>
    <input id="vb-zh" value="${escapeHtml(v.zh)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">`,
  ()=>{ data.languageMaster.news[ni].vocabBooster[vi].en=document.getElementById('vb-en').value; data.languageMaster.news[ni].vocabBooster[vi].zh=document.getElementById('vb-zh').value; rerender('news'); });
}

// ===== PHRASES =====
function renderLMPhrases() {
  const el = document.getElementById('lm-phrases-content');
  if (!el) return;
  const phrases = data.languageMaster?.phrases||[];
  if (!phrases.length) { el.innerHTML = emptyState('🔑','No phrases yet','Scan and upload Language Spotlight pages'); return; }
  el.innerHTML = phrases.map((p,idx)=>{
    const key=`phrase-${idx}`;
    const notes=getStickyNotes(key); notes.forEach((x,i)=>x._idx=i);
    const leftNotes=notes.filter(x=>x.position==='left').map(x=>`<div class="sticky-note sticky-left ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${x._idx},renderLMPhrases)">✏️</button></div>`).join('');
    const belowNotes=notes.filter(x=>x.position!=='left').map(x=>`<div class="sticky-note sticky-below ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${x._idx},renderLMPhrases)">✏️</button></div>`).join('');
    return `
    <div class="phrase-card">
      <div style="display:flex;gap:12px;">
        <div class="news-margin">${leftNotes}<button class="add-note-btn" style="display:none;font-size:0.6rem;padding:2px 6px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;color:var(--ink3);margin-top:4px;" onclick="addStickyNote('${key}','left',renderLMPhrases)">＋</button></div>
        <div style="flex:1;">
          <div class="phrase-header" onclick="togglePhrase(${idx})">
            <div>
              <span class="phrase-title">${escapeHtml(p.phrase)}</span>
              <span class="phrase-zh">${escapeHtml(p.zh)}</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="background:${p.connotation==='negative'?'#ffeaea':p.connotation==='positive'?'#e8f5e9':'#f0f0f0'};color:${p.connotation==='negative'?'#c0392b':p.connotation==='positive'?'#2d6a4f':'#666'};border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.68rem;font-weight:600;">${escapeHtml(p.grammar||'')} · ${escapeHtml(p.connotation||'')}</span>
              <button class="edit-btn" style="display:none;font-size:0.7rem;padding:2px 8px;" onclick="event.stopPropagation();editPhrase(${idx})">✏️</button>
              <button class="add-note-btn" style="display:none;font-size:0.7rem;padding:2px 8px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;" onclick="event.stopPropagation();addStickyNote('${key}','below',renderLMPhrases)">＋ Note</button>
              <span id="phrase-arrow-${idx}" style="color:#aaa;font-size:0.8rem;">▼</span>
            </div>
          </div>
          <div class="phrase-body" id="phrase-body-${idx}">
            <div class="phrase-section-label">Example</div>
            <div class="phrase-example">${renderHighlightedText(p.example?.sentence||'',p.example?.highlights||[])}<button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;margin-left:6px;" onclick="editPhraseExample(${idx})">✏️</button></div>
            <div class="phrase-section-label">Synonyms</div>
            ${(p.synonyms||[]).map((s,si)=>`
              <div class="synonym-row" style="display:flex;align-items:center;gap:6px;">
                <span class="synonym-eq">=</span>
                <span style="font-family:'Crimson Pro',serif;font-size:0.9rem;">${escapeHtml(s.word)}</span>
                ${s.grammar?`<span class="synonym-grammar">${escapeHtml(s.grammar)}</span>`:''}
                ${s.note?`<span class="synonym-note">${escapeHtml(s.note)}</span>`:''}
                <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;margin-left:auto;" onclick="editSynonym(${idx},${si})">✏️</button>
              </div>`).join('')}
            ${p.notes?.length?`
              <div class="phrase-section-label">✏️ Handwritten Notes</div>
              <div style="background:#fffef0;border-radius:6px;padding:10px 12px;">
                ${p.notes.map((n,ni)=>`
                  <div style="display:flex;align-items:center;gap:6px;">
                    <div class="handnote ${n.ink}" style="flex:1;">${escapeHtml(n.text)}</div>
                    <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;" onclick="editPhraseNote(${idx},${ni})">✏️</button>
                  </div>`).join('')}
              </div>`:''}
            <div class="baat-daap-box">
              <div class="baat-daap-label">⬜ 百搭位</div>
              <input class="baat-daap-input" placeholder="Fill in your 百搭 usage here..." value="${escapeHtml(p.baatDaapNote||'')}" onchange="saveBaatDaapNote(${idx},this.value)"/>
            </div>
            ${belowNotes}
          </div>
        </div>
      </div>
    </div>`; }).join('');
}

function togglePhrase(idx) {
  const body=document.getElementById('phrase-body-'+idx);
  const arrow=document.getElementById('phrase-arrow-'+idx);
  if (!body) return;
  const open=body.classList.toggle('open');
  if (arrow) arrow.textContent=open?'▲':'▼';
}

function saveBaatDaapNote(idx,val) { data.languageMaster.phrases[idx].baatDaapNote=val; }

function editPhrase(idx) {
  const p=data.languageMaster.phrases[idx];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Phrase</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Phrase</label>
    <input id="ep-phrase" value="${escapeHtml(p.phrase)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese</label>
    <input id="ep-zh" value="${escapeHtml(p.zh)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Grammar</label>
    <input id="ep-grammar" value="${escapeHtml(p.grammar||'')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Connotation</label>
    <select id="ep-con" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="neutral" ${p.connotation==='neutral'?'selected':''}>neutral</option>
      <option value="positive" ${p.connotation==='positive'?'selected':''}>positive</option>
      <option value="negative" ${p.connotation==='negative'?'selected':''}>negative</option>
    </select>`,
  ()=>{ const d=data.languageMaster.phrases[idx]; d.phrase=document.getElementById('ep-phrase').value; d.zh=document.getElementById('ep-zh').value; d.grammar=document.getElementById('ep-grammar').value; d.connotation=document.getElementById('ep-con').value; rerender('phrases'); });
}

function editPhraseExample(idx) {
  const p=data.languageMaster.phrases[idx];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Example</h3>
    <textarea id="ex-sent" rows="4" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(p.example?.sentence||'')}</textarea>`,
  ()=>{ if(!data.languageMaster.phrases[idx].example) data.languageMaster.phrases[idx].example={}; data.languageMaster.phrases[idx].example.sentence=document.getElementById('ex-sent').value; rerender('phrases'); });
}

function editSynonym(phraseIdx,synIdx) {
  const s=data.languageMaster.phrases[phraseIdx].synonyms[synIdx];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Synonym</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Word/Phrase</label>
    <input id="es-word" value="${escapeHtml(s.word)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Grammar</label>
    <input id="es-grammar" value="${escapeHtml(s.grammar||'')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Note</label>
    <input id="es-note" value="${escapeHtml(s.note||'')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">`,
  ()=>{ data.languageMaster.phrases[phraseIdx].synonyms[synIdx].word=document.getElementById('es-word').value; data.languageMaster.phrases[phraseIdx].synonyms[synIdx].grammar=document.getElementById('es-grammar').value; data.languageMaster.phrases[phraseIdx].synonyms[synIdx].note=document.getElementById('es-note').value; rerender('phrases'); });
}

function editPhraseNote(phraseIdx,noteIdx) {
  const n=data.languageMaster.phrases[phraseIdx].notes[noteIdx];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Note</h3>
    <textarea id="pn-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.text)}</textarea>
    <select id="pn-ink" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="blue" ${n.ink==='blue'?'selected':''}>Blue</option>
      <option value="red" ${n.ink==='red'?'selected':''}>Red</option>
      <option value="green" ${n.ink==='green'?'selected':''}>Green</option>
    </select>`,
  ()=>{ data.languageMaster.phrases[phraseIdx].notes[noteIdx].text=document.getElementById('pn-text').value; data.languageMaster.phrases[phraseIdx].notes[noteIdx].ink=document.getElementById('pn-ink').value; rerender('phrases'); });
}

// ===== ESSAYS =====
function renderLMEssays() {
  const el=document.getElementById('lm-essays-content');
  if (!el) return;
  const essays=data.languageMaster?.essays||[];
  if (!essays.length) { el.innerHTML=emptyState('📝','No essays yet','Scan and upload sample essay pages'); return; }
  el.innerHTML=`
    <div class="legend">
      <div class="legend-item"><span class="legend-dot" style="background:var(--green-hi);border-bottom:2px solid var(--green-border);"></span>Vocab</div>
      <div class="legend-item"><span class="legend-dot" style="background:var(--yellow-hi);border-bottom:2px solid var(--yellow-border);"></span>百搭</div>
      <div class="legend-item"><span class="legend-dot" style="background:var(--pink-hi);border-bottom:2px solid var(--pink-border);"></span>Point</div>
      <div class="legend-item"><span class="legend-dot" style="border:2px solid #333;"></span>Phrase (tap)</div>
    </div>`+essays.map((e,ei)=>`
    <div class="essay-card">
      <div class="essay-meta">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div><div class="essay-title-text">${escapeHtml(e.title)}</div><div class="essay-info">${escapeHtml(e.meta||'')}</div></div>
          <button class="edit-btn" style="display:none;" onclick="editEssayMeta(${ei})">✏️ Edit Info</button>
        </div>
      </div>
      <div class="essay-body">
        ${(e.paragraphs||[]).map((p,pi)=>{
          const key=`essay-${ei}-para-${pi}`;
          const notes=getStickyNotes(key); notes.forEach((x,i)=>x._idx=i);
          const leftNotes=notes.filter(x=>x.position==='left').map(x=>`<div class="sticky-note sticky-left ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${x._idx},renderLMEssays)">✏️</button></div>`).join('');
          const belowNotes=notes.filter(x=>x.position!=='left').map(x=>`<div class="sticky-note sticky-below ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${x._idx},renderLMEssays)">✏️</button></div>`).join('');
          return `
          <div class="essay-para">
            <div style="display:flex;gap:8px;">
              <div class="essay-margin-col">
                ${p.marginNote?.text?`<div class="essay-margin-note"><span class="handnote ${p.marginNote.ink}">${escapeHtml(p.marginNote.text)}</span><button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;" onclick="editMarginNote(${ei},${pi})">✏️</button></div>`:''}
                ${leftNotes}
                <button class="add-note-btn" style="display:none;font-size:0.6rem;padding:2px 6px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;color:var(--ink3);margin-top:4px;" onclick="addStickyNote('${key}','left',renderLMEssays)">＋</button>
              </div>
              <div style="flex:1;">
                <div class="essay-para-label">${escapeHtml(p.label||'')}</div>
                <div>${renderSegsEdit(p.segments,ei,pi)}</div>
                ${p.handNotes?.length?`<div class="essay-hand-notes">${p.handNotes.map((n,ni)=>`<span style="display:inline-flex;align-items:center;gap:4px;"><span class="handnote ${n.ink}">${escapeHtml(n.text)}</span><button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;" onclick="editHandNote(${ei},${pi},${ni})">✏️</button></span>`).join('')}</div>`:''}
                ${belowNotes}
                <button class="add-note-btn" style="display:none;font-size:0.65rem;padding:2px 8px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;color:var(--ink3);margin-top:6px;" onclick="addStickyNote('${key}','below',renderLMEssays)">＋ Add Note Below</button>
              </div>
            </div>
          </div>`;}).join('')}
      </div>
    </div>`).join('');
}

function renderSegsEdit(segments,ei,pi) {
  if (!segments) return '';
  return segments.map((seg,si)=>{
    const btn=`<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;vertical-align:middle;margin-left:1px;" onclick="editSegment(${ei},${pi},${si})">✏️</button>`;
    if (seg.type==='text') return `<span>${escapeHtml(seg.content)}${btn}</span>`;
    if (seg.type==='highlight') {
      const popup=`<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning||''}</span></span>`;
      return `<span class="hi-${seg.color}">${escapeHtml(seg.content)}${popup}${btn}</span>`;
    }
    if (seg.type==='box') {
      const syns=seg.synonyms?seg.synonyms.map(s=>`= ${s}`).join('<br>'):'';
      const popup=`<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning||''}</span>${syns?`<span class="popup-syn"><b>Synonyms:</b><br>${syns}</span>`:''}</span>`;
      return `<span class="hi-box">${escapeHtml(seg.content)}${popup}${btn}</span>`;
    }
    return escapeHtml(seg.content||'');
  }).join('');
}

function editSegment(ei,pi,si) {
  const seg=data.languageMaster.essays[ei].paragraphs[pi].segments[si];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit ${seg.type==='text'?'Text':'Highlight'}</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Content</label>
    <textarea id="seg-content" rows="4" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(seg.content)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Highlight Type</label>
    <select id="seg-type" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;">
      <option value="text" ${seg.type==='text'?'selected':''}>No highlight (plain text)</option>
      <option value="highlight-green" ${seg.type==='highlight'&&seg.color==='green'?'selected':''}>🟢 Green (Vocab)</option>
      <option value="highlight-yellow" ${seg.type==='highlight'&&seg.color==='yellow'?'selected':''}>🟡 Yellow (百搭)</option>
      <option value="highlight-pink" ${seg.type==='highlight'&&seg.color==='pink'?'selected':''}>🩷 Pink (Point)</option>
      <option value="box" ${seg.type==='box'?'selected':''}>⬜ Box (Phrase)</option>
    </select>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese Meaning <span style="font-weight:400;color:#999;">(highlights only)</span></label>
    <input id="seg-meaning" value="${escapeHtml(seg.meaning||'')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">`,
  ()=>{
    const s=data.languageMaster.essays[ei].paragraphs[pi].segments[si];
    s.content=document.getElementById('seg-content').value;
    s.meaning=document.getElementById('seg-meaning').value;
    const t=document.getElementById('seg-type').value;
    if (t==='text'){s.type='text';delete s.color;}
    else if(t==='box'){s.type='box';delete s.color;}
    else{s.type='highlight';s.color=t.replace('highlight-','');}
    rerender('essays');
  });
}

function editEssayMeta(ei) {
  const e=data.languageMaster.essays[ei];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Essay Info</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Title</label>
    <input id="em-title" value="${escapeHtml(e.title)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Meta</label>
    <input id="em-meta" value="${escapeHtml(e.meta||'')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">`,
  ()=>{ data.languageMaster.essays[ei].title=document.getElementById('em-title').value; data.languageMaster.essays[ei].meta=document.getElementById('em-meta').value; rerender('essays'); });
}

function editMarginNote(ei,pi) {
  const n=data.languageMaster.essays[ei].paragraphs[pi].marginNote;
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Margin Note</h3>
    <textarea id="mn-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.text)}</textarea>
    <select id="mn-ink" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="blue" ${n.ink==='blue'?'selected':''}>Blue</option>
      <option value="red" ${n.ink==='red'?'selected':''}>Red</option>
      <option value="green" ${n.ink==='green'?'selected':''}>Green</option>
    </select>`,
  ()=>{ data.languageMaster.essays[ei].paragraphs[pi].marginNote.text=document.getElementById('mn-text').value; data.languageMaster.essays[ei].paragraphs[pi].marginNote.ink=document.getElementById('mn-ink').value; rerender('essays'); });
}

function editHandNote(ei,pi,ni) {
  const n=data.languageMaster.essays[ei].paragraphs[pi].handNotes[ni];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Hand Note</h3>
    <textarea id="hn-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.text)}</textarea>
    <select id="hn-ink" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="blue" ${n.ink==='blue'?'selected':''}>Blue</option>
      <option value="red" ${n.ink==='red'?'selected':''}>Red</option>
      <option value="green" ${n.ink==='green'?'selected':''}>Green</option>
    </select>`,
  ()=>{ data.languageMaster.essays[ei].paragraphs[pi].handNotes[ni].text=document.getElementById('hn-text').value; data.languageMaster.essays[ei].paragraphs[pi].handNotes[ni].ink=document.getElementById('hn-ink').value; rerender('essays'); });
}

// ===== VOCAB BOOK =====
function renderVocabBook() {
  const el=document.getElementById('vocab-content');
  if (!el) return;
  const vocab=data.vocabBook||[];
  if (!vocab.length) { el.innerHTML=emptyState('📗','Vocab Book is empty','Green-highlighted words from your scans will appear here'); return; }
  const groups={};
  vocab.forEach((v,i)=>{ const key=v.group||v.word[0].toUpperCase(); if(!groups[key]) groups[key]=[]; groups[key].push({...v,_idx:i}); });
  el.innerHTML=Object.entries(groups).sort().map(([key,words])=>`
    <div class="vocab-group">
      <div class="vocab-group-title">${escapeHtml(key)}</div>
      ${words.map(v=>{
        const skey=`vocab-${v._idx}`;
        const notes=getStickyNotes(skey); notes.forEach((x,i)=>x._idx=i);
        const belowNotes=notes.map(x=>`<div class="sticky-note sticky-below ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${skey}',${x._idx},renderVocabBook)">✏️</button></div>`).join('');
        return `
        <div>
          <div class="vocab-item" style="display:flex;align-items:center;gap:8px;">
            <span class="vocab-word">${escapeHtml(v.word)}</span>
            <span class="vocab-zh">${escapeHtml(v.zh)}</span>
            ${v.source?`<span class="vocab-source">${escapeHtml(v.source)}</span>`:''}
            <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;margin-left:auto;" onclick="editVocabItem(${v._idx})">✏️</button>
            <button class="add-note-btn" style="display:none;font-size:0.6rem;padding:1px 5px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;" onclick="addStickyNote('${skey}','below',renderVocabBook)">＋</button>
          </div>
          ${belowNotes}
        </div>`; }).join('')}
    </div>`).join('');
}

function editVocabItem(idx) {
  const v=data.vocabBook[idx];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Vocab</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Word</label>
    <input id="vi-word" value="${escapeHtml(v.word)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese</label>
    <input id="vi-zh" value="${escapeHtml(v.zh)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Group (letter)</label>
    <input id="vi-group" value="${escapeHtml(v.group||'')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">`,
  ()=>{ data.vocabBook[idx].word=document.getElementById('vi-word').value; data.vocabBook[idx].zh=document.getElementById('vi-zh').value; data.vocabBook[idx].group=document.getElementById('vi-group').value.toUpperCase(); rerender('vocab'); });
}

// ===== 百搭句子 =====
function renderBaatDaap() {
  const el=document.getElementById('baat-content');
  if (!el) return;
  const items=data.baatDaap||[];
  if (!items.length) { el.innerHTML=emptyState('📒','百搭句子 is empty','Yellow-highlighted sentences from your scans will appear here'); return; }
  el.innerHTML=items.map((item,i)=>{
    const key=`baat-${i}`;
    const notes=getStickyNotes(key); notes.forEach((x,idx)=>x._idx=idx);
    const belowNotes=notes.map(x=>`<div class="sticky-note sticky-below ink-${x.ink}">${escapeHtml(x.text)}<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;margin-left:4px;" onclick="editStickyNote('${key}',${x._idx},renderBaatDaap)">✏️</button></div>`).join('');
    return `
    <div>
      <div class="baat-item" style="display:flex;align-items:flex-start;gap:8px;">
        <div style="flex:1;">
          <div class="baat-text">${escapeHtml(item.text)}</div>
          ${item.source?`<div class="baat-source">📌 ${escapeHtml(item.source)}</div>`:''}
        </div>
        <button class="edit-btn" style="display:none;font-size:0.6rem;padding:2px 6px;flex-shrink:0;" onclick="editBaatDaap(${i})">✏️</button>
        <button class="add-note-btn" style="display:none;font-size:0.6rem;padding:2px 6px;border:1px dashed var(--border);border-radius:6px;background:transparent;cursor:pointer;flex-shrink:0;" onclick="addStickyNote('${key}','below',renderBaatDaap)">＋</button>
      </div>
      ${belowNotes}
    </div>`; }).join('');
}

function editBaatDaap(idx) {
  const item=data.baatDaap[idx];
  showModal(`<h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit 百搭句子</h3>
    <textarea id="bd-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(item.text)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Source</label>
    <input id="bd-source" value="${escapeHtml(item.source||'')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">`,
  ()=>{ data.baatDaap[idx].text=document.getElementById('bd-text').value; data.baatDaap[idx].source=document.getElementById('bd-source').value; rerender('baat'); });
}

// ===== IDEA POWER BANK =====
function renderIdeaPowerBank() {
  const el=document.getElementById('ipb-content');
  if (!el) return;
  const topics=data.ideaPowerBank||[];
  if (!topics.length) { el.innerHTML=emptyState('💡','No topics yet','Scan and upload Idea Power Bank pages'); return; }
  el.innerHTML=topics.map((topic,ti)=>`
    <div class="topic-block" style="--topic-color:#e67e22;">
      <div class="topic-header" style="background:#e67e22;" onclick="toggleTopic('ipb',${ti})">
        <span class="topic-num">TOPIC ${topic.topicNum||ti+1}</span>
        <span class="topic-title">${escapeHtml(topic.title)}</span>
        <span id="ipb-arrow-${ti}" style="margin-left:auto;color:rgba(255,255,255,0.6);font-size:0.8rem;">▼</span>
      </div>
      <div id="ipb-topic-${ti}" style="display:none;">
        <div style="padding:16px 20px;">
          <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Part 1: Golden Ideas</div>
          ${(topic.goldenIdeas||[]).map(idea=>`
            <div class="ipb-idea">
              <span class="ipb-num">${idea.id}.</span>
              <span style="font-family:'Crimson Pro',serif;font-size:1rem;line-height:1.85;">${renderHighlightedText(idea.text,idea.highlights||[])}</span>
            </div>`).join('')}
          <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin:16px 0 12px;">Part 2: VN Diction Bank</div>
          <div style="background:var(--paper);border-radius:8px;overflow:hidden;border:1px solid var(--border);">
            ${(topic.vnBank||[]).map((v,i)=>`
              <div class="ipb-vn">
                <span class="ipb-vn-num">${i+1}.</span>
                <span>${escapeHtml(v.en)} <span class="ipb-vn-zh">(${escapeHtml(v.zh)})</span></span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`).join('');
}

// ===== NYT DIY =====
function renderNytDiy() {
  const el=document.getElementById('nyt-content');
  if (!el) return;
  const volumes=data.nytDiy||[];
  if (!volumes.length) { el.innerHTML=emptyState('📰','No volumes yet','Scan and upload NYT DIY pages'); return; }
  el.innerHTML=volumes.map((vol,vi)=>`
    <div style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-family:'Syne',sans-serif;font-size:0.8rem;font-weight:800;color:var(--ink);">DIY Language Makeovers</span>
        <span style="background:var(--accent3);color:#fff;border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.7rem;font-weight:700;">${escapeHtml(vol.volume)}</span>
      </div>
      <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:var(--accent3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">1. Big News</div>
      <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);margin-bottom:20px;">
        <div class="nyt-header">
          <div class="nyt-news-label">Must-read News</div>
          <div class="nyt-news-title">${escapeHtml(vol.bigNews?.title||'')}</div>
          <div class="nyt-intro">${escapeHtml(vol.bigNews?.intro||'')}</div>
        </div>
        ${(vol.bigNews?.paragraphs||[]).map(p=>`<div class="nyt-para"><span class="nyt-para-num">[${p.id}]</span>${renderHighlightedText(p.text,p.highlights||[])}</div>`).join('')}
        ${vol.bigNews?.source?`<div class="nyt-source">${escapeHtml(vol.bigNews.source)}</div>`:''}
      </div>
      <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:var(--accent3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">2. Advanced Phrases</div>
      <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);margin-bottom:20px;">
        ${(vol.advancedPhrases||[]).map(p=>`<div class="phrase-list-item"><span class="phrase-list-num">${p.id}.</span><span class="phrase-list-text">${escapeHtml(p.phrase)}</span><span class="phrase-list-zh">(${escapeHtml(p.zh)})</span><div class="phrase-list-example">e.g. ${escapeHtml(p.example)}</div></div>`).join('')}
      </div>
      <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:var(--accent3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">3. Vital Vocabulary</div>
      <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);margin-bottom:20px;">
        ${!(vol.vitalVocab||[]).length?`<div style="padding:20px;text-align:center;font-family:'Syne',sans-serif;font-size:0.8rem;color:var(--ink3);">No vital vocabulary added yet</div>`:(vol.vitalVocab||[]).map(v=>`<div class="phrase-list-item"><span class="phrase-list-text" style="font-weight:400;">${escapeHtml(v.word)}</span><span class="phrase-list-zh">(${escapeHtml(v.zh)})</span></div>`).join('')}
      </div>
    </div>`).join('');
}

// ===== SHU JAI =====
function renderShuJai() {
  const el=document.getElementById('shujai-content');
  if (!el) return;
  const books=data.shuJai||[];
  if (!books.length) { el.innerHTML=emptyState('📖','No books yet','Scan and upload Shu Jai pages'); return; }
  el.innerHTML=books.map((book,bi)=>`
    <div style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:800;color:var(--ink);">${escapeHtml(book.title)}</span>
        ${book.series?`<span style="background:var(--accent2);color:#fff;border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.68rem;font-weight:600;">${escapeHtml(book.series)}</span>`:''}
      </div>
      ${(book.topics||[]).map((topic,ti)=>`
        <div class="topic-block" style="margin-bottom:12px;">
          <div class="topic-header" onclick="toggleTopic('sj-${bi}',${ti})">
            <span class="topic-num">TOPIC ${topic.id}</span>
            <span class="topic-title">${escapeHtml(topic.title)}</span>
            <span id="sj-${bi}-arrow-${ti}" style="margin-left:auto;color:rgba(255,255,255,0.6);font-size:0.8rem;">▼</span>
          </div>
          <div id="sj-${bi}-topic-${ti}" style="display:none;">${renderShuJaiTwoCol(topic.items||[])}</div>
        </div>`).join('')}
    </div>`).join('');
}

function renderShuJaiTwoCol(items) {
  const half=Math.ceil(items.length/2), left=items.slice(0,half), right=items.slice(half);
  const rows=Math.max(left.length,right.length);
  let html='<div class="two-col-grid">';
  for(let i=0;i<rows;i++){
    const l=left[i],r=right[i];
    html+=l?`<div class="two-col-cell"><span class="two-col-num">${l.id}.</span><span>${escapeHtml(l.en)} <span class="two-col-type">(${escapeHtml(l.type)})</span> <span class="two-col-zh">${escapeHtml(l.zh)}</span></span></div>`:`<div class="two-col-cell"></div>`;
    html+=r?`<div class="two-col-cell two-col-right"><span class="two-col-num">${r.id}.</span><span>${escapeHtml(r.en)} <span class="two-col-type">(${escapeHtml(r.type)})</span> <span class="two-col-zh">${escapeHtml(r.zh)}</span></span></div>`:`<div class="two-col-cell two-col-right"></div>`;
  }
  return html+'</div>';
}

function toggleTopic(prefix,idx) {
  const el=document.getElementById(`${prefix}-topic-${idx}`);
  const arrow=document.getElementById(`${prefix}-arrow-${idx}`);
  if (!el) return;
  const open=el.style.display==='none';
  el.style.display=open?'block':'none';
  if (arrow) arrow.textContent=open?'▲':'▼';
}

// ===== MAIN NOTES =====
function renderMainNotes() {
  const el=document.getElementById('mainnotes-content');
  if (!el) return;
  el.innerHTML=emptyState('📝','Main Notes','Rules for this section are TBC — coming soon');
}

// ===== HIGHLIGHT UTILS =====
function renderHighlightedText(text,highlights) {
  if (!highlights||!highlights.length) return escapeHtml(text);
  let result=escapeHtml(text);
  highlights.forEach(h=>{
    const escaped=escapeHtml(h.word);
    const popup=`<span class="popup"><span class="popup-word">${escaped}</span><span class="popup-meaning">${h.zh}</span>${h.note?`<span class="popup-note">${h.note}</span>`:''}</span>`;
    result=result.replace(escaped,`<span class="hi-green">${escaped}${popup}</span>`);
  });
  return result;
}

// ===== RERENDER HELPER =====
function rerender(section) {
  if (section==='news') renderLMNews();
  else if (section==='phrases') renderLMPhrases();
  else if (section==='essays') renderLMEssays();
  else if (section==='vocab') renderVocabBook();
  else if (section==='baat') renderBaatDaap();
  else renderAll();
  if (editMode) {
    document.querySelectorAll('.edit-btn').forEach(el=>el.style.display='inline-block');
    document.querySelectorAll('.add-note-btn').forEach(el=>el.style.display='inline-block');
  }
}

// ===== EMPTY STATE =====
function emptyState(icon,title,desc) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><h3>${title}</h3><p>${desc}</p></div>`;
}

// ===== START =====
window.addEventListener('DOMContentLoaded',init);
