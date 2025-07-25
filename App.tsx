import { Slot } from 'expo-router';

export default function App() {
  console.log('App component rendering...');
  
  try {
    return <Slot />;
  } catch (error) {
    console.error('App render error:', error);
    return null;
  }
}