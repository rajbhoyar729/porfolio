// app/layout.tsx (Server Component)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Website',
  description: 'Welcome to my website!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}