import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "KurdLex",
  description: "Kurdish English Dictionary ",
};

// Can be imported from a shared config
const locales = ["ku", "en"];

export default function RootLayout({ children, params: { locale } }) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Receive messages provided in `i18n.ts`
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <body
          className={`!${poppins.className} dark:bg-gray-800 dark:border-white dark:text-white dark:border-white/20 !scroll-smooth`}
        >
          <Toaster
            position="top-center"
            richColors
            dir={locale === "en" ? "ltr" : "rtl"}
          />
          <div className="bg-[#a5aee1] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#a29a9a]"></div>
          <div className="bg-[#948aeb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#4e4c60]"></div>

          <Providers>{children}</Providers>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
