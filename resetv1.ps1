# Clean Android and Expo artifacts
Remove-Item -Recurse -Force "android\.gradle","android\app\build","android\build","android\.cxx","android\.idea" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "node_modules",".expo",".expo-shared" -ErrorAction SilentlyContinue

# Clear Metro cache
$env:TEMP | ForEach-Object {
    Get-ChildItem "$_\metro-*" -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse
}





