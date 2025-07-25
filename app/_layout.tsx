import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, LogBox, View, Text } from 'react-native';

// Ignore specific warnings that can cause crashes in production
LogBox.ignoreLogs([
  'Warning: AsyncStorage has been extracted from react-native',
  'Setting a timer for a long period of time',
  'VirtualizedLists should never be nested',
  'Non-serializable values were found in the navigation state',
  'Constants.platform.ios.model has been deprecated',
  'Require cycle:',
  'Remote debugger',
  'Flipper',
  'componentWillReceiveProps',
  'componentWillMount',
]);

// Remove splash screen handling that was causing issues

// Simple error boundary component
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('ErrorBoundary mounted');
  }, []);

  if (hasError) {
    console.log('ErrorBoundary - showing error screen');
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20,
        backgroundColor: '#facc15'
      }}>
        <Text style={{ 
          fontSize: 18, 
          color: '#FFFFFF', 
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          App Error - Please Restart
        </Text>
      </View>
    );
  }

  try {
    return children;
  } catch (error) {
    console.error('ErrorBoundary caught error:', error);
    setHasError(true);
    return null;
  }
}

export default function RootLayout() {
  console.log('RootLayout rendering...');
  
  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="test" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="subscription" />
        <Stack.Screen name="payment-return" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ErrorBoundary>
  );
}