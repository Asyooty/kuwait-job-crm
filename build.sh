#!/bin/bash
echo "============================================"
echo "Kuwait Job CRM - Windows EXE Builder"
echo "============================================"
echo ""
echo "Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Step 2: Building the application..."
npm run electron-build
if [ $? -ne 0 ]; then
    echo "Error: Failed to build application"
    exit 1
fi

echo ""
echo "============================================"
echo "Build completed successfully!"
echo "============================================"
echo ""
echo "The installers will be created in the 'dist' folder:"
echo "- Kuwait Job CRM Setup (Installer)"
echo "- Kuwait Job CRM Portable (Standalone EXE)"
echo ""
