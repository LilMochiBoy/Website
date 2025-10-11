const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));
app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

const ACHIEVEMENTS = [
  { id: 'complete_first_level', title: 'First Steps', description: 'Complete your first level' },
  { id: 'complete_rookie_5', title: 'Rookie 5', description: 'Complete first 5 rookie levels' },
  { id: 'complete_rookie_10', title: 'Rookie 10', description: 'Complete all 10 rookie levels' },
  { id: 'complete_challenger_5', title: 'Challenger 5', description: 'Complete 5 challenger levels' },
  { id: 'complete_master_1', title: 'Master Initiate', description: 'Complete your first master level' }
];

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(USERS_FILE)); } catch (e) { return []; }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/getProgress', (req, res) => {
  const { username } = req.body;
  if (!username) return res.json({ success: false, message: 'No username.' });
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.json({ success: false, message: 'User not found.' });

  const userAchievements = user.achievements || [];
  const achievements = ACHIEVEMENTS.map(a => ({ id: a.id, title: a.title, description: a.description, earned: userAchievements.includes(a.id) }));

  res.json({ success: true, unlockedLevel: user.unlockedLevel || 1, completedLevels: user.completedLevels || [], achievements });
});

app.post('/api/updateProgress', (req, res) => {
  const { username, unlockedLevel, completedLevel } = req.body;
  if (!username) return res.json({ success: false, message: 'Missing username.' });
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.json({ success: false, message: 'User not found.' });

  let changed = false;
  if (typeof unlockedLevel === 'number') {
    if (!user.unlockedLevel || unlockedLevel > user.unlockedLevel) { user.unlockedLevel = unlockedLevel; changed = true; }
    const inferred = unlockedLevel - 1;
    if (inferred >= 1) {
      if (!Array.isArray(user.completedLevels)) user.completedLevels = [];
      if (!user.completedLevels.includes(inferred)) { user.completedLevels.push(inferred); user.completedLevels.sort((a,b)=>a-b); changed = true; }
    }
  }
  if (typeof completedLevel === 'number') {
    if (!Array.isArray(user.completedLevels)) user.completedLevels = [];
    if (!user.completedLevels.includes(completedLevel)) { user.completedLevels.push(completedLevel); user.completedLevels.sort((a,b)=>a-b); changed = true; }
  }

  // Achievements evaluation
  if (!Array.isArray(user.achievements)) user.achievements = user.achievements || [];
  function award(id){ if(!user.achievements.includes(id)){ user.achievements.push(id); changed = true; } }
  const completed = user.completedLevels || [];
  if (completed.includes(1)) award('complete_first_level');
  if (completed.filter(l=>l>=1 && l<=10).length >= 5) award('complete_rookie_5');
  if (completed.filter(l=>l>=1 && l<=10).length >= 10) award('complete_rookie_10');
  if (completed.filter(l=>l>=11 && l<=20).length >= 5) award('complete_challenger_5');
  if (completed.filter(l=>l>=21 && l<=30).length >= 1) award('complete_master_1');

  if (changed) saveUsers(users);

  res.json({ success: true, unlockedLevel: user.unlockedLevel || 1, completedLevels: user.completedLevels || [], achievements: user.achievements || [] });
});

app.post('/api/awardAchievement', (req, res) => {
  const { username, achievementId } = req.body;
  if (!username || !achievementId) return res.json({ success: false, message: 'Missing data.' });
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.json({ success: false, message: 'User not found.' });
  if (!Array.isArray(user.achievements)) user.achievements = [];
  if (!user.achievements.includes(achievementId)) { user.achievements.push(achievementId); saveUsers(users); }
  res.json({ success: true });
});

app.post('/api/signup', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.json({ success: false, message: 'All fields required.' });
  const users = loadUsers();
  if (users.find(u => u.username === username)) return res.json({ success: false, message: 'Username taken.' });
  users.push({ username, password, email, unlockedLevel: 1, completedLevels: [], achievements: [] });
  saveUsers(users);
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ success: true }); else res.json({ success: false, message: 'Invalid credentials.' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.json({ success: false, message: 'All fields required.' });
  const CONTACT_FILE = path.join(__dirname, 'data', 'contact_messages.json');
  let messages = [];
  if (fs.existsSync(CONTACT_FILE)) { try { messages = JSON.parse(fs.readFileSync(CONTACT_FILE)); } catch(e) { messages = []; } }
  messages.push({ name, email, message, date: new Date().toISOString() });
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(messages, null, 2));
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
