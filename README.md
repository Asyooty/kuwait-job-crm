# Kuwait Job Application CRM

**Professional Desktop Application for Managing Job Applications & Outreach**

## 🎯 Overview

Kuwait Job CRM is a powerful Windows desktop application designed to help job seekers manage their applications, track outreach efforts, and organize professional relationships with companies and recruiters.

## ✨ Key Features

- 📊 **Advanced Analytics & Reports** - Track application metrics and success rates
- 📈 **Interactive Charts & Graphs** - Visualize your job search progress
- 📅 **Activity Timeline** - Comprehensive audit trail of all interactions
- 🏢 **Company CRM** - Manage companies, contacts, and opportunities
- 👥 **HR/Recruiter Management** - Organize recruiter relationships
- 📧 **Email Templates** - Customizable outreach templates
- 🔍 **Duplicate Protection** - Prevent duplicate applications
- ✅ **Follow-up Automation** - Automated follow-up reminders
- 📁 **Application Tracking** - Track status at every stage
- 💾 **Local Data Storage** - All data stored securely on your PC
- 🌙 **Dark Theme** - Easy on the eyes
- ⚡ **Fast & Lightweight** - Instant response times

## 🚀 Quick Start

### Prerequisites

- Windows 10 or Windows 11
- 500 MB free disk space
- No additional software required (portable version)

### Installation

1. **Download** the installer from the releases page
2. **Run** `Kuwait Job CRM Setup.exe`
3. **Follow** the installation wizard
4. **Launch** the application from Start Menu or Desktop shortcut

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Asyooty/kuwait-job-crm.git
cd kuwait-job-crm

# Install dependencies
npm install

# Start development server
npm run electron-dev
# Or use the batch file:
dev-electron.bat
```

## 🔨 Building from Source

### For Windows

```bash
# Build the application
npm run electron-build

# Or use the batch file:
build-windows.bat
```

This will create two installers in the `dist/` folder:
- **Kuwait Job CRM Setup.exe** - Full installer
- **Kuwait Job CRM-1.0.0-portable.exe** - Portable version

## 📁 Project Structure

```
kuwait-job-crm/
├── src/
│   ├── components/          # React components
│   │   ├── DashboardView.tsx
│   │   ├── CompaniesView.tsx
│   │   ├── ContactsView.tsx
│   │   ├── ApplicationsView.tsx
│   │   ├── ReportsView.tsx
│   │   ├── TimelineView.tsx
│   │   ├── AnalyticsModal.tsx
│   │   ├── ChartPanel.tsx
│   │   ├── FormBuilder.tsx
│   │   └── ...
│   ├── data/
│   │   └── mockData.ts
│   ├── types.ts             # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── electron.js          # Electron main process
│   └── preload.js           # Preload script for security
├── assets/
│   └── icon.ico            # Application icon
├── package.json
├── tsconfig.json
├── vite.config.ts
├── build-windows.bat       # Windows build script
└── dev-electron.bat        # Development script
```

## 🎨 Features in Detail

### Dashboard
- Quick statistics overview
- Recent applications list
- Activity feed
- Application pipeline visualization

### Companies
- Add and manage target companies
- Track company details (industry, location, contacts)
- Monitor company status
- Company contact history

### Contacts
- Manage HR managers and recruiters
- Link contacts to companies
- Track contact information
- Email and phone details

### Applications
- Track each job application
- Monitor application status
- Link to specific contacts and jobs
- Record application dates and methods

### Follow-ups
- Automated follow-up reminders
- Scheduled follow-ups
- Template-based follow-ups
- Follow-up completion tracking

### Reports & Analytics
- Application statistics
- Response rate tracking
- Interview rate calculations
- Status distribution charts
- Monthly application trends
- Top companies analysis

### Timeline
- Chronological activity log
- Email sent/received tracking
- Interview scheduling
- Follow-up history

## 🔒 Security

- ✅ All data stored locally on your PC
- ✅ No cloud synchronization
- ✅ No tracking or telemetry
- ✅ No account required
- ✅ Secure data storage

## ⚙️ System Requirements

- **OS**: Windows 10 (Build 1909+) or Windows 11
- **RAM**: 2 GB minimum, 4 GB recommended
- **Disk Space**: 500 MB free space
- **Display**: 1024x768 minimum resolution

## 📝 Data Management

### Backup & Export
Export your data at any time:
- CSV export
- Excel export
- JSON export

### Data Storage Location
On Windows:
```
C:\Users\[YourUsername]\AppData\Roaming\Kuwait Job CRM
```

## 🐛 Troubleshooting

### Application won't start
1. Ensure Windows 10/11 is up to date
2. Try running in compatibility mode (Windows 7)
3. Reinstall the application

### Missing database
- Data is stored in AppData folder
- Check if antivirus is blocking file access

### Performance issues
1. Close other applications
2. Free up disk space
3. Restart the application

## 🤝 Support

For issues or feature requests, please visit:
- GitHub Issues: https://github.com/Asyooty/kuwait-job-crm/issues

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Credits

Built with:
- React 18
- Electron 27
- Recharts
- TypeScript
- Vite

## 🚀 Version History

### v1.0.0 (Initial Release)
- Core CRM features
- Company and contact management
- Application tracking
- Analytics and reports
- Follow-up automation
- Dark theme UI
- Windows installer

---

**Made with ❤️ for Job Seekers in Kuwait**
