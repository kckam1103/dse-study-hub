// ===== STATE =====
var data = null;
var currentPage = ‘home’;
var editMode = false;

// ===== EMBEDDED DATA =====
var EMBEDDED_DATA = {
“languageMaster”: {
“news”: [
{
“id”: 1,
“issue”: “Issue 9”,
“title”: “Pokemon Trading Card Craze”,
“newsText”: “As the Pokemon franchise marks its 30th anniversary (n. 週年紀念), a global frenzy (n. 狂熱) over its trading cards has reached fever pitch (exp. 達到白熱化程度). In February, influencer Logan Paul sold a single Pikachu Illustrator card for a record-shattering (adj. 破紀錄的) US$16.5 million, while card values have surged 46% year on year. In Hong Kong, the mania has proved no less intense: rare cards worth up to HK$250,000 have been stolen in a spate of (n. 一連串) robberies, and scalpers (n. 黃牛) routinely flip (v. 轉售) new releases at five to six times their retail price.”,
“newsHighlights”: [
{ “word”: “frenzy”, “zh”: “狂熱” },
{ “word”: “record-shattering”, “zh”: “破紀錄的” }
],
“reflectionText”: “Much like the Labubu craze, the phenomenon epitomises (v. 體現) the rise of an emotional value economy - where nostalgia (n. 懷舊情懷) and sentimental (adj. 感性的) attachment command (v. 佔有) real monetary worth. Yet when childhood collectibles (n. 收藏品) double as speculative assets, the line between harmless hobby and breeding ground for crime grows perilously (adv. 危險地) thin.”,
“reflectionHighlights”: [
{ “word”: “epitomises”, “zh”: “體現” },
{ “word”: “sentimental”, “zh”: “感性的” },
{ “word”: “collectibles”, “zh”: “收藏品” },
{ “word”: “perilously”, “zh”: “危險地” }
],
“vocabBooster”: [
{ “en”: “limited-edition merchandise”, “zh”: “限量版商品” },
{ “en”: “cultural phenomenon”, “zh”: “文化現象” },
{ “en”: “emotional value economy”, “zh”: “情緒價值經濟” },
{ “en”: “tap into one’s childhood memories”, “zh”: “利用童年回憶” },
{ “en”: “fuel demand for…”, “zh”: “推動對…的需求” },
{ “en”: “a lucrative asset class”, “zh”: “利潤豐厚的資產類別” },
{ “en”: “herd mentality”, “zh”: “羊群心理” },
{ “en”: “a hotbed of fraud and counterfeiting”, “zh”: “欺詐與偽造的溫床” },
{ “en”: “trigger a wave of acquisitive crime”, “zh”: “引發一波財產犯罪” },
{ “en”: “regulate the resale market”, “zh”: “監管轉售市場” },
{ “en”: “crack down on scalping”, “zh”: “打擊黃牛炒賣” },
{ “en”: “distinguish genuine passion from blind speculation”, “zh”: “區分真正的熱情與盲目投機” }
]
},
{
“id”: 2,
“issue”: “Issue 9”,
“title”: “Britain’s Lifetime Smoking Ban”,
“newsText”: “On 29 April, the UK’s Tobacco and Vapes Act received Royal Assent (n. 御准), making it illegal to sell tobacco to anyone born on or after 1 January 2009. Taking effect from October, the law will raise the legal smoking age by one year every January - meaning today’s teenagers will never legally purchase cigarettes. It also curbs (v. 限制) vape advertising and bans vaping near schools and in cars carrying children. Hailed as the boldest public health intervention (phr. 公共衛生干預措施) in a generation, the Act has nonetheless drawn criticism from those who warn that it sets a paternalistic (adj. 家長式統治的) precedent and risks fueling (v. 助長) a black market.”,
“newsHighlights”: [
{ “word”: “intervention”, “zh”: “干預措施” },
{ “word”: “fueling”, “zh”: “助長” }
],
“reflectionText”: “At the heart of the controversy lies a fundamental question: whether governments should shield citizens from self-destructive habits through outright prohibition (n. 禁令), or whether such measures merely curtail (v. 削減) individual autonomy (n. 個人自主權) without addressing the root causes of addiction (n. 成癮).”,
“reflectionHighlights”: [
{ “word”: “curtail”, “zh”: “削減” },
{ “word”: “autonomy”, “zh”: “個人自主權” }
],
“vocabBooster”: [
{ “en”: “nicotine dependence”, “zh”: “尼古丁依賴” },
{ “en”: “second-hand smoke”, “zh”: “二手煙” },
{ “en”: “phase out tobacco sales”, “zh”: “逐步淘汰煙草銷售” },
{ “en”: “impose an outright ban on…”, “zh”: “對…實施全面禁令” },
{ “en”: “deter young people from picking up the habit”, “zh”: “阻止年輕人染上煙癮” },
{ “en”: “break the cycle of dependence”, “zh”: “打破依賴的惡性循環” },
{ “en”: “ease the burden on public healthcare”, “zh”: “減輕公共醫療的負擔” },
{ “en”: “narrow health disparities”, “zh”: “縮小健康差距” },
{ “en”: “infringe on personal liberties”, “zh”: “侵犯個人自由” },
{ “en”: “strike a balance between regulation and freedom”, “zh”: “在監管與自由之間取得平衡” },
{ “en”: “a watershed moment for public health”, “zh”: “公共衛生的分水嶺時刻” },
{ “en”: “preventive measure”, “zh”: “預防措施” }
]
}
],
“phrases”: [
{
“id”: 1,
“phrase”: “a birthplace of …”,
“zh”: “源頭”,
“grammar”: “+ N”,
“connotation”: “neutral”,
“example”: { “sentence”: “The programme King Maker is widely considered the birthplace of many promising singers.”, “highlights”: [{ “word”: “promising”, “zh”: “有前途的” }] },
“synonyms”: [
{ “word”: “cradle of”, “grammar”: “+ N” },
{ “word”: “fount of”, “grammar”: “+ N” },
{ “word”: “incubator for”, “grammar”: “+ N” }
],
“notes”: [
{ “ink”: “blue”, “text”: “the birthplace of = cradle of = fount of = incubator for” },
{ “ink”: “blue”, “text”: “→ 源頭” }
]
},
{
“id”: 2,
“phrase”: “be doomed to …”,
“zh”: “注定／冇戲”,
“grammar”: “+ V / + N”,
“connotation”: “negative”,
“example”: { “sentence”: “In the long run, the music industry is doomed to suffer a talent drain.”, “highlights”: [{ “word”: “talent drain”, “zh”: “人才流失” }] },
“synonyms”: [
{ “word”: “is bound to”, “grammar”: “+ V” },
{ “word”: “is destined to”, “grammar”: “+ V”, “note”: “neutral → 唔定 -ve” },
{ “word”: “looks set to”, “grammar”: “+ V”, “note”: “neutral → 唔定 -ve” },
{ “word”: “is fated to”, “grammar”: “+ V” },
{ “word”: “will”, “grammar”: “” }
],
“notes”: [
{ “ink”: “blue”, “text”: “talent drain = talent exodus” },
{ “ink”: “blue”, “text”: “be doomed to + N = is destined for + N” },
{ “ink”: “red”, “text”: “-ve connotation word” }
]
},
{
“id”: 3,
“phrase”: “in the sense that + SVO”,
“zh”: “因為／在某意義上”,
“grammar”: “+ SVO”,
“connotation”: “neutral”,
“example”: { “sentence”: “Plastic surgery is perilous in the sense that it could lead to disfigurement, implant rejection and even permanent nerve damage.”, “highlights”: [{ “word”: “perilous”, “zh”: “危險的” }] },
“synonyms”: [
{ “word”: “in that”, “grammar”: “+ SVO”, “note”: “前跟 adj.” },
{ “word”: “for the reason that”, “grammar”: “+ SVO” },
{ “word”: “given that”, “grammar”: “+ SVO” },
{ “word”: “on grounds that”, “grammar”: “+ SVO” }
],
“notes”: [
{ “ink”: “red”, “text”: “⚠️ Word before phrase must be adj. / 特質 (nature/characteristic)” },
{ “ink”: “red”, “text”: “✗ Wrong: word before is NOT adj” },
{ “ink”: “blue”, “text”: “= because” }
]
},
{
“id”: 4,
“phrase”: “regardless of …”,
“zh”: “而不管／不論”,
“grammar”: “+ N”,
“connotation”: “neutral”,
“example”: { “sentence”: “Every child should have access to a quality education, regardless of his or her race and socioeconomic background.”, “highlights”: [{ “word”: “access to”, “zh”: “獲得…的機會” }] },
“synonyms”: [
{ “word”: “irrespective of”, “grammar”: “+ N” },
{ “word”: “without consideration of”, “grammar”: “+ N” },
{ “word”: “no matter”, “grammar”: “” }
],
“notes”: [
{ “ink”: “blue”, “text”: “regardless of = irrespective of = without consideration of + N” }
]
},
{
“id”: 5,
“phrase”: “give … a distinct edge over …”,
“zh”: “給予明顯優勢”,
“grammar”: “+ N”,
“connotation”: “positive”,
“example”: { “sentence”: “Being competent at English gives you a distinct edge over others.”, “highlights”: [{ “word”: “competent”, “zh”: “精通／有能力的” }] },
“synonyms”: [
{ “word”: “proficient in”, “grammar”: “” },
{ “word”: “adept in/at”, “grammar”: “” },
{ “word”: “skilled in”, “grammar”: “” },
{ “word”: “well-versed in”, “grammar”: “” }
],
“notes”: [
{ “ink”: “blue”, “text”: “distinct = definite = noticeable = substantial = considerable” },
{ “ink”: “blue”, “text”: “edge = an advantage over = an upper hand” }
]
},
{
“id”: 6,
“phrase”: “devalue …”,
“zh”: “貶低”,
“grammar”: “+ N”,
“connotation”: “negative”,
“example”: { “sentence”: “The film came under fire for devaluing women.”, “highlights”: [] },
“synonyms”: [
{ “word”: “demean”, “grammar”: “” },
{ “word”: “debase”, “grammar”: “” },
{ “word”: “degrade”, “grammar”: “” },
{ “word”: “disgrace”, “grammar”: “” },
{ “word”: “cheapen”, “grammar”: “” }
],
“notes”: [
{ “ink”: “red”, “text”: “→ 被後批評” }
]
}
],
“essays”: [
{
“id”: 1,
“title”: “Allowing AI to Compete in Songwriting Competitions - A Leap in the Dark”,
“meta”: “Mark: M1: 21 / M2: 21 · Level: 5** · 23 DSE P2 Q.5”,
“paragraphs”: [
{
“label”: “Introduction”,
“marginNote”: { “ink”: “blue”, “text”: “contrast” },
“segments”: [
{ “type”: “text”, “content”: “In the “ },
{ “type”: “highlight”, “color”: “yellow”, “content”: “not-so-distant past”, “meaning”: “不久之前 | 百搭 opener for contrast essays” },
{ “type”: “text”, “content”: “, song-writing competitions “ },
{ “type”: “highlight”, “color”: “green”, “content”: “were perceived”, “meaning”: “→ regarded”, “note”: “= were seen as / were considered” },
{ “type”: “text”, “content”: “ as “ },
{ “type”: “box”, “content”: “a birthplace of”, “meaning”: “源頭”, “synonyms”: [“cradle of”, “fount of”, “incubator for”] },
{ “type”: “text”, “content”: “ human creativity, providing a platform for talented songwriters to demonstrate their creativity. The “ },
{ “type”: “highlight”, “color”: “green”, “content”: “days are gone”, “meaning”: “那些日子已過去”, “note”: “contrast signal” },
{ “type”: “text”, “content”: “, however, with the rise of artificial intelligence. As AI has begun to “ },
{ “type”: “highlight”, “color”: “green”, “content”: “dominate”, “meaning”: “主導／支配”, “note”: “v. 主導” },
{ “type”: “text”, “content”: “ such competitions, more and more “ },
{ “type”: “highlight”, “color”: “green”, “content”: “contestants”, “meaning”: “參賽者” },
{ “type”: “text”, “content”: “ have expressed their “ },
{ “type”: “highlight”, “color”: “green”, “content”: “discontent”, “meaning”: “不滿”, “note”: “= dissatisfaction” },
{ “type”: “text”, “content”: “. I personally “ },
{ “type”: “highlight”, “color”: “green”, “content”: “cling to”, “meaning”: “依附 → 支持”, “note”: “= hold on to / adhere to” },
{ “type”: “text”, “content”: “ the belief that allowing such music to compete would “ },
{ “type”: “highlight”, “color”: “yellow”, “content”: “do more harm than good”, “meaning”: “弊多於利 | 百搭 conclusion phrase” },
{ “type”: “text”, “content”: “.” }
],
“handNotes”: [{ “ink”: “red”, “text”: “= A dangerous move” }]
},
{
“label”: “Body §1”,
“marginNote”: { “ink”: “blue”, “text”: “Among/Of” },
“segments”: [
{ “type”: “text”, “content”: “Of the many issues with permitting AI-composed songs in creative contests, the most troubling is that “ },
{ “type”: “highlight”, “color”: “pink”, “content”: “it would discourage human musicians and songwriters”, “meaning”: “💡 Point: AI discourages human creativity — Technology, Arts, Competition topics” },
{ “type”: “text”, “content”: “. Presently, “ },
{ “type”: “highlight”, “color”: “green”, “content”: “emerging”, “meaning”: “新興的”, “note”: “= up-and-coming / budding / rising” },
{ “type”: “text”, “content”: “ songwriters who “ },
{ “type”: “highlight”, “color”: “yellow”, “content”: “pour their hearts into crafting”, “meaning”: “全心投入創作 | 百搭 — passion/effort essays” },
{ “type”: “text”, “content”: “ meaningful compositions are faced with a “ },
{ “type”: “highlight”, “color”: “green”, “content”: “bleak”, “meaning”: “暗淡的”, “note”: “= grim / dismal / gloomy” },
{ “type”: “text”, “content”: “ prospect. AI has the “ },
{ “type”: “highlight”, “color”: “green”, “content”: “capacity”, “meaning”: “能力”, “note”: “= ability / capability” },
{ “type”: “text”, “content”: “ to analyze melodies and lyrics, and could easily “ },
{ “type”: “highlight”, “color”: “green”, “content”: “outperform”, “meaning”: “超越”, “note”: “= surpass / eclipse” },
{ “type”: “text”, “content”: “ human songwriters. In the long run, the industry would “ },
{ “type”: “box”, “content”: “be doomed to”, “meaning”: “注定冇戲 (-ve)”, “synonyms”: [“is destined for +N”, “is bound to +V”] },
{ “type”: “text”, “content”: “ a “ },
{ “type”: “highlight”, “color”: “green”, “content”: “talent drain”, “meaning”: “人才流失”, “note”: “= talent exodus” },
{ “type”: “text”, “content”: “.” }
],
“handNotes”: [{ “ink”: “red”, “text”: “注定冇戲 → -ve” }, { “ink”: “blue”, “text”: “人才走” }]
},
{
“label”: “Body §2”,
“marginNote”: { “ink”: “red”, “text”: “前: adj./情續” },
“segments”: [
{ “type”: “text”, “content”: “Allowing AI music to compete would “ },
{ “type”: “highlight”, “color”: “green”, “content”: “constitute”, “meaning”: “構成”, “note”: “前跟 adj./情續” },
{ “type”: “text”, “content”: “ a “ },
{ “type”: “box”, “content”: “breach”, “meaning”: “違反／違背”, “synonyms”: [“violation of”, “infringement of”] },
{ “type”: “text”, “content”: “ of the “ },
{ “type”: “highlight”, “color”: “green”, “content”: “bedrock”, “meaning”: “基石”, “note”: “= foundation / cornerstone” },
{ “type”: “text”, “content”: “ of any creative contest “ },
{ “type”: “box”, “content”: “in the sense that”, “meaning”: “因為”, “synonyms”: [“in that”, “for the reason that”, “given that”] },
{ “type”: “text”, “content”: “ it ensures all participants, “ },
{ “type”: “box”, “content”: “regardless”, “meaning”: “而不管”, “synonyms”: [“irrespective of”, “no matter”] },
{ “type”: “text”, “content”: “ of their backgrounds, “ },
{ “type”: “highlight”, “color”: “pink”, “content”: “compete on an equal playing field”, “meaning”: “💡 Point: Fairness principle — Education, Sports, Workplace topics” },
{ “type”: “text”, “content”: “. Unlike humans, AI is not “ },
{ “type”: “highlight”, “color”: “green”, “content”: “plagued”, “meaning”: “受…困擾”, “note”: “= troubled by / burdened by” },
{ “type”: “text”, “content”: “ by “ },
{ “type”: “highlight”, “color”: “green”, “content”: “creative fatigue”, “meaning”: “創作疲勞” },
{ “type”: “text”, “content”: “. Knowing that they would hardly “ },
{ “type”: “highlight”, “color”: “green”, “content”: “outshine”, “meaning”: “比…出色”, “note”: “= overshadow / surpass” },
{ “type”: “text”, “content”: “ AI, human songwriters would be discouraged. “ },
{ “type”: “highlight”, “color”: “pink”, “content”: “It can clearly be seen that allowing AI-generated music to compete in creative contests is an unwise move.”, “meaning”: “💡 百搭 conclusion structure for any argumentative essay” }
],
“handNotes”: [{ “ink”: “red”, “text”: “⚠️ in the sense that: word before must be adj./特質” }, { “ink”: “red”, “text”: “breach → 違反” }]
}
]
}
]
},
“mainNotes”: [],
“ideaPowerBank”: [
{
“id”: “nature”,
“title”: “Nature”,
“topicNum”: 9,
“goldenIdeas”: [
{ “id”: 1, “text”: “Growing environmental awareness has transformed how people shop and live, sparking a wave of green initiatives (n. 計劃) and sustainable lifestyle choices that are reshaping stores and markets everywhere.”, “highlights”: [{ “word”: “sustainable”, “zh”: “可持續的” }] },
{ “id”: 2, “text”: “Pop-up stores championing (v. 提倡) zero-waste principles have proliferated (v. 激增) across metropolitan (adj. 大都市的) areas, offering innovative solutions from biodegradable (adj. 可生物降解的) packaging to refill stations.”, “highlights”: [{ “word”: “proliferated”, “zh”: “激增” }, { “word”: “biodegradable”, “zh”: “可生物降解的” }] },
{ “id”: 3, “text”: “From destructive earthquakes to raging wildfires and catastrophic (adj. 災難性的) floods, recent natural disasters have sparked an unprecedented wave of global solidarity (n. 團結), with humanitarian (adj. 人道主義的) organizations reporting record-breaking donations.”, “highlights”: [{ “word”: “catastrophic”, “zh”: “災難性的” }, { “word”: “solidarity”, “zh”: “團結” }, { “word”: “humanitarian”, “zh”: “人道主義的” }] },
{ “id”: 4, “text”: “City dwellers, tired of their screen-filled lives, are rediscovering the healing power of nature, with more people than ever heading outdoors for hiking, camping and wilderness adventures.”, “highlights”: [{ “word”: “dwellers”, “zh”: “居民” }, { “word”: “wilderness”, “zh”: “荒野” }] },
{ “id”: 5, “text”: “In Hong Kong, the contentious (adj. 有爭議的) issue of wild boar culling (n. 撲殺) has ignited intense debates about urban wildlife management, compelling authorities to strike a delicate balance between public safety and the preservation of natural ecosystems.”, “highlights”: [{ “word”: “contentious”, “zh”: “有爭議的” }, { “word”: “culling”, “zh”: “撲殺” }, { “word”: “preservation”, “zh”: “保育” }] }
],
“vnBank”: [
{ “en”: “undergo unprecedented environmental transformation”, “zh”: “經歷前所未有的環境蛻變” },
{ “en”: “stand at a critical juncture in the planet’s ecological history”, “zh”: “在地球生態歷史關鍵時刻” },
{ “en”: “confront irreversible biodiversity loss”, “zh”: “面對不可逆轉的生物多樣性損失” },
{ “en”: “deplete natural resources at an unsustainable rate”, “zh”: “以不可持續速度耗盡資源” },
{ “en”: “disrupt global food chains with far-reaching consequences”, “zh”: “擾亂全球食物鏈” },
{ “en”: “accelerate the extinction of species”, “zh”: “加速物種滅絕” },
{ “en”: “mitigate catastrophic environmental consequences”, “zh”: “減輕災難性環境後果” },
{ “en”: “reduce one’s carbon footprint substantially”, “zh”: “大幅減少碳足跡” },
{ “en”: “protect vulnerable ecosystems”, “zh”: “保護脆弱的生態系統” },
{ “en”: “initiate reforestation programmes”, “zh”: “開展重新造林計劃” },
{ “en”: “establish marine sanctuaries”, “zh”: “建立海洋保護區” },
{ “en”: “implement plastic-free packaging solutions”, “zh”: “實施無塑包裝方案” },
{ “en”: “galvanise community-driven conservation efforts”, “zh”: “激勵社區主導的保育工作” }
]
}
],
“nytDiy”: [
{
“volume”: “Vol. R9”,
“bigNews”: {
“title”: “HANTAVIRUS IS NOTHING LIKE CORONAVIRUS, BUT IT’S BRINGING SOME COVID P.T.S.D.”,
“intro”: “Experts have been quick to reassure the public after the deaths aboard the Dutch cruise ship MV Hondius, but images and turns of phrase have rekindled anxieties from Covid’s early days.”,
“paragraphs”: [
{ “id”: 1, “text”: “Medical workers in protective suits. Contact tracing (phr. 接觸追蹤). P.C.R. tests and World Health Organization briefings (n. 簡報).”, “highlights”: [{ “word”: “briefings”, “zh”: “簡報” }] },
{ “id”: 2, “text”: “Just when much of the public had presumed to have left those ominous (adj. 不祥的) images in the rearview mirror, a deadly hantavirus outbreak (n. 爆發) aboard a Dutch cruise ship has dredged up (v. 勾起) familiar anxieties.”, “highlights”: [{ “word”: “ominous”, “zh”: “不祥的” }, { “word”: “dredged up”, “zh”: “勾起” }] },
{ “id”: 3, “text”: “Health experts have sought to dispel (v. 消除) comparisons between hantavirus and coronavirus, saying the viruses spread quite differently and were not close in magnitude (n. 規模).”, “highlights”: [{ “word”: “dispel”, “zh”: “消除” }, { “word”: “magnitude”, “zh”: “規模” }] },
{ “id”: 4, “text”: “Those reassurances (n. 保證) have not quelled (v. 平息) the public’s anxiety or its appetite (n. 渴求) for medical advice.”, “highlights”: [{ “word”: “reassurances”, “zh”: “保證” }, { “word”: “quelled”, “zh”: “平息” }, { “word”: “appetite”, “zh”: “渴求” }] },
{ “id”: 5, “text”: “"This is not coronavirus," Dr. Maria Van Kerkhove said. "This is not the start of a Covid pandemic." She wanted to be unequivocal (adj. 明確的).”, “highlights”: [{ “word”: “unequivocal”, “zh”: “明確的” }] },
{ “id”: 6, “text”: “The mention of masks particularly reverberated (v. 引發迴響) on the far right politically, where some began using the outbreak to warn against new government mandates (n. 指令).”, “highlights”: [{ “word”: “reverberated”, “zh”: “引發迴響” }, { “word”: “mandates”, “zh”: “指令” }] },
{ “id”: 7, “text”: “Plenty of others on social media sought to introduce levity (n. 輕鬆氣氛) in the moment, harking back to quirky (adj. 奇特的) rituals and skills they honed (v. 磨練) during the pandemic.”, “highlights”: [{ “word”: “levity”, “zh”: “輕鬆氣氛” }, { “word”: “quirky”, “zh”: “奇特的” }, { “word”: “honed”, “zh”: “磨練” }] }
],
“source”: “Adapted from an article by Neil Vigdor in the New York Times, 8 May 2026.”
},
“advancedPhrases”: [
{ “id”: 1, “phrase”: “excuse sb. from sth.”, “zh”: “免除…”, “example”: “The top athletes were excused from military service on the grounds that they enhance national prestige.” },
{ “id”: 2, “phrase”: “explode with …”, “zh”: “…的情感突然爆發”, “example”: “It was at that euphoric moment that the swimming champion exploded with happy tears.” },
{ “id”: 3, “phrase”: “expound on …”, “zh”: “詳細解釋…”, “example”: “In the video, the lecturer expounded on the complex matter of international relations.” },
{ “id”: 4, “phrase”: “fall to one’s lot to do sth.”, “zh”: “成為…的責任去做…”, “example”: “The activist argues that it has fallen to this generation’s lot to do everything to save the planet.” },
{ “id”: 5, “phrase”: “fancy oneself as …”, “zh”: “自以為是…”, “example”: “The man fancied himself the hero of a Hollywood movie.” },
{ “id”: 6, “phrase”: “fish in troubled waters”, “zh”: “渾水摸魚/趁火打劫”, “example”: “The tycoon fished in troubled waters to build his real estate empire.” },
{ “id”: 7, “phrase”: “flesh out …”, “zh”: “使…更充實/完善”, “example”: “The renovation proposal could be fleshed out with more figures and photos.” },
{ “id”: 8, “phrase”: “for a song”, “zh”: “非常便宜地”, “example”: “Antique items are still being sold for a song there.” },
{ “id”: 9, “phrase”: “for some reason or other”, “zh”: “出於某種原因”, “example”: “For some reason or other, some rough sleepers are reluctant to apply for public housing.” },
{ “id”: 10, “phrase”: “for the better”, “zh”: “改善/變得更好”, “example”: “Many are confident that things are bound to change for the better economically.” },
{ “id”: 11, “phrase”: “get a cold shoulder”, “zh”: “受冷淡對待”, “example”: “The urgent need for reform got a cold shoulder from the government officials.” },
{ “id”: 12, “phrase”: “get in with …”, “zh”: “與…搞好關係”, “example”: “The newcomer is trying too hard to get in with her colleagues.” },
{ “id”: 13, “phrase”: “get to the bottom of …”, “zh”: “對…尋根究底”, “example”: “The police are making desperate attempts to get to the bottom of the murder.” },
{ “id”: 14, “phrase”: “give sb. an edge over sb.”, “zh”: “給予…對比起…有優勢”, “example”: “Being proficient in several languages gives you a distinct edge over other job seekers.” },
{ “id”: 15, “phrase”: “go for nothing”, “zh”: “白白浪費了”, “example”: “The resources poured into the project went for nothing because of an oversight.” },
{ “id”: 16, “phrase”: “have words with …”, “zh”: “與…爭吵”, “example”: “The two contestants had words with each other after a fierce debating competition.” },
{ “id”: 17, “phrase”: “in times of …”, “zh”: “在…的時候”, “example”: “In times of crisis, leadership is desperately needed.” },
{ “id”: 18, “phrase”: “jump at …”, “zh”: “欣然接受…”, “example”: “Any aspiring student would jump at the opportunity to learn more vocabulary.” },
{ “id”: 19, “phrase”: “keep body and soul together”, “zh”: “勉強糊口”, “example”: “Many citizens are toiling long and hard to keep body and soul together.” },
{ “id”: 20, “phrase”: “lead a hand-to-mouth existence”, “zh”: “生活在貧窮中”, “example”: “The government has been slammed for not helping the elderly leading a hand-to-mouth existence.” },
{ “id”: 21, “phrase”: “leave much to be desired”, “zh”: “有很大改進餘地”, “example”: “The performance of the athlete left much to be desired.” },
{ “id”: 22, “phrase”: “live in a fool’s paradise”, “zh”: “處於虛幻的快樂中”, “example”: “One can pretend everything is alright and continue to live in a fool’s paradise.” },
{ “id”: 23, “phrase”: “lose heart”, “zh”: “灰心/失去信心”, “example”: “However gloomy the future of the industry is, the young entrepreneur does not lose heart.” },
{ “id”: 24, “phrase”: “lose one’s head”, “zh”: “失去理智”, “example”: “After being told off by the shopkeeper, the customer lost his head and attacked her.” }
],
“vitalVocab”: []
}
],
“shuJai”: [
{
“title”: “Tech English 關鍵萬用語”,
“series”: “精讀 SERIES P2 X P4”,
“topics”: [
{
“id”: 1,
“title”: “Generative AI / Large Language Models”,
“items”: [
{ “id”: 1, “en”: “generative AI”, “type”: “n.”, “zh”: “生成式人工智能” },
{ “id”: 2, “en”: “large language model / LLM”, “type”: “phr.”, “zh”: “大型語言模型” },
{ “id”: 3, “en”: “foundation model”, “type”: “phr.”, “zh”: “基礎模型” },
{ “id”: 4, “en”: “neural network”, “type”: “phr.”, “zh”: “神經網絡” },
{ “id”: 5, “en”: “OpenAI, the creator of ChatGPT”, “type”: “n.”, “zh”: “ChatGPT 開發商 OpenAI” },
{ “id”: 6, “en”: “Anthropic, the AI safety company”, “type”: “n.”, “zh”: “人工智能安全公司 Anthropic” },
{ “id”: 7, “en”: “Google DeepMind”, “type”: “n.”, “zh”: “谷歌旗下人工智能研究機構 DeepMind” },
{ “id”: 8, “en”: “automate repetitive cognitive tasks”, “type”: “exp.”, “zh”: “自動化重複性的認知工作” },
{ “id”: 9, “en”: “democratize access to professional knowledge”, “type”: “exp.”, “zh”: “使普羅大眾均可獲取專業知識” },
{ “id”: 10, “en”: “erode critical thinking and writing skills”, “type”: “exp.”, “zh”: “削弱批判性思維及寫作能力” },
{ “id”: 11, “en”: “perpetuate and amplify societal biases”, “type”: “exp.”, “zh”: “延續並放大社會偏見” },
{ “id”: 12, “en”: “generate convincing misinformation at scale”, “type”: “exp.”, “zh”: “大規模生成具說服力的虛假資訊” },
{ “id”: 13, “en”: “threaten white-collar employment”, “type”: “exp.”, “zh”: “威脅白領就業機會” },
{ “id”: 14, “en”: “pose existential risks to humanity”, “type”: “exp.”, “zh”: “對人類構成存在性風險” },
{ “id”: 15, “en”: “establish regulatory frameworks for AI governance”, “type”: “exp.”, “zh”: “建立規管人工智能的監管框架” },
{ “id”: 16, “en”: “invest in AI literacy education”, “type”: “exp.”, “zh”: “投資人工智能素養教育” }
]
},
{
“id”: 2,
“title”: “Agentic AI”,
“items”: [
{ “id”: 1, “en”: “agentic AI”, “type”: “n.”, “zh”: “代理式人工智能” },
{ “id”: 2, “en”: “AI agent”, “type”: “phr.”, “zh”: “人工智能代理” },
{ “id”: 3, “en”: “autonomous AI system”, “type”: “phr.”, “zh”: “自主人工智能系統” },
{ “id”: 4, “en”: “operate with minimal human supervision”, “type”: “exp.”, “zh”: “在極少人工監督下運作” },
{ “id”: 5, “en”: “complete complex multi-step workflows autonomously”, “type”: “exp.”, “zh”: “自主完成複雜的多步驟工作流程” },
{ “id”: 6, “en”: “make decisions without human oversight”, “type”: “exp.”, “zh”: “在缺乏人工監督下自行作出決策” },
{ “id”: 7, “en”: “pose significant cybersecurity and liability risks”, “type”: “exp.”, “zh”: “帶來重大的網絡安全及法律責任風險” },
{ “id”: 8, “en”: “be susceptible to prompt injection attacks”, “type”: “phr.”, “zh”: “容易受到提示注入攻擊” },
{ “id”: 9, “en”: “establish human-in-the-loop safeguards”, “type”: “exp.”, “zh”: “建立以人類介入為核心的安全機制” },
{ “id”: 10, “en”: “develop international standards for the responsible deployment of AI agents”, “type”: “exp.”, “zh”: “制定負責任部署人工智能代理的國際標準” }
]
},
{
“id”: 3,
“title”: “Hyperautomation”,
“items”: [
{ “id”: 1, “en”: “hyperautomation”, “type”: “n.”, “zh”: “超自動化” },
{ “id”: 2, “en”: “integrate automation into the business processes”, “type”: “exp.”, “zh”: “將自動化融入到業務過程中” },
{ “id”: 3, “en”: “artificial intelligence and machine learning”, “type”: “phr.”, “zh”: “人工智能及機械學習” },
{ “id”: 4, “en”: “automate the critical processes without human intervention”, “type”: “exp.”, “zh”: “無須人工介入即可自動化處理關鍵的業務過程” },
{ “id”: 5, “en”: “automate repetitive tasks”, “type”: “exp.”, “zh”: “自動化處理重複的工作” },
{ “id”: 6, “en”: “augment human efforts”, “type”: “exp.”, “zh”: “加強人力工作效果” },
{ “id”: 7, “en”: “allow employees to focus on more interesting and challenging tasks”, “type”: “exp.”, “zh”: “讓員工能集中處理更有趣和具挑戰性的工作” },
{ “id”: 8, “en”: “reduce the chances of human errors and biases in decision making”, “type”: “exp.”, “zh”: “減少人們在決策時出現錯誤和有偏見的機會” },
{ “id”: 9, “en”: “demand expertise in various technologies”, “type”: “exp.”, “zh”: “需要對不同科技的專業知識” },
{ “id”: 10, “en”: “may meet with resistance from employees”, “type”: “exp.”, “zh”: “或會遭到員工反抗” }
]
}
]
}
],
“vocabBook”: [
{ “word”: “epitomises”, “zh”: “體現”, “source”: “LM News” },
{ “word”: “sentimental”, “zh”: “感性的”, “source”: “LM News” },
{ “word”: “collectibles”, “zh”: “收藏品”, “source”: “LM News” },
{ “word”: “perilously”, “zh”: “危險地”, “source”: “LM News” },
{ “word”: “frenzy”, “zh”: “狂熱”, “source”: “LM News” },
{ “word”: “intervention”, “zh”: “干預措施”, “source”: “LM News” },
{ “word”: “autonomy”, “zh”: “個人自主權”, “source”: “LM News” },
{ “word”: “curtail”, “zh”: “削減”, “source”: “LM News” },
{ “word”: “dominate”, “zh”: “主導”, “source”: “LM Essay” },
{ “word”: “discontent”, “zh”: “不滿”, “source”: “LM Essay” },
{ “word”: “elevate”, “zh”: “提升”, “source”: “LM Essay” },
{ “word”: “emerging”, “zh”: “新興的”, “source”: “LM Essay” },
{ “word”: “bleak”, “zh”: “暗淡的”, “source”: “LM Essay” },
{ “word”: “throttle”, “zh”: “扼殺”, “source”: “LM Essay” },
{ “word”: “algorithms”, “zh”: “運算法則”, “source”: “LM Essay” },
{ “word”: “capacity”, “zh”: “能力”, “source”: “LM Essay” },
{ “word”: “outperform”, “zh”: “超越”, “source”: “LM Essay” },
{ “word”: “demoralizing”, “zh”: “令人氣餒的”, “source”: “LM Essay” },
{ “word”: “constitute”, “zh”: “構成”, “source”: “LM Essay” },
{ “word”: “bedrock”, “zh”: “基石”, “source”: “LM Essay” },
{ “word”: “replicate”, “zh”: “複製”, “source”: “LM Essay” },
{ “word”: “plagued”, “zh”: “受…困擾”, “source”: “LM Essay” },
{ “word”: “outshine”, “zh”: “比…出色”, “source”: “LM Essay” },
{ “word”: “catastrophic”, “zh”: “災難性的”, “source”: “Idea Power Bank” },
{ “word”: “solidarity”, “zh”: “團結”, “source”: “Idea Power Bank” },
{ “word”: “humanitarian”, “zh”: “人道主義的”, “source”: “Idea Power Bank” },
{ “word”: “unprecedented”, “zh”: “前所未有的”, “source”: “Idea Power Bank” },
{ “word”: “unequivocal”, “zh”: “明確的”, “source”: “NYT DIY” },
{ “word”: “mandates”, “zh”: “指令”, “source”: “NYT DIY” },
{ “word”: “levity”, “zh”: “輕鬆氣氛”, “source”: “NYT DIY” },
{ “word”: “quirky”, “zh”: “奇特的”, “source”: “NYT DIY” },
{ “word”: “honed”, “zh”: “磨練”, “source”: “NYT DIY” }
],
“baatDaap”: [
{ “text”: “not-so-distant past”, “source”: “LM Essay — AI Songwriting” },
{ “text”: “do more harm than good”, “source”: “LM Essay — AI Songwriting” },
{ “text”: “pour their hearts into crafting”, “source”: “LM Essay — AI Songwriting” },
{ “text”: “room for survival”, “source”: “LM Essay — AI Songwriting” },
{ “text”: “capture the hearts of”, “source”: “LM Essay — AI Songwriting” },
{ “text”: “motivates participants to give their best”, “source”: “LM Essay — AI Songwriting” },
{ “text”: “breeding ground”, “source”: “LM News — Pokemon” },
{ “text”: “It can clearly be seen that…is an unwise move.”, “source”: “LM Essay — AI Songwriting” }
]
}
;

// ===== INIT =====
function init() {
data = EMBEDDED_DATA;
renderAll();
navigate(‘home’);
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
