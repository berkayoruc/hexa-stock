import { Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hexa Stock",
  description: "A simple stock management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  );
}
