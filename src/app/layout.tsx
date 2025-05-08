import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientContainer from '../components/ClientContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DebrisDAO - Tokenizing Space Debris',
  description: 'Turn Space Junk into Opportunity - A platform for minting, scoring, and trading space-debris NFTs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientContainer>
          {children}
        </ClientContainer>
      </body>
    </html>
  );
}
