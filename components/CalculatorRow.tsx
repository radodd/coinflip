import React from 'react'
import { View } from 'react-native'

const CalculatorRow = ({ children }: any) => {
  return (
    <View style={{ flexDirection: "row" }}>{children}</View>
  )
}

export default CalculatorRow