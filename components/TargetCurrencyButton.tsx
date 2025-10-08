import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface TargetCurrencyButton {
    targetCountryCode?: string;
}

const TargetCurrencyButton = ({ targetCountryCode }: TargetCurrencyButton) => {
const router = useRouter()
   
  return (
    <TouchableOpacity onPress={() => router.push("/CountryList?type=target")}>
    <Image source={{ uri: `https://flagcdn.com/w160/${targetCountryCode?.toLowerCase()}.png` }} width={64}  height={64}  className='rounded-full border border-pink-300'  />
    </TouchableOpacity>
  )
}

export default TargetCurrencyButton