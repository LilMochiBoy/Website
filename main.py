#main.py

from flask import Flask, render_template_string, request, redirect, url_for
import webbrowser
import threading
from lessons import LESSONS
from questions import QUESTIONS
from design import HOME_HTML, LESSON_HTML, QUIZ_HTML, RESULT_HTML, CSS_STYLE, LOGIN_HTML, SIGNUP_HTML

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
	return render_template_string(CSS_STYLE + HOME_HTML)
@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
		# Dummy authentication logic
		username = request.form.get('username')
		password = request.form.get('password')
		# Accept any non-empty username/password for demo
		if username and password:
			return redirect(url_for('home'))
		else:
			error = 'Invalid credentials!'
			return render_template_string(CSS_STYLE + LOGIN_HTML + f'<p style="color:red;">{error}</p>')
	return render_template_string(CSS_STYLE + LOGIN_HTML)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
	if request.method == 'POST':
		username = request.form.get('username')
		password = request.form.get('password')
		# Accept any non-empty username/password for demo
		if username and password:
			return redirect(url_for('login'))
		else:
			error = 'Please fill all fields!'
			return render_template_string(CSS_STYLE + SIGNUP_HTML + f'<p style="color:red;">{error}</p>')
	return render_template_string(CSS_STYLE + SIGNUP_HTML)

@app.route('/learn/<lang>')
def learn(lang):
	lang = lang.capitalize()
	lessons = LESSONS.get(lang, [])
	return render_template_string(CSS_STYLE + LESSON_HTML, lang=lang, lessons=lessons)

@app.route('/quiz/<lang>', methods=['GET', 'POST'])
def quiz(lang):
	lang = lang.capitalize()
	questions = QUESTIONS.get(lang, [])
	# For simplicity, use the first question only
	question_data = questions[0] if questions else {'question': 'No question available', 'answers': []}
	if request.method == 'POST':
		answer = request.form.get('answer', '').strip().lower()
		correct = any(answer == ans.lower() for ans in question_data['answers'])
		result = 'Correct!' if correct else 'Try Again!'
		return render_template_string(CSS_STYLE + RESULT_HTML, result=result)
	return render_template_string(CSS_STYLE + QUIZ_HTML, lang=lang, question=question_data['question'])

def open_browser():
	webbrowser.open_new('http://127.0.0.1:5000/')

if __name__ == '__main__':
	threading.Timer(1.5, open_browser).start()
	app.run(debug=False)
