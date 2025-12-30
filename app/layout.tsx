import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dice Roller - Virtual Dice with Statistics",
  description: "Roll virtual dice and track your statistics. Perfect for board games, RPGs, and probability experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
