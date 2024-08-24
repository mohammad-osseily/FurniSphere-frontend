// app/layout.tsx (no "use client")
import { ReactNode } from "react";
import "../public/static/css/global.css";
import { Roboto } from "next/font/google";
import ClientProvider from "./ClientProvider"; // New component

export const metadata = {
  title: "FurniSphere",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode[] }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} mx-auto flex w-full flex-col scrollbar scrollbar-track-primary  scrollbar-thumb-secondary md:w-3/4`}
      >
        <ClientProvider>{children}</ClientProvider>{" "}
        {/* Move Redux logic here */}
      </body>
    </html>
  );
}
