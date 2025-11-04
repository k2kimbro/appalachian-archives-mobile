import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './../navigationTypes'; // adjust path if needed

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        onPress={() => navigation.navigate('VideoList')}
        style={{ padding: 20, backgroundColor: 'skyblue' }}
      >
        <Text>Go to Video List</Text>
      </Pressable>
    </View>
  );
}
