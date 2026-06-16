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
  youglishLastTrackNumber: -1
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
    const item = document.createElement('div');
    item.className = 'vocab-item';
    item.innerHTML = `
      <div class="vocab-word-header">
        <span class="vocab-word">${v.word}</span>
        <span class="vocab-type">[${v.type}]</span>
        <span class="vocab-pronounce">${v.stress}</span>
      </div>
      <div class="vocab-def">${v.def}</div>
      <div class="vocab-details">
        <div><strong>Example:</strong> <em>"${v.ex}"</em></div>
        <div><strong>Collocations:</strong> ${v.coll}</div>
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

function renderVocabQuizSection(module) {
  const quizContainer = document.getElementById('vocab-quiz-container');
  if (!quizContainer) return;
  
  quizContainer.innerHTML = '';
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
  
  const qCard = document.getElementById(`vocab-quiz-card-${qIndex}`);
  const optionsContainer = document.getElementById(`vocab-options-container-${qIndex}`);
  if (optionsContainer) {
    optionsContainer.classList.add('answered');
  }
  
  // Highlight chosen option
  const chosen = document.getElementById(`vocab-option-${qIndex}-${oIndex}`);
  if (chosen) {
    if (isCorrect) {
      chosen.classList.add('correct');
    } else {
      chosen.classList.add('incorrect');
      // Highlight correct option as well
      const correctOpt = document.getElementById(`vocab-option-${qIndex}-${q.answer}`);
      if (correctOpt) {
        correctOpt.classList.add('correct');
      }
    }
  }
  
  // Display feedback instantly
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
  
  const arabicTrans = v.arabic || '';
  const syllables = v.syllables || v.stress || v.word;
  const ipa = v.ipa || '/.../';
  
  cardContent.innerHTML = `
    <div class="word-card-header">
      <div>
        <h2 class="word-card-title">${v.word}</h2>
        <div style="margin-top: 0.3rem; display: flex; gap: 0.5rem; align-items: center;">
          <span class="word-card-type">${v.type}</span>
          <span style="font-size: 1.1rem; color: #a855f7; font-weight: 600;">${arabicTrans}</span>
        </div>
      </div>
      <div style="display: flex; gap: 0.8rem; align-items: center;">
        <button class="word-card-action-btn video-btn" id="word-video-btn" onclick="toggleYouGlishPlayer('${v.word.replace(/'/g, "\\'")}')" title="Watch Pronunciation Video">
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
      <div class="word-card-def">${v.def}</div>
    </div>
    
    <div>
      <div class="word-card-section-title">Example Sentence</div>
      <div class="word-card-ex">"${v.ex}"</div>
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
      <div class="yg-custom-caption-container" id="yg-custom-caption" style="display: none;"></div>
    </div>
    
    <div>
      <div class="word-card-section-title">Visualization</div>
      <div class="word-image-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>16:9 Image Visualization Placeholder</span>
      </div>
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
  const width = container ? container.clientWidth : (window.innerWidth <= 480 ? 320 : 500);
  const height = container ? container.clientHeight : (window.innerWidth <= 480 ? 265 : 315);
  
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
    // Use components: 80 (shows player + speed controls + control buttons; hides native caption, search box and title)
    state.youglishWidget = new YG.Widget("yg-widget-element", {
      width: width,
      height: height,
      components: 80,
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
  
  if (event.totalResult === 0) {
    if (loader) {
      loader.style.display = 'flex';
      loader.innerHTML = `<span style="color: #ef4444; font-size: 0.9rem; text-align: center; padding: 1rem;">No YouGlish videos found for "${state.youglishCurrentWord}" with accent "${state.youglishSettings.accent.toUpperCase()}".</span>`;
    }
    if (widgetEl) widgetEl.style.display = 'none';
  } else {
    if (loader) loader.style.display = 'none';
    if (widgetEl) widgetEl.style.display = 'block';
    state.youglishTotalTracks = event.totalResult;
  }
}

function onYouglishVideoChange(event) {
  state.youglishRepeatCounter = 0;
  state.youglishLastTrackNumber = event.trackNumber;
  clearYouGlishTimers();
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
    captionEl.style.display = 'flex';
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
