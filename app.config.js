const defineConfig = (config) => ({
  ...config,
  entryPoint: './node_modules/expo-router/entry',
});

module.exports = defineConfig({
  name: "Appalachian Archives",
  description: "Preserving your memories, one frame at a time",
  slug: "appalachian-archives-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/aaicon.png",
  splash: {
    image: "./assets/images/splashscreen.png",
    resizeMode: "cover",
    backgroundColor: "#F0E4C6"
  },
  scheme: "appalachianarchivesmobile",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png"
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.anonymous.appalachianarchivesmobile",
    label: " " // single space to suppress name
  },
  web: {
    output: "single",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-av",
    "expo-font",
    "expo-router"
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true
  }
});
