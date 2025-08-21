import BaseCurrencyPicker from "@/components/BaseCurrencyPicker";
import PresetAmountButtons from "@/components/PresetAmountButtons";
import TargetCurrencyPicker from "@/components/TargetCurrencyPicker";
import {
  exchangeRateApi,
  setAmount,
  setBaseCurrency,
  setTargetCurrency,
} from "@/redux/conversionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getBaseFlag, getTargetFlag } from "@/utils/findFlag";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    amount,
    baseCurrency,
    targetCurrency,
    convertedValue,
    targetCode,
    baseCode,
    conversionRate,
  } = useSelector((state: RootState) => state.conversion);

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
        dispatch(exchangeRateApi({ amount, baseCurrency, targetCurrency }));
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
      setTargetFlagURI(getTargetFlag(targetCode));
      setBaseFlagURI(getBaseFlag(baseCode));
    }
  }, [targetCode, baseCode]);

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
        <Text className="font-bold text-4xl mb-10">Currency Exchange</Text>
        {/* CURRENCY SELECTORS */}
        <View className="flex flex-row gap-3">
          <View className="flex flex-col">
            <Text>From</Text>
            <BaseCurrencyPicker baseFlagURI={baseFlagURI} />
          </View>
          <View className="flex flex-col">
            <Text>To</Text>
            <TargetCurrencyPicker targetFlagURI={targetFlagURI} />
          </View>
        </View>

        {/* QUANTITY INPUT */}
        <View className="flex flex-row justify-center items-center border-2 border-slate-200 rounded-lg">
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(amount) => dispatch(setAmount(amount))}
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            className=" w-4/6 h-14 font-black text-lg"
          />
          <TouchableOpacity
            className="border border-stone-400 rounded-full p-1 mr-3"
            onPress={() => {
              dispatch(setBaseCurrency(targetCurrency));
              dispatch(setTargetCurrency(baseCurrency));
            }}
          >
            <Ionicons name="swap-horizontal" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <PresetAmountButtons />

        {/* CONVERSION RATE */}
        {amount && baseCurrency && targetCurrency ? (
          <Text className="font-semibold text-lg">
            1 {baseCurrency} = {conversionRate} {targetCurrency}
          </Text>
        ) : (
          <></>
        )}

        {/* CONVERTED VALUE */}
        <View className="flex flex-row gap-2 justify-center">
          <Text className="font-bold text-4xl">{convertedValue}</Text>
          <Text className="font-bold text-3xl">{targetCode}</Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
  },
});
