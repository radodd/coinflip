import { setBaseCurrency } from "@/redux/conversionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { CountryRichData } from "@/utils/countryRichData";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface BaseCurrencyPickerProps {
  baseFlagURI?: string;
}
const BaseCurrencyPicker = ({ baseFlagURI }: BaseCurrencyPickerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { baseCurrency } = useSelector((state: RootState) => state.conversion);
  return (
    <View
      className="flex flex-row items-center border border-slate-200 rounded-lg
  "
    >
      <Image source={{ uri: baseFlagURI }} width={20} height={20} />
      <Picker
        selectedValue={baseCurrency}
        onValueChange={(value) => dispatch(setBaseCurrency(value))}
        style={styles.picker}
        itemStyle={{
          color: "#555",
          fontSize: 16,
        }}
      >
        {CountryRichData.map((i, index) => (
          <Picker.Item key={index} label={i.code} value={i.code} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    justifyContent: "center",
    overflow: "hidden",
    height: 100,
    width: 125,
  },
});

export default BaseCurrencyPicker;
