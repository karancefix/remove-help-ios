import { View, Text } from 'react-native';

export default function TestScreen() {
  console.log('Test screen rendering...');
  
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#facc15'
    }}>
      <Text style={{ 
        color: '#FFFFFF', 
        fontSize: 24, 
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        iOS Test Screen{'\n'}App is Working!{'\n'}{'\n'}✅ Auto-Build Test v1.5{'\n'}🔧 Disabled Supabase/Node.js modules
      </Text>
    </View>
  );
}