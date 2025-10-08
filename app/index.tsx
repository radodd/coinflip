import BaseCurrencyButton from "@/components/BaseCurrencyButton";
import CalculatorPad from "@/components/Calculator/CalculatorPad";
import TargetCurrencyButton from "@/components/TargetCurrencyButton";
import {
  exchangeRateApi
} from "@/redux/conversionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getBaseCountryCode, getTargetCountryCode } from "@/utils/findFlag";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View
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

  const [targetCountryCode, setTargetCountryCode] = useState<string | undefined>("")
  const [baseCountryCode, setBaseCountryCode] = useState<string | undefined>("")

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
      setTargetCountryCode(getTargetCountryCode(targetCode))
      setBaseCountryCode(getBaseCountryCode(baseCode))
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
    
        {/* CURRENCY SELECTORS */}
        <View className="flex flex-row gap-3">
          <View className="flex flex-col">
            <Text>From</Text>
            <BaseCurrencyButton baseCountryCode={baseCountryCode} />

          </View>
          <View className="flex flex-col">
            <Text>To</Text>
            <TargetCurrencyButton targetCountryCode={targetCountryCode} />
          
          </View>
        </View>

        {/* QUANTITY INPUT */}
        <View className="flex flex-row justify-center items-center border-2 border-slate-200 rounded-lg">
     
          {/* <TouchableOpacity
            className="border border-stone-400 rounded-full p-1 mr-3"
            onPress={() => {
              dispatch(setBaseCurrency(targetCurrency));
              dispatch(setTargetCurrency(baseCurrency));
            }}
          >
            <Ionicons name="swap-horizontal" size={20} color="black" />
          </TouchableOpacity> */}
        </View>

        {/* <PresetAmountButtons /> */}

        <CalculatorPad />

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

