import RecoilRootWrapper from "@/components/Recoil/RecoilRootWrapper";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GKN TODO LIST APP",
  description: "글로벌널리지네트워크 사전과제 - 최서원",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased`}>
        <RecoilRootWrapper>
          {children}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
