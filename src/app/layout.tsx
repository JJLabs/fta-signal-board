import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Funding Signal Board',
  description: 'Feed The AI funding radar for AI venture rounds.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 md:px-8">{children}</main>
      </body>
    </html>
  );
}
