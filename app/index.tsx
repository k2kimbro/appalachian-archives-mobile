// app/index.tsx
import Constants from 'expo-constants';
import { router, Stack } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const description = Constants.expoConfig?.extra?.description ?? "Preserving your memories.";
const GREEN = '#3B4C47';

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(80)).current; // starts 80px below


useEffect(() => {
Animated.stagger(400, [
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }),
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 2000,
    useNativeDriver: true,
  }),
]).start();

}, []);

return (
  <SafeAreaView style={styles.safe} edges={['bottom']}>
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim}] }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.title}>Appalachian Archives</Text>
      <Text style={styles.subtitle}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/videos')}>
        <Text style={styles.buttonText}>Go to Your Videos</Text>
      </TouchableOpacity>
    </Animated.View>

    {/* Bottom safe border */}
    <View style={styles.controlBar} />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F0E4C6',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
    color: '#3B4C47',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#4F5D75',
    marginTop: 8,
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
    color: '#F0E4C6',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
  },
  bottomBorder: {
    height: 6,
    backgroundColor: '#3B4C47',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: '#2A3632',
    zIndex: 10,
  },
});