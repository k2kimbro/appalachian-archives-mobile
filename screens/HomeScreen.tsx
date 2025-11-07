import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        onPress={() => router.push('/videos')}
        style={{ padding: 20, backgroundColor: 'skyblue' }}
      >
        <Text>Go to Video List</Text>
      </Pressable>
    </View>
  );
}

