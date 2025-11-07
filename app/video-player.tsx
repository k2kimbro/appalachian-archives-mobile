import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function VideoPlayerScreen() {
  const { videoId, title, thumbnail, url } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: String(url) }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={{ width: '100%', height: 300 }}
      />
      <Text style={{ marginTop: 10 }}>{String(title)}</Text>
    </View>
  );
}
