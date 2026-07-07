import type { Metadata } from 'next';
// @ts-ignore - Prevents TypeScript build crash on global CSS side-effect import
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Task Management Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        {children}
      </body>
    </html>
  );
}