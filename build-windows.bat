@echo off
echo ============================================
echo Kuwait Job CRM - Windows EXE Builder
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
echo The installer will be created in the 'dist' folder:
echo - Kuwait Job CRM Setup (Installer)
echo - Kuwait Job CRM Portable (Standalone EXE)
echo.
pause
