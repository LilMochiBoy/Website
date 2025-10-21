# 🐼 Zendo - Interactive Chinese Learning Platform

A progressive web app (PWA) and Android mobile application designed to make learning Mandarin Chinese engaging through gamification, interactive quizzes, and structured progression.

## 📱 Project Overview

**Zendo** is a comprehensive Chinese language learning platform that transforms traditional language education into an interactive gaming experience. The application features:

### Core Features
- **Three Difficulty Tiers**: Rookie, Challenger, and Master levels (30 lessons each)
- **Progressive Level System**: Complete quizzes to unlock subsequent levels
- **Interactive Quiz Types**: 
  - Multiple Choice Questions (MCQ)
  - Fill-in-the-blank
  - Word arrangement/drag-and-drop
  - Vocabulary matching with visual connections
- **Boss Battle Levels**: Animated boss challenges with panda mascot
- **Achievement System**: Track milestones and progress
- **Leaderboards**: Compete with other learners
- **Friends System**: Connect with fellow students
- **Cross-Platform**: Available as web app and native Android application

### Learning Content
- **Rookie Level**: Greetings, introductions, basic grammar
- **Challenger Level**: Intermediate vocabulary and sentence structures
- **Master Level**: Advanced topics and comprehensive language skills
- Total: **90 comprehensive lessons** with interactive assessments

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v24.7.0 or higher ([Download](https://nodejs.org/))
- **Java JDK 17**: Required for Android builds ([Download](https://adoptium.net/temurin/releases/?version=17))
- **Android SDK**: Automatically installed during first Gradle build
- **Git**: For version control (optional)

### For Professors/Evaluators: Running the Web Version

The fastest way to experience Zendo is through the web interface:

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/LilMochiBoy/Website.git
   cd Website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   node server.js
   ```

4. **Access the application:**
   - Open your browser to `http://localhost:3000`
   - The app will be fully functional with all features

5. **Testing the Application:**
   - Create an account or use guest mode
   - Navigate to "Chinese" to select difficulty level
   - Try the Rookie Level (recommended starting point)
   - Use "Unlock All" button to access all levels for evaluation
   - Use "Reset Progress" to restart from Level 1

### Alternative: Live Server Method

If you prefer using VS Code Live Server:
1. Open `index.html` with Live Server
2. Note: Backend features (user data persistence) require `node server.js`

## 📦 Building Android APK

### Why Android Version?

The Android app provides:
- Native mobile experience with better performance
- Offline functionality
- Push notifications capability
- Native device integration
- Installable without browser dependencies

### First-Time Setup

1. **Install Java JDK 17:**
   - Download from: https://adoptium.net/temurin/releases/?version=17
   - Install the Windows x64 .msi file
   - Set JAVA_HOME environment variable
   - Restart your terminal after installation

2. **Verify Java installation:**
   ```bash
   java -version
   # Should show: openjdk version "17.x.x"
   ```

3. **Prepare web assets:**
   ```bash
   npm run prepare-www
   npm run gen:icons
   ```

4. **Sync to Android project:**
   ```bash
   npx cap sync android
   ```

5. **Build the APK:**
   ```bash
   cd android
   .\gradlew assembleDebug
   ```
   *First build may take 5-10 minutes as it downloads Android SDK components*

6. **Locate your APK:**
   - Path: `android\app\build\outputs\apk\debug\app-debug.apk`
   - Size: ~29 MB
   - This is the installable Android application

### Rebuilding After Changes

When you update the website code:
```bash
npx cap sync android
cd android
.\gradlew assembleDebug
```

### Installing on Android Device

#### Method 1: USB Transfer
1. Connect phone to computer via USB
2. Copy `app-debug.apk` to phone's Download folder
3. On phone: Navigate to Downloads
4. Tap the APK file
5. Allow installation from this source (if prompted)
6. Install and launch Zendo!

#### Method 2: Cloud/Email
1. Upload APK to Google Drive, Dropbox, or email it to yourself
2. Download on your phone
3. Install as above

**Note**: Since this is a debug APK (not from Play Store), you need to enable "Install unknown apps" for your file manager/browser in Android settings.

## 🛠️ Project Structure

```
Website/
├── android/                          # Android native project (Capacitor)
│   ├── app/
│   │   └── build/outputs/apk/       # Generated APK files
│   ├── gradle/                       # Gradle wrapper and config
│   └── build.gradle                  # Android build configuration
│
├── assets/                           # Frontend resources
│   ├── css/
│   │   └── style.css                 # Main stylesheet
│   ├── icons/                        # PWA icons
│   ├── images/
│   │   ├── Panda/                    # Mascot images
│   │   ├── Rookie Boss/              # Level 1 boss sprites
│   │   ├── Challenger Boss/          # Level 2 boss sprites
│   │   └── Master Boss/              # Level 3 boss sprites
│   └── js/
│       ├── levels.js                 # Level progression system
│       ├── progress.js               # User progress tracking
│       ├── boss_level.js             # Boss battle logic
│       ├── rookie_boss_anim.js       # Rookie boss animations
│       ├── challenger_boss_anim.js   # Challenger animations
│       └── master_boss_anim.js       # Master boss animations
│
├── data/                             # Backend data storage
│   ├── users.json                    # User accounts and progress
│   └── contact_messages.json         # Contact form submissions
│
├── pages/                            # Application pages
│   ├── levels/                       # Level selection maps
│   │   ├── rookie.html               # Rookie level map (30 levels)
│   │   ├── challenger.html           # Challenger map (30 levels)
│   │   └── master.html               # Master map (30 levels)
│   ├── quizzes/                      # Quiz pages
│   │   ├── rookie_quiz1.html through rookie_quiz30.html
│   │   ├── challenger_quiz1.html through challenger_quiz30.html
│   │   └── master_quiz1.html through master_quiz30.html
│   ├── account.html                  # User account management
│   ├── achievements.html             # Achievement tracking
│   ├── chinese.html                  # Difficulty selection page
│   ├── leaderboard.html              # Global leaderboards
│   ├── lessons.html                  # Lesson overview
│   └── profile.html                  # User profile page
│
├── scripts/                          # Build automation
│   ├── generate-icons.js             # PWA icon generation
│   ├── prepare-capacitor.ps1         # Capacitor setup script
│   └── prepare-www.js                # Web asset preparation
│
├── www/                              # Distribution folder
│   └── [mirrored structure]          # Processed files for Capacitor
│
├── index.html                        # Application entry point
├── server.js                         # Express backend server
├── capacitor.config.ts               # Capacitor configuration
├── manifest.json                     # PWA manifest
├── sw.js                             # Service Worker (offline support)
└── package.json                      # Project dependencies
```

## 📝 Available Scripts

### Development
```bash
npm install                    # Install all dependencies
node server.js                 # Start local development server (port 3000)
npm run prepare-www            # Copy web assets to www directory
npm run gen:icons              # Generate PWA icons from base image
```

### Android Build
```bash
npx cap sync android           # Sync web files to Android project
npx cap copy android           # Copy web assets only (no plugin updates)
cd android && .\gradlew assembleDebug    # Build debug APK
cd android && .\gradlew clean            # Clean build cache
```

### Useful Commands
```bash
npx cap open android           # Open Android project in Android Studio
npm run cap:copy               # Alias for npx cap copy android
```

## 🔧 Technical Configuration

### Environment Setup
- **JAVA_HOME**: Must point to JDK 17 installation
  ```
  C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
  ```
- **ANDROID_SDK_ROOT**: Points to Android SDK
  ```
  %LOCALAPPDATA%\Android\sdk
  ```
- **Node.js**: v24.7.0+ for optimal compatibility

### Capacitor Configuration (`capacitor.config.ts`)
```typescript
{
  appId: 'com.lilmochiboy.zendo',
  appName: 'Zendo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
}
```

### Progressive Web App (PWA)
- **Manifest**: `manifest.json` - Defines app metadata
- **Service Worker**: `sw.js` - Enables offline functionality
- **Icons**: Multiple sizes (72px to 512px) for different devices

## 🌐 Backend Server (`server.js`)

The Express server provides:

### Endpoints
- `GET /` - Serves main application
- `POST /api/contact` - Handles contact form submissions
- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `POST /api/updateProgress` - Saves user progress
- `GET /api/leaderboard` - Retrieves top scores

### Features
- Static file serving from root directory
- JSON data persistence (`data/users.json`, `data/contact_messages.json`)
- CORS enabled for development
- Port: 3000 (configurable)

### Starting the Server
```bash
node server.js
# Server running on http://localhost:3000
```

## 🎮 Key Features Explained

### 1. Level Progression System (`assets/js/levels.js`)
- Tracks unlocked levels per difficulty tier
- Stores progress in localStorage
- Syncs with backend when user is logged in
- Default: Only Level 1 unlocked, others locked until completion

### 2. Quiz System
Each quiz includes:
- **Multiple question types**: MCQ, Fill-in-blank, Matching, Word arrangement
- **Real-time feedback**: Immediate right/wrong indicators
- **Visual effects**: Animations for correct/incorrect answers
- **Score tracking**: Cumulative scoring across question types
- **Progress unlocking**: Automatically unlocks next level on completion

### 3. Boss Battle System
- Animated boss characters (Rookie, Challenger, Master)
- Canvas-based sprite animations
- Interactive combat mechanics
- Difficulty scaling per tier

### 4. Achievement System
- Tracks learning milestones
- Progress visualization
- Gamification elements to increase engagement

### 5. Responsive Design
- Mobile-first approach
- Adaptive layouts for phones, tablets, and desktops
- Touch-optimized quiz interactions
- Map-based level navigation with positioned buttons

## 🎯 Technology Stack

### Frontend
- **HTML5**: Semantic markup, Canvas API for animations
- **CSS3**: Custom styling, animations, responsive design
- **JavaScript (ES6+)**: 
  - Vanilla JS (no frameworks for performance)
  - LocalStorage API for client-side persistence
  - Fetch API for backend communication
  - Canvas API for boss animations

### Backend
- **Node.js**: v24.7.0+ runtime
- **Express.js**: Lightweight web framework
- **File-based Storage**: JSON files for simplicity

### Mobile
- **Capacitor 6.x**: Cross-platform native runtime
- **Android SDK**: Native Android components
- **Gradle**: Build automation

### Build Tools
- **npm**: Package management
- **Gradle**: Android build system
- **Capacitor CLI**: Native bridge tooling

## 📊 Data Flow

```
User Interface (HTML/CSS/JS)
         ↓
LocalStorage (Client-side cache)
         ↓
Express Server (server.js)
         ↓
JSON Files (data/users.json)
         ↓
Backend Response
         ↓
UI Update
```

## 🔐 User Data Management

### Registration & Login
- Username/password authentication
- Password hashing (basic implementation)
- Session management via localStorage

### Progress Tracking
```javascript
{
  username: "student123",
  rookieUnlockedLevel: 5,
  challengerUnlockedLevel: 1,
  masterUnlockedLevel: 1,
  completedQuizzes: [1, 2, 3, 4],
  totalScore: 450
}
```

### Data Persistence
- **Client-side**: localStorage for immediate access
- **Server-side**: JSON files for permanent storage
- **Sync mechanism**: Updates on quiz completion

## 🧪 Testing Guide for Evaluators

### Recommended Testing Flow

1. **Initial Setup** (5 minutes)
   - Run `npm install` and `node server.js`
   - Open `http://localhost:3000`
   - Create a test account or explore as guest

2. **Test Rookie Level** (10 minutes)
   - Navigate to Chinese → Rookie
   - Start with Quiz 1 (Greetings & Introductions)
   - Observe different question types
   - Complete quiz to see level unlock mechanism
   - Try "Unlock All" button to access all 30 levels
   - Use "Reset Progress" to return to Level 1

3. **Test Challenger Level** (5 minutes)
   - Navigate to Challenger level
   - Test more advanced quiz formats
   - Check progress independence from Rookie

4. **Test Master Level** (5 minutes)
   - Navigate to Master level
   - Experience advanced content
   - Verify separate progression tracking

5. **Test Additional Features** (10 minutes)
   - Profile page: View progress statistics
   - Achievements: Check milestone tracking
   - Leaderboard: See scoring system
   - Boss battles: Try animated challenges

6. **Test Android App** (Optional, 15 minutes)
   - Build APK following build instructions
   - Install on Android device
   - Compare web vs native experience
   - Test offline functionality

### Common Evaluation Points

✅ **User Experience**
- Intuitive navigation
- Responsive design across devices
- Clear visual feedback
- Engaging gamification

✅ **Technical Implementation**
- Clean code structure
- Modular JavaScript architecture
- Efficient data management
- Progressive enhancement

✅ **Educational Value**
- Structured learning progression
- Variety of assessment methods
- Immediate feedback
- Skill reinforcement

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
# Kill the process or change port in server.js
```

### Android build fails
```bash
# Verify Java version
java -version  # Should be 17.x.x

# Clean and rebuild
cd android
.\gradlew clean
.\gradlew assembleDebug
```

### APK won't install
- Enable "Install from unknown sources" in Android Settings
- Check Android version (minimum: Android 5.0+)
- Uninstall previous version if updating

### Progress not saving
- Check if server is running (`node server.js`)
- Verify localStorage is enabled in browser
- Check browser console for errors (F12)

## � Educational Content Structure

### Rookie Level (Beginner)
**Topics Covered:**
- Greetings and Introductions (你好, 再见)
- Basic Grammar (是, 吗, 不)
- Personal Information (名字, 叫)
- Numbers and Counting
- Family Members
- Daily Activities

**Quiz Format:**
- 30 questions per quiz
- Mix of MCQ, fill-in-blank, matching
- Immediate feedback
- Score tracking

### Challenger Level (Intermediate)
**Topics Covered:**
- Complex sentence structures
- Time expressions
- Location and directions
- Food and dining
- Shopping vocabulary
- Past and future tenses

### Master Level (Advanced)
**Topics Covered:**
- Idiomatic expressions
- Business Chinese
- Cultural context
- Advanced grammar patterns
- Reading comprehension
- Writing practice

## 🎓 Learning Outcomes

Upon completion, students will be able to:
- ✅ Conduct basic conversations in Mandarin
- ✅ Read and write simple Chinese characters
- ✅ Understand fundamental grammar structures
- ✅ Use appropriate vocabulary for daily situations
- ✅ Progress from beginner to intermediate proficiency

## 📈 Future Enhancements

Potential improvements:
- [ ] Voice recognition for pronunciation practice
- [ ] Flashcard system for vocabulary review
- [ ] Social features (study groups, challenges)
- [ ] iOS version using Capacitor
- [ ] Backend migration to database (MongoDB/PostgreSQL)
- [ ] Real-time multiplayer quizzes
- [ ] AI-powered personalized learning paths
- [ ] Video lessons integration
- [ ] Spaced repetition algorithm

## 📄 License

This project is an educational application developed for academic purposes.

**Copyright © 2025 LilMochiBoy**

All rights reserved. This software is provided for evaluation and educational use only.

## 👤 Author & Contact

**Reynard Jave Hanson (LilMochiBoy)**
- GitHub: [@LilMochiBoy](https://github.com/LilMochiBoy)
- Repository: [Website](https://github.com/LilMochiBoy/Website)
- Email: Available upon request

---

## 📞 Support

For questions or issues:
1. Check the Troubleshooting section above
2. Review code comments in source files
3. Contact the developer via GitHub

---

**Last Updated:** October 21, 2025  
**Version:** 1.0.0  
**Build:** Production-ready  
**Platform:** Web (PWA) + Android
