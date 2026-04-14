import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ScrollytellingLayout from "@/components/ScrollytellingLayout";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ScrollytellingLayout />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
