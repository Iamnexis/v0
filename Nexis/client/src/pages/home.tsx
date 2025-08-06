import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProductsSection from "@/components/products-section";
import TradingDashboard from "@/components/trading-dashboard";

import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-pattern opacity-30 pointer-events-none" />
      
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <TradingDashboard />
      <CTASection />
      <Footer />
    </div>
  );
}
