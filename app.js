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
  document.querySelectorAll('.editable-field').forEach(el => {
    el.contentEditable = editMode ? 'true' : 'false';
    el.classList.toggle('edit-active', editMode);
  });
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
  if (!segments) return '';
  return segments.map((seg, i) => {
    if (seg.type === 'text') return escapeHtml(seg.content);
    if (seg.type === 'bold') return `<strong>${escapeHtml(seg.content)}</strong>`;
    if (seg.type === 'highlight') {
      const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span>${seg.note ? `<span class="popup-note">${seg.note}</span>` : ''}</span>`;
      return `<span class="hi-${seg.color}">${escapeHtml(seg.content)}${popup}</span>`;
    }
    if (seg.type === 'box') {
      const syns = seg.synonyms ? seg.synonyms.map(s => `= ${s}`).join('<br>') : '';
      const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span>${syns ? `<span class="popup-syn"><b>Synonyms:</b><br>${syns}</span>` : ''}</span>`;
      return `<span class="hi-box">${escapeHtml(seg.content)}${popup}</span>`;
    }
    return escapeHtml(seg.content || '');
  }).join('');
}

function renderSegmentsEditable(segments, essayIdx, paraIdx) {
  if (!segments) return '';
  return segments.map((seg, segIdx) => {
    const editBtn = editMode ? `<button class="edit-btn seg-edit-btn" onclick="editSegment(${essayIdx},${paraIdx},${segIdx})" style="display:inline-block;font-size:0.6rem;padding:1px 5px;margin-left:2px;vertical-align:middle;">✏️</button>` : '';
    if (seg.type === 'text') return escapeHtml(seg.content);
    if (seg.type === 'highlight') {
      const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span></span>`;
      return `<span class="hi-${seg.color}">${escapeHtml(seg.content)}${popup}${editBtn}</span>`;
    }
    if (seg.type === 'box') {
      const syns = seg.synonyms ? seg.synonyms.map(s => `= ${s}`).join('<br>') : '';
      const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span>${syns ? `<span class="popup-syn"><b>Synonyms:</b><br>${syns}</span>` : ''}</span>`;
      return `<span class="hi-box">${escapeHtml(seg.content)}${popup}${editBtn}</span>`;
    }
    return escapeHtml(seg.content || '');
  }).join('');
}

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
  // Add download button to topbar if not there
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
    languageMaster: (lm.news?.length || 0) + (lm.phrases?.length || 0) + (lm.essays?.length || 0),
    mainNotes: data.mainNotes?.length || 0,
    ideaPowerBank: data.ideaPowerBank?.length || 0,
    nytDiy: data.nytDiy?.length || 0,
    shuJai: data.shuJai?.length || 0,
    vocabBook: data.vocabBook?.length || 0,
    baatDaap: data.baatDaap?.length || 0,
  };
  const cards = [
    { id: 'languageMaster', cls: 'lm', icon: '📚', title: 'Language Master', count: counts.languageMaster },
    { id: 'mainNotes', cls: 'mn', icon: '📝', title: 'Main Notes', count: counts.mainNotes },
    { id: 'ideaPowerBank', cls: 'ipb', icon: '💡', title: 'Idea Power Bank', count: counts.ideaPowerBank },
    { id: 'nytDiy', cls: 'nyt', icon: '📰', title: 'NYT DIY', count: counts.nytDiy },
    { id: 'shuJai', cls: 'sj', icon: '📖', title: 'Shu Jai', count: counts.shuJai },
    { id: 'vocabBook', cls: 'vb', icon: '📗', title: 'Vocab Book', count: counts.vocabBook },
    { id: 'baatDaap', cls: 'bd', icon: '📒', title: '百搭句子', count: counts.baatDaap },
  ];
  document.getElementById('home-grid').innerHTML = cards.map(c => `
    <div class="home-card ${c.cls}" onclick="navigate('${c.id}')">
      <div class="home-card-icon">${c.icon}</div>
      <div class="home-card-title">${c.title}</div>
      <div class="home-card-count"><span>${c.count}</span> ${c.count === 1 ? 'item' : 'items'}</div>
    </div>
  `).join('');
}

