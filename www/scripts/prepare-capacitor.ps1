# PowerShell helper: prepares www, installs Capacitor, initializes and adds Android
Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)
Set-Location ..

Write-Host "1) Prepare www (copy website files)"
node .\scripts\prepare-www.js

Write-Host "2) Install Capacitor CLI and core (if not already installed)"
npm install @capacitor/cli @capacitor/core --save

Write-Host "3) Initialize Capacitor (appId=com.lilmochiboy.zendo)"
npx cap init Zendo com.lilmochiboy.zendo --web-dir=www

Write-Host "4) Add Android platform"
npx cap add android

Write-Host "Done. Next: open Android Studio with 'npx cap open android' to configure signing and build the release AAB."
