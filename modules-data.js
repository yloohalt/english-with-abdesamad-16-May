// modules-data.js
// Structured database of the 10 C1 Modules for the "English with Abdesamad" website.

const c1Modules = [
  {
    id: 1,
    title: "Module 1: High-Stakes Decisions & Risk",
    vocabTitle: "Risk & Decision Making Vocabulary",
    vocabulary: [
      { word: "Acquiesce", type: "verb", stress: "ac-qui-ESCE", ipa: "/ˌæk.wiˈes/", syllables: "ac·qui·esce",
        def: "To accept or agree to something, often unwillingly or without protest.",
        arabicDef: "أن تقبل أو توافق على شيء، غالباً دون رغبة حقيقية أو دون اعتراض.",
        ex: "The prince reluctantly acquiesced in the council's decision.",
        arabicEx: "أذعن الأمير على مضض لقرار المجلس.",
        coll: "reluctantly acquiesce, quietly acquiesce, eventually acquiesce, acquiesce in a decision, acquiesce to pressure",
        arabicColl: "reluctantly acquiesce = يذعن على مضض, quietly acquiesce = يذعن بصمت, eventually acquiesce = يذعن في النهاية, acquiesce in a decision = يذعن لقرار, acquiesce to pressure = يذعن للضغط",
        arabic: "يذعن / يرضخ",
        syn: "assent, comply, yield",
        ant: "resist, oppose, object",
        videoClips: [
          {
            path: "Video clips/acquiesce/i'm-disinclined-to-acquiesce-to-your-request.mp4",
            caption: "I'm disinclined to acquiesce to your request.",
            arabic: "أنا غير ميال للموافقة على طلبك."
          },
          {
            path: "Video clips/acquiesce/if-i-were-to-acquiesce-would-the-reply-be-delivered-by-your-own-hand.mp4",
            caption: "If I were to acquiesce, would the reply be delivered by your own hand?",
            arabic: "إذا كان لي أن أوافق، فهل سيتم تسليم الرد بيدك؟"
          },
          {
            path: "Video clips/acquiesce/well-you-may-tell-the-captain-that-i-am-disinclined-to-acquiesce-to-his-request.mp4",
            caption: "Well, you may tell the captain that I am disinclined to acquiesce to his request.",
            arabic: "حسنًا، يمكنك إخبار الكابتن أنني غير ميال للموافقة على طلبه."
          },
          {
            path: "Video clips/acquiesce/you-mean-acquiesce-to-nazi's-demands.mp4",
            caption: "You mean acquiesce to Nazi's demands.",
            arabic: "تعني الرضوخ لمطالب النازيين."
          },
          {
            path: "Video clips/acquiesce/i-need-to-know-your-acquiesce-to-that.mp4",
            caption: "I need to know your acquiesce to that.",
            arabic: "أنا بحاجة لمعرفة موافقتك على ذلك."
          }
        ] },

      { word: "Capricious", type: "adjective", stress: "ca-PRI-cious", ipa: "/kəˈprɪʃ.əs/", syllables: "ca·pri·cious",
        def: "Changing suddenly and unexpectedly, often without a clear or good reason.",
        arabicDef: "متقلّب أو متغيّر فجأة وبشكل غير متوقع، وغالباً من دون سبب واضح أو منطقي.",
        ex: "The villagers feared the king's capricious decisions.",
        arabicEx: "خاف القرويون من قرارات الملك المتقلّبة وغير المتوقعة.",
        coll: "capricious weather, capricious behaviour, capricious decision, capricious nature, capricious ruler",
        arabicColl: "capricious weather = طقس متقلّب, capricious behaviour = سلوك متقلّب, capricious decision = قرار متقلّب, capricious nature = طبيعة متقلّبة, capricious ruler = حاكم متقلّب",
        arabic: "متقلب / نزوي",
        syn: "unpredictable, fickle, erratic",
        ant: "steady, consistent, predictable" },

      { word: "Dearth", type: "noun", stress: "DEARTH", ipa: "/dɜːrθ/", syllables: "dearth",
        def: "A serious lack of something that people need or expect to have.",
        arabicDef: "نقص شديد في شيء يحتاجه الناس أو يتوقعون وجوده.",
        ex: "There was a dearth of reliable information after the wells ran dry.",
        arabicEx: "كان هناك نقصٌ شديد في المعلومات الموثوقة بعد أن جفّت الآبار.",
        coll: "a dearth of information, a dearth of evidence, a dearth of resources, a dearth of skilled workers, a dearth of reliable data",
        arabicColl: "a dearth of information = نقص في المعلومات, a dearth of evidence = نقص في الأدلة, a dearth of resources = نقص في الموارد, a dearth of skilled workers = نقص في العمال المهرة, a dearth of reliable data = نقص في البيانات الموثوقة",
        arabic: "ندرة / قلة",
        syn: "scarcity, shortage, paucity",
        ant: "abundance, surplus, plenty" },

      { word: "Ephemeral", type: "adjective", stress: "e-PHEM-er-al", ipa: "/ɪˈfem.ər.əl/", syllables: "e·phem·er·al",
        def: "Lasting for only a short time.",
        arabicDef: "يدوم لفترة قصيرة فقط؛ عابر أو زائل بسرعة.",
        ex: "The flower's beauty was ephemeral; by morning, it had disappeared.",
        arabicEx: "كان جمال الزهرة عابراً؛ فبحلول الصباح كان قد اختفى.",
        coll: "ephemeral beauty, ephemeral moment, ephemeral pleasure, ephemeral nature, ephemeral fame",
        arabicColl: "ephemeral beauty = جمال عابر, ephemeral moment = لحظة عابرة, ephemeral pleasure = متعة عابرة, ephemeral nature = طبيعة زائلة, ephemeral fame = شهرة عابرة",
        arabic: "زائل / سريع الزوال",
        syn: "fleeting, transient, short-lived",
        ant: "permanent, lasting, enduring" },

      { word: "Fastidious", type: "adjective", stress: "fas-TID-i-ous", ipa: "/ˌfæsˈtɪd.i.əs/", syllables: "fas·tid·i·ous",
        def: "Very careful and hard to please because you want everything to be perfect, clean, correct, or exactly right.",
        arabicDef: "شديد الدقة وصعب الإرضاء لأنك تريد كل شيء كاملاً أو نظيفاً أو صحيحاً أو مضبوطاً تماماً.",
        ex: "The chef was fastidious about the arrangement of every plate.",
        arabicEx: "كان الطاهي دقيقاً جداً ومتطلباً بشأن ترتيب كل طبق.",
        coll: "fastidious about details, fastidious attention to detail, fastidious standards, fastidious preparation, fastidious cleanliness",
        arabicColl: "fastidious about details = دقيق جداً بشأن التفاصيل, fastidious attention to detail = اهتمام شديد بالتفاصيل, fastidious standards = معايير صارمة, fastidious preparation = إعداد دقيق جداً, fastidious cleanliness = نظافة شديدة الدقة",
        arabic: "دقيق جداً / صعب الإرضاء",
        syn: "meticulous, particular, fussy",
        ant: "careless, sloppy, unfastidious" },

      { word: "Ineffable", type: "adjective", stress: "in-EF-fa-ble", ipa: "/ˌɪnˈef.ə.bəl/", syllables: "in·ef·fa·ble",
        def: "So beautiful, powerful, emotional, or special that words cannot describe it properly.",
        arabicDef: "جميل أو قوي أو مؤثر أو مميز لدرجة أن الكلمات لا تستطيع وصفه بدقة.",
        ex: "The monk felt an ineffable peace as the first light touched the temple roof.",
        arabicEx: "شعر الراهب بسلامٍ لا يوصف عندما لامس الضوء الأول سقف المعبد.",
        coll: "ineffable beauty, ineffable joy, ineffable peace, ineffable mystery, ineffable sense of wonder",
        arabicColl: "ineffable beauty = جمال لا يوصف, ineffable joy = فرح لا يوصف, ineffable peace = سلام لا يوصف, ineffable mystery = غموض لا يوصف, ineffable sense of wonder = إحساس بالدهشة لا يوصف",
        arabic: "لا يوصف / يفوق الوصف",
        syn: "indescribable, inexpressible, unutterable",
        ant: "expressible, describable, ordinary" },

      { word: "Mitigate", type: "verb", stress: "MIT-i-gate", ipa: "/ˈmɪt̬.ə.ɡeɪt/", syllables: "mit·i·gate",
        def: "To make a bad situation less serious, less harmful, or easier to deal with.",
        arabicDef: "أن تجعل موقفاً سيئاً أقل خطورة أو أقل ضرراً أو أسهل في التعامل معه.",
        ex: "The village built stone walls to mitigate the impact of the storm.",
        arabicEx: "بنت القرية جدراناً حجرية لتخفيف أثر العاصفة.",
        coll: "mitigate the effects, mitigate the impact, mitigate the risk, mitigate damage, mitigate climate change",
        arabicColl: "mitigate the effects = يخفف الآثار, mitigate the impact = يخفف التأثير, mitigate the risk = يقلل الخطر, mitigate damage = يخفف الضرر, mitigate climate change = يخفف من تغيّر المناخ",
        arabic: "يخفف / يلطف",
        syn: "alleviate, reduce, ease",
        ant: "aggravate, exacerbate, intensify" },

      { word: "Nefarious", type: "adjective", stress: "ne-FAR-i-ous", ipa: "/nəˈfer.i.əs/", syllables: "ne·far·i·ous",
        def: "Very evil, immoral, or criminal, especially when describing actions, plans, purposes, schemes, or activities.",
        arabicDef: "شرير جداً أو غير أخلاقي أو إجرامي، خصوصاً عند وصف الأفعال أو الخطط أو الأغراض أو المؤامرات.",
        ex: "The adviser used nefarious means to gain power.",
        arabicEx: "استخدم المستشار وسائل شريرة وإجرامية للحصول على السلطة.",
        coll: "nefarious activities, nefarious purposes, nefarious scheme, nefarious plot, nefarious means",
        arabicColl: "nefarious activities = أنشطة شريرة, nefarious purposes = أغراض شريرة, nefarious scheme = مخطط شرير, nefarious plot = مؤامرة شريرة, nefarious means = وسائل شريرة",
        arabic: "شنيع / خبيث / شرير",
        syn: "evil, wicked, villainous",
        ant: "virtuous, lawful, honorable" },

      { word: "Obfuscate", type: "verb", stress: "OB-fus-cate", ipa: "/ˈɑːb.fə.skeɪt/", syllables: "ob·fus·cate",
        def: "To make an idea, fact, issue, or explanation unclear and difficult to understand, often on purpose.",
        arabicDef: "أن تجعل فكرة أو حقيقة أو قضية أو شرحاً غير واضح وصعب الفهم، وغالباً بشكل متعمّد.",
        ex: "The minister tried to obfuscate the truth with confusing legal language.",
        arabicEx: "حاول الوزير أن يطمس الحقيقة بلغة قانونية مربكة.",
        coll: "obfuscate the truth, obfuscate the issue, obfuscate the facts, obfuscate the meaning, deliberately obfuscate",
        arabicColl: "obfuscate the truth = يطمس الحقيقة, obfuscate the issue = يعقّد القضية, obfuscate the facts = يطمس الحقائق, obfuscate the meaning = يطمس المعنى, deliberately obfuscate = يتعمّد الإبهام",
        arabic: "يغمض / يضلل / يشوش",
        syn: "obscure, confuse, muddle",
        ant: "clarify, simplify, illuminate" },

      { word: "Plausible", type: "adjective", stress: "PLAU-si-ble", ipa: "/ˈplɑː.zə.bəl/", syllables: "plau·si·ble",
        def: "Seeming reasonable, likely, or believable, even if it has not been proven true yet.",
        arabicDef: "يبدو معقولاً أو محتملاً أو قابلاً للتصديق، حتى لو لم يثبت أنه صحيح بعد.",
        ex: "The guard gave a plausible explanation for why the gate was open.",
        arabicEx: "قدّم الحارس تفسيراً معقولاً لسبب بقاء البوابة مفتوحة.",
        coll: "plausible explanation, plausible excuse, plausible scenario, plausible argument, plausible deniability",
        arabicColl: "plausible explanation = تفسير معقول, plausible excuse = عذر معقول, plausible scenario = سيناريو محتمل, plausible argument = حجة معقولة, plausible deniability = إمكانية الإنكار المعقول",
        arabic: "معقول / مقنع / ممكن تصديقه",
        syn: "believable, credible, reasonable",
        ant: "implausible, unbelievable, unlikely" },

      { word: "Superfluous", type: "adjective", stress: "su-PER-flu-ous", ipa: "/ˌsuːˈpɜːr.flu.əs/", syllables: "su·per·flu·ous",
        def: "Unnecessary because there is already enough, or because something adds no real value.",
        arabicDef: "زائد أو غير ضروري لأن الموجود كافٍ بالفعل، أو لأن الشيء لا يضيف قيمة حقيقية.",
        ex: "The editor removed several superfluous details that weakened the report.",
        arabicEx: "حذف المحرر عدة تفاصيل زائدة أضعفت التقرير.",
        coll: "superfluous detail, superfluous information, superfluous words, superfluous activities, superfluous features",
        arabicColl: "superfluous detail = تفصيل زائد, superfluous information = معلومات زائدة, superfluous words = كلمات زائدة, superfluous activities = أنشطة غير ضرورية, superfluous features = ميزات زائدة",
        arabic: "زائد عن الحاجة / غير ضروري",
        syn: "unnecessary, redundant, excessive",
        ant: "necessary, essential, indispensable" },

      { word: "Taciturn", type: "adjective", stress: "TAC-i-turn", ipa: "/ˈtæs.ə.tɜːrn/", syllables: "tac·i·turn",
        def: "Quiet and not willing to speak much; often gives very short answers or stays silent.",
        arabicDef: "قليل الكلام أو صامت بطبعه؛ غالباً يجيب بإجابات قصيرة أو يفضّل الصمت.",
        ex: "The taciturn blacksmith answered every question with a nod.",
        arabicEx: "أجاب الحدّاد قليل الكلام عن كل سؤال بإيماءة.",
        coll: "taciturn man, taciturn person, taciturn nature, taciturn manner, taciturn response",
        arabicColl: "taciturn man = رجل قليل الكلام, taciturn person = شخص قليل الكلام, taciturn nature = طبيعة صامتة, taciturn manner = أسلوب قليل الكلام, taciturn response = رد مقتضب",
        arabic: "كتوم / قليل الكلام / صموت",
        syn: "reserved, reticent, quiet",
        ant: "talkative, loquacious, garrulous" }

    ],
    story: "Arthur, a taciturn old scholar, stared intently at the ancient parchment under the dim candlelight. His young apprentice, Leo, knew that his master’s deep silence was never a sign of anger, but of intense focus. There was a desperate dearth of reliable maps detailing the Lost Valley, a dangerous northern realm ruled by a capricious climate that shifted from freezing blizzard to scorching heat in a matter of hours.<br><br>A nefarious merchant had hired them to locate the valley’s hidden obsidian temple. Arthur had refused at first, but the cruel man threatened to burn his ancestral library, leaving Arthur with no choice but to acquiesce. Arthur, a fastidious researcher who cataloged every single detail, refused to rush the preparations. To mitigate the countless perils of the journey, he spent weeks cross-referencing ancient diaries. One diary spoke of an ineffable light that guided honest travelers, though Arthur dismissed this as mere folklore.<br><br>The merchant sent along a guide who constantly tried to obfuscate their route, offering highly plausible but ultimately incorrect directions to lead them astray. However, Arthur easily saw through the guide's clever deceit. He realized the guide’s complex charts were filled with superfluous details designed to distract them from the true, simple path.<br><br>When they finally reached the high mountain ridge, the dense clouds parted, revealing the valley below. The stunning landscape was bathed in an ephemeral golden sunset that faded within minutes. In that fleeting moment, the true trail shone clearly, reflecting off the wet stones below. Arthur smiled, his silent triumph proving that quiet patience was far more valuable than the merchant's greed.<br><br><div class='reading-comprehension' style='margin-top: 3rem; border-top: 1px solid var(--card-border); padding-top: 2rem;'><h3 style='margin-bottom: 0.5rem; color: var(--accent-color);'>🧩 Reading Comprehension Exercise</h3><p style='color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;'>Read the story above, then click each question below to reveal the correct answer and explanation.</p><details style='margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); border: 1px solid var(--card-border); padding: 1rem; border-radius: 10px; cursor: pointer;'><summary style='font-weight: 600; outline: none; user-select: none;'>1. What did the nefarious merchant threaten to do that eventually forced Arthur to acquiesce?</summary><p style='margin-top: 0.8rem; color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;'><strong>Answer:</strong> The merchant threatened to burn Arthur's ancestral library, leaving him with no choice but to acquiesce (accept reluctantly) to lead the search for the obsidian temple.</p></details><details style='margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); border: 1px solid var(--card-border); padding: 1rem; border-radius: 10px; cursor: pointer;'><summary style='font-weight: 600; outline: none; user-select: none;'>2. How did Arthur figure out that the guide was trying to deceive them, and what does this reveal about his skills?</summary><p style='margin-top: 0.8rem; color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;'><strong>Answer:</strong> Arthur cross-referenced the guide's charts with ancient diaries. He realized the charts were filled with superfluous (unnecessary) details meant to obfuscate (make unclear) their route. This shows he is a fastidious (meticulous) researcher with excellent logical thinking.</p></details><details style='margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); border: 1px solid var(--card-border); padding: 1rem; border-radius: 10px; cursor: pointer;'><summary style='font-weight: 600; outline: none; user-select: none;'>3. What does the word 'capricious' describe in the first paragraph, and how does it affect the journey?</summary><p style='margin-top: 0.8rem; color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;'><strong>Answer:</strong> It describes the valley's climate, which is highly unpredictable (capricious). This makes the journey dangerous, as the weather could shift from a freezing blizzard to scorching heat in hours, forcing them to spend weeks preparing to mitigate these risks.</p></details><details style='margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); border: 1px solid var(--card-border); padding: 1rem; border-radius: 10px; cursor: pointer;'><summary style='font-weight: 600; outline: none; user-select: none;'>4. The guide provided superfluous details to obfuscate their path. Explain what these two words mean in this context.</summary><p style='margin-top: 0.8rem; color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;'><strong>Answer:</strong> 'Superfluous' means unnecessary or excessive, and 'obfuscate' means to make unclear or confuse. The guide added extra, irrelevant pathways on the map to confuse (obfuscate) the travelers and hide the true, simple trail.</p></details><details style='margin-bottom: 1rem; background: rgba(168, 85, 247, 0.05); border: 1px solid var(--card-border); padding: 1rem; border-radius: 10px; cursor: pointer;'><summary style='font-weight: 600; outline: none; user-select: none;'>5. The trail only became visible during an ephemeral sunset. How does this fleeting moment connect to the theme?</summary><p style='margin-top: 0.8rem; color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;'><strong>Answer:</strong> The ephemeral (very short-lived) sunset was the only moment the path could be seen. This fleeting window showed that quiet patience and careful study are far more valuable than the merchant's impatient greed, rewarding the travelers' fastidious preparation.</p></details></div>",
    grammarTitle: "Participle Clauses & Negative Inversion",
    grammarIntro: "Learn how to structure complex active/passive clauses and apply dramatic subject-verb inversion after limiting adverbs.",
    grammarRules: [
      {
        ruleTitle: "Present Participle Clauses (-ing)",
        ruleDesc: "Used to connect two actions happening at the same time or to show a direct result of the main action.",
        ruleStructure: "[Main Clause], + [Present Participle Phrase]",
        examples: [
          "The merchant threatened to burn his library, leaving Arthur with no choice.",
          "Arthur stared at the map, worrying about how to mitigate the dangers."
        ],
        tinyQuiz: {
          question: "Combine the sentences: 'The guide gave directions filled with superfluous details.' and 'This obfuscated the path.'",
          choices: [
            "The guide gave directions filled with superfluous details, which obfuscating the path.",
            "The guide gave directions filled with superfluous details, obfuscating the path.",
            "The guide gave directions filled with superfluous details, obfuscated the path."
          ],
          answer: 1,
          explanation: "By changing the active verb 'obfuscated' to 'obfuscating,' we create a smooth present participle result clause."
        }
      },
      {
        ruleTitle: "Past Participle Clauses (-ed)",
        ruleDesc: "Used to show a passive background state or reason. The subject following the comma must match the target of the participle.",
        ruleStructure: "[Past Participle Phrase], + [Main Clause]",
        examples: [
          "Threatened by a nefarious merchant, Arthur searched for the valley.",
          "Bathed in an ephemeral golden sunset, the valley looked magical."
        ],
        tinyQuiz: {
          question: "Choose the correct sentence that avoids a dangling participle:",
          choices: [
            "Known as a taciturn man, Leo rarely heard Arthur speak.",
            "Known as a taciturn man, Arthur rarely spoke to Leo.",
            "Knowing as a taciturn man, Arthur rarely spoke to Leo."
          ],
          answer: 1,
          explanation: "The subject immediately following the comma must be the person who is known as taciturn (Arthur)."
        }
      },
      {
        ruleTitle: "Negative and Limiting Inversion",
        ruleDesc: "Used to add dramatic emphasis in formal contexts. The subject and auxiliary verb invert.",
        ruleStructure: "[Limiting Word] + [Auxiliary Verb] + [Subject] + [Main Verb]",
        examples: [
          "Seldom did Arthur speak during their long walks.",
          "Never had Arthur encountered such a capricious climate before."
        ],
        tinyQuiz: {
          question: "Rewrite using inversion: 'Arthur had never encountered such a capricious climate before.'",
          choices: [
            "Never had Arthur encountered such a capricious climate before.",
            "Never Arthur had encountered such a capricious climate before.",
            "Never did Arthur encountered such a capricious climate before."
          ],
          answer: 0,
          explanation: "After 'Never', the auxiliary verb 'had' must step in front of the subject 'Arthur'."
        }
      }
    ],
    grammarQuiz: [
      {
        question: "The author's explanation was so full of __________ details that the main plot got lost in the noise.",
        choices: [
          "Superfluous",
          "Taciturn",
          "Capricious",
          "Nefarious"
        ],
        answer: 0,
        explanation: "Superfluous details are extra and unnecessary, causing the core message to get lost."
      },
      {
        question: "Because the weather in the mountains is notoriously __________, hikers must prepare for both sudden blizzards and scorching heat.",
        choices: [
          "Dearth",
          "Capricious",
          "Mitigate",
          "Obfuscate"
        ],
        answer: 1,
        explanation: "Capricious means unpredictable and constantly changing."
      },
      {
        question: "During the severe drought, there was a critical __________ of clean drinking water in the region.",
        choices: [
          "Dearth",
          "Fastidious",
          "Ineffable",
          "Ephemeral"
        ],
        answer: 0,
        explanation: "Dearth means a scarcity or lack of something."
      },
      {
        question: "He is a __________ man who prefers to listen and observe rather than join in the loud chatter.",
        choices: [
          "Taciturn",
          "Plausible",
          "Nefarious",
          "Capricious"
        ],
        answer: 0,
        explanation: "Taciturn means quiet, reserved, or uncommunicative in speech."
      },
      {
        question: "To __________ the impact of the budget cuts, the department decided to freeze all new hiring.",
        choices: [
          "Mitigate",
          "Obfuscate",
          "Acquiesce",
          "Scrutinize"
        ],
        answer: 0,
        explanation: "Mitigate means to make something less severe or painful."
      },
      {
        question: "Some politicians intentionally use complex jargon to __________ the truth and avoid answering direct questions.",
        choices: [
          "Obfuscate",
          "Acquiesce",
          "Mitigate",
          "Corroborate"
        ],
        answer: 0,
        explanation: "Obfuscate means to make something unclear, confusing, or obscure."
      },
      {
        question: "If a researcher is extremely concerned about minor details, absolute cleanliness, and complete accuracy, they are:",
        choices: [
          "Ephemeral",
          "Fastidious",
          "Nefarious",
          "Plausible"
        ],
        answer: 1,
        explanation: "Fastidious means showing great attention to detail and accuracy."
      },
      {
        question: "Which word best describes a feeling or experience that is so deep, beautiful, or holy that it cannot be put into words?",
        choices: [
          "Ineffable",
          "Plausible",
          "Fastidious",
          "Ephemeral"
        ],
        answer: 0,
        explanation: "Ineffable means too great or extreme to be expressed in words."
      },
      {
        question: "After hours of argument, the board decided to __________ to the demands of the union to prevent a total company shutdown.",
        choices: [
          "Obfuscate",
          "Mitigate",
          "Acquiesce",
          "Decry"
        ],
        answer: 2,
        explanation: "Acquiesce means to accept something reluctantly but without protest."
      },
      {
        question: "A cherry blossom bloom that lasts for only a few days before the wind blows the petals away is best described as:",
        choices: [
          "Superfluous",
          "Ephemeral",
          "Capricious",
          "Taciturn"
        ],
        answer: 1,
        explanation: "Ephemeral means lasting for a very short time."
      },
      {
        question: "If a suspect provides a story that seems reasonable, believable, and highly likely to be true, their explanation is:",
        choices: [
          "Nefarious",
          "Plausible",
          "Ephemeral",
          "Ineffable"
        ],
        answer: 1,
        explanation: "Plausible means seeming reasonable, probable, or convincing."
      },
      {
        question: "A criminal mastermind's secret plot to sabotage a city's power grid is a __________ plot.",
        choices: [
          "Fastidious",
          "Taciturn",
          "Nefarious",
          "Plausible"
        ],
        answer: 2,
        explanation: "Nefarious means wicked, criminal, or villainous."
      }
    ],
    audioPath: "audio/module1.mp3",
    storyTimestamps: [
      { start: 0.0, end: 5.1 },
      { start: 5.1, end: 12.4 },
      { start: 12.4, end: 24.8 },
      { start: 24.8, end: 29.2 },
      { start: 29.2, end: 37.2 },
      { start: 37.2, end: 42.3 },
      { start: 42.3, end: 47.1 },
      { start: 47.1, end: 53.3 },
      { start: 53.3, end: 61.7 },
      { start: 61.7, end: 65.0 },
      { start: 65.0, end: 72.3 },
      { start: 72.3, end: 77.8 },
      { start: 77.8, end: 82.6 },
      { start: 82.6, end: 88.1 },
      { start: 88.1, end: 94.0 }
    ],
    vocabQuizData: {
      part1: [
        { qNumber: 1, question: "After hours of pressure, the mayor finally _______ to the committee’s demands.", choices: ["resisted", "acquiesced", "objected", "opposed"], answer: 1 },
        { qNumber: 2, question: "The manager’s _______ decisions made it impossible for the team to plan ahead.", choices: ["plausible", "taciturn", "capricious", "steady"], answer: 2 },
        { qNumber: 3, question: "The research report suffered from a _______ of reliable data.", choices: ["surplus", "abundance", "plenty", "dearth"], answer: 3 },
        { qNumber: 4, question: "The online trend was _______; it disappeared after only three days.", choices: ["enduring", "permanent", "ephemeral", "lasting"], answer: 2 },
        { qNumber: 5, question: "The _______ editor checked every comma, space, and footnote before publication.", choices: ["careless", "sloppy", "fastidious", "unfastidious"], answer: 2 },
        { qNumber: 6, question: "As the sun rose over the mountains, the travelers felt an _______ sense of wonder.", choices: ["ineffable", "ordinary", "expressible", "plausible"], answer: 0 },
        { qNumber: 7, question: "The city planted thousands of trees to _______ the risk of flooding.", choices: ["aggravate", "mitigate", "intensify", "exacerbate"], answer: 1 },
        { qNumber: 8, question: "The investigation revealed that the charity’s funds had been used for _______ purposes.", choices: ["virtuous", "lawful", "honorable", "nefarious"], answer: 3 },
        { qNumber: 9, question: "The spokesperson used technical jargon to _______ the truth about the company’s failure.", choices: ["clarify", "simplify", "illuminate", "obfuscate"], answer: 3 },
        { qNumber: 10, question: "The witness gave a _______ explanation, but the detective still wanted more evidence.", choices: ["plausible", "implausible", "unbelievable", "unlikely"], answer: 0 },
        { qNumber: 11, question: "The final paragraph was removed because it contained _______ information.", choices: ["essential", "necessary", "indispensable", "superfluous"], answer: 3 },
        { qNumber: 12, question: "The _______ guard rarely spoke, but he noticed every detail.", choices: ["talkative", "loquacious", "garrulous", "taciturn"], answer: 3 }
      ],
      part2: [
        { word: "Acquiesce", meaning: "to accept something without protest, often unwillingly", correctLetter: "H" },
        { word: "Capricious", meaning: "changing suddenly and unpredictably", correctLetter: "I" },
        { word: "Dearth", meaning: "a serious lack of something", correctLetter: "E" },
        { word: "Ephemeral", meaning: "lasting for only a short time", correctLetter: "A" },
        { word: "Fastidious", meaning: "very careful and hard to please", correctLetter: "J" },
        { word: "Ineffable", meaning: "too great or beautiful to describe in words", correctLetter: "K" },
        { word: "Mitigate", meaning: "to make something bad less serious", correctLetter: "B" },
        { word: "Nefarious", meaning: "very evil, immoral, or criminal", correctLetter: "D" },
        { word: "Obfuscate", meaning: "to make something unclear or difficult to understand", correctLetter: "L" },
        { word: "Plausible", meaning: "seeming reasonable or believable", correctLetter: "C" },
        { word: "Superfluous", meaning: "unnecessary because there is already enough", correctLetter: "G" },
        { word: "Taciturn", meaning: "quiet and not willing to speak much", correctLetter: "F" }
      ],
      part3: [
        { word: "mitigate", collocation: "the impact", choices: ["the impact", "the silence", "the furniture", "the apology"], answer: 0 },
        { word: "plausible", collocation: "explanation", choices: ["explanation", "cleanliness", "pressure", "shortage"], answer: 0 },
        { word: "nefarious", collocation: "purposes", choices: ["purposes", "sunshine", "kindness", "evidence"], answer: 0 },
        { word: "ineffable", collocation: "beauty", choices: ["beauty", "damage", "shortage", "decision"], answer: 0 },
        { word: "superfluous", collocation: "details", choices: ["details", "pressure", "peace", "climate change"], answer: 0 },
        { word: "acquiesce", collocation: "to pressure", choices: ["to pressure", "about details", "the facts", "a shortage"], answer: 0 },
        { word: "fastidious", collocation: "attention to detail", choices: ["attention to detail", "explanation", "fame", "plot"], answer: 0 },
        { word: "obfuscate", collocation: "the truth", choices: ["the truth", "the impact", "a decision", "the weather"], answer: 0 },
        { word: "dearth", collocation: "of evidence", choices: ["of evidence", "to pressure", "of beauty", "in a decision"], answer: 0 },
        { word: "taciturn", collocation: "response", choices: ["response", "scheme", "impact", "fame"], answer: 0 }
      ],
      part4: [
        { qNumber: 35, question: "In this sentence, what is the closest meaning of <strong>ephemeral</strong>?<br><br><em>“His fame was ephemeral; within a week, nobody remembered his name.”</em>", choices: ["permanent", "fleeting", "careful", "evil"], answer: 1 },
        { qNumber: 36, question: "Which word is closest to the opposite of <strong>mitigate</strong>?", choices: ["alleviate", "reduce", "ease", "exacerbate"], answer: 3 },
        { qNumber: 37, question: "In this sentence, what is the closest meaning of <strong>fastidious</strong>?<br><br><em>“The designer was fastidious about every color and measurement.”</em>", choices: ["meticulous", "careless", "ordinary", "quiet"], answer: 0 },
        { qNumber: 38, question: "Which word is closest to the opposite of <strong>plausible</strong>?", choices: ["believable", "credible", "reasonable", "implausible"], answer: 3 },
        { qNumber: 39, question: "In this sentence, what is the closest meaning of <strong>obfuscate</strong>?<br><br><em>“The lawyer tried to obfuscate the issue with unnecessary details.”</em>", choices: ["clarify", "confuse", "simplify", "illuminate"], answer: 1 },
        { qNumber: 40, question: "Which word is closest to the opposite of <strong>taciturn</strong>?", choices: ["reserved", "quiet", "reticent", "talkative"], answer: 3 },
        { qNumber: 41, question: "In this sentence, what is the closest meaning of <strong>nefarious</strong>?<br><br><em>“The group was arrested for its nefarious activities.”</em>", choices: ["wicked", "lawful", "honorable", "ordinary"], answer: 0 },
        { qNumber: 42, question: "Which word is closest to the opposite of <strong>superfluous</strong>?", choices: ["unnecessary", "redundant", "essential", "excessive"], answer: 2 }
      ],
      part5: [
        { qNumber: 43, sentence: "The prince acquiesced the decision.", answer: "The prince acquiesced in the decision." },
        { qNumber: 44, sentence: "There was a dearth reliable information.", answer: "There was a dearth of reliable information." },
        { qNumber: 45, sentence: "The report obfuscated about the truth.", answer: "The report obfuscated the truth." },
        { qNumber: 46, sentence: "His story sounded plausibly.", answer: "His story sounded plausible." },
        { qNumber: 47, sentence: "The chef prepared the meal fastidious.", answer: "The chef prepared the meal fastidiously." },
        { qNumber: 48, sentence: "The editor removed several superfluous informations.", answer: "The editor removed several pieces of superfluous information." },
        { qNumber: 49, sentence: "He answered taciturn.", answer: "He answered taciturnly." },
        { qNumber: 50, sentence: "The government mitigated against the damage.", answer: "The government mitigated the damage." }
      ],
      part6: [
        { qNumber: 51, sentence: "The judge accepted the argument because it sounded highly _______.", bracket: "plausible", answer: "plausible" },
        { qNumber: 52, sentence: "The policy helped reduce the damage, so it was an effective form of _______.", bracket: "mitigate", answer: "mitigation" },
        { qNumber: 53, sentence: "The minister’s speech was full of deliberate _______.", bracket: "obfuscate", answer: "obfuscation" },
        { qNumber: 54, sentence: "The chef checked the plates _______ before the guests arrived.", bracket: "fastidious", answer: "fastidiously" },
        { qNumber: 55, sentence: "The beauty of the moment was almost _______.", bracket: "ineffable", answer: "ineffable" },
        { qNumber: 56, sentence: "His silence and _______ made the villagers nervous.", bracket: "taciturn", answer: "taciturnity" }
      ],
      part7: {
        instruction: "Write five original sentences. Use five different words from the list.",
        words: ["acquiesce", "capricious", "dearth", "ephemeral", "fastidious", "ineffable", "mitigate", "nefarious", "obfuscate", "plausible", "superfluous", "taciturn"]
      }
    }
  },
  {
    id: 2,
    title: "Module 2: The Art of Diplomacy & Persuasion",
    vocabTitle: "Diplomatic & Persuasive Vocabulary",
    vocabulary: [
      { word: "Conciliatory", type: "adjective", def: "Intended or likely to placate or pacify; showing peace-making intent.", ex: "He made a conciliatory gesture, offering to concede region rights.", stress: "con-CIL-i-a-tory", coll: "conciliatory gesture, conciliatory tone" },
      { word: "Equivocal", type: "adjective", def: "Open to more than one interpretation; deliberately vague.", ex: "Richard’s response was equivocal at first, trying to protect his interests.", stress: "e-QUIV-o-cal", coll: "equivocal answer, equivocal stance" },
      { word: "Contentious", type: "adjective", def: "Causing or likely to cause an argument; controversial.", ex: "The most contentious clause regarded intellectual property rights.", stress: "con-TEN-tious", coll: "contentious issue, contentious debate" },
      { word: "Placate", type: "verb", def: "To make someone less angry or hostile by making concessions.", ex: "He tried to placate the board without giving away too much leverage.", stress: "pla-CATE", coll: "placate the investors, placate the opposition" },
      { word: "Acrimonious", type: "adjective", def: "Angry, bitter, and full of ill-will.", ex: "A week of acrimonious debates had left both teams exhausted.", stress: "a-cri-MO-ni-ous", coll: "acrimonious debate, acrimonious divorce" },
      { word: "Arbitrate", type: "verb", def: "To act as a neutral third party to settle a dispute.", ex: "Richard suggested they hire a neutral expert to arbitrate the remaining details.", stress: "AR-bi-trate", coll: "arbitrate between two groups, arbitrate a dispute" },
      { word: "Consensus", type: "noun", def: "A general agreement reached by a group.", ex: "By focusing on a shared goal, they managed to reach a consensus.", stress: "con-SEN-sus", coll: "reach a consensus, broad consensus" },
      { word: "Unilateral", type: "adjective", def: "An action taken by only one party without the agreement of others.", ex: "Richard proposed a unilateral amendment to bypass the deadlock.", stress: "u-ni-LAT-e-ral", coll: "unilateral decision, unilateral action" },
      { word: "Concede", type: "verb", def: "To admit that something is true/valid after denying it; yield.", ex: "Daniel made a gesture, offering to concede distribution rights.", stress: "con-CEDE", coll: "concede a point, concede defeat" },
      { word: "Friction", type: "noun", def: "Discord or clash of wills between people or groups.", ex: "This move would resolve the dispute but cause future friction.", stress: "FRIC-tion", coll: "cause friction, political friction" },
      { word: "Pragmatic", type: "adjective", def: "Dealing with problems in a sensible, practical way.", ex: "Instead of reacting with anger, Daniel adopted a pragmatic approach.", stress: "prag-MAT-ic", coll: "pragmatic approach, pragmatic solution" },
      { word: "Double-edged", type: "adjective", def: "Having two contradictory aspects (one good, one bad).", ex: "Richard knew this amendment was a double-edged sword.", stress: "double-EDGED", coll: "double-edged sword, double-edged compliment" }
    ],
    story: "Daniel faced Richard across the polished mahogany table. A week of acrimonious debates had left both teams completely exhausted. The main obstacle to their partnership was a highly contentious contract clause regarding intellectual property rights.<br><br>Richard proposed a unilateral amendment, hoping to bypass the deadlock. However, Daniel knew this was a double-edged move; it would resolve the immediate dispute but would undoubtedly cause future friction between their organizations. Instead of reacting with frustration, Daniel adopted a pragmatic approach. He made a conciliatory gesture, offering to concede distribution rights in the European region.<br><br>Richard’s response was equivocal at first, as he attempted to protect his own team's interests. Realizing that Daniel was trying to placate the investors without giving away too much leverage, Richard suggested they hire a neutral expert to arbitrate the remaining details.<br><br>It was this suggestion that broke the impasse. By focusing on a shared goal, they managed to reach a consensus, proving that diplomatic compromise was far more effective than stubborn resistance.",
    grammarTitle: "Cleft Sentences",
    grammarIntro: "Master It-clefts, Wh-clefts, and All-clefts to add emphasis and highlight specific information in formal arguments.",
    grammarRules: [
      {
        ruleTitle: "It-Clefts",
        ruleDesc: "Highlights the subject or object of a sentence by placing it at the front.",
        ruleStructure: "It + is/was + [Emphasized Element] + that/who + [Rest of Sentence]",
        examples: [
          "It was Richard's suggestion that broke the impasse.",
          "It is the manager who must make the decision."
        ]
      },
      {
        ruleTitle: "Wh-Clefts (Pseudo-clefts)",
        ruleDesc: "Focuses on the action or the object of thoughts and desires.",
        ruleStructure: "What + [Subject] + [Verb] + is/was + [Emphasized Element]",
        examples: [
          "What I want to do is placate the angry investors.",
          "What concerns me is the contentious clause."
        ]
      },
      {
        ruleTitle: "All / The Only Thing-Clefts",
        ruleDesc: "Used to restrict emphasis to a single factor.",
        ruleStructure: "All / The only thing + [Subject] + [Verb] + is/was + [Emphasized Element]",
        examples: [
          "All Daniel wanted to do was reach a consensus.",
          "The only thing Richard refused to do was concede control."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Change 'A unilateral decision caused the friction' into an It-cleft focusing on the decision:",
        choices: [
          "It was the friction that caused a unilateral decision.",
          "It was a unilateral decision that caused the friction.",
          "What caused the friction was a unilateral decision."
        ],
        answer: 1,
        explanation: "The structure 'It was [unilateral decision] that...' puts the direct emphasis on the cause."
      },
      {
        question: "Rewrite 'We need a pragmatic solution to mitigate the dispute' as a Wh-cleft:",
        choices: [
          "It is a pragmatic solution that we need to mitigate the dispute.",
          "What we need to mitigate the dispute is a pragmatic solution.",
          "The only thing we need to mitigate the dispute is a pragmatic solution."
        ],
        answer: 1,
        explanation: "A Wh-cleft starts with 'What' followed by the clause 'we need to...' and the verb 'is' before the emphasized phrase."
      },
      {
        question: "Correct the common error: 'The thing what concerns me is the potential friction.'",
        choices: [
          "The thing that concerns me is the potential friction.",
          "What thing concerns me is the potential friction.",
          "It is the thing what concerns me is the potential friction."
        ],
        answer: 0,
        explanation: "Do not use 'what' immediately after a noun like 'thing'. Use 'that' or simply start the cleft with 'What concerns me is...'"
      }
    ]
  },
  {
    id: 3,
    title: "Module 3: Hypothesizing & Intellectual Speculation",
    vocabTitle: "Scientific & Speculative Vocabulary",
    vocabulary: [
      { word: "Empirical", type: "adjective", def: "Based on observation or experience rather than theory.", ex: "Sterling warned him that without empirical evidence, his claims were mere conjecture.", stress: "em-PIR-i-cal", coll: "empirical evidence, empirical research" },
      { word: "Paradigm", type: "noun", def: "A typical model, pattern, or set of assumptions.", ex: "For decades, the scientific community accepted a traditional paradigm.", stress: "PAR-a-digm", coll: "paradigm shift, dominant paradigm" },
      { word: "Postulate", type: "verb", def: "To suggest or assume something as a basis for reasoning.", ex: "He decided to postulate a new, controversial explanation.", stress: "POS-tu-late", coll: "postulate a theory, postulate an explanation" },
      { word: "Corroborate", type: "verb", def: "To confirm or support a statement with evidence.", ex: "Sterling urged Vance to find additional data to corroborate his findings.", stress: "co-ROB-o-rate", coll: "corroborate a claim, corroborate findings" },
      { word: "Anomaly", type: "noun", def: "Something that deviates from what is standard or normal.", ex: "Vance had discovered a strange anomaly in his initial results.", stress: "a-NOM-a-ly", coll: "detect an anomaly, statistical anomaly" },
      { word: "Incontrovertible", type: "adjective", def: "Not able to be denied, disputed, or questioned.", ex: "Finally, he gathered incontrovertible proof that he was correct.", stress: "in-con-tro-VER-ti-ble", coll: "incontrovertible proof, incontrovertible evidence" },
      { word: "Hypothetical", type: "adjective", def: "Based on an assumed scenario or hypothesis; proposed.", ex: "To his peers, this idea was purely hypothetical and likely fallacious.", stress: "hy-po-THET-i-cal", coll: "hypothetical question, hypothetical scenario" },
      { word: "Synthesize", type: "verb", def: "To combine separate elements into a single coherent whole.", ex: "Vance spent months trying to synthesize his readings with established physics.", stress: "SYN-the-size", coll: "synthesize information, synthesize data" },
      { word: "Fallacious", type: "adjective", def: "Based on mistaken beliefs or unsound reasoning.", ex: "Many colleagues dismissed the new idea as fallacious.", stress: "fal-LA-cious", coll: "fallacious argument, fallacious reasoning" },
      { word: "Conjecture", type: "noun / verb", def: "An opinion formed on the basis of incomplete information.", ex: "Without solid data, your claims are mere conjecture.", stress: "con-JEC-ture", coll: "pure conjecture, matter of conjecture" },
      { word: "Refute", type: "verb", def: "To prove a statement or theory to be wrong or false.", ex: "His findings seemed to refute the long-held theory of conservation.", stress: "ri-FUTE", coll: "refute a claim, refute a theory" },
      { word: "Scrutinize", type: "verb", def: "To examine or inspect closely and thoroughly.", ex: "Dr. Vance worked late, determined to scrutinize the experimental data.", stress: "SCRU-ti-nize", coll: "scrutinize details, closely scrutinize" }
    ],
    story: "Dr. Vance worked late in his laboratory, determined to scrutinize the data from his latest experiment. For decades, the scientific community had accepted a traditional paradigm regarding energy conservation. However, Vance had discovered a strange anomaly in his initial results that seemed to refute this long-held theory.<br><br>He decided to postulate a new, controversial explanation. To his peers, this idea was purely hypothetical and likely fallacious. The senior researcher, Professor Sterling, warned him that without empirical evidence, his claims were mere conjecture. Sterling urged Vance to find additional data that could corroborate his findings.<br><br>Vance spent months trying to synthesize his new readings with established physics. Finally, he gathered incontrovertible proof that showed his results were indeed correct. Standing before the university board, Vance presented the data. It was this presentation that changed everything, triggering a massive shift in how scientists understood the universe.",
    grammarTitle: "Inverted & Mixed Conditionals",
    grammarIntro: "Omit 'if' for formal academic emphasis, and mix past conditions with present results seamlessly.",
    grammarRules: [
      {
        ruleTitle: "Second Conditional Inversion",
        ruleDesc: "Used to talk about hypothetical present/future states. Replaces 'If' with 'Were'.",
        ruleStructure: "Were + Subject + to + Verb + ...",
        examples: [
          "Were the theory to be fallacious, scientists would reject it.",
          "Were Vance to quit, the research would stop."
        ]
      },
      {
        ruleTitle: "Third Conditional Inversion",
        ruleDesc: "Used to discuss hypothetical past actions. Replaces 'If' with 'Had'.",
        ruleStructure: "Had + Subject + Past Participle + ...",
        examples: [
          "Had Vance scrutinized the data, he would have noticed the error.",
          "Had they known, they would have acted."
        ]
      },
      {
        ruleTitle: "Mixed Conditionals (Inverted)",
        ruleDesc: "Combines a past action with a present result, or a permanent state with a past action.",
        ruleStructure: "Had + Subject + Past Participle ... [Subject] + would/wouldn't + verb",
        examples: [
          "Had Vance not discovered the anomaly, he would not be famous today.",
          "Were Vance a careless researcher, he would have accepted the conjecture."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Invert: 'If the board had requested empirical proof, Sterling would have provided it.'",
        choices: [
          "Requested the board empirical proof, Sterling would have provided it.",
          "Had the board requested empirical proof, Sterling would have provided it.",
          "Were the board requested empirical proof, Sterling would have provided it."
        ],
        answer: 1,
        explanation: "To invert the third conditional, we drop 'if' and put 'Had' before the subject."
      },
      {
        question: "Combine into a mixed conditional: He did not synthesize the data last week (past). He does not have proof today (present).",
        choices: [
          "Had he synthesized the data last week, he would have incontrovertible proof today.",
          "Were he to synthesize the data last week, he would have incontrovertible proof today.",
          "Had he synthesized the data last week, he would have had incontrovertible proof today."
        ],
        answer: 0,
        explanation: "The past cause is represented by 'Had he synthesized' (inverted 3rd), and the present result is 'he would have proof today' (2nd conditional result)."
      },
      {
        question: "Find the error: 'Were we to knew the anomaly, we would fix it.'",
        choices: [
          "Change 'were' to 'had'.",
          "Change 'knew' to 'know'.",
          "Change 'fix' to 'have fixed'."
        ],
        answer: 1,
        explanation: "The structure 'Were we to...' requires the base form of the verb (know), not the past tense (knew)."
      }
    ]
  },
  {
    id: 4,
    title: "Module 4: Consensus, Discord, & Mediation",
    vocabTitle: "Teamwork & Conflict Vocabulary",
    vocabulary: [
      { word: "Concord", type: "noun", def: "Agreement or harmony between people or groups.", ex: "The board held a mandate, but they also needed to maintain concord.", stress: "CON-cord", coll: "living in concord, social concord" },
      { word: "Dissension", type: "noun", def: "Strong disagreement or discord within a group.", ex: "At the heart of the dissension was a list of grievances.", stress: "di-SEN-sion", coll: "internal dissension, sow dissension" },
      { word: "Polarized", type: "adjective", def: "Divided into two sharply contrasting groups or opinions.", ex: "The once cohesive team was now completely polarized over the direction.", stress: "PO-la-rized", coll: "polarized debate, polarized society" },
      { word: "Mandate", type: "noun / verb", def: "An official order, authority, or commission to do something.", ex: "The board held a strict mandate to protect shareholder value.", stress: "MAN-date", coll: "clear mandate, democratic mandate" },
      { word: "Amiable", type: "adjective", def: "Displaying a friendly, pleasant, and good-natured manner.", ex: "Mr. Reynolds and Mr. Thorne had enjoyed an amiable relationship.", stress: "A-mi-a-ble", coll: "amiable relationship, amiable parting" },
      { word: "Cohesive", type: "adjective", def: "Closely united, integrated, or working well together.", ex: "The once cohesive team was now completely polarized.", stress: "co-HE-sive", coll: "cohesive team, cohesive society" },
      { word: "Antagonism", type: "noun", def: "Active hostility, opposition, or anger between groups.", ex: "They were now locked in silent, bitter antagonism.", stress: "an-TAG-o-nism", coll: "show antagonism, personal antagonism" },
      { word: "Reconcile", type: "verb", def: "To restore friendly relations; make two opposing ideas compatible.", ex: "He tried to reconcile Thorne's rigid stance with reality.", stress: "REC-on-cile", coll: "reconcile differences, reconcile two views" },
      { word: "Concur", type: "verb", def: "To agree; to share the same opinion.", ex: "I cannot concur with your passive approach, Thorne argued.", stress: "con-CUR", coll: "concur with a decision, concur with colleagues" },
      { word: "Schism", type: "noun", def: "A formal split or division within a group due to differing beliefs.", ex: "A deep schism had divided the trustees.", stress: "SCHISM (sizm)", coll: "deep schism, cause a schism" },
      { word: "Grievance", type: "noun", def: "A real or imagined wrong or cause for complaint.", ex: "At the heart of the dispute was a list of grievances.", stress: "GRIE-vance", coll: "air a grievance, file a grievance" },
      { word: "Compromise", type: "noun / verb", def: "An agreement reached by each side making concessions.", ex: "Reynolds believed they must compromise, whereas Thorne refused.", stress: "COM-pro-mise", coll: "reach a compromise, acceptable compromise" }
    ],
    story: "The boardroom was filled with tension. A deep schism had divided the trustees, and the once cohesive team was now completely polarized over the company's future direction. Mr. Reynolds and Mr. Thorne, who previously enjoyed an amiable working relationship, were now locked in silent antagonism.<br><br>At the heart of the dissension was a list of grievances presented by the workers' union. The board held a strict mandate to protect shareholder value, but they also needed to maintain concord within the office to prevent a strike. Reynolds believed they must compromise, whereas Thorne refused to yield, asserting that the union's demands were unreasonable.<br><br>\"I cannot concur with your passive approach,\" Thorne argued. \"We must stand firm.\"<br><br>\"To stand firm is to risk a strike,\" Reynolds warned, trying to reconcile Thorne’s rigid stance with the harsh reality of their situation. He argued that a strike would destroy their reputation. Finally, after hours of debate, the board voted. Reynolds’ proposal won by a narrow margin. Thorne had no choice but to accept the vote, restoring a fragile peace to the company.",
    grammarTitle: "The Subjunctive & Advanced Modals",
    grammarIntro: "Learn to construct commands, requests, and hypotheticals using base verbs and past modal structures.",
    grammarRules: [
      {
        ruleTitle: "The Subjunctive Mood",
        ruleDesc: "Used after verbs/adjectives of urgency or demand. Uses the base form of the verb (no -s, -ed).",
        ruleStructure: "insist/demand/vital + that + Subject + [Base Verb]",
        examples: [
          "Reynolds insisted that Thorne compromise immediately.",
          "It is vital that the grievance be addressed."
        ]
      },
      {
        ruleTitle: "Speculative Past Modals",
        ruleDesc: "Speculating on the likelihood of a past hypothetical event.",
        ruleStructure: "might well have + Past Participle",
        examples: [
          "A strike might well have ruined the company.",
          "They could well have reached concord earlier."
        ]
      },
      {
        ruleTitle: "Expressing Preference with Would Rather",
        ruleDesc: "Expresses how we want another person to act (past = past perfect; present = past simple).",
        ruleStructure: "would rather + Subject + Past Tense",
        examples: [
          "Reynolds would rather Thorne were more amiable.",
          "Thorne would rather the board had not compromised."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Correct the sentence: 'The director suggested that the board member apologizes for his antagonism.'",
        choices: [
          "The director suggested that the board member apologize for his antagonism.",
          "The director suggested that the board member apologized for his antagonism.",
          "The director suggested that the board member will apologize for his antagonism."
        ],
        answer: 0,
        explanation: "Suggested triggers the subjunctive, requiring the base verb 'apologize'."
      },
      {
        question: "Complete: Reynolds wanted Thorne to remain silent during the yesterday's vote. 'Reynolds would rather Thorne...'",
        choices: [
          "would rather Thorne remained silent during the vote.",
          "would rather Thorne had remained silent during the vote.",
          "would rather Thorne remains silent during the vote."
        ],
        answer: 1,
        explanation: "For a past regret/preference, 'would rather' is followed by the Past Perfect (had remained)."
      },
      {
        question: "Choose the correct sentence:",
        choices: [
          "It is essential that he goes to the meeting.",
          "It is essential that he go to the meeting.",
          "It is essential that he will go to the meeting."
        ],
        answer: 1,
        explanation: "Adjectives of importance like 'essential' trigger the subjunctive, requiring the base form 'go'."
      }
    ]
  },
  {
    id: 5,
    title: "Module 5: Cause, Effect, & System Dynamics",
    vocabTitle: "Systemic Cause & Effect Vocabulary",
    vocabulary: [
      { word: "Catalyst", type: "noun", def: "A person or thing that precipitates or accelerates an event.", ex: "The sudden increase in import tariffs acted as a catalyst.", stress: "CAT-a-lyst", coll: "catalyst for change, economic catalyst" },
      { word: "Systemic", type: "adjective", def: "Relating to a system as a whole, rather than just individual parts.", ex: "He knew that the underlying issues were actually systemic.", stress: "sys-TEM-ic", coll: "systemic failure, systemic risk, systemic issue" },
      { word: "Perpetuate", type: "verb", def: "To make an undesirable situation or belief continue indefinitely.", ex: "Gregory argued that subsidies would only perpetuate a failing model.", stress: "per-PET-u-ate", coll: "perpetuate a myth, perpetuate a cycle" },
      { word: "Exacerbate", type: "verb", def: "To make a problem, bad situation, or negative feeling worse.", ex: "Adding funds without reform would only exacerbate inflation.", stress: "ex-AC-er-bate", coll: "exacerbate the problem, exacerbate tensions" },
      { word: "Cascade", type: "noun / verb", def: "A process occurring in stages where one event triggers a series of others.", ex: "A lack of reform caused a cascade of financial failures.", stress: "cas-CADE", coll: "cascade of events, cascade effect" },
      { word: "Precipitate", type: "verb", def: "To cause an event (typically a bad one) to happen suddenly or prematurely.", ex: "This collapse would inevitably precipitate a broader crisis.", stress: "pre-CIP-i-tate", coll: "precipitate a crisis, precipitate a decline" },
      { word: "Impediment", type: "noun", def: "A hindrance, barrier, or obstruction in doing something.", ex: "The old supply chain served as an impediment to growth.", stress: "im-PED-i-ment", coll: "major impediment, impediment to progress" },
      { word: "Symbiotic", type: "adjective", def: "Denoting a mutually beneficial or dependent relationship.", ex: "Our relationship with local suppliers is symbiotic.", stress: "sym-bi-OT-ic", coll: "symbiotic relationship, symbiotic partnership" },
      { word: "Ramification", type: "noun", def: "A consequence of an action or event, especially complex or unwelcome.", ex: "If they fail, the ramifications will be severe.", stress: "ra-mi-fi-CA-tion", coll: "serious ramifications, political ramifications" },
      { word: "Reverberate", type: "verb", def: "To have joint or continuing effects; to echo through a system.", ex: "The financial collapse will reverberate through the entire community.", stress: "re-VER-ber-ate", coll: "reverberate through the economy, decisions reverberated" },
      { word: "Inevitability", type: "noun", def: "The quality of being certain to happen and impossible to avoid.", ex: "Gregory accepted the inevitability of the industry's decline.", stress: "i-nev-i-ta-BIL-i-ty", coll: "sense of inevitability, historical inevitability" },
      { word: "Efficacy", type: "noun", def: "The ability to produce a desired or intended result; effectiveness.", ex: "He drafted a report questioning the efficacy of the subsidies.", stress: "EF-fi-ca-cy", coll: "prove the efficacy, efficacy of a policy" }
    ],
    story: "Gregory sat in his office, analyzing the collapse of the local manufacturing sector. He knew that the sudden increase in import tariffs had acted as a catalyst, but the underlying issues were actually systemic. The old supply chain suffered from a total lack of flexibility, which served as a major impediment to growth.<br><br>His colleague, Edward, believed that government subsidies would solve the problem, but Gregory argued that subsidies would only perpetuate a failing business model. Instead, he warned that injecting artificial funds without structural reforms would exacerbate inflation, causing a cascade of financial failures. This collapse would inevitably precipitate a broader crisis.<br><br>\"Our relationship with local suppliers is symbiotic,\" Gregory explained. \"If they fail, the ramifications will reverberate throughout the entire community.\"<br><br>He drafted a report questioning the efficacy of the current policies, arguing that a complete overhaul was necessary. To Gregory, the inevitability of the industry’s decline could only be avoided if they changed their entire approach immediately. Edward read the report and, seeing the logic, agreed to co-sign it.",
    grammarTitle: "Nominalization",
    grammarIntro: "Transform verbs and adjectives into nouns to make your academic writing objective, formal, and concise.",
    grammarRules: [
      {
        ruleTitle: "Transforming Verbs to Nouns",
        ruleDesc: "Shifts the focus from the action performer to the concept or process.",
        ruleStructure: "Verb -> Noun (e.g. exacerbate -> exacerbation)",
        examples: [
          "When the tariff was introduced, it exacerbated tensions. -> The introduction of the tariff led to the exacerbation of tensions."
        ]
      },
      {
        ruleTitle: "Transforming Adjectives to Nouns",
        ruleDesc: "Turns description into concept, ideal for academic thesis writing.",
        ruleStructure: "Adjective -> Noun (e.g. volatile -> volatility)",
        examples: [
          "The local market is volatile. -> Market volatility is a major impediment."
        ]
      },
      {
        ruleTitle: "Compressing Clauses into Noun Phrases",
        ruleDesc: "Summarizes actions into subject components for improved flow.",
        ruleStructure: "Because [clause] -> [Noun Phrase] + Verb",
        examples: [
          "The system failed because it was inefficient. -> Systemic inefficiency caused the collapse."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Nominalize: 'The scientist refuted the theory, which triggered a massive debate.'",
        choices: [
          "The refutation of the theory triggered a massive debate.",
          "The scientist's refuting of the theory triggered a debate.",
          "Because the scientist refuted, it triggered a massive debate."
        ],
        answer: 0,
        explanation: "Turning 'refuted' into the noun 'refutation' creates a highly professional, nominalized structure."
      },
      {
        question: "Nominalize: 'If we do not mitigate systemic risks, the economy will crash.'",
        choices: [
          "If we fail in mitigating systemic risks, the economy will crash.",
          "A lack of mitigation of systemic risks will cause an economic crash.",
          "We not mitigating systemic risks will cause the economy to crash."
        ],
        answer: 1,
        explanation: "Converting the verb 'mitigate' to the noun 'mitigation' removes the pronouns and makes the sentence objective."
      },
      {
        question: "Choose the most formally structured C1 sentence:",
        choices: [
          "Governments need to spend money to build schools because this makes the economy grow.",
          "Investment in educational infrastructure acts as a catalyst for economic growth.",
          "When governments build schools, it catalyzes how the economy grows."
        ],
        answer: 1,
        explanation: "Sentence 2 uses nominalization ('investment', 'growth') and the C1 vocabulary word 'catalyst' to achieve a high-level register."
      }
    ]
  },
  {
    id: 6,
    title: "Module 6: Growth, Decline, & Evolution",
    vocabTitle: "Evolution & Change Vocabulary",
    vocabulary: [
      { word: "Stagnate", type: "verb", def: "To cease to develop; become inactive or dull.", ex: "The old manufacturing division had begun to stagnate.", stress: "STAG-nate", coll: "stagnate economically, growth stagnates" },
      { word: "Burgeon", type: "verb", def: "To begin to grow, expand, or increase rapidly.", ex: "It had managed to burgeon into a massive multinational enterprise.", stress: "BUR-geon", coll: "burgeoning industry, burgeoning market" },
      { word: "Dwindle", type: "verb", def: "To diminish gradually in size, amount, or strength.", ex: "Croft warned him that their market share would dwindle to nothing.", stress: "DWIN-dle", coll: "dwindling resources, savings dwindled" },
      { word: "Transmute", type: "verb", def: "To change or alter in form, nature, or substance.", ex: "We must transmute our physical assets into digital ones.", stress: "trans-MUTE", coll: "transmute assets, transmute ideas into reality" },
      { word: "Volatile", type: "adjective", def: "Liable to change rapidly and unpredictably, especially for the worse.", ex: "The market had recently become highly volatile.", stress: "VOL-a-tile", coll: "volatile market, volatile situation" },
      { word: "Atrophy", type: "verb / noun", def: "To waste away or degenerate, typically due to underuse.", ex: "Without innovation, its core capabilities would atrophy.", stress: "A-tro-phy", coll: "skills atrophy, organizational atrophy" },
      { word: "Ascent", type: "noun", def: "A rise to a higher economic, social, or professional rank.", ex: "They needed a resilient strategy to ensure the company’s continued ascent.", stress: "a-SCENT", coll: "rapid ascent, ascent to power" },
      { word: "Fluctuate", type: "verb", def: "To rise and fall irregularly in number or amount.", ex: "Stock prices began to fluctuate wildly.", stress: "FLUC-tu-ate", coll: "prices fluctuate, fluctuate wildly" },
      { word: "Metamorphosis", type: "noun", def: "A complete change of physical form, character, or circumstances.", ex: "His business empire had undergone a complete metamorphosis.", stress: "me-ta-MOR-pho-sis", coll: "undergo a metamorphosis, complete metamorphosis" },
      { word: "Precipitous", type: "adjective", def: "Dangerously high or steep; sudden, dramatic, and unexpected.", ex: "If we do not adapt, we will face a precipitous drop in revenue.", stress: "pre-CIP-i-tous", coll: "precipitous decline, precipitous fall" },
      { word: "Proliferate", type: "verb", def: "To increase rapidly in numbers; to multiply.", ex: "Digital platforms were beginning to proliferate globally.", stress: "pro-LIF-e-rate", coll: "technologies proliferate, options proliferate" },
      { word: "Resilient", type: "adjective", def: "Able to withstand or recover quickly from difficult conditions.", ex: "They needed a resilient strategy to survive the collapse.", stress: "re-ZIL-i-ent", coll: "resilient economy, resilient structure" }
    ],
    story: "Mr. Harrison watched the glowing screens in the trading room. Over the last decade, his business empire had undergone a complete metamorphosis. Once a small local firm, it had managed to burgeon into a massive multinational enterprise. However, the market had recently become highly volatile, causing stock prices to fluctuate wildly.<br><br>Harrison's chief financial advisor, Mr. Croft, warned him that if they did not adapt immediately, their market share would dwindle to nothing. The old manufacturing division had begun to stagnate, and without innovation, its core capabilities would atrophy. They needed a resilient strategy to ensure the company’s continued ascent to the top of the sector.<br><br>\"We must transmute our physical assets into digital ones,\" Croft suggested. \"If we do not, we will face a precipitous drop in revenue.\"<br><br>Croft explained that digital platforms were beginning to proliferate globally. By adopting new technologies, they could prevent their profits from falling. Harrison agreed to the plan, resolving to pivot his company immediately to survive the economic downturn.",
    grammarTitle: "Advanced Passives & Causatives",
    grammarIntro: "Formulate objective reports using impersonal passive constructions, and master services/compulsion with causative verbs.",
    grammarRules: [
      {
        ruleTitle: "Impersonal Passives (Present)",
        ruleDesc: "Reports general beliefs about a current state without specifying the source.",
        ruleStructure: "Subject + is/are believed/thought + to + Verb",
        examples: [
          "The market is believed to be highly volatile.",
          "Startups are thought to drive innovation."
        ]
      },
      {
        ruleTitle: "Impersonal Passives (Past)",
        ruleDesc: "Reports beliefs about a past action using perfect infinitives.",
        ruleStructure: "Subject + is/are reported/said + to have + Past Participle",
        examples: [
          "The company is reported to have suffered a precipitous decline last year.",
          "The founder is said to have built the company in a garage."
        ]
      },
      {
        ruleTitle: "Causative Verbs (Get & Make)",
        ruleDesc: "Shows that a subject caused an action (Get = persuasion + to-infinitive; Make = compulsion + bare infinitive).",
        ruleStructure: "get + Obj + to-verb OR make + Obj + verb",
        examples: [
          "Croft got Harrison to approve the digital shift.",
          "The volatile market made Harrison restructure his firm."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Rewrite using impersonal passive: 'Historians think that the empire's ascent began in the 15th century.'",
        choices: [
          "The empire's ascent is thought to begin in the 15th century.",
          "The empire's ascent is thought to have begun in the 15th century.",
          "It is thought that the empire's ascent have begun in the 15th century."
        ],
        answer: 1,
        explanation: "Because the ascent began in the past, we must use 'to have begun' (perfect infinitive)."
      },
      {
        question: "Complete the sentence with the correct form: 'The consultant got the director ______ the company's assets.' (transmute)",
        choices: [
          "transmute",
          "to transmute",
          "transmuted"
        ],
        answer: 1,
        explanation: "The causative verb 'get' requires the 'to-infinitive' (to transmute)."
      },
      {
        question: "Identify the grammatically correct sentence:",
        choices: [
          "The volatile market made Harrison to restructure the firm.",
          "The volatile market made Harrison restructure the firm.",
          "The volatile market made Harrison transmuted the firm."
        ],
        answer: 1,
        explanation: "The causative verb 'make' requires a bare infinitive (restructure), not a 'to-infinitive'."
      }
    ]
  },
  {
    id: 7,
    title: "Module 7: Memory, Time, & Narrative Timelines",
    vocabTitle: "Time, Memory & Reflection Vocabulary",
    vocabulary: [
      { word: "Reminisce", type: "verb", def: "To indulge in enjoyable recollection of past events.", ex: "Vincent had warned him, but Thomas loved to reminisce about the past.", stress: "rem-i-NISCE", coll: "reminisce about the past, reminisce with friends" },
      { word: "Obsolete", type: "adjective", def: "No longer produced or used; out of date.", ex: "The watch was a vestige of an era before mechanical tools became obsolete.", stress: "ob-so-LETE", coll: "obsolete technology, render obsolete" },
      { word: "Transient", type: "adjective", def: "Lasting only for a short time; impermanent.", ex: "He knew that fame and wealth were transient concepts.", stress: "TRAN-sient", coll: "transient population, transient nature of life" },
      { word: "Vestige", type: "noun", def: "A trace or remaining sign of something disappearing or gone.", ex: "The watch was a vestige of a bygone era.", stress: "VES-tige", coll: "last vestiges, vestige of hope" },
      { word: "Anachronism", type: "noun", def: "A thing belonging to a period other than that in which it exists.", ex: "He smiled at this physical anachronism in the digital age.", stress: "a-NACH-ro-nism", coll: "historical anachronism, structural anachronism" },
      { word: "Nostalgia", type: "noun", def: "A sentimental longing or wistful affection for the past.", ex: "Thomas walked through the archives, filled with nostalgia.", stress: "no-STAL-gia", coll: "feel nostalgia, wave of nostalgia" },
      { word: "Evocative", type: "adjective", def: "Bringing strong images, memories, or feelings to mind.", ex: "The dusty journals contained evocative descriptions of the streets.", stress: "e-VOC-a-tive", coll: "evocative prose, highly evocative" },
      { word: "Predecessor", type: "noun", def: "A person who held a job or office before the current holder.", ex: "His predecessor, Vincent, had warned him of the loneliness.", stress: "PRE-de-ces-sor", coll: "immediate predecessor, distinguished predecessor" },
      { word: "Hindsight", type: "noun", def: "Understanding of a situation or event only after it has happened.", ex: "In hindsight, Thomas realized that the city had grown too quickly.", stress: "HIND-sight", coll: "in hindsight, benefit of hindsight" },
      { word: "Endure", type: "verb", def: "To remain in existence; to last or withstand trials.", ex: "He knew that historical truths would endure for centuries.", stress: "en-DURE", coll: "endure hardships, will endure for centuries" },
      { word: "Retrospective", type: "adjective / noun", def: "Looking back on or dealing with past events.", ex: "His research was a retrospective look at the city's architecture.", stress: "ret-ro-SPEC-tive", coll: "retrospective analysis, retrospective study" },
      { word: "Temporal", type: "adjective", def: "Relating to time, or to worldly (as opposed to spiritual) affairs.", ex: "He had spent his entire career studying temporal changes.", stress: "TEM-po-ral", coll: "temporal changes, temporal boundaries" }
    ],
    story: "Thomas walked through the university archives, his mind filled with a deep sense of nostalgia. He had spent his entire career studying the temporal changes of the city. His predecessor, Vincent, had warned him that historical research was a lonely pursuit, but Thomas loved to reminisce about the past.<br><br>Holding a rusted pocket watch, he smiled at this physical anachronism in the modern digital age. The watch was a vestige of a bygone era, long before mechanical tools became obsolete. He knew that fame and wealth were transient concepts, but historical truths would endure for centuries.<br><br>His research was a retrospective look at the city’s early architecture. The dusty journals contained evocative descriptions of the old streets. In hindsight, Thomas realized that the city had grown too quickly, destroying much of its own heritage.<br><br>Thomas decided to publish his findings. He knew his work was important, and he felt a deep duty to keep the memories of the past alive.",
    grammarTitle: "Advanced Narrative Timelines",
    grammarIntro: "Learn to show destiny/plans in the past using 'was to' and compress timeframes using perfect participles.",
    grammarRules: [
      {
        ruleTitle: "Future in the Past (Was/Were to)",
        ruleDesc: "Describes an event that actually occurred later in the timeline from a past perspective.",
        ruleStructure: "Subject + was/were + to + Verb",
        examples: [
          "Thomas spent years researching. He was to publish his book five years later.",
          "The small town was to become a booming metropolis."
        ]
      },
      {
        ruleTitle: "Active Perfect Participles",
        ruleDesc: "Shows that an active action was completely finished before the next one started.",
        ruleStructure: "Having + Past Participle + , [Main Clause]",
        examples: [
          "Having spent his life studying, Thomas knew the city's secrets.",
          "Having finished the report, he went to sleep."
        ]
      },
      {
        ruleTitle: "Passive Perfect Participles",
        ruleDesc: "Shows a passive action completed beforehand.",
        ruleStructure: "Having been + Past Participle + , [Main Clause]",
        examples: [
          "Having been warned by Vincent, Thomas worked carefully.",
          "Having been rendered obsolete, the machine was discarded."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Rewrite using 'was to': 'Vincent started working in 1980, and he eventually became the head of the department.'",
        choices: [
          "Vincent started working in 1980, and he was to become the head of the department.",
          "Vincent started working in 1980, and he had been to become the head of the department.",
          "Vincent started working in 1980, and he was going to become the head of the department."
        ],
        answer: 0,
        explanation: "'Was to become' indicates a scheduled/destined event that successfully occurred later."
      },
      {
        question: "Combine using a perfect participle: The system became obsolete first. Then, the company discarded it.",
        choices: [
          "Having become obsolete, the company discarded the system.",
          "Having become obsolete, the system was discarded by the company.",
          "Being become obsolete, the company discarded it."
        ],
        answer: 1,
        explanation: "The system became obsolete, so 'having become' must modify 'the system' directly after the comma to avoid a dangling participle."
      },
      {
        question: "Choose the correct sentence:",
        choices: [
          "Having being warned by his teacher, he revised his study plan.",
          "Having been warned by his teacher, he revised his study plan.",
          "Having warned by his teacher, he revised his study plan."
        ],
        answer: 1,
        explanation: "The passive perfect participle requires 'Having been + past participle'."
      }
    ]
  },
  {
    id: 8,
    title: "Module 8: Constraints & Qualifications",
    vocabTitle: "Limitations & Critique Vocabulary",
    vocabulary: [
      { word: "Caveat", type: "noun", def: "A warning or proviso of specific conditions or limitations.", ex: "It was not insurmountable, but it was a serious caveat they could not ignore.", stress: "CA-ve-at", coll: "important caveat, add a caveat" },
      { word: "Threshold", type: "noun", def: "The level, point, or limit at which a reaction begins to occur.", ex: "It is axiomatic that we cannot exceed our risk threshold.", stress: "THRESH-old", coll: "risk threshold, pain threshold" },
      { word: "Constraint", type: "noun", def: "A limitation or restriction that prevents freedom of action.", ex: "His colleague warned him that budget constraints would be a hurdle.", stress: "con-STRAINT", coll: "budget constraints, time constraints" },
      { word: "Parameter", type: "noun", def: "A measurable factor forming one of a set that defines conditions.", ex: "The viability of the venture depended on staying within strict parameters.", stress: "pa-RAM-e-ter", coll: "within the parameters, key parameters" },
      { word: "Discrepancy", type: "noun", def: "An illogical lack of compatibility between facts.", ex: "The committee pointed out a discrepancy in Charles's figures.", stress: "di-SCREP-an-cy", coll: "glaring discrepancy, discrepancy between" },
      { word: "Proviso", type: "noun", def: "A condition or qualification attached to an agreement.", ex: "They approved funding with the proviso that Charles limit costs.", stress: "pro-VI-so", coll: "with the proviso that, under the proviso" },
      { word: "Impervious", type: "adjective", def: "Unable to be affected, influenced, or penetrated.", ex: "Charles remained impervious to the skepticism of his critics.", stress: "im-PER-vi-ous", coll: "impervious to criticism, impervious to water" },
      { word: "Stipulate", type: "verb", def: "To demand or specify a requirement in an agreement.", ex: "The contract stipulations require us to monitor safety limits.", stress: "STIP-u-late", coll: "stipulate conditions, contract stipulates that" },
      { word: "Insurmountable", type: "adjective", def: "Too great to be overcome or resolved.", ex: "This was not an insurmountable problem, but it was serious.", stress: "in-sur-MOUN-ta-ble", coll: "insurmountable obstacle, insurmountable difficulties" },
      { word: "Axiomatic", type: "adjective", def: "Self-evident, unquestionable, or universally accepted as true.", ex: "It is axiomatic that safety must come first in our labs.", stress: "ax-i-o-MAT-ic", coll: "axiomatic truth, assume as axiomatic" },
      { word: "Fringe", type: "adjective / noun", def: "Unconventional, peripheral, or not part of the mainstream.", ex: "Some of his fringe theories were rejected by traditional engineers.", stress: "FRINGE", coll: "fringe theories, fringe benefit" },
      { word: "Viability", type: "noun", def: "Ability to work successfully; sustainability or feasibility.", ex: "The commercial viability of the venture was closely scrutinized.", stress: "vi-a-BIL-i-ty", coll: "commercial viability, long-term viability" }
    ],
    story: "Charles presented his project proposal to the investment committee. He knew that the long-term viability of the venture depended entirely on staying within strict financial parameters. His colleague, Julian, had already warned him that budget constraints would be a major hurdle.<br><br>During the presentation, the committee pointed out a significant discrepancy between Charles's figures and the current market reports. This was not an insurmountable problem, but it was a serious caveat that they could not ignore. The committee decided to approve the funding, but only with the strict proviso that Charles must stipulate exact cost limits for every phase of construction.<br><br>\"It is axiomatic that we cannot exceed the risk threshold,\" the chairman declared. Charles agreed, though he knew that some of his ideas, which were considered fringe concepts by traditional engineers, might be difficult to implement under these rules. However, Charles remained impervious to the skepticism of his critics, determined to prove that his unconventional methods would succeed.",
    grammarTitle: "Advanced Concession & Contrast",
    grammarIntro: "Add nuance to your arguments by using concessive linkers like 'albeit' and 'notwithstanding' to balance claims.",
    grammarRules: [
      {
        ruleTitle: "Albeit (Conjunction)",
        ruleDesc: "Means 'though' or 'even though'. Used to introduce a concessive adjective, adverb, or phrase (not a full clause).",
        ruleStructure: "[Main Clause] + , albeit + [Adjective/Noun Phrase]",
        examples: [
          "Charles accepted the new terms, albeit reluctantly.",
          "The project was a success, albeit an expensive one."
        ]
      },
      {
        ruleTitle: "Notwithstanding (Preposition/Adverb)",
        ruleDesc: "Means 'in spite of' or 'despite'. Can be placed before or after the noun phrase it modifies.",
        ruleStructure: "Notwithstanding + [Noun Phrase] OR [Noun Phrase] + notwithstanding",
        examples: [
          "Notwithstanding the budget constraints, they proceeded.",
          "The budget constraints notwithstanding, they proceeded."
        ]
      },
      {
        ruleTitle: "Much as / Try as (Concessive Inversion)",
        ruleDesc: "Advanced speech patterns to express strong contrast ('Much as' = even though I like; 'Try as' = no matter how hard).",
        ruleStructure: "Much as + Subj + Verb OR Try as + Subj + might",
        examples: [
          "Much as Charles respected the chairman, he disagreed.",
          "Try as Charles might, he could not cut costs further."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Rewrite using 'albeit': 'The project was successful, although it was very slow.'",
        choices: [
          "The project was successful, albeit slow.",
          "The project was successful, albeit it was slow.",
          "Albeit the project was successful, it was slow."
        ],
        answer: 0,
        explanation: "'Albeit' should directly modify the adjective 'slow' without a full subject-verb clause."
      },
      {
        question: "Place 'notwithstanding' after the noun phrase in: 'In spite of the discrepancies, they approved the budget.'",
        choices: [
          "Notwithstanding the discrepancies, they approved the budget.",
          "The discrepancies notwithstanding, they approved the budget.",
          "They approved the budget notwithstanding the discrepancies."
        ],
        answer: 1,
        explanation: "'The discrepancies notwithstanding' places the adverb post-positionally, which is highly formal and elegant."
      },
      {
        question: "Choose the correct sentence:",
        choices: [
          "Albeit the company had budget constraints, they hired more staff.",
          "Albeit with budget constraints, the company hired more staff.",
          "Although with budget constraints, the company hired more staff."
        ],
        answer: 1,
        explanation: "Sentence 2 correctly uses 'albeit' to qualify a prepositional phrase, avoiding a full subject-verb clause."
      }
    ]
  },
  {
    id: 9,
    title: "Module 9: Aesthetics, Art, & Nuanced Description",
    vocabTitle: "Aesthetics & Descriptive Vocabulary",
    vocabulary: [
      { word: "Austere", type: "adjective", def: "Extremely plain, simple, or severe in style or appearance.", ex: "The gallery’s walls were pristine, white, and felt almost austere.", stress: "au-STERE", coll: "austere design, austere beauty" },
      { word: "Sublime", type: "adjective", def: "Of such supreme excellence, grandeur, or beauty as to inspire awe.", ex: "Under the dim lights, the sculpture had a quality that looked sublime.", stress: "sub-LIME", coll: "sublime beauty, sublime experience" },
      { word: "Ornate", type: "adjective", def: "Intricately shaped or decorated with complex patterns.", ex: "His minimalist design was a direct contrast to the ornate building.", stress: "or-NATE", coll: "ornate architecture, ornate carvings" },
      { word: "Aesthetic", type: "adjective / noun", def: "Concerned with beauty or the appreciation of beauty.", ex: "Oliver warned that bright colors would ruin the gallery's aesthetic.", stress: "aes-THET-ic", coll: "aesthetic appeal, minimalist aesthetic" },
      { word: "Minimalist", type: "adjective / noun", def: "Spare, simple, and functional, focusing on essential elements.", ex: "As an architect, Nicholas believed in a strict minimalist philosophy.", stress: "MIN-i-mal-ist", coll: "minimalist decor, minimalist design" },
      { word: "Avant-garde", type: "adjective / noun", def: "Introducing experimental, unusual, or pioneering ideas.", ex: "His center installation was an avant-garde sculpture of light.", stress: "a-vant-GARDE", coll: "avant-garde art, avant-garde fashion" },
      { word: "Ethereal", type: "adjective", def: "Extremely delicate and light in a way that seems too perfect.", ex: "The glass installation had an ethereal quality under the spot lights.", stress: "e-THE-re-al", coll: "ethereal beauty, ethereal glow" },
      { word: "Gaudy", type: "adjective", def: "Extravagantly bright, showy, or decorated in a tasteless way.", ex: "Oliver's suggested decorations were dismissed as gaudy.", stress: "GAU-dy", coll: "gaudy colors, gaudy jewelry" },
      { word: "Pristine", type: "adjective", def: "In its original, clean condition; completely untouched.", ex: "The gallery's main hall was pristine before the art was hung.", stress: "PRIS-tine", coll: "pristine condition, pristine wilderness" },
      { word: "Visceral", type: "adjective", def: "Relating to deep inward feelings rather than the intellect.", ex: "The sculpture was designed to trigger a visceral reaction.", stress: "VIS-cer-al", coll: "visceral reaction, visceral fear" },
      { word: "Sensory", type: "adjective", def: "Relating to physical sensation or the physical senses.", ex: "He wanted to create a rich sensory experience for the visitors.", stress: "SEN-so-ry", coll: "sensory perception, sensory experience" },
      { word: "Juxtapose", type: "verb", def: "To place contrasting things close together for a striking effect.", ex: "He wanted to juxtapose the modern art with the ancient room.", stress: "jux-ta-POSE", coll: "juxtapose two images, juxtapose old and new" }
    ],
    story: "Nicholas entered the new gallery, preparing for his exhibition. As an architect, he believed in a strict minimalist philosophy, which was a direct contrast to the ornate style of the historic building. He wanted to juxtapose the two designs to create a striking visual impact.<br><br>The gallery’s main hall was pristine, with high white walls that felt almost austere. Nicholas’s partner, Oliver, suggested adding some colorful decorations, but Nicholas refused, warning that anything too bright would look gaudy and ruin the gallery's clean aesthetic. Instead, he focused on creating a deep sensory experience for the visitors.<br><br>His center installation was an avant-garde sculpture made of light and glass. Under the gallery's dim lights, the sculpture had an ethereal quality that looked almost sublime. It was designed to trigger a visceral reaction in the viewer, bypassing the intellect and speaking directly to the emotions.<br><br>Oliver looked at the completed room. He realized that Nicholas’s design was not cold, but deeply beautiful, proving that simplicity could be incredibly powerful.",
    grammarTitle: "Compound Adjectives & Locative Inversion",
    grammarIntro: "Structure descriptors using compound adjectives, and set narrative scenes using locative subject-verb inversion.",
    grammarRules: [
      {
        ruleTitle: "Compound Adjectives",
        ruleDesc: "Hyphenate compound modifiers before a noun, but not after. Never hyphenate compounds starting with '-ly' adverbs.",
        ruleStructure: "[Modifier]-[Noun/Participle] + Noun",
        examples: [
          "This is a custom-built installation in a highly acclaimed gallery.",
          "The gallery's installation is custom built."
        ]
      },
      {
        ruleTitle: "Locative Inversion",
        ruleDesc: "Swaps the subject and verb completely after a phrase of place to introduce scenery. Do not invert with pronouns.",
        ruleStructure: "[Prepositional Phrase of Place] + [Verb] + [Noun Subject]",
        examples: [
          "At the center of the gallery stood a beautiful marble sculpture.",
          "Above the pristine floor hung the avant-garde glass installation."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Correct the hyphenation error in: 'He designed an awe-inspiring-sculpture for the world famous gallery.'",
        choices: [
          "He designed an awe-inspiring sculpture for the world-famous gallery.",
          "He designed an awe inspiring sculpture for the world-famous gallery.",
          "He designed an awe-inspiring-sculpture for the world famous gallery."
        ],
        answer: 0,
        explanation: "Compound adjectives before a noun must be hyphenated ('awe-inspiring', 'world-famous'), but double hyphens joining three words are wrong unless it's a fixed multi-word modifier."
      },
      {
        question: "Rewrite using locative inversion: 'The avant-garde glass installation hung above the pristine floor.'",
        choices: [
          "Above the pristine floor hung it.",
          "Above the pristine floor did the avant-garde glass installation hang.",
          "Above the pristine floor hung the avant-garde glass installation."
        ],
        answer: 2,
        explanation: "Locative inversion swaps subject and verb completely without helper verbs (like did). Pronouns cannot be inverted."
      },
      {
        question: "Choose the correct sentence:",
        choices: [
          "On the table lay the keys.",
          "On the table layed the keys.",
          "On the table lies the keys."
        ],
        answer: 0,
        explanation: "The verb 'lay' agrees with the plural subject 'keys' (past tense of lie)."
      }
    ]
  },
  {
    id: 10,
    title: "Module 10: Scale, Intensity, & Rhetoric",
    vocabTitle: "Scale, Intensity & Persuasive Vocabulary",
    vocabulary: [
      { word: "Colossal", type: "adjective", def: "Extremely large; massive in scale.", ex: "Although their recent losses seemed colossal, the damage was minor.", stress: "co-LOS-sal", coll: "colossal scale, colossal waste" },
      { word: "Marginal", type: "adjective", def: "Minor, unimportant, or very small in quantity.", ex: "The actual damage to their long-term assets was marginal.", stress: "MAR-gi-nal", coll: "marginal difference, marginal cost" },
      { word: "Exponential", type: "adjective", def: "(Of an increase) becoming more and more rapid.", ex: "Now that we have stabilized, we must focus on exponential growth.", stress: "ex-po-NEN-tial", coll: "exponential growth, exponential increase" },
      { word: "Pinnacle", type: "noun", def: "The most successful point; culmination or peak.", ex: "We have reached the pinnacle of our challenges.", stress: "PIN-na-cle", coll: "pinnacle of success, reach the pinnacle" },
      { word: "Plummet", type: "verb", def: "To fall or drop straight down at high speed.", ex: "While stock values had begun to plummet, Matthew predicted a surge.", stress: "PLUM-met", coll: "prices plummet, profits plummet" },
      { word: "Surge", type: "noun / verb", def: "A sudden, powerful forward or upward movement.", ex: "Matthew predicted a sudden surge in demand would soon follow.", stress: "SURGE", coll: "sudden surge, surge in demand" },
      { word: "Diminutive", type: "adjective", def: "Extremely or unusually small.", ex: "Only a diminutive portion of their capital was affected.", stress: "di-MIN-u-tive", coll: "diminutive stature, diminutive size" },
      { word: "Unprecedented", type: "adjective", def: "Never done, known, or experienced before.", ex: "He knew that the market was experiencing an unprecedented crisis.", stress: "un-PRE-ce-den-ted", coll: "unprecedented growth, unprecedented levels" },
      { word: "Paramount", type: "adjective", def: "More important than anything else; supreme.", ex: "He argued that maintaining stability was of paramount importance.", stress: "PAR-a-mount", coll: "of paramount importance, paramount concern" },
      { word: "Trivial", type: "adjective", def: "Of little value, importance, or consequence.", ex: "He urged them to ignore trivial concerns and focus on reforms.", stress: "TRIV-i-al", coll: "trivial matter, trivial details" },
      { word: "Rhetoric", type: "noun", def: "The art of effective or persuasive speaking or writing.", ex: "He used his powerful rhetoric to restore their confidence.", stress: "RHET-o-ric", coll: "empty rhetoric, powerful rhetoric" },
      { word: "Inundate", type: "verb", def: "To overwhelm someone with things to be dealt with; flood.", ex: "Despite his office being inundated with calls, Matthew remained calm.", stress: "IN-un-date", coll: "inundated with calls, inundated with work" }
    ],
    story: "Matthew stood on the stage, preparing to deliver his speech to the city’s investors. He knew that the market was experiencing an unprecedented crisis, and his goal was to use his rhetoric to restore confidence. He explained that although their recent losses seemed colossal, the actual damage to their long-term assets was marginal. In fact, only a diminutive portion of their capital was affected. While stock values had begun to plummet last month, Matthew predicted a sudden surge in demand would soon follow.<br><br>\"We have reached the pinnacle of our challenges,\" Matthew declared. \"Now, we must focus on exponential growth.\" He urged them to ignore trivial concerns and focus on structural reforms. He argued that maintaining stability was of paramount importance. Despite the fact that his office was inundated with complaints, Matthew remained calm, confident that his plan would succeed.",
    grammarTitle: "Advanced Comparatives & Inverted Comparison",
    grammarIntro: "Apply high-level modifiers to comparisons, build double comparatives, and use inversion in comparisons.",
    grammarRules: [
      {
        ruleTitle: "Comparative Modifiers",
        ruleDesc: "Use advanced modifiers to express large or small differences precisely.",
        ruleStructure: "nowhere near as + [adjective] + as OR marginally + [comparative]",
        examples: [
          "The company's value is nowhere near as high as its previous peak.",
          "This year's profit was marginally higher than last year's."
        ]
      },
      {
        ruleTitle: "Double Comparatives",
        ruleDesc: "Shows proportional changes in two connected clauses.",
        ruleStructure: "The + [comparative] ..., the + [comparative] ...",
        examples: [
          "The more Matthew spoke, the more confident the investors became.",
          "The greater the crisis, the more paramount structural reform becomes."
        ]
      },
      {
        ruleTitle: "Inverted Comparison",
        ruleDesc: "Inverts subject and auxiliary verb after 'as' or 'than' in formal comparisons.",
        ruleStructure: "... than/as + [Auxiliary Verb] + [Subject]",
        examples: [
          "Matthew delivered a brilliant speech, as did his predecessor.",
          "The tech sector grew faster than did the manufacturing sector."
        ]
      }
    ],
    grammarQuiz: [
      {
        question: "Rewrite using a double comparative: 'If we invest more in rhetoric training, we will become more persuasive.'",
        choices: [
          "The more we invest in rhetoric training, the more persuasive we will become.",
          "If we invest more in rhetoric training, the more persuasive we will become.",
          "The more we invest in rhetoric training, we will become more persuasive."
        ],
        answer: 0,
        explanation: "Proportional change requires 'the + comparative' in both clauses."
      },
      {
        question: "Rewrite using inversion after 'than': 'The technology sector grew faster than the traditional manufacturing sector did.'",
        choices: [
          "The technology sector grew faster than did the traditional manufacturing sector.",
          "The technology sector grew faster than the traditional manufacturing sector did grow.",
          "The technology sector grew faster did than the traditional manufacturing sector."
        ],
        answer: 0,
        explanation: "Drop the final 'did' and place it right after 'than' before the subject."
      },
      {
        question: "Choose the correct sentence:",
        choices: [
          "He is nowhere near tall as his brother.",
          "He is nowhere near as tall as his brother.",
          "He is not near as tall as his brother."
        ],
        answer: 1,
        explanation: "The correct modifier phrase is 'nowhere near as... as...'"
      }
    ]
  }
];

// Export modules for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = c1Modules;
}
