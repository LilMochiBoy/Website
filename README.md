# Zendo - Chinese Learning App

A progressive web app (PWA) and Android mobile application for learning Chinese with interactive lessons, quizzes, and gamification features.

## 📱 Project Overview

**Zendo** is a comprehensive Chinese language learning platform featuring:
- Three difficulty levels: Rookie, Challenger, and Master
- Interactive lessons and quizzes
- Boss battles and achievements
- Progress tracking and leaderboards
- Friends system
- Available as both web app and native Android app

## 🚀 Quick Start

### Prerequisites
- Node.js (v24.7.0 or higher)
- Java JDK 17 (for Android builds)
- Android SDK (automatically installed during first build)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Prepare web assets:**
   ```bash
   npm run prepare-www
   npm run gen:icons
   ```

3. **Run local server:**
   ```bash
   node server.js
   ```
   Visit `http://localhost:3000`

## 📦 Building Android APK

### First-Time Setup

1. **Install Java JDK 17:**
   - Download from: https://adoptium.net/temurin/releases/?version=17
   - Install the Windows x64 .msi file
   - Restart your terminal after installation

2. **Build the APK:**
   ```bash
   npm run prepare-www
   npm run gen:icons
   npx cap copy android
   cd android
   .\gradlew assembleDebug
   ```

3. **Find your APK:**
   - Location: `android\app\build\outputs\apk\debug\app-debug.apk`
   - Size: ~29 MB

### Installing on Android Device

1. Transfer `app-debug.apk` to your phone (USB, email, cloud storage)
2. Enable "Install from unknown sources" in phone Settings
3. Tap the APK file to install
4. Launch the Zendo app!

## 🛠️ Project Structure

```
Website/
├── android/              # Android native project (Capacitor)
├── assets/               # Images, icons, CSS, JavaScript
│   ├── css/
│   ├── icons/
│   ├── images/
│   └── js/
├── data/                 # User data and messages (JSON)
├── pages/                # HTML pages for lessons and quizzes
│   ├── levels/
│   └── quizzes/
├── scripts/              # Build and preparation scripts
├── www/                  # Compiled web assets for Capacitor
├── index.html            # Main entry point
├── server.js             # Node.js Express server
└── package.json          # Dependencies and scripts

```

## 📝 Available Scripts

- `npm run prepare-www` - Copy web assets to www directory
- `npm run gen:icons` - Generate PWA icons
- `npm run cap:copy` - Copy web assets to Android project
- `npx cap sync` - Sync web assets and update native platforms

## 🔧 Configuration

### Environment Setup
- **JAVA_HOME**: Points to JDK 17 installation
- **ANDROID_SDK_ROOT**: Points to Android SDK (usually `%LOCALAPPDATA%\Android\sdk`)

### Capacitor Configuration
- Uses Capacitor 6.x (compatible with Java 17)
- App ID: `com.lilmochiboy.zendo`
- Web directory: `www`

## 🌐 Web Server

The project includes an Express server (`server.js`) with:
- Static file serving
- Contact form endpoint
- User registration
- CORS enabled for development

Run with: `node server.js`

## 📱 PWA Features

- Service Worker for offline functionality
- Web App Manifest for installability
- Responsive design for mobile and desktop
- Icon sets for various device sizes

## 🎯 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Mobile**: Capacitor (Android)
- **Build Tools**: Gradle, npm

## 📄 License

This project is private and owned by LilMochiBoy.

## 👤 Author

**LilMochiBoy**
- GitHub: [@LilMochiBoy](https://github.com/LilMochiBoy)

---

**Last Updated:** October 21, 2025
**Version:** 1.0.0
