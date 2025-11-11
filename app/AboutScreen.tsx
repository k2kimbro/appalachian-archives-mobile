import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ExpoConfig = {
  version?: string;
  android?: { versionCode?: number };
  ios?: { buildNumber?: string };
};

export default function AboutScreen() {
  const expoConfig = Constants.expoConfig as ExpoConfig | null;

  const appVersion = expoConfig?.version ?? 'Unknown';
  const androidVersionCode = expoConfig?.android?.versionCode;
  const iosBuildNumber = expoConfig?.ios?.buildNumber;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Appalachian Archives</Text>
      <Text style={styles.item}>App Version: {appVersion}</Text>
      {androidVersionCode !== undefined && (
        <Text style={styles.item}>Android Version Code: {androidVersionCode}</Text>
      )}
      {iosBuildNumber !== undefined && (
        <Text style={styles.item}>iOS Build Number: {iosBuildNumber}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F0E4C6',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3B4C47',
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});
