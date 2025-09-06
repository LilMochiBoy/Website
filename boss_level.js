const questions = [
  {
    type: "arrange",
    words: ["我", "是", "学生", "一个"],
    correct: "我是一个学生。"
  },
  {
    type: "arrange",
    words: ["他", "喜欢", "吃", "苹果"],
    correct: "他喜欢吃苹果。"
  },
  {
    type: "arrange",
    words: ["妈妈", "在", "厨房", "做饭"],
    correct: "妈妈在厨房做饭。"
  },
  {
    type: "arrange",
    words: ["我们", "明天", "去", "北京"],
    correct: "我们明天去北京。"
  },
  {
    type: "arrange",
    words: ["这", "是", "我的", "书包"],
    correct: "这是我的书包。"
  },
  {
    type: "arrange",
    words: ["他", "会", "说", "英语"],
    correct: "他会说英语。"
  },
  {
    type: "arrange",
    words: ["现在", "是", "八点", "半"],
    correct: "现在是八点半。"
  },
  {
    type: "arrange",
    words: ["我", "每天", "六点", "起床"],
    correct: "我每天六点起床。"
  },
  {
    type: "arrange",
    words: ["她", "有", "两只", "狗"],
    correct: "她有两只狗。"
  },
  {
    type: "arrange",
    words: ["我们", "在", "公园", "玩"],
    correct: "我们在公园玩。"
  }
];


let currentQuestion = 0;
let selectedWords = [];
let selectedWordIndices = [];

// Boss hearts logic
let bossMaxHearts = 5;
let bossHearts = bossMaxHearts;

const bossHeartsDiv = document.getElementById('bossHearts');

function renderBossHearts() {
  if (!bossHeartsDiv) return;
  bossHeartsDiv.innerHTML = '';
  for (let i = 0; i < bossMaxHearts; i++) {
    const img = document.createElement('img');
    img.src = i < bossHearts ? 'Heart.png' : 'Emptyheart.png';
    img.alt = i < bossHearts ? 'Heart' : 'Empty Heart';
    img.style.width = '38px';
    img.style.height = '38px';
    img.style.margin = '0 4px';
    bossHeartsDiv.appendChild(img);
  }
}

const questionText = document.getElementById('questionText');
const scrambledWords = document.getElementById('scrambledWords');
const answerBox = document.getElementById('answerBox');
const submitBtn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');


function showQuestion() {
  const q = questions[currentQuestion];
  // Show question number and boss hearts
  questionText.textContent = `Boss Level: Arrange the sentence (${currentQuestion + 1} / ${questions.length})`;
  scrambledWords.innerHTML = '';
  selectedWords = [];
  selectedWordIndices = [];
  answerBox.innerHTML = '';
  feedback.textContent = '';
  q.words.forEach((word, idx) => {
    const btn = document.createElement('button');
    btn.textContent = word;
    btn.className = 'word-btn';
    btn.draggable = true;
    btn.ondragstart = (e) => {
      e.dataTransfer.setData('text/plain', idx);
    };
    btn.onclick = () => selectWord(idx);
    // Always speak on mousedown/touchstart for instant feedback
    btn.addEventListener('mousedown', (e) => { speakWord(word); });
    btn.addEventListener('touchstart', (e) => { speakWord(word); });
    scrambledWords.appendChild(btn);
  });
  answerBox.ondragover = (e) => e.preventDefault();
  answerBox.ondrop = (e) => {
    e.preventDefault();
    const idx = parseInt(e.dataTransfer.getData('text/plain'));
    selectWord(idx);
  };
  renderBossHearts();
}

function speakWord(word) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(word);
    if (/^[\u4e00-\u9fa5]+$/.test(word)) {
      utter.lang = 'zh-CN';
    } else {
      utter.lang = 'en-US';
    }
    utter.rate = 1.1;
    window.speechSynthesis.speak(utter);
  }
}

function selectWord(idx) {
  const q = questions[currentQuestion];
  const btns = scrambledWords.querySelectorAll('.word-btn');
  if (!selectedWordIndices.includes(idx)) {
    btns[idx].classList.add('selected');
    selectedWords.push(q.words[idx]);
    selectedWordIndices.push(idx);
    renderAnswerBox();
  }
  speakWord(q.words[idx]);
}

function renderAnswerBox() {
  answerBox.innerHTML = '';
  selectedWords.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'answer-word';
    span.textContent = word;
    span.draggable = true;
    span.ondragstart = (e) => {
      e.dataTransfer.setData('answer-index', i);
    };
    span.onclick = () => {
      speakWord(word);
      removeWord(i);
    };
    // Always speak on mousedown/touchstart for instant feedback
    span.addEventListener('mousedown', (e) => { speakWord(word); });
    span.addEventListener('touchstart', (e) => { speakWord(word); });
    answerBox.appendChild(span);
  });

  answerBox.ondragover = (e) => e.preventDefault();
  answerBox.ondrop = (e) => {
    e.preventDefault();
    const fromIdx = parseInt(e.dataTransfer.getData('answer-index'));
    const toIdx = Array.from(answerBox.children).indexOf(e.target);
    if (!isNaN(fromIdx) && toIdx !== -1 && fromIdx !== toIdx) {
      const word = selectedWords.splice(fromIdx, 1)[0];
      const wordIdx = selectedWordIndices.splice(fromIdx, 1)[0];
      selectedWords.splice(toIdx, 0, word);
      selectedWordIndices.splice(toIdx, 0, wordIdx);
      renderAnswerBox();
    }
  };
}

function removeWord(i) {
  selectedWords.splice(i, 1);
  selectedWordIndices.splice(i, 1);
  const btns = scrambledWords.querySelectorAll('.word-btn');
  btns.forEach(btn => btn.classList.remove('selected'));
  selectedWordIndices.forEach(idx => btns[idx].classList.add('selected'));
  renderAnswerBox();
}

function checkAnswer() {
  const q = questions[currentQuestion];
  const userAnswer = selectedWords.join('') + '。';
  if (userAnswer === q.correct) {
    // Reduce boss heart
    if (bossHearts > 0) bossHearts--;
    renderBossHearts();
    feedback.textContent = 'Correct!';
    feedback.style.color = '#4caf50';
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length && bossHearts > 0) {
        showQuestion();
      } else if (bossHearts === 0) {
        questionText.textContent = 'You defeated the Boss!';
        scrambledWords.innerHTML = '';
        answerBox.innerHTML = '';
        submitBtn.style.display = 'none';
        feedback.textContent = '';
        renderBossHearts();
      } else {
        questionText.textContent = 'Congratulations! You completed the game!';
        scrambledWords.innerHTML = '';
        answerBox.innerHTML = '';
        submitBtn.style.display = 'none';
        feedback.textContent = '';
      }
    }, 1000);
  } else {
    feedback.textContent = 'Wrong! Try again.';
    feedback.style.color = '#f44336';
    setTimeout(() => {
      showQuestion();
    }, 1000);
  }
}

submitBtn.onclick = checkAnswer;


renderBossHearts();
showQuestion();
