// ===== STATE =====
var data = null;
var currentPage = ‘home’;
var editMode = false;

// ===== INIT =====
function init() {
fetch(‘data.json’)
.then(function(res) { return res.json(); })
.then(function(d) {
data = d;
renderAll();
navigate(‘home’);
})
.catch(function() {
data = { languageMaster: { news: [], phrases: [], essays: [] }, mainNotes: [], ideaPowerBank: [], nytDiy: [], shuJai: [], vocabBook: [], baatDaap: [] };
renderAll();
navigate(‘home’);
});
}

// ===== NAVIGATION =====
function navigate(page, sub) {
currentPage = page;
document.querySelectorAll(’.nav-item’).forEach(function(el) {
el.classList.toggle(‘active’, el.dataset.page === page);
});
document.querySelectorAll(’.page’).forEach(function(el) {
el.classList.toggle(‘active’, el.id === ‘page-’ + page);
});
var titles = {
home: ‘🏠 Home’, languageMaster: ‘📚 Language Master’,
mainNotes: ‘📝 Main Notes’, ideaPowerBank: ‘💡 Idea Power Bank’,
nytDiy: ‘📰 NYT DIY’, shuJai: ‘📖 Shu Jai’,
vocabBook: ‘📗 Vocab Book’, baatDaap: ‘📒 百搭句子’
};
document.getElementById(‘topbar-title’).textContent = titles[page] || page;
if (sub) showSubTab(page, sub);
window.scrollTo(0, 0);
}

function showSubTab(page, sub) {
document.querySelectorAll(’#page-’ + page + ’ .section-tab’).forEach(function(el) {
el.classList.toggle(‘active’, el.dataset.tab === sub);
});
document.querySelectorAll(’#page-’ + page + ’ .tab-content’).forEach(function(el) {
el.style.display = el.dataset.tab === sub ? ‘block’ : ‘none’;
});
}

function toggleEditMode() {
editMode = !editMode;
var banner = document.getElementById(‘edit-banner’);
if (banner) banner.classList.toggle(‘show’, editMode);
var btn = document.getElementById(‘edit-toggle-btn’);
if (btn) { btn.textContent = editMode ? ‘🔒 Lock’ : ‘✏️ Edit’; }
document.querySelectorAll(’.edit-btn’).forEach(function(el) {
el.style.display = editMode ? ‘inline-block’ : ‘none’;
});
}

function togglePhrase(idx) {
var body = document.getElementById(‘phrase-body-’ + idx);
var arrow = document.getElementById(‘phrase-arrow-’ + idx);
if (!body) return;
var open = body.classList.toggle(‘open’);
if (arrow) arrow.textContent = open ? ‘▲’ : ‘▼’;
}

function toggleTopic(prefix, idx) {
var el = document.getElementById(prefix + ‘-topic-’ + idx);
var arrow = document.getElementById(prefix + ‘-arrow-’ + idx);
if (!el) return;
var open = el.style.display === ‘none’;
el.style.display = open ? ‘block’ : ‘none’;
if (arrow) arrow.textContent = open ? ‘▲’ : ‘▼’;
}

