import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  console.log('Index screen loaded');
  
  // Navigate immediately without hooks
  setTimeout(() => {
    router.replace('/test');
  }, 100);

  // Show loading screen while navigating
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#facc15', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Text style={{ 
        color: '#FFFFFF', 
        fontSize: 18, 
        fontWeight: 'bold' 
      }}>
        Starting...
      </Text>
    </View>
  );
}