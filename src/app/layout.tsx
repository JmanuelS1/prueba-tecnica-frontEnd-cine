"use client"
import { Inter } from "next/font/google";
import "./global.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}


