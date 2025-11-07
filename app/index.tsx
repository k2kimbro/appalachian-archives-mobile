// app/index.tsx
import Constants from 'expo-constants';
import { router, Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

const description = Constants.expoConfig?.extra?.description ?? "Preserving your memories.";

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.title}>Appalachian Archives</Text>
      <Text style={styles.subtitle}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/videos')}>
        <Text style={styles.buttonText}>Go to Your Videos</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E4C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
    color: '#3B4C47',
    textAlign: 'center',
  },
button: {
  marginTop: 20,
  paddingVertical: 12,
  paddingHorizontal: 24,
  backgroundColor: '#3B4C47',
  borderRadius: 6,
},
buttonText: {
  color: '#F0E4C6', // pure white
  fontSize: 16,
  fontFamily: 'OpenSans-Regular',
  textAlign: 'center',
},
  subtitle: {
  fontSize: 16,
  fontFamily: 'OpenSans-Regular',
  color: '#4F5D75',
  marginTop: 8,
  textAlign: 'center',
},
});
