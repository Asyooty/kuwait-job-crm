# Kuwait Job Application CRM - Installation & Build Guide

## 🚀 Quick Start

### Option 1: Use Pre-built EXE (Recommended for Users)

1. Download the latest release from GitHub
2. Run `Kuwait Job CRM Setup.exe`
3. Follow the installation wizard
4. Launch from Start Menu or Desktop shortcut

### Option 2: Run Portable Version

1. Download `Kuwait Job CRM-*-portable.exe`
2. Double-click to run (no installation needed)
3. All data stored in the same directory

---

## 💻 For Developers

### Prerequisites

- **Windows 10** or **Windows 11**
- **Node.js 16+** (Download from https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning repository)

### Step 1: Clone & Setup

```bash
# Clone the repository
git clone https://github.com/Asyooty/kuwait-job-crm.git
cd kuwait-job-crm

# Install dependencies
npm install
```

### Step 2: Development Mode

**Option A: Using Batch File (Easiest)**
```bash
dev-electron.bat
```

**Option B: Using npm**
```bash
npm run electron-dev
```

This will:
- Start the React dev server (http://localhost:5173)
- Launch Electron window
- Open DevTools automatically
- Enable hot-reload for code changes

### Step 3: Build Windows EXE

**Option A: Using Batch File (Easiest)**
```bash
build-windows.bat
```

**Option B: Using npm**
```bash
npm run electron-build
```

This creates two installers in `dist/` folder:

1. **Kuwait Job CRM Setup.exe** - Full Installer
   - Installs to Program Files
   - Creates Start Menu shortcut
   - Creates Desktop shortcut
   - Size: ~200-300 MB

2. **Kuwait Job CRM-*-portable.exe** - Portable Version
   - No installation required
   - Can run from USB drive
   - All data stored locally
   - Size: ~150-200 MB

---

## 📁 Project Structure

```
kuwait-job-crm/
├── src/                      # React source code
│   ├── components/           # React components
│   │   ├── DashboardView.tsx
│   │   ├── CompaniesView.tsx
│   │   ├── ContactsView.tsx
│   │   ├── ApplicationsView.tsx
│   │   ├── FollowupsView.tsx
│   │   ├── EmailTemplatesView.tsx
│   │   ├── ReportsView.tsx
│   │   ├── TimelineView.tsx
│   │   ├── AnalyticsModal.tsx
│   │   ├── ChartPanel.tsx
│   │   ├── FormBuilder.tsx
│   │   ├── DialogBase.tsx
│   │   ├── GlobalSearch.tsx
│   │   ├── Header.tsx
│   │   ├── AppLayout.tsx
│   │   └── SettingsModal.tsx
│   ├── data/                 # Mock data
│   │   └── mockData.ts
│   ├── types.ts              # TypeScript types
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
├── public/                   # Electron files
│   ├── electron.js           # Electron main process
│   └── preload.js            # Security preload script
├── assets/                   # App assets
│   └── icon.ico              # Windows icon
├── dist/                     # Build output
│   ├── Kuwait Job CRM Setup.exe
│   └── Kuwait Job CRM-*-portable.exe
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
├── build-windows.bat         # Windows build script
├── dev-electron.bat          # Dev server script
└── README.md                 # Documentation
```

---

## 🔧 NPM Scripts

```bash
npm run dev              # Start web dev server (http://localhost:5173)
npm run build            # Build web version
npm run electron-dev     # Start Electron dev environment
npm run electron-build   # Build Windows EXE installers
npm run lint             # Check code quality
npm run preview          # Preview built version
```

---

## 🎯 Features

### Dashboard
- ✅ Company statistics
- ✅ Contact overview
- ✅ Application pipeline
- ✅ Recent activities
- ✅ Key metrics

### Companies Management
- ✅ Add/edit/delete companies
- ✅ Track company details
- ✅ Monitor company status
- ✅ Search & filter

### Contacts Management
- ✅ Add/edit/delete contacts
- ✅ Link contacts to companies
- ✅ Track job titles & departments
- ✅ Email & phone management

### Application Tracking
- ✅ Track each application
- ✅ Monitor status changes
- ✅ Record application dates
- ✅ Link to contacts & jobs

### Follow-ups
- ✅ Schedule follow-ups
- ✅ Automated reminders
- ✅ Filter by status
- ✅ Track completion

### Email Templates
- ✅ Create custom templates
- ✅ Organize by category
- ✅ Preview & test
- ✅ Variable support

### Reports & Analytics
- ✅ Application statistics
- ✅ Response rate tracking
- ✅ Interview rate analysis
- ✅ Status distribution charts
- ✅ Monthly trends
- ✅ Top companies analysis

### Timeline
- ✅ Chronological activity log
- ✅ Email tracking
- ✅ Interview scheduling
- ✅ Follow-up history

---

## 🛠️ Troubleshooting

### "Node.js is not installed"
- Download from https://nodejs.org/ (LTS version)
- Run the installer
- Restart your terminal
- Verify: `node --version`

### "npm command not found"
- npm comes with Node.js
- Reinstall Node.js
- Verify: `npm --version`

### "Port 5173 already in use"
- Another process is using the port
- Close other Node.js processes
- Or change the port in `vite.config.ts`

### "Build fails"
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Run `npm run electron-build` again

### "Application won't start"
- Check Windows 10/11 is up to date
- Try running as Administrator
- Reinstall the application
- Check if antivirus is blocking it

---

## 💾 Data Storage

### Database Location
```
C:\Users\[YourUsername]\AppData\Roaming\Kuwait Job CRM
```

### What's Stored
- ✅ Companies data
- ✅ Contacts information
- ✅ Applications records
- ✅ Follow-ups schedule
- ✅ Email templates
- ✅ User settings
- ✅ Activity logs

### Backup
- Export data from Settings menu
- Save to external drive or cloud
- Restore from backup file when needed

---

## 🔒 Security

- ✅ All data stored locally on your PC
- ✅ No cloud synchronization
- ✅ No tracking or telemetry
- ✅ No account required
- ✅ No password or credentials stored
- ✅ Secure Electron preload process
- ✅ Context isolation enabled

---

## 📊 System Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| OS | Windows 10 Build 1909 | Windows 11 |
| RAM | 2 GB | 4 GB |
| Disk Space | 500 MB | 1 GB |
| Display | 1024x768 | 1920x1080 |
| Processor | Dual Core | Quad Core |

---

## 🚀 Performance Tips

1. **Close unnecessary applications** when using the app
2. **Update Windows** to latest version
3. **Defragment SSD** (if using traditional HDD)
4. **Free up disk space** for better performance
5. **Restart application** if it slows down

---

## 📝 Version Information

- **Application**: Kuwait Job Application CRM v1.0.0
- **Built with**: React 18, Electron 27, TypeScript, Vite
- **License**: MIT
- **Repository**: https://github.com/Asyooty/kuwait-job-crm

---

## 🆘 Support

- 📧 Email: Open an issue on GitHub
- 🐛 Report Bugs: GitHub Issues
- 💡 Feature Requests: GitHub Issues
- 📚 Documentation: README.md

---

## 📄 License

MIT License - Free to use and modify

---

**Made with ❤️ for Job Seekers in Kuwait**
