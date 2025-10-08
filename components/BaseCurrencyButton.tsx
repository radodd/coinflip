import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface BaseCurrencyButton {
    baseCountryCode?: string;
}

const BaseCurrencyButton = ({ baseCountryCode }: BaseCurrencyButton) => {
const router = useRouter()
   
  return (
    <TouchableOpacity onPress={() => router.push("/CountryList?type=base")}>
    <Image source={{ uri: `https://flagcdn.com/w160/${baseCountryCode?.toLowerCase()}.png` }} width={64}  height={64}  className='rounded-full border border-pink-300'  />
    </TouchableOpacity>
  )
}

export default BaseCurrencyButton