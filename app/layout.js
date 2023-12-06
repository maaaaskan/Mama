import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "KurdLex",
  description: "Kurdish English Dictionary ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`!${poppins.className} dark:bg-gray-800 dark:border-white dark:text-white dark:border-white/20`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
