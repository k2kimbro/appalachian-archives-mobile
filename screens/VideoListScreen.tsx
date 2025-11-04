import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigationTypes';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

export default function VideoListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'VideoList'>>();
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://192.168.2.108:3000/api/media');
        const data = await response.json();
        setVideos(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('VideoPlayer', {
                video: {
                  ...item,
                  url: item.videoUrl, // remap for expected type
                },
              })
            }
            style={{ padding: 10, borderBottomWidth: 1 }}
          >
            <Image source={{ uri: item.thumbnail }} style={{ width: 150, height: 100 }} />
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
