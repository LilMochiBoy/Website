# Run this script as Administrator to add firewall rule for Node.js

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "   Adding Firewall Rule for Zendo    " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "How to run as Administrator:" -ForegroundColor Yellow
    Write-Host "1. Right-click on this file" -ForegroundColor Yellow
    Write-Host "2. Select 'Run with PowerShell' or 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host "Adding firewall rule for Node.js..." -ForegroundColor Green

try {
    # Remove old rule if exists
    Remove-NetFirewallRule -DisplayName "Node.js Zendo Server" -ErrorAction SilentlyContinue
    
    # Add new rule
    New-NetFirewallRule -DisplayName "Node.js Zendo Server" `
                        -Direction Inbound `
                        -Protocol TCP `
                        -LocalPort 3000 `
                        -Action Allow `
                        -Profile Any `
                        -Program "C:\Program Files\nodejs\node.exe" | Out-Null
    
    Write-Host ""
    Write-Host "SUCCESS! Firewall rule added." -ForegroundColor Green
    Write-Host ""
    Write-Host "Node.js can now accept connections on port 3000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Start your server: cd to project folder and run 'node server.js'" -ForegroundColor White
    Write-Host "2. On your phone, go to: http://10.195.167.138:3000" -ForegroundColor White
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "ERROR: Failed to add firewall rule" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
}

pause
