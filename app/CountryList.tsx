import CurrencyItem from '@/components/CurrencyItem'
import { CountryRichData } from '@/utils/countryRichData'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'

const CountryListTEST = () => {
const { type } = useLocalSearchParams()
const router = useRouter()

  return (
    <ScrollView>
      {CountryRichData.map((c, i) => (
        <View key={i}>
              <CurrencyItem {...c} type={type} router={router}/>
        </View>
      ))}
    </ScrollView>
  )
}

export default CountryListTEST