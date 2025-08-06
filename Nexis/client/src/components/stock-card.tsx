import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { SiGoogle, SiAmazon } from "react-icons/si";
import type { Stock } from "@shared/schema";

interface StockCardProps {
  stock: Stock;
}

const getStockLogo = (symbol: string) => {
  switch (symbol) {
    case 'GOOGL':
      return <SiGoogle className="w-8 h-8 text-blue-500" />;
    case 'AMZN':
      return <SiAmazon className="w-8 h-8 text-orange-500" />;
    case 'CRCL':
      return <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">C</div>;
    default:
      return <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold text-sm">{symbol[0]}</div>;
  }
};

export default function StockCard({ stock }: StockCardProps) {
  const isPositive = parseFloat(stock.dayChangePercent) > 0;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="glass-dark rounded-2xl p-6 group hover:bg-opacity-60 transition-all duration-500 border-slate-700">
        <CardContent className="p-0">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
              {getStockLogo(stock.symbol)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
              <p className="text-slate-400">{stock.name}</p>
            </div>
            <div className="ml-auto">
              <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                isPositive ? 'gradient-bullish' : 'bg-red-500'
              }`}>
                {isPositive ? '+' : ''}{stock.dayChangePercent}%
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-orbitron font-bold text-white">
                ${parseFloat(stock.currentPrice).toFixed(2)}
              </span>
              <span className={`text-sm font-semibold ${
                isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {isPositive ? '+' : ''}${stock.dayChange}
              </span>
            </div>
            
            {/* Real-time mini chart */}
            <div className="h-16 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg flex items-end justify-center space-x-1 p-2">
              {Array.from({ length: 12 }, (_, i) => {
                const baseHeight = 30;
                const variation = Math.sin((i + Date.now() / 1000) * 0.5) * 20;
                const height = Math.max(15, Math.min(85, baseHeight + variation + (isPositive ? 10 : -10)));
                
                return (
                  <motion.div
                    key={i}
                    className={`w-1 rounded-full ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`}
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ 
                      delay: i * 0.05, 
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>
            
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Token Address:</span>
                <span className="font-mono">{stock.tokenAddress.slice(0, 10)}...{stock.tokenAddress.slice(-8)}</span>
              </div>
            </div>
            
            <Link href={`/trading?symbol=${stock.symbol}`}>
              <Button className="w-full gradient-bullish py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trade {stock.symbol}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
