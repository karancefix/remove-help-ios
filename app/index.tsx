import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (hasSeenOnboarding === 'true') {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        router.replace('/onboarding');
      }
    };

    checkOnboarding();
  }, []);

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
        Loading...
      </Text>
    </View>
  );
}