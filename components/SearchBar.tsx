import { CountryRichData } from '@/utils/countryRichData'
import React, { useState } from 'react'
import { TextInput, View } from 'react-native'

const SearchBar = () => {
const [search, setSearch] = useState("")

const filteredSearch = CountryRichData.filter((c) => 
c.country.toLowerCase().includes(search.toLowerCase()) ||
c.code.toLowerCase().includes(search.toLowerCase())
)
  return (
    <View>
      <TextInput
      placeholder='Search'
      value={search}
      onChangeText={setSearch}
      className=" border border-gray-300 rounded-xl text-2xl"
      />
    </View>
  )
}

export default SearchBar