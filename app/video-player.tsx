import { ResizeMode, Video } from 'expo-av';
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VideoPlayerScreen() {

  const { videoId, title, thumbnail, url } = useLocalSearchParams();

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E4C6', // immersive black background
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
    color: '#F0E4C6',
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
  backgroundColor: '#3B4C47',
  borderRadius: 6,
},

backButtonText: {
  color: '#F0E4C6',
  fontSize: 16,
  fontFamily: 'OpenSans-Regular',
  textAlign: 'center',
},
});

  return (
        <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
      <Video
        source={{ uri: String(url) }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={{ width: '100%', height: 300 }}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>{String(title)}</Text>
    </View>
  );
}
