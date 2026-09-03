@echo off
REM Kuwait Job CRM - Development Server
REM This script starts the development environment with hot-reload

echo ============================================
echo Kuwait Job CRM - Development Server v1.0
echo ============================================
echo.
echo Checking Node.js installation...
node --version
if errorlevel 1 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Starting development server with Electron...
echo.
echo The application will launch in a few seconds...
echo Note: DevTools will open in the bottom panel
echo.
echo Keyboard Shortcuts:
echo - Ctrl+C: Stop development server
echo - Ctrl+Shift+I: Toggle Developer Tools
echo - Ctrl+R: Reload application
echo - Ctrl+Q: Quit application
echo.
echo ============================================
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the development server
call npm run electron-dev

if errorlevel 1 (
    echo.
    echo Error: Failed to start development server
    echo Please make sure you have Node.js and npm installed
    pause
    exit /b 1
)
