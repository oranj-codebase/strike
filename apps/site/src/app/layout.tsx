import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ConnectProvider from '@/provider/ConnectProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'STRIKE | Blinks on ICP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/strike.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>STRIKE | Blinks on ICP</title>
      </head>
      <body className={inter.className}>
        <ConnectProvider>{children}</ConnectProvider>
      </body>
    </html>
  );
}
