import CTA from "@/components/Landing/Cta";
import Feature from "@/components/Landing/Feature";
import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import Stats from "@/components/Landing/Stats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="h-[200vh] bg-gradient-to-b from-gray-900 to-gray-800">
      <Hero />
      <Stats/>
      <Feature/>
      <CTA/>
      </div>
    </main>
  );
}
