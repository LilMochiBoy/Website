@echo off
echo Opening Windows Firewall Settings...
echo.
echo INSTRUCTIONS:
echo 1. Click "Allow an app or feature through Windows Defender Firewall"
echo 2. Click "Change settings" button at the top
echo 3. Click "Allow another app..." button
echo 4. Click "Browse..." button
echo 5. Copy and paste this path into the File name box:
echo.
echo    C:\Program Files\nodejs\node.exe
echo.
echo 6. Press Enter, then click "Add"
echo 7. Make sure BOTH checkboxes are checked for Node.js
echo 8. Click OK
echo.
pause
start ms-settings:network-proxy
start firewall.cpl
