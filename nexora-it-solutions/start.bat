@echo off
title D-Tech Computer System - Web Application
echo ==========================================================
echo   D-TECH COMPUTER SYSTEM - YOUR TECH PARTNER
echo ==========================================================
echo.

cd /d "%~dp0"

echo Launching local server on http://localhost:8080/ ...
echo Opening your default browser...
start "" "http://localhost:8080/"

powershell -ExecutionPolicy Bypass -File ".\serve.ps1" -Port 8080

pause
