import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SuggestedProducts from "./components/SuggestedProducts";
import ProductCategories from "./components/ProductCategories";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <SuggestedProducts />
      <ProductCategories />
      <HowItWorks />
      <Footer />
    </>
  );
}
