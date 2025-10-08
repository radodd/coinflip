import { CountryRichData } from "./countryRichData";

export const getTargetCountryCode = (targetCode: string) => {
  const countryData = CountryRichData.find((c) => c.code === targetCode)

  if (countryData) {
    return countryData.countryCode
  }
}

export const getBaseCountryCode = (baseCode: string) => {
  const countryData = CountryRichData.find((c) => c.code === baseCode) 
  if (countryData) {
    return countryData.countryCode
  }
}
