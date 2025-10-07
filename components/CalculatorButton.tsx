import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CalculatorButton = ({onPress, text , size, theme}: any) => {
    const buttonStyles: any[] = [styles.button];
    const textStyles: any[] = [styles.text];
  
    if (size === "double") {
      buttonStyles.push(styles.buttonDouble);
    }
  
    if (theme === "secondary") {
      buttonStyles.push(styles.buttonSecondary);
      textStyles.push(styles.textSecondary);
    } else if (theme === "accent") {
      buttonStyles.push(styles.buttonAccent);
    }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
    <Text style={textStyles}>{text}</Text>
  </TouchableOpacity>
  )
}

const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
    text: {
      color: "#fff",
      fontSize: 15
    },
    textSecondary: {
      color: "#060606"
    },
    button: {
      backgroundColor: "#333333",
      flex: 1,
      height: Math.floor(buttonWidth - 60),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Math.floor(buttonWidth),
      margin: 1
    },
    buttonDouble: {
      width: screen.width / 2 - 20,
      flex: 0,
      alignItems: "flex-start",
      paddingLeft: 40
    },
    buttonSecondary: {
      backgroundColor: "#a6a6a6"
    },
    buttonAccent: {
      backgroundColor: "#f09a36"
    }
  });

export default CalculatorButton