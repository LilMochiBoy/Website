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
    // Team member info modal for each card
    var teamCards = document.querySelectorAll('.team-card');
    var teamInfo = [
        {
            name: '刘明坚', englishName: 'Richard Alexander', age: 19, id: '1820242128', role: 'CEO', photo: 'Photo 2.jpg', bio: 'Leader and visionary of Zendo.', essay: ''
        },
        {
            name: '陈惠怡', englishName: 'Vanessa Minerva', age: 19, id: '1820242114', role: 'CIO & Writer', photo: 'Photo 3.jpg', bio: 'Chief Information Officer and content creator.', essay: ''
        },
        {
            name: '吴丽翡', englishName: 'Velerie Roxanne', age: 19, id: '1820242121', role: 'Designer & Writer', photo: 'Photo 4.jpg', bio: 'Designs and writes for Zendo.', essay: ''
        },
        {
            name: '吴家锦', englishName: 'Timothy Nathanael', age: 19, id: '1820242141', role: 'Designer & Progammer', photo: 'Photo 5.jpg', bio: 'Designs and codes for Zendo.', essay: ''
        },
        {
            name: '廖泰诚', englishName: 'Reynard Jave', age: 19, id: '1820242123', role: 'Programmer', photo: 'Photo 6.jpg', bio: 'Backend and frontend developer.', essay: ''
        },
        {
            name: '黄友帆', englishName: 'Valentino Jovan', age: 18, id: '1820242130', role: 'Programmer', photo: 'Photo 1.jpg', bio: 'Programmer and technical support.', essay: ''
        }
    ];
    teamCards.forEach(function(card, idx) {
        card.style.cursor = 'pointer';
        card.onclick = function() {
                var member = teamInfo[idx];
                // Unique accent colors and essay backgrounds for each member
                var accentColors = [
                    '#3b5998', // Richard Alexander
                    '#8e44ad', // Vanessa Minerva
                    '#16a085', // Velerie Roxanne
                    '#e67e22', // Timothy Nathanael
                    '#2d98da', // Reynard Jave
                    '#f7b731'  // Valentino Jovan
                ];
                var essayBgColors = [
                    '#f0f4fa', // Richard Alexander
                    '#f3eafc', // Vanessa Minerva
                    '#eafaf3', // Velerie Roxanne
                    '#fdf6ec', // Timothy Nathanael
                    '#eaf4fb', // Reynard Jave
                    '#fffbe6'  // Valentino Jovan
                ];
                var accent = accentColors[idx % accentColors.length];
                var essayBg = essayBgColors[idx % essayBgColors.length];
                var html = '<div style="display:flex;align-items:flex-start;justify-content:center;min-width:1000px;min-height:520px;max-width:1200px;'+
                    'background:#23263a;border-radius:36px;box-shadow:0 12px 48px #22253a;'+
                    'border:2.5px solid #44475a;">';
                html += '<div style="flex:0 0 340px;display:flex;align-items:center;justify-content:center;height:480px;">';
                html += '<img src="' + member.photo + '" style="width:260px;height:360px;border-radius:24px;object-fit:cover;box-shadow:0 8px 32px ' + accent + ';border:4px solid #fff;" />';
                html += '</div>';
                html += '<div style="flex:1;padding:36px 44px 36px 44px;">';
                html += '<div style="display:flex;align-items:center;gap:18px;margin-bottom:16px;">';
                html += '<span style="font-size:2.6em;color:' + accent + ';font-family:Satisfy,cursive,serif;font-weight:bold;text-shadow:0 2px 8px #fff,0 0 2px #b6b6d6;">' + member.name + '</span>';
                html += '<span style="font-size:1.5em;color:#e0e6ff;font-family:Satisfy,cursive,serif;font-weight:500;text-shadow:0 1px 4px #22253a;">' + member.englishName + '</span>';
                html += '</div>';
                html += '<div style="display:flex;gap:32px;margin-bottom:18px;">';
                html += '<p style="font-size:1.13em;color:' + accent + ';background:#f7f7fa;padding:8px 18px;border-radius:12px;box-shadow:0 1px 4px #e3e6f3;border:1.5px solid ' + accent + ';font-weight:500;"><strong>Age:</strong> ' + member.age + '</p>';
                html += '<p style="font-size:1.13em;color:' + accent + ';background:#f7f7fa;padding:8px 18px;border-radius:12px;box-shadow:0 1px 4px #e3e6f3;border:1.5px solid ' + accent + ';font-weight:500;"><strong>ID:</strong> ' + member.id + '</p>';
                html += '<p style="font-size:1.13em;color:' + accent + ';background:#f7f7fa;padding:8px 18px;border-radius:12px;box-shadow:0 1px 4px #e3e6f3;border:1.5px solid ' + accent + ';font-weight:500;"><strong>Role:</strong> ' + member.role + '</p>';
                html += '</div>';
                html += '<div style="margin-top:18px;padding:22px 24px;background:' + essayBg + ';border-radius:18px;box-shadow:0 2px 12px ' + accent + ';max-height:220px;overflow-y:auto;font-size:1.15em;line-height:1.8;color:#2d2d4d;font-family:Georgia,serif;border:2px solid ' + accent + ';position:relative;scrollbar-width:none;">';
                html += '<style>.modal-essay::-webkit-scrollbar{display:none;}</style>';
                html += member.essay;
                html += '</div>';
                html += '</div>';
                html += '</div>';
                showModal(html);
        };
    });
});

// Flowing Texts
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
            if (!activePositions.some(pos => Math.abs(pos - randomPercent) < 12)) {
                activePositions.push(randomPercent);
                return randomPercent;
            }
            tries++;
        }
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

window.addEventListener('scroll', function() {
    const home = document.getElementById('home-section');
    if (!home) return;
    if (window.scrollY > 40) {
        home.classList.add('fade');
    } else {
        home.classList.remove('fade');
    }
});

// Modal for team info
function showModal(html) {
    var modalBg = document.getElementById('modalBg');
    var modalText = document.getElementById('modalText');
    if (modalBg && modalText) {
        modalText.innerHTML = html;
        modalBg.style.display = 'flex';
    }
}
function closeModal() {
    var modalBg = document.getElementById('modalBg');
    if (modalBg) modalBg.style.display = 'none';
}
