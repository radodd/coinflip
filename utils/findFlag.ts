import { CountryRichData } from "./countryRichData";

export const getTargetFlag = (targetCode: string): string | undefined => {
  const countryData = CountryRichData.find((c) => c.code === targetCode);

  if (countryData) {
    return countryData.flag;
  }
};

export const getBaseFlag = (baseCode: string): string | undefined => {
  const countryData = CountryRichData.find((c) => c.code === baseCode);
  if (countryData) {
    return countryData.flag;
  }
};
