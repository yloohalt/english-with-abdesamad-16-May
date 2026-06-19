// app.js
// Main client-side controller for the "English with Abdesamad" SPA.

// State management
const state = {
  currentView: 'home', // 'home', 'level', 'lesson'
  activeLevel: 'c1',
  activeModuleId: null,
  theme: 'default',
  isDarkMode: false,
  quizSelections: {}, // Maps question index to selected choice index
  grammarQuizSelections: {},
  vocabQuizSelections: {},
  activeVocabQuiz: null,
  storyAudio: null,
  storyAudioSpeed: 1,
  
  // YouGlish Integration State
  youglishSettings: {
    accent: localStorage.getItem('yg-accent') || 'us',
    repeatTarget: localStorage.getItem('yg-repeatTarget') || 'word',
    repeatCount: parseInt(localStorage.getItem('yg-repeatCount') || '3'),
    blurVideo: localStorage.getItem('yg-blurVideo') === 'true'
  },
  youglishWidget: null,
  youglishReady: false,
  youglishActive: false,
  youglishRepeatCounter: 0,
  youglishCaptionDuration: 4,
  youglishCaptionStartTime: 0,
  youglishWordTimeout: null,
  youglishCurrentWord: '',
  youglishTotalTracks: 0,
  youglishLastTrackNumber: -1,
  youglishPlaying: false
};

// DOM Elements
const bodyEl = document.body;
const themeSelectEl = document.getElementById('theme-select');
const themeToggleEl = document.getElementById('theme-toggle');
const views = {
  home: document.getElementById('home-view'),
  level: document.getElementById('level-view'),
  lesson: document.getElementById('lesson-view')
};

// --- 1. INITIALIZATION & ROUTING ---

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  initScrollObserver();
  
  // Render C1 Modules Grid immediately
  renderModulesGrid();
  
  // Check URL hash on load
  handleHashChange();
});

// Watch URL hash changes for native back/forward button support
window.addEventListener('hashchange', handleHashChange);

function handleHashChange() {
  const hash = window.location.hash || '#home';
  
  if (hash === '#home') {
    switchView('home');
  } else if (hash === '#level-c1') {
    switchView('level');
  } else if (hash.startsWith('#lesson-')) {
    const moduleId = parseInt(hash.split('-')[1]);
    if (moduleId && c1Modules.some(m => m.id === moduleId)) {
      state.activeModuleId = moduleId;
      renderLessonView(moduleId);
      switchView('lesson');
    } else {
      window.location.hash = '#home';
    }
  } else {
    window.location.hash = '#home';
  }
}

function navigateTo(target) {
  if (target === 'home') {
    window.location.hash = '#home';
  } else if (target === 'level') {
    window.location.hash = `#level-${state.activeLevel}`;
  } else if (target.startsWith('lesson-')) {
    window.location.hash = `#${target}`;
  }
}

function switchView(viewName) {
  // Pause and reset story audio when navigating away
  resetStoryAudio();
  
  // Close word modal (and pause YouGlish)
  closeWordModal();
  
  // Hide all views
  Object.keys(views).forEach(key => {
    views[key].classList.remove('active');
  });
  
  // Show target view
  state.currentView = viewName;
  views[viewName].classList.add('active');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 2. THEME CONTROLLER ---

function initTheme() {
  // Load saved theme configuration
  const savedTheme = localStorage.getItem('theme') || 'default';
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  
  state.theme = savedTheme;
  state.isDarkMode = savedDarkMode;
  
  themeSelectEl.value = savedTheme;
  applyTheme(savedTheme, savedDarkMode);
}

function applyTheme(theme, isDark) {
  // Reset custom attributes
  bodyEl.removeAttribute('data-theme');
  bodyEl.classList.remove('dark-mode');
  
  // Apply theme class/attribute
  if (theme !== 'default') {
    bodyEl.setAttribute('data-theme', theme);
  }
  
  // Apply dark mode (some themes are dark-only by default)
  if (isDark || theme === 'purple') {
    bodyEl.classList.add('dark-mode');
  }
  
  // Sync toggle button icon
  themeToggleEl.textContent = bodyEl.classList.contains('dark-mode') ? '☀️' : '🌓';
}

function setupEventListeners() {
  // Theme Toggle Button
  themeToggleEl.addEventListener('click', () => {
    state.isDarkMode = !bodyEl.classList.contains('dark-mode');
    applyTheme(state.theme, state.isDarkMode);
    localStorage.setItem('darkMode', state.isDarkMode);
  });
  
  // Theme Dropdown Selector
  themeSelectEl.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    state.theme = selectedTheme;
    
    // Automatically turn on dark mode style for the deep purple theme
    if (selectedTheme === 'purple') {
      state.isDarkMode = true;
    } else if (selectedTheme === 'default') {
      state.isDarkMode = false;
    }
    
    applyTheme(selectedTheme, state.isDarkMode);
    localStorage.setItem('theme', selectedTheme);
    localStorage.setItem('darkMode', state.isDarkMode);
  });

  // Active C1 Card click listener
  const c1Card = document.querySelector('[data-level="c1"]');
  if (c1Card) {
    c1Card.addEventListener('click', () => {
      navigateTo('level');
    });
  }
}

// --- 3. SCROLL ANIMATION OBSERVER ---

function initScrollObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);
  
  // Select all animation-enabled cards and heroes
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// --- 4. DATA RENDERING (C1 MODULES) ---

