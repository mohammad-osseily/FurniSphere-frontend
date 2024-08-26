// app/layout.tsx
import { ReactNode } from "react";
import "../public/static/css/global.css";
import { Roboto } from "next/font/google";
import ClientProvider from "./ClientProvider"; // New component
import NavbarWrapper from "./components/NavbarWrapper"; // Use the new wrapper

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
        className={`${roboto.className} mx-auto flex w-full flex-col scrollbar scrollbar-track-primary  scrollbar `}
      >
        <NavbarWrapper /> {/* Render Navbar based on the route */}
        <ClientProvider>{children}</ClientProvider>{" "}
      </body>
    </html>
  );
}
