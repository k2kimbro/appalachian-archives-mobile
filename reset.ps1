# Clean Android build artifacts
Remove-Item -Recurse -Force "android\.gradle","android\app\build","android\build","android\.cxx","android\.idea"

# Clean Expo and Node modules
Remove-Item -Recurse -Force "node_modules",".expo",".expo-shared"

# Clear Metro cache
$env:TEMP | ForEach-Object {
    Get-ChildItem "$_\metro-*" -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse
}

# Clean Gradle
cd android
./gradlew clean
cd ..

# Reinstall dependencies
yarn install
