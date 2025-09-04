const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = 'users.json';

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.json({ success: false, message: 'All fields required.' });
    }
    let users = loadUsers();
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: 'Username taken.' });
    }
    users.push({ username, password, email });
    saveUsers(users);
    res.json({ success: true });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    let users = loadUsers();
    let user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials.' });
    }
});


// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.json({ success: false, message: 'All fields required.' });
    }
    // Save message to file (or send email, etc.)
    const CONTACT_FILE = 'contact_messages.json';
    let messages = [];
    if (fs.existsSync(CONTACT_FILE)) {
        messages = JSON.parse(fs.readFileSync(CONTACT_FILE));
    }
    messages.push({ name, email, message, date: new Date().toISOString() });
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(messages, null, 2));
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// REMOVE ALL CODE BELOW THIS LINE!
// The fetch(...) block is frontend code and should NOT be in server.js.
