import { CountryRichData } from "@/assets/country-rich-data";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type ConverterProps = {
  amount: string;
  baseCurrency: string;
  targetCurrency: string;
};

const API_KEY = "bbbcf22ef346a2b7a55559ad";

export default function Index() {
  const [amount, setAmount] = useState("");
  const [baseCurrency, setFromCurrency] = useState("USD");
  const [targetCurrency, setToCurrency] = useState("USD");
  const [convertedValue, setConvertedValue] = useState("");
  const [targetCode, setTargetCode] = useState("");
  const [baseCode, setBaseCode] = useState("");
  const [targetFlagURI, setTargetFlagURI] = useState<string | undefined>(
    undefined
  );
  const [baseFlagURI, setBaseFlagURI] = useState<string | undefined>(undefined);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (amount && baseCurrency && targetCurrency) {
      timeoutRef.current = setTimeout(() => {
        executeConversion({ amount, baseCurrency, targetCurrency });
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [amount, baseCurrency, targetCurrency]);

  useEffect(() => {
    if (targetCode) {
      findTargetFlag(targetCode);
      findBaseFlag(baseCode);
    }
  }, [targetCode, baseCode]);

  const executeConversion = async ({
    amount,
    baseCurrency,
    targetCurrency,
  }: ConverterProps) => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCurrency}/${targetCurrency}/${amount}`
      );

      const data = await response.json();
      setConvertedValue(data.conversion_result);
      setTargetCode(data.target_code);
      setBaseCode(data.base_code);
    } catch (error) {
      console.error(error);
    }
  };

  const findTargetFlag = async (targetCode: string) => {
    const countryData = await CountryRichData.find(
      (c) => c.code === targetCode
    );

    if (countryData) {
      setTargetFlagURI(countryData.flag);
    } else {
      return null;
    }
  };

  const findBaseFlag = async (baseCode: string) => {
    const countryData = await CountryRichData.find((c) => c.code === baseCode);
    if (countryData) {
      setBaseFlagURI(countryData.flag);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        className="flex gap-6"
      >
        <View className="flex flex-row gap-3">
          <View className="flex flex-col">
            <Text>From</Text>

            <View
              className="flex flex-row items-center border border-slate-200 rounded-lg
            "
            >
              <Image source={{ uri: baseFlagURI }} width={20} height={20} />
              <Picker
                selectedValue={baseCurrency}
                onValueChange={(value) => setFromCurrency(value)}
                // selectionColor="white"
                style={styles.picker}
                itemStyle={{
                  color: "#555",
                  fontSize: 16,
                }}
              >
                <Picker.Item label="USD" value="USD" />

                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="MXN" value="MXN" />
              </Picker>
            </View>
          </View>
          <View className="flex flex-col">
            <Text>To</Text>

            <View
              className="flex flex-row items-center border border-slate-200 rounded-lg
            "
            >
              <Image source={{ uri: targetFlagURI }} width={20} height={20} />
              <Picker
                selectedValue={targetCurrency}
                onValueChange={(value) => setToCurrency(value)}
                // selectionColor="white"
                style={styles.picker}
                itemStyle={{
                  color: "#555",
                  fontSize: 16,
                }}
              >
                <Picker.Item label="USD" value="USD" />

                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="MXN" value="MXN" />
              </Picker>
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-center items-center border-2 border-slate-200 rounded-lg">
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            className=" w-4/6 h-14 font-black text-lg"
          />
        </View>

        <View className="flex flex-row gap-2 justify-center">
          <Text className="font-bold text-4xl">{convertedValue}</Text>
          <Text className="font-bold text-3xl">{targetCode}</Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    justifyContent: "center",
    overflow: "hidden",
    // borderRadius: 8,
    // borderWidth: 1,
    height: 100,
    width: 125,
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    // marginBottom: 20,
  },
  preview: {
    fontSize: 16,
    color: "#555",
  },
});
