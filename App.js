import { StyleSheet, View } from 'react-native';
import Map from './src/components/Map';

export default function App() {
  return (
    <View style={styles.container}>
       <Map rows="7" cols="8"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
