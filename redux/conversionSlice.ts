import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_KEY = "bbbcf22ef346a2b7a55559ad";

interface ConverterState {
  amount: string;
  baseCurrency: string;
  targetCurrency: string;
  convertedValue: string;
  targetCode: string;
  baseCode: string;
  conversionRate: string;
}

const initialState: ConverterState = {
  amount: "",
  baseCurrency: "USD",
  targetCurrency: "USD",
  convertedValue: "",
  targetCode: "",
  baseCode: "",
  conversionRate: "",
};

export const exchangeRateApi = createAsyncThunk(
  "fetchExchangeRateApi",
  async (
    {
      amount,
      baseCurrency,
      targetCurrency,
    }: { amount: string; baseCurrency: string; targetCurrency: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCurrency}/${targetCurrency}/${amount}`
      );

      const data = await response.json();
      console.log("DATA in Redux:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const conversionSlice = createSlice({
  name: "conversion",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    setTargetCurrency: (state, action) => {
      state.targetCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exchangeRateApi.fulfilled, (state, action) => {
      state.convertedValue = action.payload.conversion_result.toFixed(2);
      state.targetCode = action.payload.target_code;
      state.baseCode = action.payload.base_code;
      state.conversionRate = action.payload.conversion_rate;
    });
  },
});

export const { setAmount, setBaseCurrency, setTargetCurrency } =
  conversionSlice.actions;

export default conversionSlice.reducer;
