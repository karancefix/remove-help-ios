import { Slot } from 'expo-router';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Don't crash the app, just log the error
      event.preventDefault();
    };

    if (typeof global !== 'undefined') {
      global.addEventListener?.('unhandledrejection', handleUnhandledRejection);
    }

    return () => {
      if (typeof global !== 'undefined') {
        global.removeEventListener?.('unhandledrejection', handleUnhandledRejection);
      }
    };
  }, []);

  if (hasError) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#facc15',
        padding: 20
      }}>
        <Text style={{ 
          color: '#FFFFFF', 
          fontSize: 18, 
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          App failed to load. Please restart.
        </Text>
      </View>
    );
  }

  try {
    return <Slot />;
  } catch (error) {
    console.error('App render error:', error);
    setHasError(true);
    return null;
  }
}