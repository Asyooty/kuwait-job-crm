@echo off
REM Kuwait Job CRM - Windows EXE Builder
REM This script builds the application and creates Windows installers

echo ============================================
echo Kuwait Job CRM - Windows EXE Builder v1.0
echo ============================================
echo.
echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo Error: Failed to install dependencies
    exit /b 1
)

echo.
echo Step 2: Building the application...
call npm run electron-build
if errorlevel 1 (
    echo Error: Failed to build application
    exit /b 1
)

echo.
echo ============================================
echo Build completed successfully!
echo ============================================
echo.
echo Output files created in 'dist' folder:
echo.
echo 1. Kuwait Job CRM Setup.exe
echo    - Full installer for Windows 10/11
echo    - Creates Start Menu shortcuts
echo    - Creates Desktop shortcut
echo    - Size: ~200-300 MB
echo.
echo 2. Kuwait Job CRM-*-portable.exe
echo    - Standalone portable executable
echo    - No installation required
echo    - Can run from USB drive
echo    - Size: ~150-200 MB
echo.
echo Installation:
echo - Run the .exe file
echo - Follow the installation wizard
echo - Application will be installed in Program Files
echo.
echo To launch after installation:
echo - Click the Start Menu shortcut
echo - Or double-click the Desktop shortcut
echo.
echo ============================================
echo Thank you for using Kuwait Job CRM!
echo ============================================
echo.
pause