function renderModulesGrid() {
  const modulesGrid = document.getElementById('modules-grid');
  if (!modulesGrid) return;
  
  modulesGrid.innerHTML = '';
  
  c1Modules.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
      <span class="module-number">Module ${mod.id}</span>
      <h3>${mod.title.split(': ')[1]}</h3>
      <p>${mod.grammarIntro}</p>
    `;
    
    card.addEventListener('click', () => {
      navigateTo(`lesson-${mod.id}`);
    });
    
    modulesGrid.appendChild(card);
  });
}

function renderLessonView(moduleId) {
  const module = c1Modules.find(m => m.id === moduleId);
  if (!module) return;
  
  // Update Title Info
  document.getElementById('lesson-module-title').textContent = module.title;
  document.getElementById('lesson-module-subtitle').textContent = `C1 Advanced Level • ${module.vocabTitle}`;
  
  // Generate active vocabulary quiz once
  state.activeVocabQuiz = generateVocabQuiz(module);
  
  // Clear Selection State
  state.quizSelections = {};
  
  // Render panels
  renderVocabTab(module);
  renderStoryTab(module);
  renderGrammarTab(module);
  renderQuizTab(module);
  
  // Default to Vocabulary Tab
  switchLessonTab('vocab');
}

// --- 5. LESSON VIEW TAB PANELS ---

function switchLessonTab(tabId) {
  // Pause and reset story audio if switching to a non-story tab
  if (tabId !== 'story') {
    resetStoryAudio();
  }
  
  // Update Active Tab Button
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(tabId)) {
      btn.classList.add('active');
    }
  });
  
  // Update Active Tab Content Panel
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(panel => {
    panel.classList.remove('active');
  });
  document.getElementById(`${tabId}-panel`).classList.add('active');
}

function renderVocabTab(module) {
  const container = document.getElementById('vocab-list-container');
  container.innerHTML = '';

  module.vocabulary.forEach(v => {
    // Build individual collocation hover items
    // arabicColl format: "eng colloc = arabic, eng colloc = arabic, ..."
    let collHTML = '';
    if (v.arabicColl) {
      const pairs = v.arabicColl.split(',').map(p => p.trim());
      const engColls = (v.coll || '').split(',').map(p => p.trim());
      collHTML = pairs.map((pair, i) => {
        const eqIdx = pair.indexOf('=');
        const engPart = eqIdx > -1 ? pair.substring(0, eqIdx).trim() : (engColls[i] || pair);
        const arPart  = eqIdx > -1 ? pair.substring(eqIdx + 1).trim() : '';
        if (arPart) {
          return `<span class="ar-hover">${engPart}<span class="ar-tip">${arPart}</span></span>`;
        }
        return `<span>${engPart}</span>`;
      }).join('<span style="color:var(--text-secondary)"> &nbsp;·&nbsp; </span>');
    } else {
      collHTML = v.coll || '';
    }

    const item = document.createElement('div');
    item.className = 'vocab-item';
    item.innerHTML = `
      <div class="vocab-word-header">
        <span class="vocab-word ar-hover">${v.word}<span class="ar-tip">${v.arabic || ''}</span></span>
        <span class="vocab-type">[${v.type}]</span>
        <span class="vocab-pronounce">${v.stress} &nbsp;<span style="font-family:monospace;color:var(--accent-color);font-weight:600;">${v.ipa || ''}</span></span>
      </div>
      <div class="vocab-def">
        <span class="ar-hover">${v.def}<span class="ar-tip">${v.arabicDef || ''}</span></span>
      </div>
      <div class="vocab-details">
        <div><strong>Example:</strong> <em class="ar-hover">"${v.ex}"<span class="ar-tip">${v.arabicEx || ''}</span></em></div>
        <div><strong>Collocations:</strong> ${collHTML}</div>
        ${v.syn ? `<div><strong>Synonyms:</strong> ${v.syn}</div>` : ''}
        ${v.ant ? `<div><strong>Antonyms:</strong> ${v.ant}</div>` : ''}
      </div>
    `;
    container.appendChild(item);
  });

  // Render practice quiz below vocab list
  renderVocabQuizSection(module);
}


function renderStoryTab(module) {
  const container = document.getElementById('story-container');
  
  // Pause and reset any currently playing story audio
  resetStoryAudio();
  
  // Wrap each sentence in a span with timestamp data
  let processedHTML = highlightStorySentences(module.story, module.storyTimestamps);
  
  // Wrap keywords inside those sentences
  processedHTML = highlightStoryKeywords(processedHTML, module.vocabulary);
  
  // Generate the player HTML if the module has audio metadata
  let playerBarHTML = '';
  if (module.audioPath) {
    playerBarHTML = `
      <div class="story-player-bar">
        <button class="story-player-btn" id="story-play-btn" onclick="toggleStoryAudio('${module.audioPath}')">▶</button>
        <div class="story-progress-container" id="story-progress-container" onclick="seekStoryAudio(event)">
          <div class="story-progress-bar" id="story-progress-bar"></div>
        </div>
        <div class="story-time-display" id="story-time-display">0:00 / 0:00</div>
        <select class="story-speed-select" id="story-speed-select" onchange="setStoryAudioSpeed(this.value)">
          <option value="1">1.0x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="0.85">0.85x</option>
        </select>
      </div>
    `;
  }
  
  container.innerHTML = playerBarHTML + `<div class="story-text-container">${processedHTML}</div>`;
}

function renderGrammarTab(module) {
  const container = document.getElementById('grammar-container');
  container.innerHTML = '';
  
  state.currentGrammarSlide = 0;
  state.grammarQuizSelections = {};
  
  const rules = module.grammarRules;
  if (!rules || rules.length === 0) {
    container.innerHTML = '<p>No grammar rules available for this module.</p>';
    return;
  }
  
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'grammar-carousel-container';
  
  const viewport = document.createElement('div');
  viewport.className = 'grammar-carousel-viewport';
  
  const track = document.createElement('div');
  track.className = 'grammar-carousel-track';
  track.id = 'grammar-carousel-track';
  
  rules.forEach((rule, slideIndex) => {
    const slide = document.createElement('div');
    slide.className = 'grammar-carousel-slide';
    
    const hasQuiz = !!rule.tinyQuiz;
    
    let examplesHTML = '';
    rule.examples.forEach(ex => {
      examplesHTML += `<li>${ex}</li>`;
    });
    
    let leftColumnHTML = `
      <div class="grammar-slide-info">
        <h3>${rule.ruleTitle}</h3>
        <p>${rule.ruleDesc}</p>
        <div class="grammar-box">${rule.ruleStructure}</div>
        <h4 style="margin-bottom: 0.3rem;">Examples:</h4>
        <ul>${examplesHTML}</ul>
      </div>
    `;
    
    let rightColumnHTML = '';
    if (hasQuiz) {
      const q = rule.tinyQuiz;
      let choicesHTML = '';
      q.choices.forEach((choice, oIndex) => {
        choicesHTML += `
          <div class="quiz-option" id="grammar-option-${slideIndex}-${oIndex}" onclick="selectGrammarSlideOption(${slideIndex}, ${oIndex})">
            <span class="option-marker">${String.fromCharCode(65 + oIndex)}</span>
            <span class="option-text">${choice}</span>
          </div>
        `;
      });
      
      rightColumnHTML = `
        <div class="grammar-slide-quiz">
          <h4>✍️ Mini Checkpoint</h4>
          <div class="quiz-question">${q.question}</div>
          <div class="quiz-options">${choicesHTML}</div>
          <div class="quiz-feedback" id="grammar-feedback-${slideIndex}"></div>
        </div>
      `;
    } else {
      rightColumnHTML = `
        <div class="grammar-slide-quiz" style="display: flex; align-items: center; justify-content: center; height: 100%; border-style: dashed; padding: 2rem;">
          <p style="color: var(--text-secondary); text-align: center; font-size: 0.95rem;">Interactive mini checkpoint coming soon for this slide.</p>
        </div>
      `;
    }
    
    slide.innerHTML = leftColumnHTML + rightColumnHTML;
    track.appendChild(slide);
  });
  
  viewport.appendChild(track);
  carouselContainer.appendChild(viewport);
  
  // Carousel Navigation Controls
  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-arrow-btn';
  prevBtn.innerHTML = '◀';
  prevBtn.onclick = prevGrammarSlide;
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-arrow-btn';
  nextBtn.innerHTML = '▶';
  nextBtn.onclick = nextGrammarSlide;
  
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  dotsContainer.id = 'grammar-carousel-dots';
  
  rules.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => showGrammarSlide(index);
    dotsContainer.appendChild(dot);
  });
  
  controls.appendChild(prevBtn);
  controls.appendChild(dotsContainer);
  controls.appendChild(nextBtn);
  
  carouselContainer.appendChild(controls);
  container.appendChild(carouselContainer);
}

// Carousel Action Functions
function showGrammarSlide(index) {
  const track = document.getElementById('grammar-carousel-track');
  const dotsContainer = document.getElementById('grammar-carousel-dots');
  if (!track) return;
  
  const slidesCount = track.children.length;
  
  if (index < 0) index = 0;
  if (index >= slidesCount) index = slidesCount - 1;
  
  state.currentGrammarSlide = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  
  if (dotsContainer) {
    Array.from(dotsContainer.children).forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

function prevGrammarSlide() {
  showGrammarSlide(state.currentGrammarSlide - 1);
}

function nextGrammarSlide() {
  showGrammarSlide(state.currentGrammarSlide + 1);
}

// Keyboards arrow listener
window.addEventListener('keydown', (e) => {
  const lessonView = document.getElementById('lesson-view');
  const grammarPanel = document.getElementById('grammar-panel');
  if (lessonView && grammarPanel && lessonView.classList.contains('active') && grammarPanel.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      prevGrammarSlide();
    } else if (e.key === 'ArrowRight') {
      nextGrammarSlide();
    }
  }
});

// Interactive slide quiz selection
// Interactive slide quiz selection (instantly graded)
function selectGrammarSlideOption(slideIndex, optionIndex) {
  // If already answered, ignore subsequent clicks
  if (state.grammarQuizSelections[slideIndex] !== undefined) return;
  
  state.grammarQuizSelections[slideIndex] = optionIndex;
  
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  if (!module) return;
  
  const rule = module.grammarRules[slideIndex];
  if (!rule || !rule.tinyQuiz) return;
  
  const q = rule.tinyQuiz;
  const isCorrect = (optionIndex === q.answer);
  
  const track = document.getElementById('grammar-carousel-track');
  const slide = track.children[slideIndex];
  
  // Disable future hover/clicks by adding 'answered' class to container
  const optionsContainer = slide.querySelector('.quiz-options');
  if (optionsContainer) {
    optionsContainer.classList.add('answered');
  }
  
  // Remove selection styling from siblings just in case
  slide.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  // Highlight chosen option
  const chosen = document.getElementById(`grammar-option-${slideIndex}-${optionIndex}`);
  if (chosen) {
    if (isCorrect) {
      chosen.classList.add('correct');
    } else {
      chosen.classList.add('incorrect');
      // Highlight correct option as well
      const correctOpt = document.getElementById(`grammar-option-${slideIndex}-${q.answer}`);
      if (correctOpt) {
        correctOpt.classList.add('correct');
      }
    }
  }
  
  // Display feedback instantly
  const feedbackEl = document.getElementById(`grammar-feedback-${slideIndex}`);
  if (feedbackEl) {
    if (isCorrect) {
      feedbackEl.className = 'quiz-feedback correct';
      feedbackEl.innerHTML = `<strong>✨ Correct!</strong> ${q.explanation}`;
    } else {
      feedbackEl.className = 'quiz-feedback incorrect';
      feedbackEl.innerHTML = `<strong>❌ Incorrect.</strong> Correct Answer: ${q.choices[q.answer]}<br><br>${q.explanation}`;
    }
  }
}

// --- Vocabulary Practice Quiz System ---

function generateVocabQuiz(module) {
  const allWords = module.vocabulary.map(item => item.word);
  return module.vocabulary.map((v, index) => {
    // Replace the exact word in the example sentence with blank lines, case-insensitively
    const questionText = v.ex.replace(new RegExp(`\\b${v.word}\\b`, 'gi'), '_______');
    const otherWords = allWords.filter(w => w.toLowerCase() !== v.word.toLowerCase());
    
    // Pick 3 random distractors
    const distractors = [];
    const tempWords = [...otherWords];
    for (let i = 0; i < 3 && tempWords.length > 0; i++) {
      const randIndex = Math.floor(Math.random() * tempWords.length);
      distractors.push(tempWords.splice(randIndex, 1)[0]);
    }
    
    const choices = [v.word, ...distractors];
    // Shuffle choices
    const shuffled = [];
    while (choices.length > 0) {
      const randIndex = Math.floor(Math.random() * choices.length);
      shuffled.push(choices.splice(randIndex, 1)[0]);
    }
    
    return {
      word: v.word,
      definition: v.def,
      question: questionText,
      choices: shuffled,
      answer: shuffled.indexOf(v.word)
    };
  });
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderVocabQuizSection(module) {
  const quizContainer = document.getElementById('vocab-quiz-container');
  if (!quizContainer) return;
  
  quizContainer.innerHTML = '';
  
  // Check if this module has custom vocabQuizData
  if (module.vocabQuizData) {
    if (!state.customQuizState || state.customQuizActiveModuleId !== module.id) {
      state.customQuizActiveModuleId = module.id;
      state.activeCustomQuizPart = 1;
      state.selectedPill = null;
      state.customQuizState = {
        part1: {},
        part2: {},
        part3: {},
        part4: {},
        part5: {},
        part6: {},
        part7: [
          { word: "", text: "" },
          { word: "", text: "" },
          { word: "", text: "" },
          { word: "", text: "" },
          { word: "", text: "" }
        ],
        graded: false,
        scores: { part1: 0, part2: 0, part3: 0, part4: 0, part5: 0, part6: 0, part7: 0 }
      };
      
      // Shuffle definitions and collocations for the matching pools
      state.customQuizPills = {
        part2: shuffleArray(module.vocabQuizData.part2.map(item => item.meaning)),
        part3: shuffleArray(module.vocabQuizData.part3.map(item => item.collocation))
      };
    }
    
    renderCustomQuiz(module);
    return;
  }
  
  // Otherwise render the dynamic one
  state.vocabQuizSelections = {};
  const quizData = state.activeVocabQuiz;
  if (!quizData) return;
  
  quizData.forEach((q, qIndex) => {
    const qCard = document.createElement('div');
    qCard.className = 'quiz-question-card';
    qCard.id = `vocab-quiz-card-${qIndex}`;
    
    let choicesHTML = '';
    q.choices.forEach((choice, oIndex) => {
      choicesHTML += `
        <div class="quiz-option" id="vocab-option-${qIndex}-${oIndex}" onclick="selectVocabQuizOption(${qIndex}, ${oIndex})">
          <span class="option-marker">${String.fromCharCode(65 + oIndex)}</span>
          <span class="option-text">${choice}</span>
        </div>
      `;
    });
    
    qCard.innerHTML = `
      <div class="quiz-question">${qIndex + 1}. Complete the sentence:<br><br><em>"${q.question}"</em></div>
      <div class="quiz-options" id="vocab-options-container-${qIndex}">${choicesHTML}</div>
      <div class="quiz-feedback" id="vocab-feedback-${qIndex}"></div>
    `;
    
    quizContainer.appendChild(qCard);
  });
}

function selectVocabQuizOption(qIndex, oIndex) {
  if (state.vocabQuizSelections[qIndex] !== undefined) return;
  state.vocabQuizSelections[qIndex] = oIndex;
  
  const quizData = state.activeVocabQuiz;
  if (!quizData) return;
  
  const q = quizData[qIndex];
  const isCorrect = (oIndex === q.answer);
  
  const optionsContainer = document.getElementById(`vocab-options-container-${qIndex}`);
  if (optionsContainer) {
    optionsContainer.classList.add('answered');
  }
  
  const chosen = document.getElementById(`vocab-option-${qIndex}-${oIndex}`);
  if (chosen) {
    if (isCorrect) {
      chosen.classList.add('correct');
    } else {
      chosen.classList.add('incorrect');
      const correctOpt = document.getElementById(`vocab-option-${qIndex}-${q.answer}`);
      if (correctOpt) {
        correctOpt.classList.add('correct');
      }
    }
  }
  
  const feedbackEl = document.getElementById(`vocab-feedback-${qIndex}`);
  if (feedbackEl) {
    if (isCorrect) {
      feedbackEl.className = 'quiz-feedback correct';
      feedbackEl.innerHTML = `<strong>✨ Correct!</strong> "${q.word}" is correct.<br><br><strong>Definition:</strong> ${q.definition}`;
    } else {
      feedbackEl.className = 'quiz-feedback incorrect';
      feedbackEl.innerHTML = `<strong>❌ Incorrect.</strong> The correct answer is "${q.choices[q.answer]}".<br><br><strong>Definition:</strong> ${q.definition}`;
    }
  }
}

// --- Custom Stepper Quiz Controller & Logic ---

function renderCustomQuiz(module) {
  const quizContainer = document.getElementById('vocab-quiz-container');
  if (!quizContainer) return;
  
  const totalParts = 7;
  const currentPart = state.activeCustomQuizPart;
  const quizState = state.customQuizState;
  const isGraded = quizState.graded;
  
  // Calculate progress percent
  let progressPercent = 0;
  if (currentPart === 'results') {
    progressPercent = 100;
  } else {
    progressPercent = Math.round(((currentPart - 1) / totalParts) * 100);
    if (progressPercent === 0) progressPercent = 5;
  }
  
  // Build Tabs HTML
  let tabsHTML = '';
  for (let i = 1; i <= totalParts; i++) {
    const activeClass = (currentPart === i) ? 'active' : '';
    const completedClass = (isGraded || Object.keys(quizState[`part${i}`]).length > 0) ? 'completed' : '';
    tabsHTML += `
      <button class="part-tab-btn ${activeClass} ${completedClass}" onclick="goToQuizPart(${i})">
        Part ${i}
      </button>
    `;
  }
  if (isGraded) {
    const activeClass = (currentPart === 'results') ? 'active' : '';
    tabsHTML += `
      <button class="part-tab-btn ${activeClass} completed" id="results-tab-btn" onclick="goToQuizPart('results')">
        Results
      </button>
    `;
  }
  
  // Main layout wrapper
  quizContainer.innerHTML = `
    <div class="vocab-quiz-wizard">
      <div class="quiz-wizard-header">
        <div class="quiz-part-tabs">${tabsHTML}</div>
        <div class="quiz-progress-bar-container">
          <div class="quiz-progress-bar" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
      
      <div class="quiz-panels-container" id="quiz-panels-container">
        <!-- Rendered dynamically -->
      </div>
      
      <div class="quiz-wizard-footer">
        <button class="quiz-nav-btn prev-btn" id="quiz-prev-btn" onclick="prevQuizPart()">Previous Part</button>
        <button class="quiz-nav-btn next-btn" id="quiz-next-btn" onclick="nextQuizPart()">Next Part</button>
        <button class="quiz-nav-btn submit-all-btn" id="quiz-submit-btn" onclick="gradeEntireQuiz()" style="display: none;">Submit Quiz & Grade</button>
      </div>
    </div>
  `;
  
  renderActiveQuizPanel(module);
  updateQuizNavButtons();
}

function updateQuizNavButtons() {
  const currentPart = state.activeCustomQuizPart;
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const submitBtn = document.getElementById('quiz-submit-btn');
  const isGraded = state.customQuizState.graded;
  
  if (!prevBtn || !nextBtn || !submitBtn) return;
  
  if (currentPart === 'results') {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    return;
  }
  
  prevBtn.style.display = 'block';
  prevBtn.disabled = (currentPart === 1);
  
  if (currentPart === 7) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    if (isGraded) {
      submitBtn.textContent = 'View Results';
      submitBtn.onclick = () => goToQuizPart('results');
    } else {
      submitBtn.textContent = 'Submit Quiz & Grade';
      submitBtn.onclick = () => gradeEntireQuiz();
    }
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
    nextBtn.onclick = () => nextQuizPart();
  }
}

function goToQuizPart(partNum) {
  state.activeCustomQuizPart = partNum;
  state.selectedPill = null; // reset click matching state
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  renderCustomQuiz(module);
}

function prevQuizPart() {
  const currentPart = state.activeCustomQuizPart;
  if (currentPart === 'results') {
    goToQuizPart(7);
  } else if (currentPart > 1) {
    goToQuizPart(currentPart - 1);
  }
}

function nextQuizPart() {
  const currentPart = state.activeCustomQuizPart;
  if (currentPart < 7) {
    goToQuizPart(currentPart + 1);
  }
}

function renderActiveQuizPanel(module) {
  const panelContainer = document.getElementById('quiz-panels-container');
  if (!panelContainer) return;
  
  panelContainer.innerHTML = '';
  const currentPart = state.activeCustomQuizPart;
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  
  const panelDiv = document.createElement('div');
  panelDiv.className = 'quiz-panel active';
  
  if (currentPart === 1) {
    panelDiv.innerHTML = `
      <div class="quiz-part-title">Part 1: Choose the Best Word</div>
      <div class="quiz-part-desc">Choose the option that best completes the sentence. (Questions 1–12)</div>
      <div class="quiz-container" id="part1-questions-container"></div>
    `;
    panelContainer.appendChild(panelDiv);
    
    const container = document.getElementById('part1-questions-container');
    quizData.part1.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';
      
      const ansData = quizState.part1[qIndex];
      const isAnswered = ansData !== undefined;
      
      if (isAnswered) {
        card.classList.add(ansData.isCorrect ? 'correct' : 'incorrect');
      }
      
      let choicesHTML = '';
      q.choices.forEach((choice, oIndex) => {
        let optClass = '';
        if (isAnswered) {
          if (oIndex === q.answer) {
            optClass = 'correct';
          } else if (ansData.selected === oIndex) {
            optClass = 'incorrect';
          }
        }
        
        choicesHTML += `
          <div class="quiz-option ${optClass} ${isAnswered ? 'disabled' : ''}" onclick="selectCustomPart1Option(${qIndex}, ${oIndex})">
            <span class="option-marker">${String.fromCharCode(65 + oIndex)}</span>
            <span class="option-text">${choice}</span>
          </div>
        `;
      });
      
      let feedbackHTML = '';
      if (isAnswered) {
        feedbackHTML = ansData.isCorrect 
          ? `<div class="quiz-feedback correct"><strong>✨ Correct!</strong> "${q.choices[q.answer]}" is correct.</div>`
          : `<div class="quiz-feedback incorrect"><strong>❌ Incorrect.</strong> The correct answer is "${q.choices[q.answer]}".</div>`;
      }
      
      card.innerHTML = `
        <div class="quiz-question">${q.qNumber}. ${q.question}</div>
        <div class="quiz-options ${isAnswered ? 'answered' : ''}">${choicesHTML}</div>
        ${feedbackHTML}
      `;
      container.appendChild(card);
    });
    
  } else if (currentPart === 2) {
    panelDiv.innerHTML = `
      <div class="quiz-part-title">Part 2: Match the Word to Its Meaning</div>
      <div class="quiz-part-desc">Drag each word card onto its correct definition drop zone. (Questions 13–24)</div>
      <div id="part2-board-container"></div>
    `;
    panelContainer.appendChild(panelDiv);
    renderPart2Board(module);
    
  } else if (currentPart === 3) {
    panelDiv.innerHTML = `
      <div class="quiz-part-title">Part 3: Collocation Matching</div>
      <div class="quiz-part-desc">Drag each word card onto its correct collocation. (Questions 25–34)</div>
      <div id="part3-board-container"></div>
    `;
    panelContainer.appendChild(panelDiv);
    renderPart3Board(module);
    
  } else if (currentPart === 4) {
    panelDiv.innerHTML = `
      <div class="quiz-part-title">Part 4: Synonyms and Antonyms in Context</div>
      <div class="quiz-part-desc">Choose the closest synonym or antonym for the vocabulary word in the context of the sentence. (Questions 35–42)</div>
      <div class="quiz-container" id="part4-questions-container"></div>
    `;
    panelContainer.appendChild(panelDiv);
    
    const container = document.getElementById('part4-questions-container');
    quizData.part4.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';
      
      const ansData = quizState.part4[qIndex];
      const isAnswered = ansData !== undefined;
      
      if (isAnswered) {
        card.classList.add(ansData.isCorrect ? 'correct' : 'incorrect');
      }
      
      let choicesHTML = '';
      q.choices.forEach((choice, oIndex) => {
        let optClass = '';
        if (isAnswered) {
          if (oIndex === q.answer) {
            optClass = 'correct';
          } else if (ansData.selected === oIndex) {
            optClass = 'incorrect';
          }
        }
        
        choicesHTML += `
          <div class="quiz-option ${optClass} ${isAnswered ? 'disabled' : ''}" onclick="selectCustomPart4Option(${qIndex}, ${oIndex})">
            <span class="option-marker">${String.fromCharCode(65 + oIndex)}</span>
            <span class="option-text">${choice}</span>
          </div>
        `;
      });
      
      let feedbackHTML = '';
      if (isAnswered) {
        feedbackHTML = ansData.isCorrect 
          ? `<div class="quiz-feedback correct"><strong>✨ Correct!</strong> "${q.choices[q.answer]}" is correct.</div>`
          : `<div class="quiz-feedback incorrect"><strong>❌ Incorrect.</strong> The correct answer is "${q.choices[q.answer]}".</div>`;
      }
      
      card.innerHTML = `
        <div class="quiz-question">${q.qNumber}. ${q.question}</div>
        <div class="quiz-options ${isAnswered ? 'answered' : ''}">${choicesHTML}</div>
        ${feedbackHTML}
      `;
      container.appendChild(card);
    });
    
  } else if (currentPart === 5) {
    panelDiv.innerHTML = `
      <div class="quiz-part-title">Part 5: Correct the Mistake</div>
      <div class="quiz-part-desc">Rewrite the sentence correctly. Be careful with prepositions and word forms. (Questions 43–50)</div>
      <div class="quiz-container" id="part5-questions-container"></div>
    `;
    panelContainer.appendChild(panelDiv);
    
    const container = document.getElementById('part5-questions-container');
    quizData.part5.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'input-quiz-card';
      
      const ansData = quizState.part5[qIndex];
      const isAnswered = ansData && ansData.checked;
      const userVal = isAnswered ? ansData.text : (ansData || '');
      
      let feedbackHTML = '';
      let inputHTML = '';
      
      if (isAnswered) {
        card.classList.add(ansData.isCorrect ? 'correct' : 'incorrect');
        feedbackHTML = ansData.isCorrect 
          ? `<div class="input-feedback correct">✨ Correct!</div>`
          : `<div class="input-feedback incorrect">❌ Incorrect.<br><strong>Correct Answer:</strong> ${q.answer}</div>`;
        
        inputHTML = `
          <input type="text" class="input-quiz-field" value="${userVal.replace(/"/g, '&quot;')}" disabled>
        `;
      } else {
        inputHTML = `
          <div style="display: flex; gap: 0.8rem; align-items: center; width: 100%;">
            <input type="text" class="input-quiz-field" id="p5-input-${qIndex}" placeholder="Type correct sentence..." value="${userVal.replace(/"/g, '&quot;')}">
            <button class="quiz-nav-btn check-btn" style="margin: 0; padding: 0.75rem 1.2rem; flex-shrink: 0;" onclick="checkPart5Answer(${qIndex})">Check</button>
          </div>
        `;
      }
      
      card.innerHTML = `
        <div class="input-quiz-sentence"><strong>${q.qNumber}.</strong> Incorrect: <em>"${q.sentence}"</em></div>
        ${inputHTML}
        ${feedbackHTML}
      `;
      container.appendChild(card);
    });
    
  } else if (currentPart === 6) {
    panelDiv.innerHTML = `
      <div class="quiz-part-title">Part 6: Complete with the Correct Word Form</div>
      <div class="quiz-part-desc">Complete the sentence using the correct form of the word in brackets. (Questions 51–56)</div>
      <div class="quiz-container" id="part6-questions-container"></div>
    `;
    panelContainer.appendChild(panelDiv);
    
    const container = document.getElementById('part6-questions-container');
    quizData.part6.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'input-quiz-card';
      
      const ansData = quizState.part6[qIndex];
      const isAnswered = ansData && ansData.checked;
      const userVal = isAnswered ? ansData.text : (ansData || '');
      
      let feedbackHTML = '';
      let inputHTML = '';
      
      if (isAnswered) {
        card.classList.add(ansData.isCorrect ? 'correct' : 'incorrect');
        feedbackHTML = ansData.isCorrect 
          ? `<div class="input-feedback correct">✨ Correct!</div>`
          : `<div class="input-feedback incorrect">❌ Incorrect. The correct form is: <strong>${q.answer}</strong></div>`;
        
        inputHTML = `
          <input type="text" class="input-quiz-field" style="max-width: 300px;" value="${userVal.replace(/"/g, '&quot;')}" disabled>
        `;
      } else {
        inputHTML = `
          <div style="display: flex; gap: 0.8rem; align-items: center; width: 100%; max-width: 450px;">
            <input type="text" class="input-quiz-field" id="p6-input-${qIndex}" placeholder="Type correct word..." value="${userVal.replace(/"/g, '&quot;')}">
            <button class="quiz-nav-btn check-btn" style="margin: 0; padding: 0.75rem 1.2rem; flex-shrink: 0;" onclick="checkPart6Answer(${qIndex})">Check</button>
          </div>
        `;
      }
      
      card.innerHTML = `
        <div class="input-quiz-sentence"><strong>${q.qNumber}.</strong> ${q.sentence.replace('_______', `<u>${userVal || '_______'}</u>`)} (${q.bracket})</div>
        ${inputHTML}
        ${feedbackHTML}
      `;
      container.appendChild(card);
    });
    
  } else if (currentPart === 7) {
    panelDiv.innerHTML = `
      <div class="quiz-part-title">Part 7: Short Writing Task</div>
      <div class="quiz-part-desc">${quizData.part7.instruction}</div>
      <div class="quiz-container" id="part7-questions-container"></div>
    `;
    panelContainer.appendChild(panelDiv);
    
    const container = document.getElementById('part7-questions-container');
    const wordsList = quizData.part7.words;
    
    for (let sIndex = 0; sIndex < 5; sIndex++) {
      const ansData = quizState.part7[sIndex];
      const isAnswered = ansData && ansData.checked;
      const item = isAnswered ? ansData : (ansData || { word: "", text: "" });
      
      let optionsHTML = `<option value="">-- Select target word --</option>`;
      wordsList.forEach(w => {
        const selectedAttr = (item.word === w) ? 'selected' : '';
        optionsHTML += `<option value="${w}" ${selectedAttr}>${w}</option>`;
      });
      
      let feedbackHTML = '';
      let inputHTML = '';
      
      if (isAnswered) {
        feedbackHTML = item.isCorrect
          ? `<div class="input-feedback correct">✨ Sentence submitted successfully using "${item.word}"!</div>`
          : `<div class="input-feedback incorrect">❌ Sentence should be at least 15 characters and contain the word "${item.word}" case-insensitively.</div>`;
        
        inputHTML = `
          <textarea class="writing-task-textarea" disabled>${item.text || ''}</textarea>
        `;
      } else {
        inputHTML = `
          <div style="display: flex; gap: 0.8rem; align-items: center; width: 100%; margin-top: 0.5rem; flex-wrap: wrap;">
            <textarea class="writing-task-textarea" id="p7-textarea-${sIndex}" placeholder="Write your sentence here...">${item.text || ''}</textarea>
            <button class="quiz-nav-btn check-btn" style="margin: 0; padding: 0.75rem 1.2rem; align-self: flex-end; flex-shrink: 0;" onclick="checkPart7Answer(${sIndex})">Check</button>
          </div>
        `;
      }
      
      const card = document.createElement('div');
      card.className = 'writing-task-item';
      card.innerHTML = `
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <strong>Sentence ${sIndex + 1}:</strong>
          <select class="theme-select" style="margin: 0; padding: 0.4rem 0.8rem; font-size: 0.9rem;" onchange="updatePart7Word(${sIndex}, this.value)" ${isAnswered ? 'disabled' : ''}>
            ${optionsHTML}
          </select>
        </div>
        ${inputHTML}
        ${feedbackHTML}
      `;
      container.appendChild(card);
    }
  } else if (currentPart === 'results') {
    renderQuizResults(module, panelDiv);
    panelContainer.appendChild(panelDiv);
  }
}

function selectCustomPart1Option(qIndex, oIndex) {
  if (state.customQuizState.graded) return;
  
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  const q = module.vocabQuizData.part1[qIndex];
  
  state.customQuizState.part1[qIndex] = {
    selected: oIndex,
    isCorrect: (oIndex === q.answer)
  };
  
  renderActiveQuizPanel(module);
}

function selectCustomPart4Option(qIndex, oIndex) {
  if (state.customQuizState.graded) return;
  
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  const q = module.vocabQuizData.part4[qIndex];
  
  state.customQuizState.part4[qIndex] = {
    selected: oIndex,
    isCorrect: (oIndex === q.answer)
  };
  
  renderActiveQuizPanel(module);
}

function updatePart5Input(qIndex, val) {
  if (state.customQuizState.graded) return;
  state.customQuizState.part5[qIndex] = val;
}

function updatePart6Input(qIndex, val) {
  if (state.customQuizState.graded) return;
  state.customQuizState.part6[qIndex] = val;
}

function updatePart7Word(sIndex, val) {
  if (state.customQuizState.graded) return;
  if (!state.customQuizState.part7[sIndex]) {
    state.customQuizState.part7[sIndex] = { word: "", text: "" };
  }
  state.customQuizState.part7[sIndex].word = val;
}

function updatePart7Input(sIndex, val) {
  if (state.customQuizState.graded) return;
  if (!state.customQuizState.part7[sIndex]) {
    state.customQuizState.part7[sIndex] = { word: "", text: "" };
  }
  state.customQuizState.part7[sIndex].text = val;
}

function checkPart5Answer(qIndex) {
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  
  const inputEl = document.getElementById(`p5-input-${qIndex}`);
  if (!inputEl) return;
  const userVal = inputEl.value;
  
  const q = quizData.part5[qIndex];
  const isCorrect = checkTextAnswer(userVal, q.answer);
  
  quizState.part5[qIndex] = {
    text: userVal,
    checked: true,
    isCorrect: isCorrect
  };
  
  renderActiveQuizPanel(module);
}

function checkPart6Answer(qIndex) {
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  
  const inputEl = document.getElementById(`p6-input-${qIndex}`);
  if (!inputEl) return;
  const userVal = inputEl.value;
  
  const q = quizData.part6[qIndex];
  const isCorrect = checkWordAnswer(userVal, q.answer);
  
  quizState.part6[qIndex] = {
    text: userVal,
    checked: true,
    isCorrect: isCorrect
  };
  
  renderActiveQuizPanel(module);
}

function checkPart7Answer(sIndex) {
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  const quizState = state.customQuizState;
  
  const textareaEl = document.getElementById(`p7-textarea-${sIndex}`);
  if (!textareaEl) return;
  const userVal = textareaEl.value;
  
  const item = quizState.part7[sIndex] || { word: "", text: "" };
  const isOk = checkSentenceUsage(userVal, item.word);
  
  quizState.part7[sIndex] = {
    word: item.word,
    text: userVal,
    checked: true,
    isCorrect: isOk
  };
  
  renderActiveQuizPanel(module);
}

// ══════════════════════════════════════════════════════
// MATCHING ENGINE — Drag-and-Drop with SVG Connectors
// ══════════════════════════════════════════════════════

// Shared drag/touch state for matching parts
let _matchDraggedItem = null;  // { value, partNum }
let _matchTouchGhost = null;
let _matchTouchCard = null;
let _matchConnReflowRaf = {};

function _matchShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function _matchSyncSVG(partNum) {
  const svg = document.getElementById(`match-svg-${partNum}`);
  const leftCol = document.getElementById(`match-left-${partNum}`);
  const rightCol = document.getElementById(`match-right-${partNum}`);
  if (!svg || !leftCol || !rightCol) return;
  const h = Math.max(leftCol.offsetHeight, rightCol.offsetHeight, 200);
  svg.setAttribute('height', h);
  svg.parentElement.style.minHeight = h + 'px';
}

function _matchClearLines(partNum) {
  const svg = document.getElementById(`match-svg-${partNum}`);
  if (!svg) return;
  svg.querySelectorAll('.match-conn-line').forEach(l => l.remove());
}

function _matchDrawLine(partNum, cardId, zoneId, animate) {
  const svg = document.getElementById(`match-svg-${partNum}`);
  if (!svg) return;
  const card = document.getElementById(cardId);
  const zone = document.getElementById(zoneId);
  if (!card || !zone) return;
  _matchSyncSVG(partNum);
  const svgRect = svg.getBoundingClientRect();
  const cRect = card.getBoundingClientRect();
  const zRect = zone.getBoundingClientRect();
  const x1 = cRect.right - svgRect.left;
  const y1 = cRect.top + cRect.height / 2 - svgRect.top;
  const x2 = zRect.left - svgRect.left;
  const y2 = zRect.top + zRect.height / 2 - svgRect.top;
  const mx = (svg.clientWidth || 40) / 2;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.classList.add('match-conn-line');
  path.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
  path.setAttribute('stroke', 'var(--accent-primary, #6366f1)');
  path.setAttribute('stroke-width', '2.5');
  path.setAttribute('fill', 'none');
  path.setAttribute('marker-end', `url(#match-arrow-${partNum})`);
  svg.appendChild(path);
  const len = path.getTotalLength();
  path.setAttribute('stroke-dasharray', String(len));
  if (animate) {
    path.setAttribute('stroke-dashoffset', String(len));
    path.style.transition = 'stroke-dashoffset .5s ease';
    requestAnimationFrame(() => path.setAttribute('stroke-dashoffset', '0'));
  } else {
    path.setAttribute('stroke-dashoffset', '0');
  }
}

