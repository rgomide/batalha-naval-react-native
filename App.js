import { StyleSheet, View } from 'react-native';
import Map from './src/components/Map';

export default function App() {
  const player1Shippings = [
    {
      position: [
        { row: 2, col: 4 },
        { row: 3, col: 4 },
        { row: 4, col: 4 }
      ]
    }
  ]
  const player2Shippings = [
    {
      position: [
        { row: 6, col: 3 },
        { row: 6, col: 4 },
        { row: 6, col: 5 }
      ]
    }
  ]


  return (
    <View style={styles.container}>
      <Map
        rows="7"
        cols="8"
        player1Shippings={player1Shippings}
        player2Shippings={player2Shippings} />
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
