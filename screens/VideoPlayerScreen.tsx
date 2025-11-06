import { RouteProp } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigationTypes';

type VideoPlayerRouteProp = RouteProp<RootStackParamList, 'VideoPlayer'>;

interface Props {
  route: VideoPlayerRouteProp;
}

export default function VideoPlayerScreen({ route }: Props) {
  const { video } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: video.url }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        style={{ width: '100%', height: 300 }}
      />
      <Text style={{ marginTop: 10 }}>{video.title}</Text>
    </View>
  );
}
