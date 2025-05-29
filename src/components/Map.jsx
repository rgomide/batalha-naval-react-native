import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native"

const Map = (props) => {
  const rows = props.rows
  const cols = props.cols

  const matrix = []
  for (let i = 0; i < rows; i++) {
    const emptyRow = []
    for (let j = 0; j < cols; j++) {
      emptyRow.push({ row: i, col: j })
    }
    matrix.push(emptyRow)
  }

  const [map, setMap] = useState(matrix)

  const onCellClick = (cell) => {
    const i = cell.row
    const j = cell.col

    const mapCopy = [...map]
    cell.revealed = true

    mapCopy[i][j] = cell

    console.log(cell)

    setMap(mapCopy)
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
                      <Text>{cell.row} - {cell.col}</Text>
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