// ===== UTILS =====
function esc(str) {
if (!str) return ‘’;
return String(str).replace(/&/g,’&’).replace(/</g,’<’).replace(/>/g,’>’).replace(/”/g,’"’);
}

function renderHighlighted(text, highlights) {
if (!highlights || highlights.length === 0) return esc(text);
var result = esc(text);
highlights.forEach(function(h) {
var w = esc(h.word);
var popup = ‘<span class="popup"><span class="popup-word">’ + w + ‘</span><span class="popup-meaning">’ + esc(h.zh) + ‘</span></span>’;
result = result.replace(w, ‘<span class="hi-green" onclick="this.querySelector(\'.popup\').style.display=this.querySelector(\'.popup\').style.display===\'block\'?\'none\':\'block\'">’ + w + popup + ‘</span>’);
});
return result;
}

function renderSegments(segments) {
if (!segments) return ‘’;
return segments.map(function(seg) {
if (seg.type === ‘text’) return esc(seg.content);
if (seg.type === ‘bold’) return ‘<strong>’ + esc(seg.content) + ‘</strong>’;
if (seg.type === ‘highlight’) {
var popup = ‘<span class="popup"><span class="popup-word">’ + esc(seg.content) + ‘</span><span class="popup-meaning">’ + esc(seg.meaning||’’) + ‘</span>’ + (seg.note ? ‘<span class="popup-note">’ + esc(seg.note) + ‘</span>’ : ‘’) + ‘</span>’;
return ‘<span class="hi-' + seg.color + '" onclick="this.querySelector(\'.popup\').style.display=this.querySelector(\'.popup\').style.display===\'block\'?\'none\':\'block\'">’ + esc(seg.content) + popup + ‘</span>’;
}
if (seg.type === ‘box’) {
var syns = seg.synonyms ? seg.synonyms.map(function(s){return ‘= ‘+esc(s);}).join(’<br>’) : ‘’;
var popup = ‘<span class="popup"><span class="popup-word">’ + esc(seg.content) + ‘</span><span class="popup-meaning">’ + esc(seg.meaning||’’) + ‘</span>’ + (syns ? ‘<span class="popup-syn"><b>Synonyms:</b><br>’ + syns + ‘</span>’ : ‘’) + ‘</span>’;
return ‘<span class="hi-box" onclick="this.querySelector(\'.popup\').style.display=this.querySelector(\'.popup\').style.display===\'block\'?\'none\':\'block\'">’ + esc(seg.content) + popup + ‘</span>’;
}
return esc(seg.content||’’);
}).join(’’);
}

function emptyState(icon, title, desc) {
return ‘<div class="empty-state"><div class="empty-icon">’ + icon + ‘</div><h3>’ + title + ‘</h3><p>’ + desc + ‘</p></div>’;
}

// ===== RENDER ALL =====
function renderAll() {
renderHome();
renderLMNews();
renderLMPhrases();
renderLMEssays();
renderIdeaPowerBank();
renderNytDiy();
renderShuJai();
renderVocabBook();
renderBaatDaap();
renderMainNotes();
// set default LM tab
showSubTab(‘languageMaster’, ‘news’);
}

// ===== HOME =====
function renderHome() {
var el = document.getElementById(‘home-grid’);
if (!el || !data) return;
var lm = data.languageMaster || {};
var counts = {
languageMaster: (lm.news||[]).length + (lm.phrases||[]).length + (lm.essays||[]).length,
mainNotes: (data.mainNotes||[]).length,
ideaPowerBank: (data.ideaPowerBank||[]).length,
nytDiy: (data.nytDiy||[]).length,
shuJai: (data.shuJai||[]).length,
vocabBook: (data.vocabBook||[]).length,
baatDaap: (data.baatDaap||[]).length
};
var cards = [
{ id:‘languageMaster’, cls:‘lm’, icon:‘📚’, title:‘Language Master’ },
{ id:‘mainNotes’, cls:‘mn’, icon:‘📝’, title:‘Main Notes’ },
{ id:‘ideaPowerBank’, cls:‘ipb’, icon:‘💡’, title:‘Idea Power Bank’ },
{ id:‘nytDiy’, cls:‘nyt’, icon:‘📰’, title:‘NYT DIY’ },
{ id:‘shuJai’, cls:‘sj’, icon:‘📖’, title:‘Shu Jai’ },
{ id:‘vocabBook’, cls:‘vb’, icon:‘📗’, title:‘Vocab Book’ },
{ id:‘baatDaap’, cls:‘bd’, icon:‘📒’, title:‘百搭句子’ }
];
el.innerHTML = cards.map(function(c) {
var n = counts[c.id] || 0;
return ‘<div class="home-card ' + c.cls + '" onclick="navigate(\'' + c.id + '\')">’ +
‘<div class="home-card-icon">’ + c.icon + ‘</div>’ +
‘<div class="home-card-title">’ + c.title + ‘</div>’ +
‘<div class="home-card-count"><span>’ + n + ‘</span>’ + (n===1?‘item’:‘items’) + ‘</div>’ +
‘</div>’;
}).join(’’);
}

// ===== LANGUAGE MASTER - NEWS =====
function renderLMNews() {
var el = document.getElementById(‘lm-news-content’);
if (!el) return;
var news = (data && data.languageMaster && data.languageMaster.news) || [];
if (news.length === 0) { el.innerHTML = emptyState(‘📰’,‘No news yet’,‘Scan and upload Language Master news pages’); return; }
el.innerHTML = news.map(function(n) {
return ‘<div class="news-card">’ +
‘<div class="news-header"><div class="news-issue">’ + esc(n.issue||’’) + ‘</div><div class="news-title">’ + esc(n.title) + ‘</div></div>’ +
‘<div class="news-body">’ + renderHighlighted(n.newsText||’’, n.newsHighlights||[]) + ‘</div>’ +
‘<div class="news-reflection"><div class="news-reflection-label">💡 Reflection — Most Important</div>’ + renderHighlighted(n.reflectionText||’’, n.reflectionHighlights||[]) + ‘</div>’ +
‘<div class="vocab-booster"><div class="vocab-booster-label">📋 Thematic Vocab Booster</div>’ +
‘<div class="vocab-booster-grid">’ + (n.vocabBooster||[]).map(function(v,i) {
return ‘<div class="vocab-booster-item"><span class="vocab-booster-num">’+(i+1)+’.</span><span>’+esc(v.en)+’ <span class="vocab-booster-zh">(’+esc(v.zh)+’)</span></span></div>’;
}).join(’’) + ‘</div></div></div>’;
}).join(’’);
}

// ===== LANGUAGE MASTER - PHRASES =====
function renderLMPhrases() {
var el = document.getElementById(‘lm-phrases-content’);
if (!el) return;
var phrases = (data && data.languageMaster && data.languageMaster.phrases) || [];
if (phrases.length === 0) { el.innerHTML = emptyState(‘🔑’,‘No phrases yet’,‘Scan and upload Language Spotlight pages’); return; }
el.innerHTML = phrases.map(function(p, idx) {
var tagBg = p.connotation===‘negative’?’#ffeaea’:p.connotation===‘positive’?’#e8f5e9’:’#f0f0f0’;
var tagColor = p.connotation===‘negative’?’#c0392b’:p.connotation===‘positive’?’#2d6a4f’:’#666’;
return ‘<div class="phrase-card">’ +
‘<div class="phrase-header" onclick="togglePhrase('+idx+')">’ +
‘<div><span class="phrase-title">’+esc(p.phrase)+’</span><span class="phrase-zh">’+esc(p.zh)+’</span></div>’ +
‘<div style="display:flex;gap:8px;align-items:center;">’ +
‘<span style="background:'+tagBg+';color:'+tagColor+';border-radius:20px;padding:2px 10px;font-family:sans-serif;font-size:0.68rem;font-weight:600;">’+esc(p.grammar||’’)+’ · ‘+esc(p.connotation||’’)+’</span>’ +
‘<span id="phrase-arrow-'+idx+'">▼</span>’ +
‘</div>’ +
‘</div>’ +
‘<div class="phrase-body" id="phrase-body-'+idx+'">’ +
‘<div class="phrase-section-label">Example</div>’ +
‘<div class="phrase-example">’ + renderHighlighted((p.example&&p.example.sentence)||’’, (p.example&&p.example.highlights)||[]) + ‘</div>’ +
‘<div class="phrase-section-label">Synonyms</div>’ +
(p.synonyms||[]).map(function(s) {
return ‘<div class="synonym-row"><span class="synonym-eq">=</span><span>’+esc(s.word)+’</span>’+(s.grammar?’<span class="synonym-grammar">’+esc(s.grammar)+’</span>’:’’)+(s.note?’<span class="synonym-note">’+esc(s.note)+’</span>’:’’)+’</div>’;
}).join(’’) +
((p.notes&&p.notes.length)?’<div class="phrase-section-label">✏️ Notes</div><div style="background:#fffef0;border-radius:6px;padding:10px 12px;">’+p.notes.map(function(n){return ‘<div class="handnote '+n.ink+'">’+esc(n.text)+’</div>’;}).join(’’)+’</div>’:’’) +
‘<div class="baat-daap-box"><div class="baat-daap-label">⬜ 百搭位</div><input class="baat-daap-input" placeholder="Fill in your 百搭 usage here..." /></div>’ +
‘</div></div>’;
}).join(’’);
}

// ===== LANGUAGE MASTER - ESSAYS =====
function renderLMEssays() {
var el = document.getElementById(‘lm-essays-content’);
if (!el) return;
var essays = (data && data.languageMaster && data.languageMaster.essays) || [];
if (essays.length === 0) { el.innerHTML = emptyState(‘📝’,‘No essays yet’,‘Scan and upload sample essay pages’); return; }
el.innerHTML = ‘<div class="legend">’ +
‘<div class="legend-item"><span class="legend-dot" style="background:rgba(120,220,120,0.4);border-bottom:2px solid #4caf50;display:inline-block;width:12px;height:9px;border-radius:2px;"></span>Vocab</div>’ +
‘<div class="legend-item"><span class="legend-dot" style="background:rgba(255,225,60,0.5);border-bottom:2px solid #e6b800;display:inline-block;width:12px;height:9px;border-radius:2px;"></span>百搭</div>’ +
‘<div class="legend-item"><span class="legend-dot" style="background:rgba(255,140,170,0.38);border-bottom:2px solid #e0547a;display:inline-block;width:12px;height:9px;border-radius:2px;"></span>Point</div>’ +
‘<div class="legend-item"><span style="border:2px solid #333;border-radius:2px;padding:0 3px;font-size:0.7rem;">box</span> Phrase (tap)</div>’ +
‘</div>’ +
essays.map(function(e) {
return ‘<div class="essay-card">’ +
‘<div class="essay-meta"><div class="essay-title-text">’+esc(e.title)+’</div><div class="essay-info">’+esc(e.meta||’’)+’</div></div>’ +
‘<div class="essay-body">’ +
(e.paragraphs||[]).map(function(p) {
return ‘<div class="essay-para">’ +
(p.marginNote&&p.marginNote.text?’<div class="essay-margin-note"><span class="handnote '+p.marginNote.ink+'">’+esc(p.marginNote.text)+’</span></div>’:’’) +
‘<div class="essay-para-label">’+esc(p.label||’’)+’</div>’ +
‘<div>’+renderSegments(p.segments)+’</div>’ +
(p.handNotes&&p.handNotes.length?’<div class="essay-hand-notes">’+p.handNotes.map(function(n){return ‘<span class="handnote '+n.ink+'">’+esc(n.text)+’</span>’;}).join(’’)+’</div>’:’’) +
‘</div>’;
}).join(’’) + ‘</div></div>’;
}).join(’’);
}

// ===== IDEA POWER BANK =====
function renderIdeaPowerBank() {
var el = document.getElementById(‘ipb-content’);
if (!el) return;
var topics = (data && data.ideaPowerBank) || [];
if (topics.length === 0) { el.innerHTML = emptyState(‘💡’,‘No topics yet’,‘Scan and upload Idea Power Bank pages’); return; }
el.innerHTML = topics.map(function(topic, ti) {
return ‘<div class="topic-block">’ +
‘<div class="topic-header" style="background:#e67e22;" onclick="toggleTopic(\'ipb\','+ti+')">’ +
‘<span class="topic-num">TOPIC ‘+(topic.topicNum||ti+1)+’</span>’ +
‘<span class="topic-title">’+esc(topic.title)+’</span>’ +
‘<span id="ipb-arrow-'+ti+'" style="margin-left:auto;color:rgba(255,255,255,0.6);">▼</span>’ +
‘</div>’ +
‘<div id="ipb-topic-'+ti+'" style="display:none;padding:16px 20px;">’ +
‘<div style="font-family:sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Part 1: Golden Ideas</div>’ +
(topic.goldenIdeas||[]).map(function(idea) {
return ‘<div class="ipb-idea"><span class="ipb-num">’+idea.id+’.</span><span style="font-family:Georgia,serif;font-size:1rem;line-height:1.85;">’+renderHighlighted(idea.text, idea.highlights||[])+’</span></div>’;
}).join(’’) +
‘<div style="font-family:sans-serif;font-size:0.65rem;font-weight:700;color:#e67e22;text-transform:uppercase;letter-spacing:0.08em;margin:16px 0 12px;">Part 2: VN Diction Bank</div>’ +
‘<div style="background:#faf8f3;border-radius:8px;overflow:hidden;border:1px solid #ddd;">’ +
(topic.vnBank||[]).map(function(v,i) {
return ‘<div class="ipb-vn"><span class="ipb-vn-num">’+(i+1)+’.</span><span>’+esc(v.en)+’ <span class="ipb-vn-zh">(’+esc(v.zh)+’)</span></span></div>’;
}).join(’’) + ‘</div></div></div>’;
}).join(’’);
}

// ===== NYT DIY =====
function renderNytDiy() {
var el = document.getElementById(‘nyt-content’);
if (!el) return;
var volumes = (data && data.nytDiy) || [];
if (volumes.length === 0) { el.innerHTML = emptyState(‘📰’,‘No volumes yet’,‘Scan and upload NYT DIY pages’); return; }
el.innerHTML = volumes.map(function(vol) {
return ‘<div style="margin-bottom:32px;">’ +
‘<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">’ +
‘<span style="font-family:sans-serif;font-size:0.8rem;font-weight:800;">DIY Language Makeovers</span>’ +
‘<span style="background:#c0392b;color:#fff;border-radius:20px;padding:2px 10px;font-family:sans-serif;font-size:0.7rem;font-weight:700;">’+esc(vol.volume)+’</span>’ +
‘</div>’ +
‘<div style="font-family:sans-serif;font-size:0.65rem;font-weight:700;color:#c0392b;text-transform:uppercase;margin-bottom:8px;">1. Big News</div>’ +
‘<div style="border-radius:10px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);margin-bottom:20px;">’ +
‘<div class="nyt-header"><div class="nyt-news-label">Must-read News</div><div class="nyt-news-title">’+esc((vol.bigNews&&vol.bigNews.title)||’’)+’</div><div class="nyt-intro">’+esc((vol.bigNews&&vol.bigNews.intro)||’’)+’</div></div>’ +
((vol.bigNews&&vol.bigNews.paragraphs)||[]).map(function(p) {
return ‘<div class="nyt-para"><span class="nyt-para-num">[’+p.id+’]</span>’+renderHighlighted(p.text, p.highlights||[])+’</div>’;
}).join(’’) +
(vol.bigNews&&vol.bigNews.source?’<div class="nyt-source">’+esc(vol.bigNews.source)+’</div>’:’’) +
‘</div>’ +
‘<div style="font-family:sans-serif;font-size:0.65rem;font-weight:700;color:#c0392b;text-transform:uppercase;margin-bottom:8px;">2. Advanced Phrases You Can't Live Without</div>’ +
‘<div style="border-radius:10px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);margin-bottom:20px;">’ +
(vol.advancedPhrases||[]).map(function(p) {
return ‘<div class="phrase-list-item"><span class="phrase-list-num">’+p.id+’.</span><span class="phrase-list-text">’+esc(p.phrase)+’</span><span class="phrase-list-zh">(’+esc(p.zh)+’)</span><div class="phrase-list-example">e.g. ‘+esc(p.example)+’</div></div>’;
}).join(’’) +
‘</div>’ +
‘<div style="font-family:sans-serif;font-size:0.65rem;font-weight:700;color:#c0392b;text-transform:uppercase;margin-bottom:8px;">3. Vital Vocabulary from the NYT</div>’ +
‘<div style="border-radius:10px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);margin-bottom:20px;padding:20px;text-align:center;font-family:sans-serif;font-size:0.8rem;color:#888;">’ +
((vol.vitalVocab&&vol.vitalVocab.length)?vol.vitalVocab.map(function(v){return ‘<div class="phrase-list-item">’+esc(v.word)+’ <span style="color:#888;font-size:0.75rem;">(’+esc(v.zh)+’)</span></div>’;}).join(’’):‘No vital vocabulary added yet’) +
‘</div></div>’;
}).join(’’);
}

// ===== SHU JAI =====
function renderShuJai() {
var el = document.getElementById(‘shujai-content’);
if (!el) return;
var books = (data && data.shuJai) || [];
if (books.length === 0) { el.innerHTML = emptyState(‘📖’,‘No books yet’,‘Scan and upload Shu Jai pages’); return; }
el.innerHTML = books.map(function(book, bi) {
return ‘<div style="margin-bottom:32px;">’ +
‘<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">’ +
‘<span style="font-family:sans-serif;font-size:0.85rem;font-weight:800;">’+esc(book.title)+’</span>’ +
(book.series?’<span style="background:#1a3a6a;color:#fff;border-radius:20px;padding:2px 10px;font-family:sans-serif;font-size:0.68rem;font-weight:600;">’+esc(book.series)+’</span>’:’’) +
‘</div>’ +
(book.topics||[]).map(function(topic, ti) {
var half = Math.ceil((topic.items||[]).length/2);
var left = (topic.items||[]).slice(0, half);
var right = (topic.items||[]).slice(half);
var rows = Math.max(left.length, right.length);
var grid = ‘<div class="two-col-grid">’;
for(var i=0;i<rows;i++){
var l=left[i], r=right[i];
grid += ‘<div class="two-col-cell">’+(l?’<span class="two-col-num">’+l.id+’.</span><span>’+esc(l.en)+’ <span class="two-col-type">(’+esc(l.type)+’)</span> <span class="two-col-zh">’+esc(l.zh)+’</span></span>’:’’)+’</div>’;
grid += ‘<div class="two-col-cell two-col-right">’+(r?’<span class="two-col-num">’+r.id+’.</span><span>’+esc(r.en)+’ <span class="two-col-type">(’+esc(r.type)+’)</span> <span class="two-col-zh">’+esc(r.zh)+’</span></span>’:’’)+’</div>’;
}
grid += ‘</div>’;
return ‘<div class="topic-block" style="margin-bottom:12px;">’ +
‘<div class="topic-header" onclick="toggleTopic(\'sj'+bi+'\','+ti+')">’ +
‘<span class="topic-num">TOPIC ‘+topic.id+’</span>’ +
‘<span class="topic-title">’+esc(topic.title)+’</span>’ +
‘<span id="sj'+bi+'-arrow-'+ti+'" style="margin-left:auto;color:rgba(255,255,255,0.6);">▼</span>’ +
‘</div>’ +
‘<div id="sj'+bi+'-topic-'+ti+'" style="display:none;">’+grid+’</div>’ +
‘</div>’;
}).join(’’) + ‘</div>’;
}).join(’’);
}

// ===== VOCAB BOOK =====
function renderVocabBook() {
var el = document.getElementById(‘vocab-content’);
if (!el) return;
var vocab = (data && data.vocabBook) || [];
if (vocab.length === 0) { el.innerHTML = emptyState(‘📗’,‘Vocab Book is empty’,‘Green-highlighted words from your scans will appear here’); return; }
var groups = {};
vocab.forEach(function(v) {
var key = v.group || v.word[0].toUpperCase();
if (!groups[key]) groups[key] = [];
groups[key].push(v);
});
el.innerHTML = Object.keys(groups).sort().map(function(key) {
return ‘<div class="vocab-group"><div class="vocab-group-title">’+esc(key)+’</div>’ +
groups[key].map(function(v) {
return ‘<div class="vocab-item"><span class="vocab-word">’+esc(v.word)+’</span><span class="vocab-zh">’+esc(v.zh)+’</span>’+(v.source?’<span class="vocab-source">’+esc(v.source)+’</span>’:’’)+’</div>’;
}).join(’’) + ‘</div>’;
}).join(’’);
}

// ===== 百搭句子 =====
function renderBaatDaap() {
var el = document.getElementById(‘baat-content’);
if (!el) return;
var items = (data && data.baatDaap) || [];
if (items.length === 0) { el.innerHTML = emptyState(‘📒’,‘百搭句子 is empty’,‘Yellow-highlighted sentences from your scans will appear here’); return; }
el.innerHTML = items.map(function(item) {
return ‘<div class="baat-item"><div class="baat-text">’+esc(item.text)+’</div>’+(item.source?’<div class="baat-source">📌 ‘+esc(item.source)+’</div>’:’’)+’</div>’;
}).join(’’);
}

// ===== MAIN NOTES =====
function renderMainNotes() {
var el = document.getElementById(‘mainnotes-content’);
if (!el) return;
el.innerHTML = emptyState(‘📝’,‘Main Notes’,‘Rules for this section are TBC — coming soon’);
}

// ===== START =====
document.addEventListener(‘DOMContentLoaded’, init);
