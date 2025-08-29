
LOGIN_HTML = '''
<html>
<head><title>Log In</title></head>
<body class="main-bg">
    <h2>Log In</h2>
    <form method="post">
        <input type="text" name="username" placeholder="Username"><br><br>
        <input type="password" name="password" placeholder="Password"><br><br>
        <button type="submit" class="main-btn">Log In</button>
    </form>
    <br>
    <p>Don't have an account?
        <a href="/signup"><button class="main-btn" type="button">Sign Up</button></a>
    </p>
</body>
</html>
'''


SIGNUP_HTML = '''
<html>
<head><title>Sign Up</title></head>
<body class="main-bg">
    <h2>Sign Up</h2>
    <form method="post">
        <input type="text" name="username" placeholder="Username"><br><br>
        <input type="password" name="password" placeholder="Password"><br><br>
        <button type="submit" class="main-btn">Create Account</button>
    </form>
    <br>
    <a href="/login"><button class="main-btn">Log In</button></a>
</body>
</html>
'''
# design.py

HOME_HTML = '''
<html>
<head>
    <title>E-Learning: Chinese & English</title>
    <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">
</head>
<body class="main-bg">
    <div style="position: absolute; top: 20px; left: 30px;">
    <img src="/static/Zendo%20Logo.jpg" alt="Logo" style="height:48px; width:auto; border-radius:10px; box-shadow:0 2px 8px #222;">
    </div>
    <div style="position: absolute; top: 20px; right: 30px;">
        <a href="/login"><button class="main-btn">Log In</button></a>
    </div>
    <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h1 style="margin-bottom: 32px; text-align: center; font-size: 3.5rem; font-weight: 700; color: #f7f7fa; letter-spacing: 2px; font-family: 'Segoe UI', Arial, sans-serif; text-shadow: 0 2px 12px #1e3c72;">
            Welcome to <span style="font-size: 5rem; font-family: 'Satisfy', cursive; color: #4a90e2; font-weight: 700; text-shadow: 0 0 40px #1e3c72, 0 2px 16px #000; letter-spacing: 0.5px; vertical-align: -10px;">Zendo</span>
        </h1>
        <p style="margin-bottom: 10px; margin-top: -24px;">Choose a language to start learning:</p>
        <div style="margin-top: 10px;">
            <a href="/learn/chinese"><button class="main-btn">Learn Chinese</button></a>
            <a href="/learn/english"><button class="main-btn">Learn English</button></a>
        </div>
    </div>
</body>
</html>
'''

LESSON_HTML = '''
<html>
<head><title>Lesson: {{lang}}</title></head>
<body class="main-bg">
    <h2>{{lang}} Lesson</h2>
    {% for item in lessons %}
        {% if lang == 'Chinese' %}
            <p>{{item.word}} ({{item.pinyin}}) - {{item.meaning}}</p>
        {% else %}
            <p>{{item.word}} - {{item.meaning}}</p>
        {% endif %}
    {% endfor %}
    <a href="/quiz/{{lang|lower}}"><button class="main-btn">Take Quiz</button></a>
    <br><br><a href="/">Back</a>
</body>
</html>
'''

QUIZ_HTML = '''
<html>
<head><title>Quiz: {{lang}}</title></head>
<body class="main-bg">
    <h2>{{lang}} Quiz</h2>
    <form method="post">
        <label>{{question}}</label><br>
        <input name="answer" placeholder="Type your answer">
        <br><br>
        <button type="submit" class="main-btn">Submit</button>
    </form>
    <br><a href="/learn/{{lang|lower}}">Back to Lesson</a>
</body>
</html>
'''

RESULT_HTML = '''
<html>
<head><title>Result</title></head>
<body class="main-bg">
    <h2>{{result}}</h2>
    <a href="/">Home</a>
</body>
</html>
'''

CSS_STYLE = '''
<style>
body.main-bg {
    font-family: sans-serif;
    text-align: center;
    background: linear-gradient(270deg, #000000, #1e3c72, #000000);
    background-size: 600% 600%;
    animation: gradientMove 40s ease infinite;
    color: #f7f7fa;
}

@keyframes gradientMove {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
}
button.main-btn {
    margin: 10px;
    padding: 10px 20px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}
button.main-btn:hover {
    background: #357abd;
}
input {
    padding: 8px;
    font-size: 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>
'''
