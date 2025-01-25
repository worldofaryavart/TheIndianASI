import CTA from "@/components/Landing/Cta";
import Feature from "@/components/Landing/Feature";
import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import Stats from "@/components/Landing/Stats";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero/>
      <Stats/>
      <Feature/>
      <CTA/>
    </main>
  );
}
