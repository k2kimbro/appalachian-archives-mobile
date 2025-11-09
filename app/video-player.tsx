import { ResizeMode, Video } from 'expo-av';
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedButton } from '../components/ThemedButton';
import { theme } from '../theme'; // adjust path if needed
import { ControlBar } from './components/ControlBar';

<ThemedButton
  title="← Go Back"
  onPress={() => router.back()}
  variant="primary"
/>

export default function VideoPlayerScreen() {

  const { videoId, title, thumbnail, url } = useLocalSearchParams();

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.beige, // beige background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  video: {
    width: '100%',
    height: 300,
  },
  title: {
    marginTop: 10,
    color: theme.colors.beige,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
  },
backButton: {
  position: 'absolute',
  bottom: 75,
  alignSelf: 'center',
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: theme.colors.primaryGreen,
  borderRadius: 6,
},
backButtonText: {
  color: theme.colors.beige,
  fontSize: 16,
  fontFamily: 'OpenSans-Regular',
  textAlign: 'center',
},
controlBar: {
  position: 'absolute',
  bottom: 0,
  left: 0,          // 👈 ensure it anchors to the left edge
  right: 0,         // 👈 ensure it anchors to the right edge
  height: 50,
  backgroundColor: theme.colors.darkGreen, // should be dark green
  zIndex: 10,
},

});

  return (
        <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
      <Video
        source={{ uri: String(url) }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={styles.video}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedButton
          title="← Go Back"
          onPress={() => router.back()}
          variant="primary"
      />
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>{String(title)}</Text>
    <ControlBar />
    </View>
  );
}
