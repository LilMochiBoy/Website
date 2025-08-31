// Panda words randomizer (fade-in animation)

const pandaWordsList = ["Hello!", "Welcome", "朋友", "欢迎", "谢谢", "ThankYou", "现在", "Home"];
let lastPandaWordIdx = null;
let lastPandaPosIdx = null;
function showRandomPandaWord() {
    const wordClasses = ["panda-word-1", "panda-word-2", "panda-word-3", "panda-word-4"];
    // Hide all words
    wordClasses.forEach(cls => {
        const el = document.querySelector('.' + cls);
        if (el) {
            el.style.opacity = 0;
        }
    });
    // Pick a random word and position, avoiding last used
    let idx, posIdx;
    let tries = 0;
    do {
        idx = Math.floor(Math.random() * pandaWordsList.length);
        posIdx = Math.floor(Math.random() * wordClasses.length);
        tries++;
    } while ((idx === lastPandaWordIdx || posIdx === lastPandaPosIdx) && tries < 10);
    lastPandaWordIdx = idx;
    lastPandaPosIdx = posIdx;
    const el = document.querySelector('.' + wordClasses[posIdx]);
    if (el) {
        el.textContent = pandaWordsList[idx];
        setTimeout(() => {
            el.style.opacity = 1;
        }, 100);
    }
}

window.addEventListener('DOMContentLoaded', function() {
    showRandomPandaWord();
    setInterval(showRandomPandaWord, 1500);
});
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

// Updated loginSubmit to use backend
function loginSubmit() {
    var user = document.getElementById('loginUsername').value;
    var pass = document.getElementById('loginPassword').value;
    if (!user || !pass) {
        showModal('Please enter username and password.');
        return;
    }
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: user, password: pass})
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            closeLoginModal();
            setLoggedInUI(user);
            showModal('Login successful! Welcome, ' + user);
        } else {
            showModal('Login failed: ' + data.message);
        }
    })
    .catch(() => showModal('Unable to connect to server.'));
}

// Updated signupSubmit to use backend
function signupSubmit() {
    var user = document.getElementById('signupUsername').value;
    var email = document.getElementById('signupEmail').value;
    var pass = document.getElementById('signupPassword').value;
    var confirm = document.getElementById('signupConfirm').value;
    if (!user || !email || !pass || !confirm) {
        showModal('Please fill all fields.');
        return;
    }
    if (pass !== confirm) {
        showModal('Passwords do not match!');
        return;
    }
    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: user, email: email, password: pass})
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            closeSignUpModal();
            setLoggedInUI(user);
            showModal('Sign up successful! You are now logged in.');
        } else {
            showModal('Sign up failed: ' + data.message);
        }
    })
    .catch(() => showModal('Unable to connect to server.'));
}