function _matchRedrawLines(partNum, connections) {
  _matchClearLines(partNum);
  connections.forEach(conn => _matchDrawLine(partNum, conn.cardId, conn.zoneId, false));
}

function _matchScheduleReflow(partNum, connections) {
  if (_matchConnReflowRaf[partNum]) cancelAnimationFrame(_matchConnReflowRaf[partNum]);
  _matchConnReflowRaf[partNum] = requestAnimationFrame(() => {
    _matchConnReflowRaf[partNum] = null;
    _matchSyncSVG(partNum);
    _matchRedrawLines(partNum, connections);
  });
}

// Build the 3-column matching UI (cards | SVG | drop zones)
function _buildMatchUI(container, partNum, items, quizState, partKey, valueKey, labelPrefix, qNumStart) {
  container.innerHTML = '';

  // Progress bar
  const totalItems = items.length;
  const matchedCount = Object.values(quizState[partKey]).filter(m => m.isCorrect).length;
  const progressPct = (matchedCount / totalItems) * 100;

  const progressBar = document.createElement('div');
  progressBar.className = 'drag-match-progress-bar';
  progressBar.innerHTML = `
    <div class="drag-match-progress-fill" id="match-prog-fill-${partNum}" style="width:${progressPct}%"></div>
  `;
  container.appendChild(progressBar);

  const statusEl = document.createElement('div');
  statusEl.className = 'drag-match-status';
  statusEl.id = `match-status-${partNum}`;
  statusEl.textContent = `${matchedCount} / ${totalItems} matched`;
  container.appendChild(statusEl);

  // 3-column wrapper: left cards | SVG | right drop zones
  const cols = document.createElement('div');
  cols.className = 'drag-match-columns';

  // Left column: shuffled draggable cards (only unmatched)
  const leftCol = document.createElement('div');
  leftCol.className = 'drag-match-left';
  leftCol.id = `match-left-${partNum}`;

  const shuffledItems = _matchShuffle(items);
  shuffledItems.forEach(item => {
    const word = item.word;
    const isMatched = quizState[partKey][word] && quizState[partKey][word].isCorrect;
    if (isMatched) return; // already correctly matched, don't show in left pool

    const card = document.createElement('div');
    card.className = 'drag-match-card';
    card.id = `match-card-${partNum}-${word.replace(/[^a-zA-Z0-9]/g,'_')}`;
    card.draggable = true;
    card.dataset.word = word;
    card.dataset.part = partNum;
    card.innerHTML = `<span>${word}</span><span class="drag-match-check" style="opacity:0">✅</span>`;
    _addMatchCardDragListeners(card, partNum);
    leftCol.appendChild(card);
  });

  if (leftCol.children.length === 0) {
    const done = document.createElement('div');
    done.className = 'drag-match-all-done';
    done.textContent = matchedCount === totalItems ? '🎉 All matched correctly!' : '';
    leftCol.appendChild(done);
  }

  // Middle column: SVG
  const svgCol = document.createElement('div');
  svgCol.className = 'drag-match-svg-col';
  svgCol.style.position = 'relative';
  svgCol.innerHTML = `
    <svg id="match-svg-${partNum}" width="60" height="200" style="position:absolute;top:0;left:0;overflow:visible;pointer-events:none;">
      <defs>
        <marker id="match-arrow-${partNum}" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <circle cx="4" cy="4" r="3" fill="var(--accent-primary, #6366f1)"/>
        </marker>
      </defs>
    </svg>
  `;

  // Right column: drop zones (shuffled order)
  const rightCol = document.createElement('div');
  rightCol.className = 'drag-match-right';
  rightCol.id = `match-right-${partNum}`;

  const shuffledZones = _matchShuffle(items);
  shuffledZones.forEach(item => {
    const word = item.word;
    const value = item[valueKey];
    const matchData = quizState[partKey][word];
    const isCorrect = matchData && matchData.isCorrect;

    const zone = document.createElement('div');
    zone.className = 'drag-match-zone';
    zone.id = `match-zone-${partNum}-${word.replace(/[^a-zA-Z0-9]/g,'_')}`;
    zone.dataset.word = word;
    zone.dataset.part = partNum;
    zone.dataset.value = value;

    if (isCorrect) {
      zone.classList.add('matched-zone');
      zone.textContent = value;
    } else if (matchData) {
      zone.classList.add('wrong-zone');
      zone.textContent = value;
    } else {
      zone.textContent = value;
    }

    _addMatchZoneDropListeners(zone, partNum, partKey, valueKey, qNumStart, items);
    rightCol.appendChild(zone);
  });

  cols.appendChild(leftCol);
  cols.appendChild(svgCol);
  cols.appendChild(rightCol);
  container.appendChild(cols);

  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.className = 'drag-match-reset-btn';
  resetBtn.textContent = '🔄 Reset Matching';
  resetBtn.onclick = () => {
    if (state.customQuizState.graded) return;
    state.customQuizState[partKey] = {};
    _matchClearLines(partNum);
    const module = c1Modules.find(m => m.id === state.activeModuleId);
    renderActiveQuizPanel(module);
  };
  container.appendChild(resetBtn);

  // Celebration overlay
  const cel = document.createElement('div');
  cel.className = 'drag-match-celebration';
  cel.id = `match-cel-${partNum}`;
  cel.innerHTML = `
    <div id="match-conf-${partNum}"></div>
    <div style="font-size:3rem">🎉</div>
    <h3>Well done!</h3>
    <p>You matched all ${totalItems} correctly!</p>
  `;
  container.style.position = 'relative';
  container.appendChild(cel);

  // Draw existing correct connections
  const connections = [];
  Object.keys(quizState[partKey]).forEach(word => {
    const matchData = quizState[partKey][word];
    if (matchData && matchData.isCorrect) {
      const cardId = `match-card-${partNum}-${word.replace(/[^a-zA-Z0-9]/g,'_')}`;
      const zoneId = `match-zone-${partNum}-${word.replace(/[^a-zA-Z0-9]/g,'_')}`;
      connections.push({ cardId, zoneId });
    }
  });
  state[`_matchConnections_p${partNum}`] = connections;

  requestAnimationFrame(() => {
    _matchSyncSVG(partNum);
    _matchRedrawLines(partNum, connections);
  });

  window.addEventListener('resize', () => _matchScheduleReflow(partNum, state[`_matchConnections_p${partNum}`] || []), { passive: true });

  // Show celebration if all done
  if (matchedCount === totalItems) {
    cel.classList.add('show');
    _spawnMatchConfetti(partNum);
  }
}

