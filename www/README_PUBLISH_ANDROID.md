Zendo — Android publish guide

This guide prepares the project for wrapping with Capacitor and producing a signed Android App Bundle (AAB) ready for the Play Store.

1) Prepare web assets
- Make sure the `www` directory contains your site files. Use the helper:

  PowerShell:
  ```powershell
  cd C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website
  node .\scripts\prepare-www.js
  ```

2) Add proper icons
- Place two PNG icons in `assets/icons/`:
  - `icon-192.png` (192x192)
  - `icon-512.png` (512x512)
- These are referenced by `manifest.json` and will be copied into `www`.

3) Capacitor setup and Android platform
- Run the helper script (PowerShell):
  ```powershell
  cd C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website\scripts
  .\prepare-capacitor.ps1
  ```
- After this, open Android Studio with:
  ```powershell
  npx cap open android
  ```

4) Build signed AAB in Android Studio
- In Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle
- If you don't have a keystore, create one using the wizard or via keytool:
  ```powershell
  keytool -genkey -v -keystore C:\path\to\release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias zendo_key
  ```
- Use the keystore to sign the release build.
- Locate the AAB: `android/app/build/outputs/bundle/release/app-release.aab`.

5) Upload to Play Console
- Create Play developer account and follow Play Console steps to create an app and upload the AAB.

Notes & troubleshooting
- If you see a white screen, inspect Logcat and ensure `www` files copied correctly.
- Paths in `manifest.json` should point to `assets/icons/icon-192.png` and `assets/icons/icon-512.png` (these will be included in `www`).
- If the service worker needs updates, run `npx cap copy android` after updating `sw.js`.

If you want, I can create placeholder icons for you now (simple generated PNGs). If you prefer custom logos, provide a high-resolution image and I will create the two icon sizes and place them in `assets/icons/` and `www/assets/icons/`.

Generating icons locally
-----------------------
- Install the 'sharp' package (only needed to generate icons):

  ```powershell
  npm install sharp
  node .\scripts\generate-icons.js
  ```

This script resizes `assets/images/Zendo.png` into `assets/icons/icon-192.png` and `assets/icons/icon-512.png`.
