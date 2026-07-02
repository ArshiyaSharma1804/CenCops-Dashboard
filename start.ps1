# Start the Flask Backend
Write-Host "Starting Flask Backend..." -ForegroundColor Cyan
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit -Command `"cd backend; .\venv\Scripts\Activate.ps1; python app.py`"" -WindowStyle Normal

# Start the Vite Frontend
Write-Host "Starting React Frontend..." -ForegroundColor Cyan
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit -Command `"npm run dev`"" -WindowStyle Normal

Write-Host "Servers are starting in separate windows!" -ForegroundColor Green