function _addMatchCardDragListeners(card, partNum) {
  card.addEventListener('dragstart', e => {
    _matchDraggedItem = { word: card.dataset.word, partNum };
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    _matchDraggedItem = null;
  });
  // Touch
  card.addEventListener('touchstart', _matchTouchStart, { passive: false });
}

function _addMatchZoneDropListeners(zone, partNum, partKey, valueKey, qNumStart, items) {
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    if (!_matchDraggedItem) return;
    _handleMatchDrop(_matchDraggedItem.word, zone, partNum, partKey, valueKey, items);
  });
}

document.addEventListener('dragover', e => {}); // needed for ghost positioning

function _handleMatchDrop(word, zone, partNum, partKey, valueKey, items) {
  if (state.customQuizState.graded) return;
  const quizState = state.customQuizState;
  const targetWord = zone.dataset.word;
  const correctItem = items.find(i => i.word === targetWord);
  if (!correctItem) return;

  if (quizState[partKey][targetWord] && quizState[partKey][targetWord].isCorrect) return; // already locked

  const isCorrect = (word === targetWord);
  const valueToStore = correctItem[valueKey];

  if (isCorrect) {
    // Correct match
    zone.classList.add('matched-zone');
    zone.classList.remove('wrong-zone', 'drag-over');

    const cardId = `match-card-${partNum}-${word.replace(/[^a-zA-Z0-9]/g,'_')}`;
    const zoneId = zone.id;

    if (partKey === 'part2') {
      quizState.part2[targetWord] = { meaning: valueToStore, isCorrect: true };
    } else {
      quizState.part3[targetWord] = { collocation: valueToStore, isCorrect: true };
    }

    // Remove matched card from left column
    const cardEl = document.getElementById(cardId);
    if (cardEl) cardEl.remove();

    // Draw connector line
    const connections = state[`_matchConnections_p${partNum}`] || [];
    connections.push({ cardId, zoneId });
    state[`_matchConnections_p${partNum}`] = connections;

    requestAnimationFrame(() => {
      _matchSyncSVG(partNum);
      _matchDrawLine(partNum, cardId, zoneId, true);
    });

    // Update progress
    const total = items.length;
    const matched = Object.values(quizState[partKey]).filter(m => m.isCorrect).length;
    const fillEl = document.getElementById(`match-prog-fill-${partNum}`);
    const statusEl = document.getElementById(`match-status-${partNum}`);
    if (fillEl) fillEl.style.width = ((matched / total) * 100) + '%';
    if (statusEl) statusEl.textContent = `${matched} / ${total} matched`;

    if (matched === total) {
      setTimeout(() => {
        const cel = document.getElementById(`match-cel-${partNum}`);
        if (cel) { cel.classList.add('show'); _spawnMatchConfetti(partNum); }
      }, 600);
    }

  } else {
    // Wrong match — shake
    zone.classList.add('wrong-shake');
    setTimeout(() => zone.classList.remove('wrong-shake'), 450);
  }
}

