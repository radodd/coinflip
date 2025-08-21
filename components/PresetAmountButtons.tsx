import { setAmount } from "@/redux/conversionSlice";
import { AppDispatch } from "@/redux/store";
import { PresetAmounts } from "@/utils/presetAmounts";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const PresetAmountButtons = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View className="flex flex-row gap-5">
      {PresetAmounts.map((i, index) => (
        <TouchableOpacity
          key={index}
          className="bg-zinc-300 py-3 px-4 rounded-lg"
          onPress={() => dispatch(setAmount(i.amount))}
        >
          <Text>{i.amount}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PresetAmountButtons;
