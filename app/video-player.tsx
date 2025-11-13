import Slider from '@react-native-community/slider';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';

type Props = {
  url: string;
  title?: string;
};

const formatTime = (seconds = 0) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const toggleFullscreen = () => {
  Orientation.lockToLandscape();
  // Optionally set fullscreen state
};

const VideoPlayer = () => {
  const { url, title } = useLocalSearchParams();

  const videoRef = useRef<React.ComponentRef<typeof Video>>(null); // ✅ correct

  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsOpacity = useRef(new Animated.Value(0)).current;


const { videoUrl } = useLocalSearchParams();


const toggleControls = () => {
  Animated.timing(controlsOpacity, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();

  if (hideTimeout.current) clearTimeout(hideTimeout.current);
  hideTimeout.current = setTimeout(() => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, 3000);
};

useEffect(() => {
  toggleControls(); // triggers auto-hide
}, []);

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setShowControls((prev) => prev); // force re-render
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
  toggleControls();
  }, []);

  console.log('[Player] Received videoUrl:', url);

  if (!url || typeof url !== 'string') {
    return (
      <View style={styles.error}>
        <Text>❌ Invalid video URL</Text>
      </View>
    );
  }
const videoHeight = isLandscape ? height * 0.6 : height * 0.4;

return (
  <SafeAreaView style={styles.safeArea}>
    <Pressable style={{ flex: 1 }} onPress={toggleControls}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: url }}
          controls={false}
          style={{ width: '100%', height: videoHeight, zIndex: 1 }}
          resizeMode="contain"
          fullscreen={false}
          paused={paused}
          onProgress={({ currentTime }) => setPosition(currentTime)}
          onLoad={({ duration }) => setDuration(duration)}
          onError={(e) => {
            console.warn('Video error:', e);
            setPaused(true);
          }}
        />
        {showControls && (
          <Animated.View
            pointerEvents="box-none"
            style={[styles.controls, isLandscape && styles.landscapeControls, { opacity: controlsOpacity }]}
          >
            <TouchableOpacity
              onPress={() => {
                setPaused(!paused);
                toggleControls(); // restart fade
              }}
            >
              <Text style={styles.button}>{paused ? '▶️ Play' : '⏸ Pause'}</Text>
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={(value) => videoRef.current?.seek(value)}
              minimumTrackTintColor="#3B4C47"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#F0E4C6"
            />
            <Text style={styles.time}>
              {formatTime(position)} / {formatTime(duration)}
            </Text>
          </Animated.View>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
    </Pressable>
  </SafeAreaView>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0E4C6',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  videoWrapper: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(59, 76, 71, 0.9)',
    zIndex: 10, // ✅ ensures layering above video
  },
  landscapeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  button: {
    fontSize: 16,
    color: '#F0E4C6',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  time: {
    color: '#F0E4C6',
    textAlign: 'center',
    marginTop: 4,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    padding: 12,
    color: '#3B4C47',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
