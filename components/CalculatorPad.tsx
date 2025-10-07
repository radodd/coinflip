import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalculatorButton from './CalculatorButton';
import CalculatorRow from './CalculatorRow';

const CalculatorPad = () => {
    const [currentValue, setCurrentValue] = useState("0")
    const [operator, setOperator] = useState<string | null>(null)
    const [previousValue, setPreviousValue] = useState<string | null>(null)

    const handleTap = (type: string, value?: string | number) => {
switch (type) {
    case "number": 
    if (value === "." && currentValue.includes(".")) {
        return;
    }
    setCurrentValue(prev => prev === "0" ? String(value) : prev + String(value));
    break;

    case "operator":
        setOperator(String(value))
        setPreviousValue(currentValue)
        setCurrentValue("0")
        break;

    case "equal":
        if (!operator || !previousValue) return;
         const result = eval(`${previousValue}${operator}${currentValue}`)
         setCurrentValue(String(result))
         setOperator(null)
         setPreviousValue(null)
         break;

         case "clear":
            setCurrentValue("0")
            setOperator(null)
            setPreviousValue(null)
            break;
        case "percentage":
            setCurrentValue(String(parseFloat(currentValue) / 100))
            break;
}
    }

    return (
        <View className='border border-emerald-400 bg-pink-500 w-3/4'>
          {/* <StatusBar barStyle="light-content" /> */}
          <SafeAreaView>
            <Text style={styles.value}>
              {parseFloat(currentValue).toLocaleString()}
            </Text>
            <CalculatorRow>
              <CalculatorButton
                text="C"
                theme="secondary"
                onPress={() => handleTap("clear")}
              />
            
              <CalculatorButton
                text="%"
                theme="secondary"
                onPress={() => handleTap("percentage")}
              />
              <CalculatorButton
                text="/"
                theme="accent"
                onPress={() => handleTap("operator", "/")}
              />
            </CalculatorRow>
  
            <CalculatorRow>
              <CalculatorButton text="7" onPress={() => handleTap("number", 7)} />
              <CalculatorButton text="8" onPress={() => handleTap("number", 8)} />
              <CalculatorButton text="9" onPress={() => handleTap("number", 9)} />
              <CalculatorButton
                text="x"
                theme="accent"
                onPress={() => handleTap("operator", "*")}
              />
            </CalculatorRow>
  
            <CalculatorRow>
              <CalculatorButton text="4" onPress={() => handleTap("number", 4)} />
              <CalculatorButton text="5" onPress={() => handleTap("number", 5)} />
              <CalculatorButton text="6" onPress={() => handleTap("number", 6)} />
              <CalculatorButton
                text="-"
                theme="accent"
                onPress={() => handleTap("operator", "-")}
              />
            </CalculatorRow>
  
            <CalculatorRow>
              <CalculatorButton text="1" onPress={() => handleTap("number", 1)} />
              <CalculatorButton text="2" onPress={() => handleTap("number", 2)} />
              <CalculatorButton text="3" onPress={() => handleTap("number", 3)} />
              <CalculatorButton
                text="+"
                theme="accent"
                onPress={() => handleTap("operator", "+")}
              />
            </CalculatorRow>
  
            <CalculatorRow>
              <CalculatorButton
                text="0"
                size="double"
                onPress={() => handleTap("number", 0)}
              />
              <CalculatorButton text="." onPress={() => handleTap("number", ".")} />
              <CalculatorButton
                text="="
                theme="accent"
                onPress={() => handleTap("equal")}
              />
            </CalculatorRow>
          </SafeAreaView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#202020",
      justifyContent: "flex-end"
    },
    value: {
      color: "#fff",
      fontSize: 40,
      textAlign: "right",
      marginRight: 20,
      marginBottom: 10
    }
  });

export default CalculatorPad