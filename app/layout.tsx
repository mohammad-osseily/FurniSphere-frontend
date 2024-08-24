import { ReactNode } from "react";
// import NavBar from "./components/NavBar";
import "../public/static/css/global.css";
import { Roboto } from "next/font/google";
// import Footer from "./components/Footer";

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
        {/* <NavBar /> */}
        <hr />
        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}