// Touch support
function _matchTouchStart(e) {
  e.preventDefault();
  _matchTouchCard = e.currentTarget;
  _matchDraggedItem = { word: _matchTouchCard.dataset.word, partNum: parseInt(_matchTouchCard.dataset.part) };
  _matchTouchCard.classList.add('dragging');
  _matchTouchGhost = _matchTouchCard.cloneNode(true);
  _matchTouchGhost.style.cssText = `position:fixed;z-index:9999;opacity:.85;pointer-events:none;
    width:${_matchTouchCard.offsetWidth}px;transform:rotate(-3deg) scale(1.05);
    box-shadow:0 8px 24px rgba(99,102,241,.45);border-radius:10px;`;
  document.body.appendChild(_matchTouchGhost);
  _moveTouchGhostMatch(e.touches[0]);
  document.addEventListener('touchmove', _matchTouchMove, { passive: false });
  document.addEventListener('touchend', _matchTouchEnd);
}

function _moveTouchGhostMatch(t) {
  if (!_matchTouchGhost) return;
  _matchTouchGhost.style.left = (t.clientX - _matchTouchGhost.offsetWidth / 2) + 'px';
  _matchTouchGhost.style.top  = (t.clientY - _matchTouchGhost.offsetHeight / 2) + 'px';
}

function _matchTouchMove(e) {
  e.preventDefault();
  _moveTouchGhostMatch(e.touches[0]);
  document.querySelectorAll('.drag-match-zone').forEach(z => z.classList.remove('drag-over'));
  const el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  const zone = el ? el.closest('.drag-match-zone') : null;
  if (zone) zone.classList.add('drag-over');
}

function _matchTouchEnd(e) {
  document.removeEventListener('touchmove', _matchTouchMove);
  document.removeEventListener('touchend', _matchTouchEnd);
  document.querySelectorAll('.drag-match-zone').forEach(z => z.classList.remove('drag-over'));
  if (_matchTouchGhost) { _matchTouchGhost.remove(); _matchTouchGhost = null; }
  if (_matchTouchCard) _matchTouchCard.classList.remove('dragging');
  const t = e.changedTouches[0];
  const el = document.elementFromPoint(t.clientX, t.clientY);
  const zone = el ? el.closest('.drag-match-zone') : null;
  if (zone && _matchDraggedItem) {
    const partNum = _matchDraggedItem.partNum;
    const module = c1Modules.find(m => m.id === state.activeModuleId);
    const quizData = module.vocabQuizData;
    const partKey = partNum === 2 ? 'part2' : 'part3';
    const valueKey = partNum === 2 ? 'meaning' : 'collocation';
    const items = quizData[partKey];
    _handleMatchDrop(_matchDraggedItem.word, zone, partNum, partKey, valueKey, items);
  }
  _matchDraggedItem = null; _matchTouchCard = null;
}

