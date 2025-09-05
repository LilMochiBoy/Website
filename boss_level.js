// boss_level.js
// Handles boss health, question logic, and UI for Boss Level

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
let bossHealth = 10;
const maxHealth = 10;

const healthFill = document.getElementById('healthFill');
const questionText = document.getElementById('questionText');
const scrambledWords = document.getElementById('scrambledWords');
const answerBox = document.getElementById('answerBox');
const submitBtn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');

function updateHealthBar() {
  const percent = (bossHealth / maxHealth) * 100;
  healthFill.style.width = percent + '%';
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;
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
    scrambledWords.appendChild(btn);
  });
  answerBox.ondragover = (e) => e.preventDefault();
  answerBox.ondrop = (e) => {
    e.preventDefault();
    const idx = parseInt(e.dataTransfer.getData('text/plain'));
    selectWord(idx);
  };
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
    span.onclick = () => removeWord(i);
    answerBox.appendChild(span);
  });
  // Allow rearranging answer words
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
function removeWord(i) {
  selectedWords.splice(i, 1);
  selectedWordIndices.splice(i, 1);
  // Unselect the word in scrambledWords
  const btns = scrambledWords.querySelectorAll('.word-btn');
  btns.forEach(btn => btn.classList.remove('selected'));
  selectedWordIndices.forEach(idx => btns[idx].classList.add('selected'));
  renderAnswerBox();
}
}
}

function checkAnswer() {
  const q = questions[currentQuestion];
  const userAnswer = selectedWords.join('') + '。';
  if (userAnswer === q.correct) {
    bossHealth--;
    updateHealthBar();
    feedback.textContent = 'Correct!';
    feedback.style.color = '#4caf50';
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length && bossHealth > 0) {
        showQuestion();
        updateHealthBar();
      } else if (bossHealth <= 0) {
        questionText.textContent = 'Congratulations! You defeated the Boss!';
        scrambledWords.innerHTML = '';
        answerBox.innerHTML = '';
        submitBtn.style.display = 'none';
        feedback.textContent = '';
        healthFill.style.width = '0%';
        healthFill.style.background = '#4caf50';
      } else {
        questionText.textContent = 'Congratulations! You defeated the Boss!';
        scrambledWords.innerHTML = '';
        answerBox.textContent = '';
        submitBtn.style.display = 'none';
        feedback.textContent = '';
        healthFill.style.width = '0%';
        healthFill.style.background = '#4caf50';
      }
    }, 1000);
  } else {
    feedback.textContent = 'Wrong! Try again.';
    feedback.style.color = '#f44336';
    setTimeout(() => {
      showQuestion();
      updateHealthBar();
    }, 1000);
  }
}

submitBtn.onclick = checkAnswer;

updateHealthBar();
showQuestion();
