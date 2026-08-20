@echo off
echo ========================================================
echo   COGNITIA 2026 - AWS S3 DEPLOYMENT SCRIPT
echo ========================================================
echo.

echo 1. Building production bundle...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed! Aborting deployment.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo 2. Uploading static files to AWS S3 bucket cognitia-2026-app-529470779811...
call aws s3 sync dist s3://cognitia-2026-app-529470779811 --delete

echo.
echo ========================================================
echo   SUCCESSFULLY DEPLOYED TO COGNITIA AWS DOMAIN!
echo   S3 Endpoint: http://cognitia-2026-app-529470779811.s3-website.ap-south-1.amazonaws.com
echo   DNS Zone: http://cognitia.dpdns.org
echo ========================================================
echo.
pause
