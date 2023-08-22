import "./globals.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Note App',
  description:
    'This is a meta description. Welcome to slingacademy.com. Happy coding and have a nice day',
};
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }