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

    var teamCards = document.querySelectorAll('.team-card');
    var teamInfo = [
        {
            name: '刘明坚', englishName: 'Richard Alexander', age: 19, id: '1820242128', role: 'CEO', photo: 'Photo 2.jpg', bio: 'Leader and visionary of Zendo.', essay: ''
        },
        {
            name: '陈惠怡', englishName: 'Vanessa Minerva', age: 19, id: '1820242114', role: 'CIO & Writer', photo: 'Photo 3.jpg', bio: 'Chief Information Officer and content creator.', essay: 'Hellooo, my name is Vanessa Minerva Sutanto (Chinese Name: 陈惠怡)! I\'m from Indonesia and I\'m in my second year in Computer Science major! For this project, I am thrilled to be contributing as the CIO (Chief Integration Officer) where my main responsibility is to ensure that all parts of the project come together smoothly and that we meet all deadlines. My days are spent coordinating the team\'s workflow, facilitating clear communication, and meticulously tracking progress to ensure everyone\'s tasks are aligned and meeting the project\'s requirements. I believe that a well-organized process is the backbone of any successful project. A critical part of my responsibility is the final quality check. I organize all our project assets, from the HTML and CSS structures to the JavaScript functionality and media files. I run thorough checks for consistency in style and code, verify that every interactive link works perfectly, and ensure all content is formatted correctly for an optimal user journey. As the final submitter, I take great care in compiling everything into a polished and organized package that truly reflects our team\'s hard work. It\'s been an incredible experience collaborating with such a dedicated and talented team, and I\'m excited to see how our hard work comes to life and make an impact!'
        },
        {
            name: '吴丽翡', englishName: 'Velerie Roxanne', age: 19, id: '1820242121', role: 'Designer & Writer', photo: 'Photo 4.jpg', bio: 'Designs and writes for Zendo.', essay: 'Hello, I\'m Velerie Roxanne Gabrielle (Chinese name: 吴丽翡), and I\'m responsible for both the design and writing aspects of our team\'s project. As the designer, my role is to create the visual identity of our website, ensuring that it is not only visually appealing but also functional and user-friendly. This includes working on the layout, color schemes, typography, and overall aesthetic of the site. I collaborate closely with the rest of the team to ensure that our design aligns with the project\'s theme and objectives. In addition to design, I\'m also in charge of the written content. I work on crafting engaging text for various sections of the site, including the homepage, team introduction, and other content that helps visitors understand our project and its purpose. I believe that well-thought-out design and clear, informative writing go hand in hand, and my goal is to create a seamless and cohesive experience for our users. I am truly passionate about combining creativity with functionality. Every design element I choose, and every piece of content I write, has a clear purpose: to contribute to a positive user experience. This project is an exciting opportunity for me to contribute my skills in both design and writing, and I am thrilled to see how our collective efforts come together in the final product.'
        },
        {
            name: '吴家锦', englishName: 'Timothy Nathanael', age: 19, id: '1820242141', role: 'Designer & Progammer', photo: 'Photo 5.jpg', bio: 'Designs and codes for Zendo.', essay: "Hello and welcome! My name is Timothy Nathaniel Sudirgo (Chinese Name: 吴家锦). I'm a 19-year-old Surabaya, Indonesia. Outside of my academic and coding life, I have a deep passion for the arts. You can almost always find me listening to a diverse range of music, which helps me focus and think creatively, or watching movies. These hobbies are more than just pastimes. They are my source of inspiration and a way to see design and structure from new perspectives.\nI am currently furthering my education as a second-year Computer Science student at the Beijing Institute of Technology (北京理工大学). This project offered an exciting opportunity to apply my classroom knowledge in a real-world setting. My specific contribution was as the designer and the programmer of front-end developer for our team. I coded the entire design of the website you see and interact with today using HTML and CSS, focusing on creating an experience that is both visually appealing and easy to navigate.\nThe initial spark for this platform came from my personal experience navigating life and studies in China. Understanding the challenges of language learning firsthand motivated me to channel my technical skills into creating a tool that could make mastering English and Chinese more intuitive, structured, and perhaps even a little bit fun for others on a similar path. It has been an incredible journey blending my hobbies, studies, and personal experience into this project, and I sincerely hope you find it useful on your own language-learning adventure."
        },
        {
            name: '廖泰诚', englishName: 'Reynard Jave', age: 19, id: '1820242123', role: 'Programmer', photo: 'Photo 6.jpg', bio: 'Backend and frontend developer.', essay: "My name is Reynard Jave Hanson (Chinese name: 廖泰诚), and I am 19 years old. I come from Indonesia and am currently studying Computer Science at Beijing Institute of Technology in China. I am motivated by the idea that the skills I develop from creating this website will give me the ability to create innovative solutions for real-world challenges in the future.\nOutside of academics, I enjoy spending my free time on activities that keep me active and energized. My hobbies include swimming, cycling, and working out. These activities not only help me maintain a healthy lifestyle outside of coding, but also teach me discipline, consistency, and resilience qualities that I believe are just as important in the world of programming.\nIn this website project, my role is the programmer. My responsibilities include building the HTML structure that forms the foundation of each page, applying CSS to design layouts and styling, and implementing interactive features and dynamic content using JavaScript. I also work on debugging errors and fixing broken layouts or links to ensure that the website functions smoothly and delivers a seamless user experience.\nThrough this project, I am gaining valuable hands-on experience and strengthening my technical skills. My goal is to continue learning, growing, and contributing to projects that combine creativity, usability, and functionality in the field of web development."
        },
        {
                name: '黄友帆', englishName: 'Valentino Jovan', age: 18, id: '1820242130', role: 'Programmer', photo: 'Photo 1.jpg', bio: 'Programmer and technical support.', essay: "My name is Valentino Jovan, and my Chinese name is 黄友帆. I am 18 years old and come from Indonesia. Currently, I am a Computer Science student at Beijing Institute of Technology. I chose this major because I am passionate about technology and its potential to solve real world problems. I believe that a strong foundation in computer science will open many doors for my future career and allow me to contribute meaningfully to society.\n\nBeyond academics, I am an avid soccer player. Soccer has been a part of my life since childhood, and it has taught me valuable lessons about teamwork, discipline, and perseverance. Playing soccer helps me stay active and provides a healthy balance to my studies. It is also a way for me to connect with others and build lasting friendships.\n\nIn our website development project, my main responsibility is ensuring the program to work and tidy the code structure. I strive to ensure that our website is both easy to use and user friendly. Working on this project has given me the opportunity to apply my knowledge, collaborate with my teammates, and improve my skills. I am grateful for the chance to learn and grow through this experience, and I look forward to contributing even more in the future."
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
