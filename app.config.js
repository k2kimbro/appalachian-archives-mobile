// app.config.js
module.exports = {
  name: "Appalachian Archives",
  slug: "appalachian-archives-mobile",
  version: "1.0.0",
  orientation: "default",
  icon: "./assets/images/aaicon.png",
  splash: {
    image: "./assets/images/splashscreen.png",
    resizeMode: "cover",
    backgroundColor: "#F0E4C6"
  },
  scheme: "appalachianarchivesmobile",
  userInterfaceStyle: "automatic",
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
    package: "com.appalachianarchives.mobile",
    label: "Appalachian Archives",
    showDevClientDebugBanner: false,
  },
  web: {
    output: "single",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-av",
    "expo-font",
    "expo-router",
    "react-native-video"
  ],
  extra: {
    eas: {
      projectId: "7f3db69e-b6f8-4978-870c-682c98fed95d"
    },
    description: `Preserving your memories,
    one frame at a time.`,
    entryPoint: "./node_modules/expo-router/entry",
    newArchEnabled: true,
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    androidLabel: "Appalachian Archives"
  }
};