function _spawnMatchConfetti(partNum) {
  const cont = document.getElementById(`match-conf-${partNum}`);
  if (!cont) return;
  cont.innerHTML = '';
  const colors = ['#6366f1','#f59e0b','#10b981','#ef4444','#8b5cf6','#f97316'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'match-confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*40}%;
      background:${colors[i%colors.length]};
      width:${6+Math.random()*10}px;height:${6+Math.random()*10}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
      animation-duration:${.8+Math.random()*1.2}s;
      animation-delay:${Math.random()*.5}s;`;
    cont.appendChild(p);
  }
}

// Matching Part 2
function renderPart2Board(module) {
  const container = document.getElementById('part2-board-container');
  if (!container) return;
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  _buildMatchUI(container, 2, quizData.part2, quizState, 'part2', 'meaning', 'Part 2', 13);
}

// Matching Part 3
function renderPart3Board(module) {
  const container = document.getElementById('part3-board-container');
  if (!container) return;
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  _buildMatchUI(container, 3, quizData.part3, quizState, 'part3', 'collocation', 'Part 3', 25);
}

// Legacy stubs (grading still reads from quizState.part2/part3 so no changes needed there)
function removePart2Match(word, ev) {
  if (ev) ev.stopPropagation();
  if (state.customQuizState.graded) return;
  delete state.customQuizState.part2[word];
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  renderPart2Board(module);
}
function removePart3Match(word, ev) {
  if (ev) ev.stopPropagation();
  if (state.customQuizState.graded) return;
  delete state.customQuizState.part3[word];
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  renderPart3Board(module);
}

// Dummy: grading reads quizState directly, these are no longer used for click-placing
function placePart2Pill(word) {}
function placePart3Pill(word) {
  if (state.customQuizState.graded) return;
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  
  if (quizState.part3[word] && quizState.part3[word].isCorrect) return; // locked if correct
  
  if (state.selectedPill) {
    const correctItem = quizData.part3.find(item => item.word === word);
    const isCorrect = (state.selectedPill === correctItem.collocation);
    quizState.part3[word] = {
      collocation: state.selectedPill,
      isCorrect: isCorrect
    };
    state.selectedPill = null;
  } else if (quizState.part3[word]) {
    delete quizState.part3[word];
  }
  
  renderPart3Board(module);
}

function removePart3Match(word, ev) {
  if (ev) ev.stopPropagation();
  if (state.customQuizState.graded) return;
  
  delete state.customQuizState.part3[word];
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  renderPart3Board(module);
}

function handlePart3DragStart(ev, collocation) {
  if (state.customQuizState.graded) return;
  ev.dataTransfer.setData("text/plain", collocation);
}

function handlePart3Drop(ev, word) {
  ev.preventDefault();
  const slot = ev.currentTarget;
  slot.classList.remove('drag-over');
  if (state.customQuizState.graded) return;
  
  const collocation = ev.dataTransfer.getData("text/plain");
  if (!collocation) return;
  
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  
  if (quizState.part3[word] && quizState.part3[word].isCorrect) return;
  
  const correctItem = quizData.part3.find(item => item.word === word);
  const isCorrect = (collocation === correctItem.collocation);
  
  quizState.part3[word] = {
    collocation: collocation,
    isCorrect: isCorrect
  };
  
  renderPart3Board(module);
}

// Smart grading text checkers
function checkTextAnswer(userVal, correctVal) {
  if (!userVal) return false;
  const clean = str => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g," ").trim();
  return clean(userVal) === clean(correctVal);
}

function checkWordAnswer(userVal, correctVal) {
  if (!userVal) return false;
  return userVal.toLowerCase().trim() === correctVal.toLowerCase().trim();
}

function checkSentenceUsage(sentence, word) {
  if (!sentence || !word) return false;
  const cleanSentence = sentence.toLowerCase().trim();
  const cleanWord = word.toLowerCase().trim();
  return cleanSentence.includes(cleanWord) && cleanSentence.length >= 15;
}

function gradeEntireQuiz() {
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  if (!module || !module.vocabQuizData) return;
  
  const quizData = module.vocabQuizData;
  const quizState = state.customQuizState;
  
  // Compute scores instantly from state
  let p1Score = 0;
  quizData.part1.forEach((q, index) => {
    const ans = quizState.part1[index];
    if (ans && ans.isCorrect) p1Score++;
  });
  
  let p2Score = 0;
  quizData.part2.forEach(item => {
    const match = quizState.part2[item.word];
    if (match && match.isCorrect) p2Score++;
  });
  
  let p3Score = 0;
  quizData.part3.forEach(item => {
    const match = quizState.part3[item.word];
    if (match && match.isCorrect) p3Score++;
  });
  
  let p4Score = 0;
  quizData.part4.forEach((q, index) => {
    const ans = quizState.part4[index];
    if (ans && ans.isCorrect) p4Score++;
  });
  
  let p5Score = 0;
  quizData.part5.forEach((q, index) => {
    const ans = quizState.part5[index];
    if (ans && ans.checked && ans.isCorrect) p5Score++;
  });
  
  let p6Score = 0;
  quizData.part6.forEach((q, index) => {
    const ans = quizState.part6[index];
    if (ans && ans.checked && ans.isCorrect) p6Score++;
  });
  
  let p7Score = 0;
  for (let sIndex = 0; sIndex < 5; sIndex++) {
    const ans = quizState.part7[sIndex];
    if (ans && ans.checked && ans.isCorrect) p7Score++;
  }
  
  quizState.scores = {
    part1: p1Score,
    part2: p2Score,
    part3: p3Score,
    part4: p4Score,
    part5: p5Score,
    part6: p6Score,
    part7: p7Score
  };
  
  quizState.graded = true;
  goToQuizPart('results');
}

function renderQuizResults(module, containerDiv) {
  const quizState = state.customQuizState;
  const scores = quizState.scores;
  
  const totalCorrect = scores.part1 + scores.part2 + scores.part3 + scores.part4 + scores.part5 + scores.part6 + scores.part7;
  const totalQuestions = 61; // 12 + 12 + 10 + 8 + 8 + 6 + 5
  const percent = Math.round((totalCorrect / totalQuestions) * 100);
  
  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const dashoffset = circ - (percent / 100) * circ;
  
  let feedbackMessage = '';
  if (percent >= 90) {
    feedbackMessage = '🌟 Outstanding! You have mastered the C1 vocabulary for this module. Excellent work!';
  } else if (percent >= 75) {
    feedbackMessage = '👍 Good job! You have a solid grasp of these words, but a quick review of your mistakes could help you achieve perfection.';
  } else if (percent >= 50) {
    feedbackMessage = '📚 Keep practicing! Re-read the story and the collocations lists to reinforce your vocabulary knowledge.';
  } else {
    feedbackMessage = '⚠️ Let\'s try that again! Go review the study cards and retry the quiz to master these advanced terms.';
  }
  
  containerDiv.innerHTML = `
    <div class="results-dashboard">
      <div class="score-circle-container">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="${radius}" class="score-ring-bg" />
          <circle cx="80" cy="80" r="${radius}" class="score-ring-fill"
                  style="stroke-dasharray: ${circ}; stroke-dashoffset: ${dashoffset};" />
        </svg>
        <div class="score-text">
          ${percent}%
          <span>${totalCorrect} / ${totalQuestions} Correct</span>
        </div>
      </div>
      
      <div class="result-feedback-msg">${feedbackMessage}</div>
      
      <div class="results-summary-grid">
        <div class="result-card">
          <span class="result-card-title">Part 1 (Best Word)</span>
          <span class="result-card-val">${scores.part1} / 12</span>
        </div>
        <div class="result-card">
          <span class="result-card-title">Part 2 (Definitions)</span>
          <span class="result-card-val">${scores.part2} / 12</span>
        </div>
        <div class="result-card">
          <span class="result-card-title">Part 3 (Collocations)</span>
          <span class="result-card-val">${scores.part3} / 10</span>
        </div>
        <div class="result-card">
          <span class="result-card-title">Part 4 (Synonyms)</span>
          <span class="result-card-val">${scores.part4} / 8</span>
        </div>
        <div class="result-card">
          <span class="result-card-title">Part 5 (Correction)</span>
          <span class="result-card-val">${scores.part5} / 8</span>
        </div>
        <div class="result-card">
          <span class="result-card-title">Part 6 (Word Form)</span>
          <span class="result-card-val">${scores.part6} / 6</span>
        </div>
        <div class="result-card">
          <span class="result-card-title">Part 7 (Writing)</span>
          <span class="result-card-val">${scores.part7} / 5</span>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button class="cta-button" onclick="reviewCustomQuiz()" style="background: var(--card-bg); border: 1px solid var(--card-border); color: var(--text-primary);">
          🔍 Review Answers
        </button>
        <button class="cta-button" onclick="retryCustomQuiz()">
          🔁 Retry Quiz
        </button>
      </div>
    </div>
  `;
}

function reviewCustomQuiz() {
  goToQuizPart(1);
}

function retryCustomQuiz() {
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  if (!module) return;
  
  state.customQuizState = null;
  renderVocabQuizSection(module);
}

function renderQuizTab(module) {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  
  module.grammarQuiz.forEach((q, qIndex) => {
    const qCard = document.createElement('div');
    qCard.className = 'quiz-question-card';
    qCard.id = `quiz-card-${qIndex}`;
    
    let optionsHTML = '';
    q.choices.forEach((choice, oIndex) => {
      optionsHTML += `
        <div class="quiz-option" id="option-${qIndex}-${oIndex}" onclick="selectQuizOption(${qIndex}, ${oIndex})">
          <span class="option-marker">${String.fromCharCode(65 + oIndex)}</span>
          <span class="option-text">${choice}</span>
        </div>
      `;
    });
    
    qCard.innerHTML = `
      <div class="quiz-question">${qIndex + 1}. ${q.question}</div>
      <div class="quiz-options" id="options-container-${qIndex}">${optionsHTML}</div>
      <div class="quiz-feedback" id="feedback-${qIndex}"></div>
    `;
    container.appendChild(qCard);
  });
}

// --- 6. QUIZ INTERACTION CONTROLLER ---

function selectQuizOption(qIndex, oIndex) {
  // If already answered, ignore subsequent clicks
  if (state.quizSelections[qIndex] !== undefined) return;
  
  state.quizSelections[qIndex] = oIndex;
  
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  if (!module) return;
  
  const q = module.grammarQuiz[qIndex];
  if (!q) return;
  
  const isCorrect = (oIndex === q.answer);
  
  // Disable future hover/clicks by adding 'answered' class to container
  const optionsContainer = document.getElementById(`options-container-${qIndex}`);
  if (optionsContainer) {
    optionsContainer.classList.add('answered');
  }
  
  // Remove selected styling from siblings
  const qCard = document.getElementById(`quiz-card-${qIndex}`);
  if (qCard) {
    qCard.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.remove('selected');
    });
  }
  
  // Highlight chosen option
  const chosen = document.getElementById(`option-${qIndex}-${oIndex}`);
  if (chosen) {
    if (isCorrect) {
      chosen.classList.add('correct');
    } else {
      chosen.classList.add('incorrect');
      // Highlight correct option as well
      const correctOpt = document.getElementById(`option-${qIndex}-${q.answer}`);
      if (correctOpt) {
        correctOpt.classList.add('correct');
      }
    }
  }
  
  // Display feedback instantly
  const feedbackEl = document.getElementById(`feedback-${qIndex}`);
  if (feedbackEl) {
    if (isCorrect) {
      feedbackEl.className = 'quiz-feedback correct';
      feedbackEl.innerHTML = `<strong>✨ Correct!</strong> ${q.explanation}`;
    } else {
      feedbackEl.className = 'quiz-feedback incorrect';
      feedbackEl.innerHTML = `<strong>❌ Incorrect.</strong> Correct Answer: ${q.choices[q.answer]}<br><br>${q.explanation}`;
    }
  }
}

// --- 7. ENROLL MODAL CONTROLLER ---

function openEnrollModal() {
  const modal = document.getElementById('enroll-modal');
  if (modal) modal.classList.add('active');
}

function closeEnrollModal() {
  const modal = document.getElementById('enroll-modal');
  if (modal) modal.classList.remove('active');
}

function handleEnrollSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('student-name').value;
  alert(`Thank you, ${name}! Abdesamad has received your enrollment inquiry and will email you shortly.`);
  closeEnrollModal();
  document.getElementById('enroll-form').reset();
}

// --- 8. STORY KEYWORDS INTERACTIVITY CONTROLLER ---

function highlightStoryKeywords(storyText, vocabulary) {
  const parts = storyText.split("<div class='reading-comprehension'");
  let narrative = parts[0];
  
  // Sort vocabulary words by length descending to prevent sub-string collision
  const sortedVocab = [...vocabulary].sort((a, b) => b.word.length - a.word.length);
  
  sortedVocab.forEach(v => {
    // Escape regex characters just in case
    const escapedWord = v.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const wordPattern = new RegExp(`\\b${escapedWord}\\b`, 'gi');
    const arabicTranslation = v.arabic || '';
    
    narrative = narrative.replace(wordPattern, (matchedText) => {
      return `<span class="story-keyword" data-word="${v.word.replace(/"/g, '&quot;')}" data-arabic="${arabicTranslation.replace(/"/g, '&quot;')}" onclick="event.stopPropagation(); openKeywordPopup('${v.word.replace(/"/g, '&quot;')}')">${matchedText}</span>`;
    });
  });
  
  if (parts.length > 1) {
    return narrative + "<div class='reading-comprehension'" + parts[1];
  }
  return narrative;
}

