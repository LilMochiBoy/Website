# 🔧 FIXING "SITE CAN'T BE REACHED" ERROR

## Quick Fix Options (Try in Order):

---

### ✅ OPTION 1: Allow Through Windows Firewall (EASIEST)

When you started the server, Windows should have shown a firewall popup. If you clicked "Cancel" or "Block", follow these steps:

1. **Open Windows Defender Firewall:**
   - Press `Windows Key`
   - Type "Firewall"
   - Click "Windows Defender Firewall"

2. **Allow an app:**
   - Click "Allow an app or feature through Windows Defender Firewall"
   - Click "Change settings" button
   - Click "Allow another app..." button
   - Click "Browse..."
   - Navigate to: `C:\Program Files\nodejs\node.exe`
   - Click "Add"
   - Make sure BOTH "Private" and "Public" are checked for Node.js
   - Click "OK"

3. **Restart your server:**
   ```powershell
   # Stop server (Ctrl+C in the terminal)
   # Then restart:
   cd 'C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website'
   node server.js
   ```

4. **Try on your phone again:**
   ```
   http://10.195.167.138:3000
   ```

---

### ✅ OPTION 2: Run PowerShell as Administrator (Add Firewall Rule)

1. **Close current PowerShell**

2. **Open PowerShell as Administrator:**
   - Press `Windows Key`
   - Type "PowerShell"
   - Right-click "Windows PowerShell"
   - Click "Run as administrator"

3. **Run this command:**
   ```powershell
   New-NetFirewallRule -DisplayName "Node.js Zendo Server" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
   ```

4. **Start your server:**
   ```powershell
   cd 'C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website'
   node server.js
   ```

5. **Try on your phone again:**
   ```
   http://10.195.167.138:3000
   ```

---

### ✅ OPTION 3: Temporarily Disable Firewall (Quick Test)

**⚠️ Only for testing! Remember to turn it back on!**

1. Press `Windows Key`
2. Type "Firewall"
3. Click "Windows Defender Firewall"
4. Click "Turn Windows Defender Firewall on or off"
5. Select "Turn off Windows Defender Firewall" for Private network
6. Click "OK"

7. **Try on your phone:**
   ```
   http://10.195.167.138:3000
   ```

8. **If it works, turn firewall back on and use Option 1 or 2 instead!**

---

### ✅ OPTION 4: Check Network Connection

Make sure:

1. **Same WiFi Network:**
   - Your phone and PC must be on the SAME WiFi network
   - Check your phone's WiFi settings
   - Check your PC's WiFi settings
   - They should show the same network name

2. **Server is Running:**
   - Check your PowerShell window
   - You should see: "Server running on http://localhost:3000"
   - If not, run: `node server.js`

3. **IP Address is Correct:**
   ```powershell
   Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*"} | Select-Object IPAddress
   ```
   Use the IP shown in the result

---

### ✅ OPTION 5: Use Mobile Hotspot Instead

If WiFi connection is complicated:

1. **On your phone:**
   - Enable Mobile Hotspot
   - Set a simple password

2. **On your PC:**
   - Connect to your phone's hotspot WiFi

3. **Get new IP:**
   ```powershell
   Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"} | Select-Object IPAddress
   ```

4. **Start server and try the new IP on your phone**

---

## 🎯 Quick Checklist:

Before trying your phone again, verify:

- [ ] Server is running (see "Server running" message in PowerShell)
- [ ] Firewall allows Node.js (or is temporarily off)
- [ ] Phone and PC on same WiFi
- [ ] Using correct IP: **10.195.167.138:3000**
- [ ] Using **http://** not **https://**

---

## 🔍 Testing Steps:

### 1. Test on Your PC First:
Open a browser on your PC and go to:
```
http://localhost:3000
```

**If this works** → Problem is firewall/network
**If this doesn't work** → Problem is server

### 2. Test Local Network:
On your PC browser, try:
```
http://10.195.167.138:3000
```

**If this works** → Firewall is OK, check phone WiFi
**If this doesn't work** → Firewall is blocking

---

## 💡 Recommended Solution:

**I recommend OPTION 1** (Allow through Firewall) as it's:
- ✅ Permanent
- ✅ Safe
- ✅ Easy

After you allow Node.js through the firewall once, it will always work!

---

## ❓ Still Not Working?

If none of these work, reply with:
1. What happens when you visit `http://localhost:3000` on your PC browser?
2. What happens when you visit `http://10.195.167.138:3000` on your PC browser?
3. What's your phone's WiFi network name?
4. What's your PC's WiFi network name?

I'll help you debug further!
