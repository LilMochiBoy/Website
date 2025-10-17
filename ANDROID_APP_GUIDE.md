# Zendo Android App - Complete Setup Guide

## ✅ What's Already Done
I've successfully completed the following for you:

1. ✅ **Generated App Icons**
   - Created `assets/icons/icon-192.png` (192x192)
   - Created `assets/icons/icon-512.png` (512x512)
   - Updated `manifest.json` to reference these icons

2. ✅ **Prepared Web Assets**
   - Created `www` folder with all your website files
   - Set up PWA manifest and service worker
   - Installed all npm dependencies including Capacitor

3. ✅ **Created Helper Scripts**
   - Icon generation script
   - WWW preparation script
   - Capacitor setup automation

## 📱 Next Steps - What YOU Need to Do

### Prerequisites Check
Before proceeding, make sure you have:
- [ ] **Node.js installed** (version 16 or higher)
- [ ] **Java JDK installed** (version 11 or higher) - [Download here](https://adoptium.net/)
- [ ] **Android Studio installed** - [Download here](https://developer.android.com/studio)
- [ ] **Android SDK** (comes with Android Studio)

### Step 1: Verify Java Installation
```powershell
java -version
```
If this doesn't work, install Java JDK 11+ from https://adoptium.net/

### Step 2: Add Android Platform
```powershell
cd 'C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website'
npx cap add android
```

### Step 3: Copy Web Assets to Android Project
```powershell
npx cap copy android
```

### Step 4: Open in Android Studio
```powershell
npx cap open android
```

This will open Android Studio with your Android project.

### Step 5: Build APK in Android Studio

#### Option A: Quick Debug Build (for testing on your phone)
1. In Android Studio, wait for Gradle sync to complete
2. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Once done, click "locate" to find the APK
4. Transfer the APK to your Android phone and install it

#### Option B: Release Build (for Play Store)
1. In Android Studio: **Build** → **Generate Signed Bundle / APK**
2. Choose **Android App Bundle (AAB)**
3. Create a new keystore:
   - Click "Create new"
   - Choose a location (e.g., `C:\zendo-release-key.jks`)
   - Set a password (SAVE THIS!)
   - Fill in certificate details
4. Click Next → select "release" → Finish
5. Find the AAB at: `android\app\build\outputs\bundle\release\app-release.aab`

### Step 6: Install on Your Android Phone

#### For Debug APK:
```powershell
# Connect your phone via USB with USB debugging enabled
adb devices  # Should show your device
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

#### For Release AAB:
Upload to Google Play Console (requires $25 one-time developer account fee)

## 🔧 Troubleshooting

### "npx cap add android" fails
- Make sure Java is installed: `java -version`
- Make sure Android SDK is installed (via Android Studio)
- Set ANDROID_HOME environment variable to your Android SDK location

### "Gradle sync failed"
- Open Android Studio
- File → Project Structure → SDK Location
- Set Android SDK location (usually `C:\Users\[YourName]\AppData\Local\Android\Sdk`)

### App shows white screen
- Check that icons exist in `assets/icons/`
- Run `npx cap copy android` to update assets
- Rebuild the app

### Can't install APK on phone
- Enable "Install unknown apps" for your file manager in Android settings
- Make sure USB debugging is enabled
- Try transferring via cable instead of wirelessly

## 📊 Project Status

**Current State:**
- ✅ Icons: Generated
- ✅ WWW folder: Prepared
- ✅ Capacitor: Configured
- ⏳ Android Platform: Needs to be added (Step 2 above)
- ⏳ Build: Pending (Steps 4-5 above)

## 🎯 Quick Commands Reference

```powershell
# Navigate to project
cd 'C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website'

# Add Android platform
npx cap add android

# Copy web changes to Android
npx cap copy android

# Open in Android Studio
npx cap open android

# Build debug APK (from android folder)
cd android
.\gradlew assembleDebug

# Install on connected phone
adb install -r app\build\outputs\apk\debug\app-debug.apk
```

## ❓ Need Help?

If you encounter errors:
1. Copy the exact error message
2. Check if Java and Android Studio are properly installed
3. Make sure you're running commands from the project root directory
4. Verify all prerequisites are met

Your project is 80% complete! Just follow steps 1-6 above to get your Android app.
