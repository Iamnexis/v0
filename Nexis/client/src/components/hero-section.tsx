import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Rocket, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { data: metrics } = useQuery({
    queryKey: ["/api/market/metrics"],
  });

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">Smart</span><br />
                <span className="text-white">Tokenized Stock</span><br />
                <span className="gradient-bullish bg-clip-text text-transparent">Trading</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Invest in the world's largest companies through blockchain tokens. 
                Real 1:1 exposure with instant liquidity and full transparency.
              </p>
            </div>
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div 
                className="glass rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-orbitron font-bold text-emerald-400">
                  ${metrics?.totalVolume ? `${(parseFloat(metrics.totalVolume) / 1e9).toFixed(1)}B` : '2.4B'}
                </div>
                <div className="text-sm text-slate-400">Total Volume</div>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-orbitron font-bold text-blue-400">
                  {metrics?.activeUsers || '45K+'}
                </div>
                <div className="text-sm text-slate-400">Active Users</div>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-orbitron font-bold text-amber-400">
                  +{metrics?.avgReturn || '23.7'}%
                </div>
                <div className="text-sm text-slate-400">Average Return</div>
              </motion.div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/trading">
                <Button className="gradient-bullish px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 animate-glow">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Now
                </Button>
              </Link>

            </div>
          </motion.div>
          
          {/* Hero Dashboard Preview */}
          <motion.div 
            className="lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="glass-dark rounded-2xl p-6 space-y-6 animate-float border-slate-700">
              <CardContent className="p-0">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Portfolio Performance</h3>
                  <span className="gradient-bullish px-3 py-1 rounded-full text-sm font-semibold">+15.8%</span>
                </div>
                
                {/* Mini Chart Simulation */}
                <div className="h-32 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg flex items-end justify-center space-x-1 p-4">
                  {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-emerald-400 rounded-full"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.random() * 80 + 20}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="glass rounded-lg p-3">
                    <div className="text-emerald-400 font-semibold">$12,847.32</div>
                    <div className="text-slate-400 text-sm">Total Value</div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <div className="text-blue-400 font-semibold">+$2,081.47</div>
                    <div className="text-slate-400 text-sm">Today's Gain</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
