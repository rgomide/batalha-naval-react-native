import { StyleSheet, Text, View } from 'react-native';
import Map from './src/components/Map';
import { useState } from 'react';

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState('Jogador 1')
  const [winner, setWinner] = useState()

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

  const onTurnCompleted = () => {
    if (currentPlayer == 'Jogador 1') {
      setCurrentPlayer('Jogador 2')
    } else {
      setCurrentPlayer('Jogador 1')
    }
  }

  const onVictory = (player) => {
    setWinner(player)
  }

  return (
    <View style={styles.container}>
      {winner && (
        <Text style={styles.winner}>Vencedor: {winner}</Text>
      )}
      <Text style={styles.currentPlayer}>{currentPlayer}</Text>
      <Map
        rows="7"
        cols="8"
        onTurnCompleted={onTurnCompleted}
        onVictory={onVictory}
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
  currentPlayer: {
    fontWeight: 'bold',
    fontSize: 20
  },
  winner: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 25
  }
});