function openKeywordPopup(wordName) {
  const module = c1Modules.find(m => m.id === state.activeModuleId);
  if (!module) return;
  
  const v = module.vocabulary.find(item => item.word.toLowerCase() === wordName.toLowerCase());
  if (!v) return;
  
  const modal = document.getElementById('word-modal');
  if (!modal) return;
  
  const cardContent = modal.querySelector('.word-card');
  if (!cardContent) return;
  
  const syllables = v.stress || v.syllables || v.word;
  const ipa = v.ipa || '/.../';

  cardContent.innerHTML = `
    <div class="word-card-header">
      <div>
        <h2 class="word-card-title">${v.word}</h2>
        <div style="margin-top: 0.3rem; display: flex; gap: 0.5rem; align-items: center;">
          <span class="word-card-type">${v.type}</span>
        </div>
      </div>
      <div style="display: flex; gap: 0.8rem; align-items: center;">
        <button class="word-card-action-btn video-btn" id="word-video-btn" onclick="toggleYouGlishPlayer('${v.word.replace(/'/g, "\\'")}') " title="Watch Pronunciation Video">
          <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        </button>
        <button class="word-card-action-btn settings-btn" id="word-settings-btn" onclick="toggleYouGlishSettings()" title="YouGlish Settings">
          <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <button class="modal-close" style="position: static; margin-top: 0;" onclick="closeWordModal()">&times;</button>
      </div>
    </div>

    <!-- YouGlish Settings Panel -->
    <div class="youglish-settings-panel" id="yg-settings-panel" style="display: none;">
      <h4>YouGlish Looping Settings</h4>
      <div class="yg-settings-grid">
        <div class="yg-setting-row">
          <label for="yg-accent">Accent:</label>
          <select id="yg-accent" onchange="updateYouGlishSetting('accent', this.value)">
            <option value="all">All English</option>
            <option value="us">US (Default)</option>
            <option value="uk">UK</option>
            <option value="aus">AUS</option>
          </select>
        </div>
        <div class="yg-setting-row">
          <label>Repeat:</label>
          <div class="yg-setting-radios">
            <label><input type="radio" name="yg-repeat-target" value="word" onchange="updateYouGlishSetting('repeatTarget', this.value)"> Just Word</label>
            <label><input type="radio" name="yg-repeat-target" value="sentence" onchange="updateYouGlishSetting('repeatTarget', this.value)"> Sentence</label>
          </div>
        </div>
        <div class="yg-setting-row">
          <label for="yg-repeat-count">Count:</label>
          <select id="yg-repeat-count" onchange="updateYouGlishSetting('repeatCount', this.value)">
            <option value="1">1 time</option>
            <option value="2">2 times</option>
            <option value="3">3 times (Default)</option>
            <option value="5">5 times</option>
            <option value="10">10 times</option>
          </select>
        </div>
        <div class="yg-setting-row">
          <label for="yg-blur-video">Blur Video Content:</label>
          <input type="checkbox" id="yg-blur-video" onchange="updateYouGlishSetting('blurVideo', this.checked)">
        </div>
      </div>
    </div>

    <div class="word-card-pronounce">
      <div class="word-card-section-title">Pronunciation Guide</div>
      <div><strong>Syllables:</strong> ${syllables}</div>
      <div><strong>US IPA:</strong> <span style="font-family: monospace; font-size: 1rem; color: var(--accent-color); font-weight: 600;">${ipa}</span></div>
    </div>

    <div>
      <div class="word-card-section-title">Definition</div>
      <div class="word-card-def">
        <span class="word-card-ar-hover">${v.def}<span class="ar-tip">${v.arabicDef || v.arabic || ''}</span></span>
      </div>
    </div>

    <div>
      <div class="word-card-section-title">Example Sentence</div>
      <div class="word-card-ex">
        <span class="word-card-ar-hover">"${v.ex}"<span class="ar-tip">${v.arabicEx || ''}</span></span>
      </div>
    </div>

    <div>
      <div class="word-card-section-title">Visualization</div>
      <img
        class="word-card-image"
        src="Images/Lesson ${module.id}/${v.word}.png"
        alt="${v.word} visualization"
        onerror="this.style.display='none'"
      />
    </div>

    <!-- Dedicated YouGlish Section (Toggled via JS) -->
    <div id="yg-section-wrapper" style="display: none;">
      <div class="word-card-section-title">Pronunciation Video</div>
      <div class="youglish-player-container" id="yg-player-container">
        <div id="yg-widget-element"></div>
        <div class="yg-video-blur-overlay" id="yg-video-blur-overlay" style="display: none;"></div>
        <div class="yg-loader" id="yg-loader">
          <div class="spinner"></div>
          <span>Loading pronunciation video...</span>
        </div>
      </div>

      <!-- Custom Premium YouGlish Controls -->
      <div class="yg-custom-controls" id="yg-controls-container">
        <div class="yg-control-left">
          <span id="yg-track-info">Clip 0 of 0</span>
        </div>
        <div class="yg-control-center">
          <button class="yg-ctrl-btn" onclick="previousYouGlishVideo()" title="Previous Clip">
            <svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
          </button>
          <button class="yg-ctrl-btn play-pause-btn" id="yg-play-pause-btn" onclick="toggleYouGlishPlayPause()" title="Play/Pause">
            <svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>
          <button class="yg-ctrl-btn" onclick="replayYouGlishVideo()" title="Replay Clip">
            <svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          </button>
          <button class="yg-ctrl-btn" onclick="nextYouGlishVideo()" title="Next Clip">
            <svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
          </button>
        </div>
        <div class="yg-control-right">
          <select id="yg-speed-select" onchange="changeYouGlishSpeed(this.value)">
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1" selected>1.0x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
      </div>

      <div class="yg-custom-caption-container" id="yg-custom-caption" style="display: none;"></div>
    </div>
  `;

  modal.classList.add('active');
}

function closeWordModal() {
  const modal = document.getElementById('word-modal');
  if (modal) modal.classList.remove('active');
  pauseYouGlish();
}

// --- YouGlish Player Controller and Lifecycle Handlers ---

window.onYouglishAPIReady = function() {
  state.youglishReady = true;
  console.log("YouGlish API loaded and ready.");
};

function toggleYouGlishPlayer(word) {
  const wrapper = document.getElementById('yg-section-wrapper');
  const videoBtn = document.getElementById('word-video-btn');
  
  if (!wrapper) return;
  
  const isPlaying = wrapper.style.display !== 'none';
  if (isPlaying) {
    pauseYouGlish();
    wrapper.style.display = 'none';
    if (videoBtn) videoBtn.classList.remove('active');
    state.youglishActive = false;
  } else {
    wrapper.style.display = 'block';
    if (videoBtn) videoBtn.classList.add('active');
    state.youglishActive = true;
    
    // Pause general lesson story audio
    resetStoryAudio();
    
    // Sync blur overlay visibility
    const blurOverlay = document.getElementById('yg-video-blur-overlay');
    if (blurOverlay) {
      blurOverlay.style.display = state.youglishSettings.blurVideo ? 'block' : 'none';
    }
    
    // Load video
    loadYouGlish(word);
  }
}

function toggleYouGlishSettings() {
  const panel = document.getElementById('yg-settings-panel');
  const settingsBtn = document.getElementById('word-settings-btn');
  if (!panel) return;
  
  const isOpen = panel.style.display !== 'none';
  if (isOpen) {
    panel.style.display = 'none';
    if (settingsBtn) settingsBtn.classList.remove('active');
  } else {
    panel.style.display = 'block';
    if (settingsBtn) settingsBtn.classList.add('active');
    
    // Sync current values
    document.getElementById('yg-accent').value = state.youglishSettings.accent;
    document.getElementById('yg-repeat-count').value = state.youglishSettings.repeatCount;
    document.getElementById('yg-blur-video').checked = state.youglishSettings.blurVideo;
    
    const radios = document.getElementsByName('yg-repeat-target');
    radios.forEach(radio => {
      radio.checked = (radio.value === state.youglishSettings.repeatTarget);
    });
  }
}

function updateYouGlishSetting(key, value) {
  if (key === 'blurVideo') {
    state.youglishSettings.blurVideo = value;
    localStorage.setItem('yg-blurVideo', value);
    const blurOverlay = document.getElementById('yg-video-blur-overlay');
    if (blurOverlay) {
      blurOverlay.style.display = value ? 'block' : 'none';
    }
  } else {
    state.youglishSettings[key] = key === 'repeatCount' ? parseInt(value) : value;
    localStorage.setItem(`yg-${key}`, value);
    
    // Refresh player if active
    if (state.youglishActive && state.youglishCurrentWord) {
      if (key === 'accent') {
        loadYouGlish(state.youglishCurrentWord);
      }
    }
  }
}

function loadYouGlish(word) {
  state.youglishCurrentWord = word;
  
  const loader = document.getElementById('yg-loader');
  const widgetEl = document.getElementById('yg-widget-element');
  if (loader) {
    loader.style.display = 'flex';
    loader.innerHTML = '<div class="spinner"></div><span>Loading pronunciation video...</span>';
  }
  if (widgetEl) widgetEl.style.display = 'none';
  
  const controlsEl = document.getElementById('yg-controls-container');
  if (controlsEl) controlsEl.style.display = 'none';
  
  // Clear custom caption container when loading a new search
  const captionEl = document.getElementById('yg-custom-caption');
  if (captionEl) {
    captionEl.style.display = 'none';
    captionEl.innerHTML = '';
  }
  
  clearYouGlishTimers();
  
  state.youglishRepeatCounter = 0;
  state.youglishLastTrackNumber = -1;
  
  // Re-verify YG loaded state
  if (typeof YG === 'undefined') {
    setTimeout(() => loadYouGlish(word), 400);
    return;
  }
  
  const accent = state.youglishSettings.accent === 'all' ? '' : state.youglishSettings.accent;
  const colors = getYouglishThemeColors();
  
  // Get active player container sizing to pass to YouGlish (prevents iframe internal layout cut-offs)
  const container = document.getElementById('yg-player-container');
  const width = container && container.clientWidth > 0 ? container.clientWidth : (window.innerWidth <= 480 ? 320 : 500);
  const height = container && container.clientHeight > 0 ? container.clientHeight : 230;
  
  // Fallback timer to hide loader if browser blocks API callback events
  state.youglishFallbackTimeout = setTimeout(() => {
    console.log("YouGlish load fallback triggered (likely due to file:// origin sandbox).");
    const fallLoader = document.getElementById('yg-loader');
    const fallWidget = document.getElementById('yg-widget-element');
    if (fallLoader && fallLoader.style.display !== 'none') {
      fallLoader.style.display = 'none';
    }
    if (fallWidget) {
      fallWidget.style.display = 'block';
    }
  }, 3500);
  
  try {
    // Re-instantiate widget because container was replaced dynamically
    // Use components: 1024 (renders only the video player inside the iframe, hiding search, title, accent and captions)
    state.youglishWidget = new YG.Widget("yg-widget-element", {
      width: width,
      height: height,
      components: 1024,
      backgroundColor: colors.backgroundColor,
      linkColor: colors.linkColor,
      titleColor: colors.titleColor,
      captionColor: colors.captionColor,
      markerColor: colors.markerColor,
      textColor: colors.textColor,
      queryColor: colors.queryColor,
      autoStart: 1,
      events: {
        'onFetchDone': onYouglishFetchDone,
        'onVideoChange': onYouglishVideoChange,
        'onCaptionChange': onYouglishCaptionChange,
        'onCaptionConsumed': onYouglishCaptionConsumed
      }
    });
    
    state.youglishWidget.fetch(word, "english", accent);

    // Use MutationObserver to catch the iframe the instant YouGlish injects it
    // and immediately set scrolling=no — more reliable than setTimeout
    const widgetContainer = document.getElementById('yg-widget-element');
    if (widgetContainer) {
      const iframeObserver = new MutationObserver((mutations, obs) => {
        const ygIframe = widgetContainer.querySelector('iframe');
        if (ygIframe) {
          ygIframe.setAttribute('scrolling', 'no');
          ygIframe.style.overflow = 'hidden';
          obs.disconnect(); // Stop observing once iframe is found
        }
      });
      iframeObserver.observe(widgetContainer, { childList: true, subtree: true });
    }
  } catch (err) {
    console.error("YouGlish init error:", err);
    if (loader) {
      loader.innerHTML = `<span style="color: #ef4444;">Error loading video. Please try again.</span>`;
    }
  }
}

function getYouglishThemeColors() {
  const isDark = document.body.classList.contains('dark-mode');
  const bodyTheme = document.body.getAttribute('data-theme');
  
  if (bodyTheme === 'emerald') {
    return {
      backgroundColor: "#011c16",
      textColor: "#a7f3d0",
      captionColor: "#10b981",
      markerColor: "rgba(16, 185, 129, 0.15)",
      queryColor: "#f0fdf4",
      linkColor: "#10b981",
      titleColor: "#a7f3d0"
    };
  } else if (bodyTheme === 'gold') {
    return {
      backgroundColor: "#121214",
      textColor: "#e4e4e7",
      captionColor: "#eab308",
      markerColor: "rgba(234, 179, 8, 0.15)",
      queryColor: "#fef08a",
      linkColor: "#eab308",
      titleColor: "#e4e4e7"
    };
  } else if (isDark) {
    return {
      backgroundColor: "#0f081d",
      textColor: "#cbd5e1",
      captionColor: "#a855f7",
      markerColor: "rgba(168, 85, 247, 0.15)",
      queryColor: "#f8fafc",
      linkColor: "#a855f7",
      titleColor: "#cbd5e1"
    };
  } else {
    return {
      backgroundColor: "#f1f5f9",
      textColor: "#475569",
      captionColor: "#0284c7",
      markerColor: "rgba(2, 132, 199, 0.15)",
      queryColor: "#0f172a",
      linkColor: "#0284c7",
      titleColor: "#475569"
    };
  }
}

