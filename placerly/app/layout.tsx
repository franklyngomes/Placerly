import { Outfit } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Provider from './provider';

const outfit = Outfit({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title:
    "Placerly | Wealth management made easy",
  description: "Wealth Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}