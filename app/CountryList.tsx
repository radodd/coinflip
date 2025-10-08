import CurrencyItem from '@/components/CurrencyItem'
import { CountryRichData } from '@/utils/countryRichData'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, TextInput, View } from 'react-native'

const CountryListTEST = () => {
const { type } = useLocalSearchParams()
const router = useRouter()
const [search, setSearch] = useState("")

const filteredSearch = CountryRichData.filter((c) => 
c.country.toLowerCase().includes(search.toLowerCase()) ||
c.code.toLowerCase().includes(search.toLowerCase())
)

  return (
    <ScrollView>
      
      <TextInput
      placeholder='Search'
      value={search}
      onChangeText={setSearch}
      className="m-4 px-3 pt-3 pb-4 border border-gray-300 rounded-xl text-2xl flex items-center "
      />
      {filteredSearch.map((c, i) => (
        <View key={i}>
              <CurrencyItem {...c} type={type} router={router}/>
        </View>
      ))}
    </ScrollView>
  )
}

export default CountryListTEST