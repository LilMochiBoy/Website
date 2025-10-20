# ⚡ ALTERNATIVE SOLUTION - Use a Different Port or Disable Firewall

Since the firewall is being difficult, here are 3 simple alternatives:

---

## 🎯 **OPTION 1: Let Windows Ask You (EASIEST)**

1. **Make sure server is stopped** (press Ctrl+C in PowerShell)

2. **Restart the server:**
   ```powershell
   cd 'C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website'
   node server.js
   ```

3. **Try to access from your phone:** `http://10.195.167.138:3000`

4. **Watch your PC screen** - Windows Firewall should pop up asking:
   - "Windows Defender Firewall has blocked some features of Node.js"
   - **Click "Allow access"** or **check "Private networks"** and click "Allow access"

5. **Try again on your phone**

---

## 🎯 **OPTION 2: Manually Disable Firewall for Private Network (Quick Test)**

### Turn OFF Firewall (Temporary):

Run these commands:
```powershell
# Turn off firewall for private network only
Set-NetFirewallProfile -Profile Private -Enabled False
```

Then:
1. Start server: `node server.js`
2. Try on phone: `http://10.195.167.138:3000`
3. **If it works**, turn firewall back on:
   ```powershell
   Set-NetFirewallProfile -Profile Private -Enabled True
   ```

---

## 🎯 **OPTION 3: Use Your Phone's Hotspot**

This bypasses your WiFi network completely:

1. **On your Android phone:**
   - Settings → Network & Internet → Hotspot & tethering
   - Turn on "Wi-Fi hotspot"
   - Note the password

2. **On your PC:**
   - Connect to your phone's hotspot WiFi

3. **Get your new IP:**
   ```powershell
   Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"} | Select-Object IPAddress
   ```

4. **Start server:**
   ```powershell
   node server.js
   ```

5. **On your phone's browser:**
   - Use the IP from step 3, like: `http://192.168.x.x:3000`

This usually works because phone hotspot networks have different firewall rules!

---

## 🎯 **OPTION 4: Use ngrok (Works Anywhere)**

ngrok creates a public URL that tunnels to your local server:

1. **Download ngrok:** https://ngrok.com/download
   - Extract to: `C:\ngrok`

2. **Start your server:**
   ```powershell
   cd 'C:\Users\Reynard Jave Hanson\Desktop\Crawler\Website'
   node server.js
   ```

3. **In a NEW PowerShell window:**
   ```powershell
   C:\ngrok\ngrok.exe http 3000
   ```

4. **ngrok will show a URL** like: `https://abc123.ngrok.io`

5. **Use that URL on your phone!** Works from anywhere, even mobile data!

---

## 🎯 **MY RECOMMENDATION:**

Try them in this order:
1. **Option 1** (restart server, watch for Windows popup) - 1 minute
2. **Option 3** (use phone hotspot) - 2 minutes  
3. **Option 4** (ngrok) - 5 minutes, but works perfectly every time

Let me know which one you want to try!
