import Navigation from "@/components/navigation";
import TradingDashboard from "@/components/trading-dashboard";
import Footer from "@/components/footer";

export default function Trading() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-pattern opacity-30 pointer-events-none" />
      
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="text-gradient">Advanced</span> <span className="text-white">Trading</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Complete trading platform with real-time charts and instant execution.
              </p>
            </div>
            
            <TradingDashboard />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