// ===== LANGUAGE MASTER =====
function renderLanguageMaster() {
  renderLMNews();
  renderLMPhrases();
  renderLMEssays();
  const firstTab = document.querySelector('#page-languageMaster .section-tab');
  if (firstTab) firstTab.click();
}

// ===== NEWS =====
function renderLMNews() {
  const el = document.getElementById('lm-news-content');
  if (!el) return;
  const news = data.languageMaster?.news || [];
  if (news.length === 0) { el.innerHTML = emptyState('📰', 'No news yet', 'Scan and upload Language Master news pages'); return; }
  el.innerHTML = news.map((n, ni) => `
    <div class="news-card">
      <div class="news-header">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div class="news-issue">${escapeHtml(n.issue || '')}</div>
            <div class="news-title">${escapeHtml(n.title)}</div>
          </div>
          <button class="edit-btn" style="display:none;" onclick="editNews(${ni})">✏️ Edit News</button>
        </div>
      </div>
      <div class="news-body">${renderHighlightedText(n.newsText || '', n.newsHighlights || [])}</div>
      <div class="news-reflection">
        <div class="news-reflection-label">💡 Reflection — Most Important</div>
        ${renderHighlightedText(n.reflectionText || '', n.reflectionHighlights || [])}
      </div>
      <div class="vocab-booster">
        <div class="vocab-booster-label">📋 Thematic Vocab Booster</div>
        <div class="vocab-booster-grid">
          ${(n.vocabBooster || []).map((v, vi) => `
            <div class="vocab-booster-item" style="display:flex;align-items:center;gap:6px;">
              <span class="vocab-booster-num">${vi+1}.</span>
              <span>${escapeHtml(v.en)} <span class="vocab-booster-zh">(${escapeHtml(v.zh)})</span></span>
              <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;" onclick="editVocabBooster(${ni},${vi})">✏️</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function editNews(ni) {
  const n = data.languageMaster.news[ni];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit News: ${escapeHtml(n.title)}</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Title</label>
    <input id="en-title" value="${escapeHtml(n.title)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">News Text</label>
    <textarea id="en-newstext" rows="4" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.newsText || '')}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Reflection Text</label>
    <textarea id="en-reflectiontext" rows="5" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.reflectionText || '')}</textarea>
  `, () => {
    data.languageMaster.news[ni].title = document.getElementById('en-title').value;
    data.languageMaster.news[ni].newsText = document.getElementById('en-newstext').value;
    data.languageMaster.news[ni].reflectionText = document.getElementById('en-reflectiontext').value;
    renderLMNews();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function editVocabBooster(ni, vi) {
  const v = data.languageMaster.news[ni].vocabBooster[vi];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Vocab Booster Item</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">English</label>
    <input id="vb-en" value="${escapeHtml(v.en)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese</label>
    <input id="vb-zh" value="${escapeHtml(v.zh)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">
  `, () => {
    data.languageMaster.news[ni].vocabBooster[vi].en = document.getElementById('vb-en').value;
    data.languageMaster.news[ni].vocabBooster[vi].zh = document.getElementById('vb-zh').value;
    renderLMNews();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

// ===== PHRASES =====
function renderLMPhrases() {
  const el = document.getElementById('lm-phrases-content');
  if (!el) return;
  const phrases = data.languageMaster?.phrases || [];
  if (phrases.length === 0) { el.innerHTML = emptyState('🔑', 'No phrases yet', 'Scan and upload Language Spotlight pages'); return; }
  el.innerHTML = phrases.map((p, idx) => `
    <div class="phrase-card">
      <div class="phrase-header" onclick="togglePhrase(${idx})">
        <div>
          <span class="phrase-title">${escapeHtml(p.phrase)}</span>
          <span class="phrase-zh">${escapeHtml(p.zh)}</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="background:${p.connotation==='negative'?'#ffeaea':p.connotation==='positive'?'#e8f5e9':'#f0f0f0'};color:${p.connotation==='negative'?'#c0392b':p.connotation==='positive'?'#2d6a4f':'#666'};border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.68rem;font-weight:600;">${escapeHtml(p.grammar || '')} · ${escapeHtml(p.connotation || '')}</span>
          <button class="edit-btn" style="display:none;font-size:0.7rem;padding:2px 8px;" onclick="event.stopPropagation();editPhrase(${idx})">✏️ Edit</button>
          <span id="phrase-arrow-${idx}" style="color:#aaa;font-size:0.8rem;">▼</span>
        </div>
      </div>
      <div class="phrase-body" id="phrase-body-${idx}">
        <div class="phrase-section-label">Example</div>
        <div class="phrase-example">${renderHighlightedText(p.example?.sentence || '', p.example?.highlights || [])}</div>
        <div class="phrase-section-label">Synonyms</div>
        ${(p.synonyms || []).map((s, si) => `
          <div class="synonym-row" style="display:flex;align-items:center;gap:6px;">
            <span class="synonym-eq">=</span>
            <span style="font-family:'Crimson Pro',serif;font-size:0.9rem;">${escapeHtml(s.word)}</span>
            ${s.grammar ? `<span class="synonym-grammar">${escapeHtml(s.grammar)}</span>` : ''}
            ${s.note ? `<span class="synonym-note">${escapeHtml(s.note)}</span>` : ''}
            <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;margin-left:auto;" onclick="editSynonym(${idx},${si})">✏️</button>
          </div>
        `).join('')}
        ${p.notes?.length ? `
          <div class="phrase-section-label">✏️ Handwritten Notes</div>
          <div style="background:#fffef0;border-radius:6px;padding:10px 12px;">
            ${p.notes.map((n, ni) => `
              <div style="display:flex;align-items:center;gap:6px;">
                <div class="handnote ${n.ink}" style="flex:1;">${escapeHtml(n.text)}</div>
                <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;" onclick="editPhraseNote(${idx},${ni})">✏️</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
        <div class="baat-daap-box">
          <div class="baat-daap-label">⬜ 百搭位</div>
          <input class="baat-daap-input" placeholder="Fill in your 百搭 usage here..." value="${escapeHtml(p.baatDaapNote || '')}" onchange="saveBaatDaapNote(${idx}, this.value)" />
        </div>
      </div>
    </div>
  `).join('');
}

function togglePhrase(idx) {
  const body = document.getElementById('phrase-body-' + idx);
  const arrow = document.getElementById('phrase-arrow-' + idx);
  if (!body) return;
  const open = body.classList.toggle('open');
  if (arrow) arrow.textContent = open ? '▲' : '▼';
}

function saveBaatDaapNote(idx, val) {
  data.languageMaster.phrases[idx].baatDaapNote = val;
}

function editPhrase(idx) {
  const p = data.languageMaster.phrases[idx];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Phrase</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Phrase</label>
    <input id="ep-phrase" value="${escapeHtml(p.phrase)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese Meaning</label>
    <input id="ep-zh" value="${escapeHtml(p.zh)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Grammar Tag</label>
    <input id="ep-grammar" value="${escapeHtml(p.grammar || '')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Connotation</label>
    <select id="ep-connotation" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;">
      <option value="neutral" ${p.connotation==='neutral'?'selected':''}>neutral</option>
      <option value="positive" ${p.connotation==='positive'?'selected':''}>positive</option>
      <option value="negative" ${p.connotation==='negative'?'selected':''}>negative</option>
    </select>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Example Sentence</label>
    <textarea id="ep-example" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(p.example?.sentence || '')}</textarea>
  `, () => {
    data.languageMaster.phrases[idx].phrase = document.getElementById('ep-phrase').value;
    data.languageMaster.phrases[idx].zh = document.getElementById('ep-zh').value;
    data.languageMaster.phrases[idx].grammar = document.getElementById('ep-grammar').value;
    data.languageMaster.phrases[idx].connotation = document.getElementById('ep-connotation').value;
    if (!data.languageMaster.phrases[idx].example) data.languageMaster.phrases[idx].example = {};
    data.languageMaster.phrases[idx].example.sentence = document.getElementById('ep-example').value;
    renderLMPhrases();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function editSynonym(phraseIdx, synIdx) {
  const s = data.languageMaster.phrases[phraseIdx].synonyms[synIdx];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Synonym</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Word/Phrase</label>
    <input id="es-word" value="${escapeHtml(s.word)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Grammar Tag</label>
    <input id="es-grammar" value="${escapeHtml(s.grammar || '')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Note</label>
    <input id="es-note" value="${escapeHtml(s.note || '')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">
  `, () => {
    data.languageMaster.phrases[phraseIdx].synonyms[synIdx].word = document.getElementById('es-word').value;
    data.languageMaster.phrases[phraseIdx].synonyms[synIdx].grammar = document.getElementById('es-grammar').value;
    data.languageMaster.phrases[phraseIdx].synonyms[synIdx].note = document.getElementById('es-note').value;
    renderLMPhrases();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function editPhraseNote(phraseIdx, noteIdx) {
  const n = data.languageMaster.phrases[phraseIdx].notes[noteIdx];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Handwritten Note</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Text</label>
    <textarea id="epn-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.text)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Ink Colour</label>
    <select id="epn-ink" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="blue" ${n.ink==='blue'?'selected':''}>Blue</option>
      <option value="red" ${n.ink==='red'?'selected':''}>Red</option>
      <option value="green" ${n.ink==='green'?'selected':''}>Green</option>
    </select>
  `, () => {
    data.languageMaster.phrases[phraseIdx].notes[noteIdx].text = document.getElementById('epn-text').value;
    data.languageMaster.phrases[phraseIdx].notes[noteIdx].ink = document.getElementById('epn-ink').value;
    renderLMPhrases();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

// ===== ESSAYS =====
function renderLMEssays() {
  const el = document.getElementById('lm-essays-content');
  if (!el) return;
  const essays = data.languageMaster?.essays || [];
  if (essays.length === 0) { el.innerHTML = emptyState('📝', 'No essays yet', 'Scan and upload sample essay pages'); return; }
  el.innerHTML = `
    <div class="legend">
      <div class="legend-item"><span class="legend-dot" style="background:var(--green-hi);border-bottom:2px solid var(--green-border);"></span>Vocab</div>
      <div class="legend-item"><span class="legend-dot" style="background:var(--yellow-hi);border-bottom:2px solid var(--yellow-border);"></span>百搭</div>
      <div class="legend-item"><span class="legend-dot" style="background:var(--pink-hi);border-bottom:2px solid var(--pink-border);"></span>Point</div>
      <div class="legend-item"><span class="legend-dot" style="border:2px solid #333;"></span>Phrase (tap)</div>
    </div>
  ` + essays.map((e, ei) => `
    <div class="essay-card">
      <div class="essay-meta">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div class="essay-title-text">${escapeHtml(e.title)}</div>
            <div class="essay-info">${escapeHtml(e.meta || '')}</div>
          </div>
          <button class="edit-btn" style="display:none;" onclick="editEssayMeta(${ei})">✏️ Edit Info</button>
        </div>
      </div>
      <div class="essay-body">
        ${(e.paragraphs || []).map((p, pi) => `
          <div class="essay-para">
            ${p.marginNote?.text ? `
              <div class="essay-margin-note" style="display:flex;align-items:flex-start;gap:4px;">
                <span class="handnote ${p.marginNote.ink}">${escapeHtml(p.marginNote.text)}</span>
                <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;" onclick="editMarginNote(${ei},${pi})">✏️</button>
              </div>` : ''}
            <div class="essay-para-label">${escapeHtml(p.label || '')}</div>
            <div>${renderSegmentsWithEdit(p.segments, ei, pi)}</div>
            ${p.handNotes?.length ? `<div class="essay-hand-notes">${p.handNotes.map((n, ni) => `
              <span style="display:inline-flex;align-items:center;gap:4px;">
                <span class="handnote ${n.ink}">${escapeHtml(n.text)}</span>
                <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;" onclick="editHandNote(${ei},${pi},${ni})">✏️</button>
              </span>`).join('')}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderSegmentsWithEdit(segments, ei, pi) {
  if (!segments) return '';
  return segments.map((seg, si) => {
    const editBtn = `<button class="edit-btn" style="display:none;font-size:0.55rem;padding:1px 4px;vertical-align:middle;margin-left:1px;" onclick="editSegment(${ei},${pi},${si})">✏️</button>`;
    if (seg.type === 'text') {
      return `<span>${escapeHtml(seg.content)}${editBtn}</span>`;
    }
    if (seg.type === 'highlight') {
      const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span></span>`;
      return `<span class="hi-${seg.color}">${escapeHtml(seg.content)}${popup}${editBtn}</span>`;
    }
    if (seg.type === 'box') {
      const syns = seg.synonyms ? seg.synonyms.map(s => `= ${s}`).join('<br>') : '';
      const popup = `<span class="popup"><span class="popup-word">${escapeHtml(seg.content)}</span><span class="popup-meaning">${seg.meaning || ''}</span>${syns ? `<span class="popup-syn"><b>Synonyms:</b><br>${syns}</span>` : ''}</span>`;
      return `<span class="hi-box">${escapeHtml(seg.content)}${popup}${editBtn}</span>`;
    }
    return escapeHtml(seg.content || '');
  }).join('');
}

function editSegment(ei, pi, si) {
  const seg = data.languageMaster.essays[ei].paragraphs[pi].segments[si];
  const isText = seg.type === 'text';
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">${isText ? 'Edit Text' : 'Edit Highlight'}</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Text Content</label>
    <textarea id="seg-content" rows="4" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(seg.content)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Highlight Type</label>
    <select id="seg-type" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;">
      <option value="text" ${seg.type==='text'?'selected':''}>No highlight (plain text)</option>
      <option value="highlight-green" ${seg.type==='highlight'&&seg.color==='green'?'selected':''}>🟢 Green (Vocab)</option>
      <option value="highlight-yellow" ${seg.type==='highlight'&&seg.color==='yellow'?'selected':''}>🟡 Yellow (百搭)</option>
      <option value="highlight-pink" ${seg.type==='highlight'&&seg.color==='pink'?'selected':''}>🩷 Pink (Point)</option>
      <option value="box" ${seg.type==='box'?'selected':''}>⬜ Box (Phrase)</option>
    </select>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese Meaning / Note <span style="font-weight:400;color:#999;">(for highlights only)</span></label>
    <input id="seg-meaning" value="${escapeHtml(seg.meaning || '')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">
  `, () => {
    const content = document.getElementById('seg-content').value;
    const typeVal = document.getElementById('seg-type').value;
    const meaning = document.getElementById('seg-meaning').value;
    const s = data.languageMaster.essays[ei].paragraphs[pi].segments[si];
    s.content = content;
    s.meaning = meaning;
    if (typeVal === 'text') { s.type = 'text'; delete s.color; }
    else if (typeVal === 'box') { s.type = 'box'; delete s.color; }
    else { s.type = 'highlight'; s.color = typeVal.replace('highlight-', ''); }
    renderLMEssays();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function editEssayMeta(ei) {
  const e = data.languageMaster.essays[ei];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Essay Info</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Title</label>
    <input id="em-title" value="${escapeHtml(e.title)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Meta Info</label>
    <input id="em-meta" value="${escapeHtml(e.meta || '')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">
  `, () => {
    data.languageMaster.essays[ei].title = document.getElementById('em-title').value;
    data.languageMaster.essays[ei].meta = document.getElementById('em-meta').value;
    renderLMEssays();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function editMarginNote(ei, pi) {
  const n = data.languageMaster.essays[ei].paragraphs[pi].marginNote;
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Margin Note</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Text</label>
    <textarea id="mn-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.text)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Ink Colour</label>
    <select id="mn-ink" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="blue" ${n.ink==='blue'?'selected':''}>Blue</option>
      <option value="red" ${n.ink==='red'?'selected':''}>Red</option>
      <option value="green" ${n.ink==='green'?'selected':''}>Green</option>
    </select>
  `, () => {
    data.languageMaster.essays[ei].paragraphs[pi].marginNote.text = document.getElementById('mn-text').value;
    data.languageMaster.essays[ei].paragraphs[pi].marginNote.ink = document.getElementById('mn-ink').value;
    renderLMEssays();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

function editHandNote(ei, pi, ni) {
  const n = data.languageMaster.essays[ei].paragraphs[pi].handNotes[ni];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Handwritten Note</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Text</label>
    <textarea id="hn-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(n.text)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Ink Colour</label>
    <select id="hn-ink" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">
      <option value="blue" ${n.ink==='blue'?'selected':''}>Blue</option>
      <option value="red" ${n.ink==='red'?'selected':''}>Red</option>
      <option value="green" ${n.ink==='green'?'selected':''}>Green</option>
    </select>
  `, () => {
    data.languageMaster.essays[ei].paragraphs[pi].handNotes[ni].text = document.getElementById('hn-text').value;
    data.languageMaster.essays[ei].paragraphs[pi].handNotes[ni].ink = document.getElementById('hn-ink').value;
    renderLMEssays();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

// ===== VOCAB BOOK =====
function renderVocabBook() {
  const el = document.getElementById('vocab-content');
  if (!el) return;
  const vocab = data.vocabBook || [];
  if (vocab.length === 0) { el.innerHTML = emptyState('📗', 'Vocab Book is empty', 'Green-highlighted words from your scans will appear here'); return; }
  const groups = {};
  vocab.forEach((v, i) => {
    const key = v.group || v.word[0].toUpperCase();
    if (!groups[key]) groups[key] = [];
    groups[key].push({ ...v, _idx: i });
  });
  el.innerHTML = Object.entries(groups).sort().map(([key, words]) => `
    <div class="vocab-group">
      <div class="vocab-group-title">${escapeHtml(key)}</div>
      ${words.map(v => `
        <div class="vocab-item" style="display:flex;align-items:center;gap:8px;">
          <span class="vocab-word">${escapeHtml(v.word)}</span>
          <span class="vocab-zh">${escapeHtml(v.zh)}</span>
          ${v.source ? `<span class="vocab-source">${escapeHtml(v.source)}</span>` : ''}
          <button class="edit-btn" style="display:none;font-size:0.6rem;padding:1px 5px;margin-left:auto;" onclick="editVocabItem(${v._idx})">✏️</button>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function editVocabItem(idx) {
  const v = data.vocabBook[idx];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit Vocab Item</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Word</label>
    <input id="vi-word" value="${escapeHtml(v.word)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Chinese Meaning</label>
    <input id="vi-zh" value="${escapeHtml(v.zh)}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;">
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Group (single letter)</label>
    <input id="vi-group" value="${escapeHtml(v.group || '')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">
  `, () => {
    data.vocabBook[idx].word = document.getElementById('vi-word').value;
    data.vocabBook[idx].zh = document.getElementById('vi-zh').value;
    data.vocabBook[idx].group = document.getElementById('vi-group').value.toUpperCase();
    renderVocabBook();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

// ===== 百搭句子 =====
function renderBaatDaap() {
  const el = document.getElementById('baat-content');
  if (!el) return;
  const items = data.baatDaap || [];
  if (items.length === 0) { el.innerHTML = emptyState('📒', '百搭句子 is empty', 'Yellow-highlighted sentences from your scans will appear here'); return; }
  el.innerHTML = items.map((item, i) => `
    <div class="baat-item" style="display:flex;align-items:flex-start;gap:8px;">
      <div style="flex:1;">
        <div class="baat-text">${escapeHtml(item.text)}</div>
        ${item.source ? `<div class="baat-source">📌 ${escapeHtml(item.source)}</div>` : ''}
      </div>
      <button class="edit-btn" style="display:none;font-size:0.6rem;padding:2px 6px;flex-shrink:0;" onclick="editBaatDaap(${i})">✏️</button>
    </div>
  `).join('');
}

function editBaatDaap(idx) {
  const item = data.baatDaap[idx];
  showModal(`
    <h3 style="margin:0 0 16px;font-family:'Syne',sans-serif;">Edit 百搭句子</h3>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Sentence / Phrase</label>
    <textarea id="bd-text" rows="3" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;margin-bottom:12px;font-family:inherit;box-sizing:border-box;resize:vertical;">${escapeHtml(item.text)}</textarea>
    <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:4px;">Source</label>
    <input id="bd-source" value="${escapeHtml(item.source || '')}" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-family:inherit;box-sizing:border-box;">
  `, () => {
    data.baatDaap[idx].text = document.getElementById('bd-text').value;
    data.baatDaap[idx].source = document.getElementById('bd-source').value;
    renderBaatDaap();
    if (editMode) document.querySelectorAll('.edit-btn').forEach(el => el.style.display = 'inline-block');
  });
}

// ===== IDEA POWER BANK =====
function renderIdeaPowerBank() {
  const el = document.getElementById('ipb-content');
  if (!el) return;
  const topics = data.ideaPowerBank || [];
  if (topics.length === 0) { el.innerHTML = emptyState('💡', 'No topics yet', 'Scan and upload Idea Power Bank pages'); return; }
  el.innerHTML = topics.map((topic, ti) => `
    <div class="topic-block" style="--topic-color:#e67e22;">
      <div class="topic-header" style="background:#e67e22;" onclick="toggleTopic('ipb',${ti})">
        <span class="topic-num">TOPIC ${topic.topicNum || ti+1}</span>
        <span class="topic-title">${escapeHtml(topic.title)}</span>
        <span id="ipb-arrow-${ti}" style="margin-left:auto;color:rgba(255,255,255,0.6);font-size:0.8rem;">▼</span>
      </div>
      <div id="ipb-topic-${ti}" style="display:none;">
        <div style="padding:16px 20px;">
          <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Part 1: Golden Ideas</div>
          ${(topic.goldenIdeas || []).map(idea => `
            <div class="ipb-idea">
              <span class="ipb-num">${idea.id}.</span>
              <span style="font-family:'Crimson Pro',serif;font-size:1rem;line-height:1.85;">${renderHighlightedText(idea.text, idea.highlights || [])}</span>
            </div>
          `).join('')}
          <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin:16px 0 12px;">Part 2: VN Diction Bank</div>
          <div style="background:var(--paper);border-radius:8px;overflow:hidden;border:1px solid var(--border);">
            ${(topic.vnBank || []).map((v, i) => `
              <div class="ipb-vn">
                <span class="ipb-vn-num">${i+1}.</span>
                <span>${escapeHtml(v.en)} <span class="ipb-vn-zh">(${escapeHtml(v.zh)})</span></span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== NYT DIY =====
function renderNytDiy() {
  const el = document.getElementById('nyt-content');
  if (!el) return;
  const volumes = data.nytDiy || [];
  if (volumes.length === 0) { el.innerHTML = emptyState('📰', 'No volumes yet', 'Scan and upload NYT DIY pages'); return; }
  el.innerHTML = volumes.map((vol, vi) => `
    <div style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-family:'Syne',sans-serif;font-size:0.8rem;font-weight:800;color:var(--ink);">DIY Language Makeovers</span>
        <span style="background:var(--accent3);color:#fff;border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.7rem;font-weight:700;">${escapeHtml(vol.volume)}</span>
      </div>
      <div style="font-family:'Syne',sans-serif;font-size:0.65rem;font-weight:700;color:var(--accent3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">1. Big News</div>
      <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);margin-bottom:20px;">
        <div class="nyt-header">
          <div class="nyt-news-label">Must-read News</div>
          <div class="nyt-news-title">${escapeHtml(vol.bigNews?.title || '')}</div>
          <div class="nyt-intro">${escapeHtml(vol.bigNews?.intro || '')}</div>
        </div>
        ${(vol.bigNews?.paragraphs || []).map(p => `
          <div class="nyt-para"><span class="nyt-para-num">[${p.id}]</span>${renderHighlightedText(p.text, p.highlights || [])}</div>
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
            </div>`).join('')}
      </div>
    </div>
  `).join('');
}

// ===== SHU JAI =====
function renderShuJai() {
  const el = document.getElementById('shujai-content');
  if (!el) return;
  const books = data.shuJai || [];
  if (books.length === 0) { el.innerHTML = emptyState('📖', 'No books yet', 'Scan and upload Shu Jai pages'); return; }
  el.innerHTML = books.map((book, bi) => `
    <div style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:800;color:var(--ink);">${escapeHtml(book.title)}</span>
        ${book.series ? `<span style="background:var(--accent2);color:#fff;border-radius:20px;padding:2px 10px;font-family:'Syne',sans-serif;font-size:0.68rem;font-weight:600;">${escapeHtml(book.series)}</span>` : ''}
      </div>
      ${(book.topics || []).map((topic, ti) => `
        <div class="topic-block" style="margin-bottom:12px;">
          <div class="topic-header" onclick="toggleTopic('sj-${bi}',${ti})">
            <span class="topic-num">TOPIC ${topic.id}</span>
            <span class="topic-title">${escapeHtml(topic.title)}</span>
            <span id="sj-${bi}-arrow-${ti}" style="margin-left:auto;color:rgba(255,255,255,0.6);font-size:0.8rem;">▼</span>
          </div>
          <div id="sj-${bi}-topic-${ti}" style="display:none;">${renderShuJaiTwoCol(topic.items || [])}</div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function renderShuJaiTwoCol(items) {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  const rows = Math.max(left.length, right.length);
  let html = '<div class="two-col-grid">';
  for (let i = 0; i < rows; i++) {
    const l = left[i], r = right[i];
    html += l ? `<div class="two-col-cell"><span class="two-col-num">${l.id}.</span><span>${escapeHtml(l.en)} <span class="two-col-type">(${escapeHtml(l.type)})</span> <span class="two-col-zh">${escapeHtml(l.zh)}</span></span></div>` : `<div class="two-col-cell"></div>`;
    html += r ? `<div class="two-col-cell two-col-right"><span class="two-col-num">${r.id}.</span><span>${escapeHtml(r.en)} <span class="two-col-type">(${escapeHtml(r.type)})</span> <span class="two-col-zh">${escapeHtml(r.zh)}</span></span></div>` : `<div class="two-col-cell two-col-right"></div>`;
  }
  html += '</div>';
  return html;
}

function toggleTopic(prefix, idx) {
  const el = document.getElementById(`${prefix}-topic-${idx}`);
  const arrow = document.getElementById(`${prefix}-arrow-${idx}`);
  if (!el) return;
  const open = el.style.display === 'none';
  el.style.display = open ? 'block' : 'none';
  if (arrow) arrow.textContent = open ? '▲' : '▼';
}

// ===== MAIN NOTES =====
function renderMainNotes() {
  const el = document.getElementById('mainnotes-content');
  if (!el) return;
  el.innerHTML = emptyState('📝', 'Main Notes', 'Rules for this section are TBC — coming soon');
}

// ===== EMPTY STATE =====
function emptyState(icon, title, desc) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><h3>${title}</h3><p>${desc}</p></div>`;
}

// ===== START =====
window.addEventListener('DOMContentLoaded', init);
