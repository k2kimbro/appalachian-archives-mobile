# Set the path to your APK file
$apkPath = "$env:USERPROFILE\Downloads\app-release.apk"

# Check if the file exists
if (Test-Path $apkPath) {
    Write-Host "Installing APK from $apkPath..."
    adb install -r $apkPath
} else {
    Write-Host "APK not found at $apkPath"
    Write-Host "Please download the APK and place it in your Downloads folder."
}
