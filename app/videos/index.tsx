// app/videos/index.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  controlBar: {
    position: 'absolute',
    bottom: 0,
    height: 50, // adjust as needed
    width: '100%',
    backgroundColor: '#2A3632', // ← your desired color
    zIndex: 10,
  },
});


interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

export default function VideoListScreen() {
  const router = useRouter();
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
      <View style={{ flex: 1, backgroundColor: "#F0E4C6" }}>
      <Stack.Screen
        options={{
        title: "Your Videos",
        headerStyle: { backgroundColor: "#F0E4C6" },
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
  }
  }
/>
<SafeAreaView style={{ flex: 1, backgroundColor: "#F0E4C6" }}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
                router.push({
                pathname: '/video-player',
                params: {
      videoId: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      url: item.videoUrl,
    },
              })
            }
            style={{ padding: 10, borderBottomWidth: 1 }}
          >
            <Image source={{ uri: item.thumbnail }} style={{ width: 150, height: 100 }} />
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
          </Pressable>
        )}
         contentContainerStyle={{ paddingBottom: 80 }} // 👈 buffer at bottom
      />
      </SafeAreaView>
      <View style={styles.controlBar} />

    </View>
  );
}
