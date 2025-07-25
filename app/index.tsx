import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  useEffect(() => {
    const navigate = async () => {
      try {
        console.log('Index screen loaded');
        
        // Simple delay before navigation
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Go to test screen first to verify basic functionality
        router.replace('/test');
      } catch (error) {
        console.error('Navigation error:', error);
                 // Still try to navigate even if there's an error
         setTimeout(() => {
           router.replace('/test');
         }, 1000);
      }
    };

    navigate();
  }, []);

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
        Welcome...
      </Text>
    </View>
  );
}