import CTA from "@/components/Landing/Cta";
import Feature from "@/components/Landing/Feature";
import Footer from "@/components/Landing/Footer";
import Hero from "@/components/Landing/Hero";
import Mision from "@/components/Landing/Mision";
import Navbar from "@/components/Landing/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="h-[200vh] bg-gradient-to-b from-gray-900 to-gray-800">
        <Hero />
        <Mision />
        <Feature />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
