let playerHP = 100;
let bossHP = 100;

const questionText = document.getElementById('question-text');
const answerBtns = document.querySelectorAll('.answer-btn');
const playerHealth = document.getElementById('player-health');
const bossHealth = document.getElementById('boss-health');
const missilesContainer = document.querySelector('.missiles');

const questions = [
    {q: "Hello?", options: ["你好", "再见", "谢谢", "晚安"], answer: "你好"},
    {q: "Thank you?", options: ["请", "谢谢", "早上好", "晚安"], answer: "谢谢"},
    {q: "Good night?", options: ["早上好", "晚安", "谢谢", "你好"], answer: "晚安"},
    {q: "Please?", options: ["请", "谢谢", "再见", "晚安"], answer: "请"}
];

let currentQuestion = 0;

function updateQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.q;
    answerBtns.forEach((btn, i) => btn.textContent = q.options[i]);
}

// Missile function with curved path
function fireMissile(fromPlayer = true) {
    const missile = document.createElement('div');
    missile.classList.add('missile');

    const player = document.querySelector('.player');
    const boss = document.querySelector('.boss');
    const gameArea = document.querySelector('.game-area');

    // Get positions relative to game area
    const gameRect = gameArea.getBoundingClientRect();
    const start = fromPlayer ? player.getBoundingClientRect() : boss.getBoundingClientRect();
    const target = fromPlayer ? boss.getBoundingClientRect() : player.getBoundingClientRect();

    const startX = start.left - gameRect.left + start.width / 2 - 8; // 8 = missile radius
    const startY = start.top - gameRect.top + start.height / 2 - 8;

    const deltaX = target.left - start.left;
    const deltaY = target.top - start.top;

    missile.style.left = `${startX}px`;
    missile.style.top = `${startY}px`;

    gameArea.appendChild(missile);

    missile.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${deltaX}px, ${deltaY}px)` }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
    });

    setTimeout(() => missile.remove(), 600);
}

answerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const q = questions[currentQuestion];
        const correct = btn.textContent === q.answer;
        if(correct) {
            fireMissile(true);
            bossHP -= 25;
            bossHealth.style.width = bossHP + '%';
            if(bossHP <= 0) {
                alert("Boss defeated! 🏆");
                bossHP = 100;
                bossHealth.style.width = bossHP + '%';
            }
        } else {
            fireMissile(false);
            playerHP -= 25;
            playerHealth.style.width = playerHP + '%';
            if(playerHP <= 0) {
                alert("You lost! Try again.");
                playerHP = 100;
                playerHealth.style.width = playerHP + '%';
            }
        }

        currentQuestion++;
        if(currentQuestion >= questions.length) currentQuestion = 0;
        updateQuestion();
    });
});

updateQuestion();
