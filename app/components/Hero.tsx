"use client";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative bg-hero-bg bg-cover bg-center bg-no-repeat py-60">
      <div className="container mx-auto text-center text-white">
        <div className="text-5xl font-bold mb-4">
          Discover Our New 3D Collection
        </div>
        <div className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
          onClick={() => router.push("/products")}
        >
          Learn More
        </div>
      </div>
    </section>
  );
};

export default Hero;
