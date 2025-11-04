const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
console.log("🔧 Running postinstall patch script...");

// === Gesture Handler JNI Stub ===
const jniDir = path.join(root, "node_modules", "react-native-gesture-handler", "android", "src", "main", "jni");
const cmakePath = path.join(jniDir, "CMakeLists.txt");
const dummyCppPath = path.join(jniDir, "dummy.cpp");

fs.writeFileSync(cmakePath, `cmake_minimum_required(VERSION 3.13)
project(gesturehandler_stub)
add_library(gesturehandler_stub SHARED dummy.cpp)`);
fs.writeFileSync(dummyCppPath, `extern "C" void dummy() {}`);
console.log("✅ Stubbed gesture-handler JNI build");

// === Kotlin Null Safety Patch ===
const kotlinPath = path.join(root, "node_modules", "react-native-gesture-handler", "android", "src", "main", "java", "com", "swmansion", "gesturehandler", "react", "RNGestureHandlerModule.kt");
if (fs.existsSync(kotlinPath)) {
  let code = fs.readFileSync(kotlinPath, "utf8");
  if (code.includes("decorateRuntime(jsContext.get())")) {
    code = code.replace("decorateRuntime(jsContext.get())", "jsContext?.get()?.let { decorateRuntime(it) }");
    fs.writeFileSync(kotlinPath, code);
    console.log("✅ Patched Kotlin null safety");
  } else {
    console.log("ℹ️ Kotlin patch already applied");
  }
}

// === Android-autolinking.cmake Patch ===
const autolinkPath = path.join(root, "android", "app", "build", "generated", "autolinking", "src", "main", "jni", "Android-autolinking.cmake");
if (fs.existsSync(autolinkPath)) {
  let content = fs.readFileSync(autolinkPath, "utf8");
  if (content.includes("add_subdirectory") && !content.includes("EXISTS")) {
    content = content.replace(
      /add_subdirectory\(".*gesture-handler.*jni\/"\)/,
      `set(GESTURE_HANDLER_CODEGEN_DIR "\${CMAKE_CURRENT_SOURCE_DIR}/../../../../../node_modules/react-native-gesture-handler/android/src/main/jni/")
if(EXISTS "\${GESTURE_HANDLER_CODEGEN_DIR}")
  add_subdirectory("\${GESTURE_HANDLER_CODEGEN_DIR}")
endif()`
    );
    fs.writeFileSync(autolinkPath, content);
    console.log("✅ Patched Android-autolinking.cmake");
  } else {
    console.log("ℹ️ Autolinking patch already applied or not needed");
  }
}

// === Clean .cxx folders ===
const cxxDir = path.join(root, "android", "app", ".cxx");
if (fs.existsSync(cxxDir)) {
  fs.rmSync(cxxDir, { recursive: true, force: true });
  console.log("🧹 Cleaned .cxx folder");
}

// === Optional: Run gradlew clean ===
try {
   execSync("gradlew clean", { cwd: path.join(root, "android"), stdio: "inherit" });
   console.log("🧼 Ran gradlew clean");
 } catch (err) {
 console.warn("⚠️ gradlew clean failed:", err.message);
 }

console.log("🎯 Postinstall patch complete.");
