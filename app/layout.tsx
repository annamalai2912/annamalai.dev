import './globals.css';
import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
});

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323'
});

export const metadata: Metadata = {
  title: 'Annamalai • Retro Dev Portfolio',
  description: 'A retro pixel-art developer portfolio inspired by 8-bit games and terminals',
  keywords: 'developer, portfolio, retro, pixel art, 8-bit, programming',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} ${vt323.variable} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}