function onYouglishFetchDone(event) {
  if (state.youglishFallbackTimeout) {
    clearTimeout(state.youglishFallbackTimeout);
    state.youglishFallbackTimeout = null;
  }

  const loader = document.getElementById('yg-loader');
  const widgetEl = document.getElementById('yg-widget-element');
  const controlsEl = document.getElementById('yg-controls-container');
  
  if (event.totalResult === 0) {
    if (loader) {
      loader.style.display = 'flex';
      loader.innerHTML = `<span style="color: #ef4444; font-size: 0.9rem; text-align: center; padding: 1rem;">No YouGlish videos found for "${state.youglishCurrentWord}" with accent "${state.youglishSettings.accent.toUpperCase()}".</span>`;
    }
    if (widgetEl) widgetEl.style.display = 'none';
    if (controlsEl) controlsEl.style.display = 'none';
  } else {
    if (loader) loader.style.display = 'none';
    if (widgetEl) widgetEl.style.display = 'block';
    if (controlsEl) controlsEl.style.display = 'flex';
    state.youglishTotalTracks = event.totalResult;
    updateYouGlishTrackInfo();
  }
}

function onYouglishVideoChange(event) {
  state.youglishRepeatCounter = 0;
  state.youglishLastTrackNumber = event.trackNumber;
  state.youglishPlaying = true;
  clearYouGlishTimers();
  updateYouGlishTrackInfo();
  
  // Sync custom play/pause button (show pause bars when video starts playing)
  const btn = document.getElementById('yg-play-pause-btn');
  if (btn) {
    btn.innerHTML = `<svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
  }
}

function onYouglishCaptionChange(event) {
  clearYouGlishTimers();
  
  // YouGlish API returns URL-encoded captions; decode it to clean spaces and brackets
  const caption = decodeURIComponent(event.caption || '');
  
  // Format and render custom subtitles below the video
  const captionEl = document.getElementById('yg-custom-caption');
  if (captionEl) {
    let formattedCaption = caption;
    if (caption.includes('[[[')) {
      formattedCaption = caption
        .replace(/\[\[\[/g, '<mark class="yg-highlight">')
        .replace(/\]\]\]/g, '</mark>');
    }
    captionEl.innerHTML = formattedCaption;
    captionEl.style.display = 'block';
  }
  
  if (state.youglishSettings.repeatTarget === 'word' && caption.includes('[[[')) {
    const idxStart = caption.indexOf('[[[');
    const idxEnd = caption.indexOf(']]]');
    const textBefore = caption.substring(0, idxStart);
    const targetText = caption.substring(idxStart + 3, idxEnd);
    const cleanCaption = caption.replace(/\[\[\[/g, '').replace(/\]\]\]/g, '');
    const totalLen = cleanCaption.length;
    
    const endPercent = (textBefore.length + targetText.length) / totalLen;
    
    // Estimate segment duration in seconds (average 15 characters per second)
    const estDuration = Math.max(2, Math.min(6, totalLen / 15));
    
    // End of the word in milliseconds, plus a small buffer of 0.4s to ensure it's fully pronounced
    const endMs = Math.min(estDuration * 1000, (estDuration * endPercent + 0.4) * 1000);
    
    // Let the video play naturally from the start of the caption segment.
    // When the end of the word is reached, trigger the replay/next track loop.
    state.youglishWordTimeout = setTimeout(() => {
      if (!state.youglishActive || !state.youglishWidget) return;
      
      state.youglishRepeatCounter++;
      if (state.youglishRepeatCounter < state.youglishSettings.repeatCount) {
        state.youglishWidget.replay();
      } else {
        if (state.youglishLastTrackNumber < state.youglishTotalTracks) {
          state.youglishWidget.next();
        }
      }
    }, endMs);
  }
}

function onYouglishCaptionConsumed(event) {
  // If we are currently running a word loop timer, ignore caption consumed
  if (state.youglishSettings.repeatTarget === 'word' && state.youglishWordTimeout) return;
  
  if (!state.youglishActive || !state.youglishWidget) return;
  
  state.youglishRepeatCounter++;
  if (state.youglishRepeatCounter < state.youglishSettings.repeatCount) {
    state.youglishWidget.replay();
  } else {
    if (state.youglishLastTrackNumber < state.youglishTotalTracks) {
      state.youglishWidget.next();
    }
  }
}

function clearYouGlishTimers() {
  if (state.youglishWordTimeout) {
    clearTimeout(state.youglishWordTimeout);
    state.youglishWordTimeout = null;
  }
  if (state.youglishFallbackTimeout) {
    clearTimeout(state.youglishFallbackTimeout);
    state.youglishFallbackTimeout = null;
  }
}

function pauseYouGlish() {
  clearYouGlishTimers();
  if (state.youglishWidget) {
    try {
      state.youglishWidget.pause();
    } catch (e) {
      console.log("Could not pause YouGlish widget:", e);
    }
  }
}

// --- Custom Premium YouGlish Control Handlers ---

function previousYouGlishVideo() {
  if (state.youglishWidget) {
    try {
      state.youglishWidget.previous();
    } catch (e) {
      console.error("YouGlish previous failed:", e);
    }
  }
}

function nextYouGlishVideo() {
  if (state.youglishWidget) {
    try {
      state.youglishWidget.next();
    } catch (e) {
      console.error("YouGlish next failed:", e);
    }
  }
}

function replayYouGlishVideo() {
  if (state.youglishWidget) {
    try {
      state.youglishWidget.replay();
    } catch (e) {
      console.error("YouGlish replay failed:", e);
    }
  }
}

function changeYouGlishSpeed(speed) {
  if (state.youglishWidget) {
    try {
      state.youglishWidget.setSpeed(parseFloat(speed));
    } catch (e) {
      console.error("YouGlish setSpeed failed:", e);
    }
  }
}

function toggleYouGlishPlayPause() {
  if (!state.youglishWidget) return;
  const btn = document.getElementById('yg-play-pause-btn');
  try {
    if (state.youglishPlaying) {
      state.youglishWidget.pause();
      state.youglishPlaying = false;
      if (btn) {
        btn.innerHTML = `<svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }
    } else {
      state.youglishWidget.play();
      state.youglishPlaying = true;
      if (btn) {
        btn.innerHTML = `<svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      }
    }
  } catch (e) {
    console.error("YouGlish play/pause toggle failed:", e);
  }
}

function updateYouGlishTrackInfo() {
  const infoEl = document.getElementById('yg-track-info');
  if (infoEl) {
    const current = state.youglishLastTrackNumber > 0 ? state.youglishLastTrackNumber : 1;
    const total = state.youglishTotalTracks > 0 ? state.youglishTotalTracks : 0;
    infoEl.textContent = `Clip ${current} of ${total}`;
  }
}

// --- 9. STORY AUDIO PLAYER CONTROLLER ---

function highlightStorySentences(storyText, timestamps) {
  const parts = storyText.split("<div class='reading-comprehension'");
  let narrative = parts[0];
  
  const paragraphs = narrative.split("<br><br>");
  let globalSentenceIdx = 0;
  
  const processedParagraphs = paragraphs.map(para => {
    if (!para.trim()) return para;
    
    // Split sentences by dot/exclamation/question mark followed by space or end of string
    const sentences = para.split(/(?<=\.|\?|!)\s+/);
    
    const processedSentences = sentences.map(sentence => {
      if (!sentence.trim()) return sentence;
      
      const idx = globalSentenceIdx++;
      let timeAttrs = '';
      if (timestamps && timestamps[idx]) {
        timeAttrs = `data-start="${timestamps[idx].start}" data-end="${timestamps[idx].end}"`;
      }
      
      return `<span class="story-sentence" id="story-sentence-${idx}" ${timeAttrs}>${sentence}</span>`;
    });
    
    return processedSentences.join(" ");
  });
  
  let narrativeHighlighted = processedParagraphs.join("<br><br>");
  
  if (parts.length > 1) {
    return narrativeHighlighted + "<div class='reading-comprehension'" + parts[1];
  }
  return narrativeHighlighted;
}

function resetStoryAudio() {
  if (state.storyAudio) {
    state.storyAudio.pause();
    state.storyAudio.removeEventListener('timeupdate', onAudioTimeUpdate);
    state.storyAudio.removeEventListener('loadedmetadata', onAudioMetadataLoaded);
    state.storyAudio.removeEventListener('ended', onAudioEnded);
    state.storyAudio = null;
  }
  
  // Reset UI controls if they exist in DOM
  const playBtn = document.getElementById('story-play-btn');
  if (playBtn) playBtn.textContent = '▶';
  
  const progressBar = document.getElementById('story-progress-bar');
  if (progressBar) progressBar.style.width = '0%';
  
  const timeDisplay = document.getElementById('story-time-display');
  if (timeDisplay) timeDisplay.textContent = '0:00 / 0:00';
  
  // Remove all highlights
  document.querySelectorAll('.story-sentence').forEach(span => {
    span.classList.remove('active-sentence');
  });
}

function toggleStoryAudio(audioPath) {
  if (!state.storyAudio) {
    state.storyAudio = new Audio(audioPath);
    state.storyAudio.playbackRate = state.storyAudioSpeed;
    
    state.storyAudio.addEventListener('timeupdate', onAudioTimeUpdate);
    state.storyAudio.addEventListener('loadedmetadata', onAudioMetadataLoaded);
    state.storyAudio.addEventListener('ended', onAudioEnded);
  }
  
  const playBtn = document.getElementById('story-play-btn');
  if (state.storyAudio.paused) {
    state.storyAudio.play();
    if (playBtn) playBtn.textContent = '⏸';
  } else {
    state.storyAudio.pause();
    if (playBtn) playBtn.textContent = '▶';
  }
}

function seekStoryAudio(event) {
  const container = document.getElementById('story-progress-container');
  if (!container || !state.storyAudio) return;
  
  const rect = container.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = clickX / rect.width;
  
  if (state.storyAudio.duration) {
    state.storyAudio.currentTime = percentage * state.storyAudio.duration;
  }
}

function setStoryAudioSpeed(val) {
  const speed = parseFloat(val);
  state.storyAudioSpeed = speed;
  if (state.storyAudio) {
    state.storyAudio.playbackRate = speed;
  }
}

function onAudioTimeUpdate() {
  const audio = state.storyAudio;
  if (!audio) return;
  
  const currentTime = audio.currentTime;
  
  // Update progress bar
  const progressBar = document.getElementById('story-progress-bar');
  if (progressBar) {
    const percentage = (currentTime / audio.duration) * 100;
    progressBar.style.width = `${percentage}%`;
  }
  
  // Update time display
  const timeDisplay = document.getElementById('story-time-display');
  if (timeDisplay) {
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(audio.duration || 0)}`;
  }
  
  // Highlight active sentence
  const sentences = document.querySelectorAll('.story-sentence');
  sentences.forEach(span => {
    const start = parseFloat(span.getAttribute('data-start'));
    const end = parseFloat(span.getAttribute('data-end'));
    
    if (currentTime >= start && currentTime <= end) {
      span.classList.add('active-sentence');
    } else {
      span.classList.remove('active-sentence');
    }
  });
}

function onAudioMetadataLoaded() {
  const audio = state.storyAudio;
  if (!audio) return;
  const timeDisplay = document.getElementById('story-time-display');
  if (timeDisplay) {
    timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
  }
}

function onAudioEnded() {
  resetStoryAudio();
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
