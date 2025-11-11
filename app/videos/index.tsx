// app/videos/index.tsx
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from 'theme'; // adjust path if needed
import { ControlBar } from '../components/ControlBar';

function normalizeVideos(data: any): VideoItem[] {
  // If backend returns { videos: [...] }
  if (data && Array.isArray(data.videos)) {
    return data.videos.map((v: any) => ({
      id: v.id || v._id || String(Math.random()),
      title: v.title || v.name || "Untitled",
      thumbnail: v.thumbnail || v.thumb || "",
      videoUrl: v.videoUrl || v.url || ""
    }));
  }

  // If backend returns an array directly
  if (Array.isArray(data)) {
    return data.map((v: any) => ({
      id: v.id || v._id || String(Math.random()),
      title: v.title || v.name || "Untitled",
      thumbnail: v.thumbnail || v.thumb || "",
      videoUrl: v.videoUrl || v.url || ""
    }));
  }

  // If backend returns a single object
  if (data && typeof data === "object") {
    return [{
      id: data.id || data._id || String(Math.random()),
      title: data.title || data.name || "Untitled",
      thumbnail: data.thumbnail || data.thumb || "",
      videoUrl: data.videoUrl || data.url || ""
    }];
  }

  // Fallback: empty list
  return [];
}


const styles = StyleSheet.create({
  controlBar: {
    position: 'absolute',
    bottom: 0,
    height: 50, // adjust as needed
    width: '100%',
    backgroundColor: theme.colors.darkGreen, // ← from theme
    zIndex: 10,
  },
  listItem: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.darkGreen,
  },
  listItemText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.black,
  },
  thumbnail: {
    width: 150,
    height: 100,
    borderRadius: theme.borderRadius.sm,
  },
  screen: {
    flex: 1,
    backgroundColor: theme.colors.beige,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.beige,
  },
  listContent: {
  paddingBottom: theme.spacing.xl,
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
      const data = await response.json() as VideoItem[]
      setVideos(data);
      console.log("Fetched videos:", data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  fetchVideos();
}, []);


  return (
      <View style={styles.screen}>
  <Stack.Screen
    options={{
      title: "Your Videos",
      headerStyle: { backgroundColor: theme.colors.beige },
      headerTitleStyle: {
        fontWeight: theme.typography.fontWeight.bold,
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.primaryGreen,
        fontFamily: 'Merriweather-Bold',
      },
    }}
  />
  <SafeAreaView style={styles.safeArea}>
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
          style={styles.listItem}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.listItemText}>{item.title}</Text>
        </Pressable>
      )}
      contentContainerStyle={styles.listContent}
    />
  </SafeAreaView>
  <ControlBar />
</View>
  );
}
