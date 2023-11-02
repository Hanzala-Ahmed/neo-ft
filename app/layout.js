"use client";
import { store } from "@/redux/store";
import ThemeRegistry from "@/utils/ThemeRegistry";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <ThemeRegistry
          options={{
            key: "mui-theme",
          }}
        >
          <body className={inter.className}>{children}</body>
        </ThemeRegistry>
      </Provider>
    </html>
  );
}
