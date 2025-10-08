import { setBaseCurrency, setTargetCurrency } from '@/redux/conversionSlice';

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface CurrencyItemProps {
    code: string;
    name: string;
    country: string;
    countryCode: string;
    flag?: string;
    type?: any;
    router?: any;
}

const CurrencyItem = ({ countryCode, name, code, type, router }: CurrencyItemProps) => {
const dispatch = useDispatch()

    const handlePress = () => {
        if (type === "base") {
            dispatch(setBaseCurrency(code))
        } else {
            dispatch(setTargetCurrency(code))
        } 
        router.push("/")
    }
  
  return (
    <TouchableOpacity className='flex flex-row items-center justify-between p-5' onPress={() => handlePress()}>
        <View className='flex flex-row items-center gap-5'>
        <Image source={{ uri:`https://flagcdn.com/w160/${countryCode?.toLowerCase()}.png`}} width={64} height={64} className='rounded-full' />
      <Text className='text-xl font-semibold'>{name}</Text>
        </View>
      <Text className='text-xl font-semibold'>{code}</Text>
    </TouchableOpacity>
  )
}

export default CurrencyItem