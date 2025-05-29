import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native"

const Map = (props) => {
  // extract events
  const onTurnCompleted = props.onTurnCompleted
  const onVictory = props.onVictory
  
  // extract map dimensions
  const rows = props.rows
  const cols = props.cols

  // extract player shippings
  const player1Shippings = props.player1Shippings
  const player2Shippings = props.player2Shippings

  // generate map state
  const generateEmptyMap = () => {
    const matrix = []
    for (let i = 0; i < rows; i++) {
      const emptyRow = []
      for (let j = 0; j < cols; j++) {
        emptyRow.push({ row: i, col: j })
      }
      matrix.push(emptyRow)
    }
    return matrix
  }

  const [map, setMap] = useState(generateEmptyMap())

  // events
  const onCellClick = (cell) => {
    const i = cell.row
    const j = cell.col

    const mapCopy = [...map]
    cell.revealed = true

    mapCopy[i][j] = cell

    onTurnCompleted(cell)

    const isPlayer1Victory = isAllShippingsRevealed(mapCopy, player1Shippings)

    if (isPlayer1Victory) {
      onVictory('Jogador 1')
    }

    const isPlayer2Victory = isAllShippingsRevealed(mapCopy, player2Shippings)

    if (isPlayer2Victory) {
      onVictory('Jogador 2')
    }

    setMap(mapCopy)
  }

  const isAllShippingsRevealed = (currentMatrix, shippings) => {
    let totalRevealed = 0
    let totalPoints = 0

    shippings.forEach((shipping) => {
      shipping.position.forEach((position) => {
        const row = position.row
        const col = position.col

        if (currentMatrix[row][col].revealed) {
          totalRevealed++
        }

        totalPoints++
      })
    })

    return totalRevealed >= totalPoints
  }

  const isShipping = (shippings, cell) => {
    return shippings.find((ship) => {
      return ship.position.find((position) => {
        return position.row == cell.row && position.col == cell.col
      })
    })
  }

  const showContent = (cell) => {
    const isPlayer1Shipping = isShipping(player1Shippings, cell)

    if (isPlayer1Shipping && cell.revealed) {
      return 'P1'
    }

    const isPlayer2Shipping = isShipping(player2Shippings, cell)

    if (isPlayer2Shipping && cell.revealed) {
      return 'P2'
    }

    return ''
  }

  return (
    <ScrollView>
      {/* Identificação das colunas */}
      <View style={[styles.rowContainer, styles.paddingLeft48]}>
        {map[0].map((col, colIndex) => {
          return (
            <View style={styles.colIndexContainer} key={colIndex}>
              <Text>{colIndex}</Text>
            </View>
          )
        })}
      </View>

      {/* Linhas */}
      {map.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.rowContainer}>
            <View style={styles.rowContainer}>

              {/* Identificação da linha */}
              {(<View style={styles.rowIndexContainer}><Text>{rowIndex}</Text></View>)}

              {/* Lista de botões da linha */}
              {row.map((cell, colIndex) => {
                return (
                  <View key={colIndex} style={(cell.revealed) ? styles.cellContainerRevealed : styles.cellContainer}>
                    <Pressable onPress={() => onCellClick(cell)} style={styles.pressable}>
                      <Text>{showContent(cell)}</Text>
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paddingLeft48: {
    paddingLeft: 48
  },
  colIndexContainer: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  rowIndexContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48
  },
  cellContainer: {
    borderWidth: 1,
    backgroundColor: '#c7dcff',
    width: 48,
    height: 48
  },
  cellContainerRevealed: {
    borderWidth: 1,
    backgroundColor: '#ddd',
    width: 48,
    height: 48
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
})

export default Map
