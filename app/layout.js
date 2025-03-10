import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "QuickCart - BySnoopyLion",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
        <ClerkProvider>
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
      </ClerkProvider>
        </body>
      </html>
  );
}
