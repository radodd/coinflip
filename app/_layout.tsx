import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

import "./globals.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