document.addEventListener('DOMContentLoaded', function() {
    var loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.onclick = openLoginModal;

    var chineseBtn = document.getElementById('chineseBtn');
    if (chineseBtn) {
        chineseBtn.onclick = function() {
            alert('Start learning Chinese!');
        };
    }

    var teamCards = document.querySelectorAll('.team-card');
    var teamInfo = [
    {
        name: '刘明坚', 
        englishName: 'Richard Alexander Leonardy', 
        age: 19, 
        id: '1820242128', 
        role: 'CEO', 
        photo: 'Photo 2.jpg', 
        bio: 'Leader and visionary of Zendo.', 
        essay: "Hi! I’m Richard Alexander Leonardy (Chinese name: 刘明坚), and I’m the CEO of our team. In this project, I help guide the team, organize tasks, and make sure everything stays on track. I enjoy taking responsibility and contributing to planning and coordination so the project runs smoothly. Being part of this team has also taught me a lot about teamwork and how to keep things moving efficiently while balancing everyone’s ideas and input.<br><br>Outside of the project, I like spending time playing basketball. It is a great way to stay active, challenge myself both physically and mentally, and take a break from schoolwork. I also enjoy keeping things simple and comfortable in my daily life, from the way I dress to the way I organize my time. I find that having consistent habits helps me stay focused and productive while still leaving room for hobbies and relaxation.<br><br>I enjoy thinking through ideas, planning ahead, and figuring out ways to tackle challenges effectively. I am someone who likes to stay curious and motivated, always looking for ways to learn and grow. I also value balance, working hard on projects or school tasks while making sure I take the time to enjoy life and recharge. Overall, I try to approach everything thoughtfully, stay engaged, and make the most of every experience."
    },
    {
        name: '陈惠怡', 
        englishName: 'Vanessa Minerva Sutanto', 
        age: 19, 
        id: '1820242114', 
        role: 'CIO & Writer', 
        photo: 'Photo 3.jpg', 
        bio: 'Chief Information Officer and content creator.', 
        essay: "Hi! I’m Vanessa Minerva Sutanto (Chinese name: 陈惠怡), and I’m the CIO & Writer of our team. In this project, I ensure all parts of the project come together smoothly and that we meet all deadlines. My days are spent coordinating the team’s workflow, facilitating clear communication, and meticulously tracking progress to ensure everyone’s tasks are aligned and meeting requirements. I believe a well-organized process is the backbone of any successful project.<br><br>A critical part of my responsibility is the final quality check. I organize all our project assets, from the HTML and CSS structures to the JavaScript functionality and media files. I run thorough checks for consistency in style and code, verify that every interactive link works perfectly, and ensure all content is formatted correctly for an optimal user journey. As the final submitter, I take great care in compiling everything into a polished and organized package that truly reflects our team’s hard work.<br><br>It’s been an incredible experience collaborating with such a dedicated and talented team, and I’m excited to see how our hard work comes to life and make an impact!"
    },
    {
        name: '吴丽翡', 
        englishName: 'Velerie Roxanne Gabriel', 
        age: 19, 
        id: '1820242121', 
        role: 'Designer & Writer', 
        photo: 'Photo 4.jpg', 
        bio: 'Designs and writes for Zendo.', 
        essay: "Hi! I’m Velerie Roxanne Gabriel (Chinese name: 吴丽翡), and I’m responsible for both the design and writing aspects of our team’s project. As the designer, my role is to create the visual identity of our website, ensuring that it is not only visually appealing but also functional and user-friendly. This includes working on the layout, color schemes, typography, and overall aesthetic of the site. I collaborate closely with the rest of the team to ensure that our design aligns with the project’s theme and objectives.<br><br>In addition to design, I’m also in charge of the written content. I work on crafting engaging text for various sections of the site, including the homepage, team introduction, and other content that helps visitors understand our project and its purpose. I believe that well-thought-out design and clear, informative writing go hand in hand, and my goal is to create a seamless and cohesive experience for our users.<br><br>I am truly passionate about combining creativity with functionality. Every design element I choose, and every piece of content I write, has a clear purpose: to contribute to a positive user experience. This project is an exciting opportunity for me to contribute my skills in both design and writing, and I am thrilled to see how our collective efforts come together in the final product."
    },
    {
        name: '吴家锦', 
        englishName: 'Timothy Nathaniel Sudirgo', 
        age: 19, 
        id: '1820242141', 
        role: 'Designer & Programmer', 
        photo: 'Photo 5.jpg', 
        bio: 'Designs and codes for Zendo.', 
        essay: "Hi! I’m Timothy Nathaniel Sudirgo (Chinese name: 吴家锦), and I’m the Designer & Programmer of our team. I coded the entire design of the website you see and interact with today using HTML and CSS, focusing on creating an experience that is both visually appealing and easy to navigate. My personal experience navigating life and studies in China inspired me to create a tool that could make mastering English and Chinese more intuitive, structured, and fun for others on a similar path.<br><br>Outside of my academic and coding life, I have a deep passion for the arts. You can almost always find me listening to a diverse range of music, which helps me focus and think creatively, or watching movies. These hobbies are my source of inspiration and a way to see design and structure from new perspectives.<br><br>It has been an incredible journey blending my hobbies, studies, and personal experience into this project, and I sincerely hope you find it useful on your own language-learning adventure."
    },
    {
        name: '廖泰诚', 
        englishName: 'Reynard Jave Hanson', 
        age: 19, 
        id: '1820242123', 
        role: 'Programmer', 
        photo: 'Photo 6.jpg', 
        bio: 'Backend and frontend developer.', 
        essay: "Hi! I’m Reynard Jave Hanson (Chinese name: 廖泰诚), and I am the Programmer of our team. My responsibilities include building the HTML structure that forms the foundation of each page, applying CSS to design layouts and styling, and implementing interactive features and dynamic content using JavaScript. I also work on debugging errors and fixing broken layouts or links to ensure that the website functions smoothly and delivers a seamless user experience.<br><br>I am motivated by the idea that the skills I develop from creating this website will give me the ability to create innovative solutions for real-world challenges in the future.<br><br>Outside of academics, I enjoy spending my free time on activities that keep me active and energized. My hobbies include swimming, cycling, and working out. These activities not only help me maintain a healthy lifestyle outside of coding, but also teach me discipline, consistency, and resilience qualities that I believe are just as important in the world of programming.<br><br>Through this project, I am gaining valuable hands-on experience and strengthening my technical skills. My goal is to continue learning, growing, and contributing to projects that combine creativity, usability, and functionality in the field of web development."
    },
    {
        name: '黄友帆', 
        englishName: 'Valentino Jovan', 
        age: 18, 
        id: '1820242130', 
        role: 'Programmer', 
        photo: 'Photo 1.jpg', 
        bio: 'Programmer and technical support.', 
        essay: "Hi! I’m Valentino Jovan (Chinese name: 黄友帆), and I’m the Programmer of our team. My main responsibility is ensuring the program works and keeping the code structure tidy for a user-friendly website. I strive to ensure that our website is both easy to use and user friendly.<br><br>I am passionate about technology and its potential to solve real-world problems. I believe that a strong foundation in computer science will open many doors for my future career and allow me to contribute meaningfully to society.<br><br>Beyond academics, I am an avid soccer player. Soccer has been a part of my life since childhood, and it has taught me valuable lessons about teamwork, discipline, and perseverance. Playing soccer helps me stay active and provides a healthy balance to my studies. It is also a way for me to connect with others and build lasting friendships.<br><br>Working on this project has given me the opportunity to apply my knowledge, collaborate with my teammates, and improve my skills. I am grateful for the chance to learn and grow through this experience, and I look forward to contributing even more in the future."
    }
    ];
    teamCards.forEach(function(card, idx) {
        card.style.cursor = 'pointer';
        card.onclick = function() {
                var member = teamInfo[idx];
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
                html += '<div style="margin-top:18px;padding:22px 24px;background:' + essayBg + ';border-radius:18px;box-shadow:0 2px 12px ' + accent + ';max-height:220px;overflow-y:auto;font-size:1.15em;line-height:1.8;color:#2d2d4d;font-family:Georgia,serif;border:2px solid ' + accent + ';position:relative;scrollbar-width:none;text-align:justify;">';
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

// Modal for team info and messages
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

function setLoggedInUI(username, profilePicUrl = null) {
    const loginBtnDiv = document.querySelector('.login-btn');
    if (loginBtnDiv) {
        loginBtnDiv.innerHTML = `
            <div class="user-profile" style="display:flex;align-items:center;gap:12px;">
                <button id="profilePicBtn" style="width:40px;height:40px;border-radius:50%;background:#eee;overflow:hidden;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;padding:0;">
                    <img src="${profilePicUrl ? profilePicUrl : 'default-profile.png'}" alt="Profile" style="width:100%;height:100%;object-fit:cover;">
                </button>
                <button id="usernameBtn" style="background:none;border:none;font-weight:600;font-size:1.1em;color:#fff;cursor:pointer;">${username}</button>
            </div>
            <input type="file" id="profilePicInput" style="display:none;" accept="image/*">
        `;

        document.getElementById('profilePicBtn').onclick = function() {
            showProfilePopup(username, profilePicUrl);
        };
        document.getElementById('usernameBtn').onclick = function() {
            showAccountPopup(username);
        };
    }
}

function showProfilePopup(username, profilePicUrl) {
    const html = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:18px;">
            <div class="profile-pic" style="width:80px;height:80px;border-radius:50%;background:#eee;overflow:hidden;display:flex;align-items:center;justify-content:center;">
                <img src="${profilePicUrl ? profilePicUrl : 'default-profile.png'}" alt="Profile" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div style="font-size:1.3em;font-weight:600;">${username}</div>
            <button class="main-btn" id="changePicBtn" style="margin-bottom:8px;">Change Profile Picture</button>
            <button class="main-btn" id="removeProfileBtn" style="background:#e74c3c;color:#fff;">Remove Profile</button>
            <input type="file" id="profilePicInputPopup" style="display:none;" accept="image/*">
        </div>
    `;
    showModal(html);

    document.getElementById('changePicBtn').onclick = function() {
        document.getElementById('profilePicInputPopup').click();
    };
    document.getElementById('profilePicInputPopup').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                document.querySelector('.profile-pic img').src = evt.target.result;
                setLoggedInUI(username, evt.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    document.getElementById('removeProfileBtn').onclick = function() {
        // Remove profile logic (frontend only)
        const loginBtnDiv = document.querySelector('.login-btn');
        if (loginBtnDiv) loginBtnDiv.innerHTML = `<button class="main-btn" id="loginBtn">Log In</button>`;
        closeModal();
    };
}

function restoreLoginBtn() {
    const loginBtnDiv = document.querySelector('.login-btn');
    if (loginBtnDiv) {
        loginBtnDiv.innerHTML = `<button class="main-btn" id="loginBtn">Log In</button>`;
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.onclick = openLoginModal;
    }
    closeModal();
}

function showAccountPopup(username) {
    const html = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:18px;">
            <div style="font-size:1.3em;font-weight:600;">${username}</div>
            <button class="main-btn" id="changeAccountBtn" style="margin-bottom:8px;">Change Account</button>
            <button class="main-btn" id="logoutBtn" style="background:#e74c3c;color:#fff;">Log Out</button>
        </div>
    `;
    showModal(html);

    document.getElementById('changeAccountBtn').onclick = restoreLoginBtn;
    document.getElementById('logoutBtn').onclick = restoreLoginBtn;
}
