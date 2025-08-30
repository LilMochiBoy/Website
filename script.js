function openLoginModal() {
    document.getElementById('loginModalBg').style.display = 'flex';
}
function closeLoginModal() {
    document.getElementById('loginModalBg').style.display = 'none';
}
function openSignUpModal() {
    document.getElementById('signupModalBg').style.display = 'flex';
}
function closeSignUpModal() {
    document.getElementById('signupModalBg').style.display = 'none';
}
function showSignUp() {
    closeLoginModal();
    openSignUpModal();
}
function loginSubmit() {
    // Dummy login logic
    var user = document.getElementById('loginUsername').value;
    var pass = document.getElementById('loginPassword').value;
    if (user && pass) {
        alert('Logged in as ' + user);
        closeLoginModal();
    } else {
        alert('Please enter username and password.');
    }
}
function signupSubmit() {
    var user = document.getElementById('signupUsername').value;
    var email = document.getElementById('signupEmail').value;
    var pass = document.getElementById('signupPassword').value;
    var confirm = document.getElementById('signupConfirm').value;
    if (!user || !email || !pass || !confirm) {
        alert('Please fill all fields.');
        return;
    }
    if (pass !== confirm) {
        alert('Passwords do not match.');
        return;
    }
    alert('Account created for ' + user + ' (' + email + ')');
    closeSignUpModal();
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginBtn').onclick = openLoginModal;
    document.getElementById('chineseBtn').onclick = function() {
        alert('Start learning Chinese!');
    };
    document.getElementById('englishBtn').onclick = function() {
        alert('Start learning English!');
    };
});

// Animated flowing words for Home page
const flowingWords = [
    { text: "Hello", side: "right" },
    { text: "你好", side: "left" },
    { text: "Welcome", side: "left" },
    { text: "欢迎", side: "right" },
    { text: "Learn", side: "right" },
    { text: "学习", side: "left" },
    { text: "Thank you", side: "right" },
    { text: "谢谢", side: "left" },
    { text: "Good morning", side: "left" },
    { text: "早安", side: "right" },
    { text: "Good night", side: "right" },
    { text: "晚安", side: "left" },
    { text: "Friend", side: "left" },
    { text: "朋友", side: "right" },
    { text: "Family", side: "right" },
    { text: "家人", side: "left" },
    { text: "School", side: "left" },
    { text: "学校", side: "right" },
    { text: "Teacher", side: "right" },
    { text: "老师", side: "left" },
    { text: "Student", side: "left" },
    { text: "学生", side: "right" },
    { text: "Love", side: "right" },
    { text: "爱", side: "left" },
    { text: "Happy", side: "left" },
    { text: "快乐", side: "right" },
    { text: "Food", side: "right" },
    { text: "食物", side: "left" },
    { text: "Water", side: "left" },
    { text: "水", side: "right" }
];

function animateWords() {
    const container = document.querySelector('.word-flow-container');
    if (!container) return;
    let activePositions = [];
    function getNonOverlappingLeft() {
        const minPercent = 5;
        const maxPercent = 85;
        let tries = 0;
        while (tries < 10) {
            const randomPercent = Math.floor(Math.random() * (maxPercent - minPercent + 1)) + minPercent;
            // Check for overlap (within 12% of another word)
            if (!activePositions.some(pos => Math.abs(pos - randomPercent) < 12)) {
                activePositions.push(randomPercent);
                return randomPercent;
            }
            tries++;
        }
        // If can't find, just return a random position
        const fallback = Math.floor(Math.random() * (maxPercent - minPercent + 1)) + minPercent;
        activePositions.push(fallback);
        return fallback;
    }
    function showWords() {
        activePositions = [];
        const numWords = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numWords; i++) {
            const wordObj = flowingWords[Math.floor(Math.random() * flowingWords.length)];
            const wordDiv = document.createElement('div');
            wordDiv.className = 'word-flow ' + wordObj.side;
            wordDiv.textContent = wordObj.text;
            const leftPercent = getNonOverlappingLeft();
            wordDiv.style.left = leftPercent + '%';
            wordDiv.style.right = 'auto';
            container.appendChild(wordDiv);
            setTimeout(() => {
                wordDiv.remove();
            }, 3500);
        }
        setTimeout(showWords, 900 + Math.random() * 1200);
    }
    showWords();
}

window.addEventListener('DOMContentLoaded', animateWords);

// Fade out home section on scroll
window.addEventListener('scroll', function() {
    const home = document.getElementById('home-section');
    if (!home) return;
    if (window.scrollY > 40) {
        home.classList.add('fade');
    } else {
        home.classList.remove('fade');
    }
});
