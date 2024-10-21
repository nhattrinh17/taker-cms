import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import StoreProvider from './StoreProvider';

const geistSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'TAKER - Dịch vụ đánh giày công nghệ số 1 Việt Nam',
  description: 'TAKER - Dịch vụ đánh giày công nghệ số 1 Việt Nam',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/favicon.ico',
      href: '/favicon.ico',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/favicon.ico',
      href: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
