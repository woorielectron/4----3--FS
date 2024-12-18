import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "공부의숲",
  description: "4기-공부의숲-3팀-FS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
