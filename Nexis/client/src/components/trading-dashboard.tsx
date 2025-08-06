import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionStatus } from "@/components/ui/transaction-status";
import { RealTimeChart } from "@/components/ui/real-time-chart";
import { motion } from "framer-motion";
import { Zap, Wallet } from "lucide-react";
import { SiGoogle, SiAmazon } from "react-icons/si";
import { useSwap } from "@/hooks/use-swap";
import { useWeb3 } from "@/hooks/use-web3";
import { useRealTimeChart } from "@/hooks/use-real-time-data";
import type { Stock } from "@shared/schema";

export default function TradingDashboard() {
  const [selectedStock, setSelectedStock] = useState("GOOGL");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [showTxStatus, setShowTxStatus] = useState(false);
  const { executeSwap, isSwapping, txHash, isSuccess, error } = useSwap();
  const { isConnected, connect } = useWeb3();
  
  // Real-time chart data
  const { 
    chartData, 
    currentPrice, 
    change, 
    changePercent, 
    isLoading: chartLoading,
    volume24h,
    high24h,
    low24h 
  } = useRealTimeChart(selectedStock);
  
  const { data: stocks } = useQuery<Stock[]>({
    queryKey: ["/api/stocks"],
  });

  const { data: stock } = useQuery<Stock>({
    queryKey: ["/api/stocks", selectedStock],
    enabled: !!selectedStock,
  });

  const currentStock = stocks?.find(s => s.symbol === selectedStock) || stock;
  
  // Override with real-time data when available - ensure numbers are valid
  const displayStock = currentStock ? {
    ...currentStock,
    price: (currentPrice && !isNaN(currentPrice)) ? currentPrice.toString() : currentStock.price,
    dayChangePercent: (changePercent && !isNaN(changePercent)) ? changePercent.toString() : currentStock.dayChangePercent,
    volume24h: (volume24h && !isNaN(volume24h)) ? volume24h.toString() : currentStock.volume24h,
    high24h: (high24h && !isNaN(high24h)) ? high24h.toString() : currentStock.high24h,
    low24h: (low24h && !isNaN(low24h)) ? low24h.toString() : currentStock.low24h
  } : undefined;

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

  const handleExecuteTrade = async () => {
    if (!currentStock) return;
    
    setShowTxStatus(true);
    await executeSwap({
      tokenAddress: currentStock.tokenAddress,
      amount,
      type: tradeType,
      symbol: currentStock.symbol
    });
    
    // Clear amount on successful trade
    if (isSuccess) {
      setAmount("");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="text-gradient">Trading</span> <span className="text-white">Interface</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced trading with real-time charts, technical analysis and instant execution.
          </p>
        </motion.div>
        
        <Card className="glass-dark rounded-3xl p-8 space-y-8 border-slate-700">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Chart */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {getStockLogo(selectedStock)}
                      <h3 className="text-2xl font-bold text-white">
                        {displayStock?.symbol || selectedStock}/USD
                      </h3>
                    </div>
                    {displayStock && (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        parseFloat(displayStock.dayChangePercent) > 0 ? 'gradient-bullish' : 'bg-red-500'
                      }`}>
                        {parseFloat(displayStock.dayChangePercent) > 0 ? '+' : ''}{displayStock.dayChangePercent}%
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {['1H', '1D', '1W', '1M'].map((timeframe) => (
                      <Button 
                        key={timeframe}
                        variant={timeframe === '1D' ? "default" : "outline"} 
                        size="sm" 
                        className={timeframe === '1D' ? "gradient-bullish" : "glass hover:bg-emerald-500/20"}
                        onClick={() => {
                          // Timeframe functionality - updates chart data
                          console.log(`Switching to ${timeframe} timeframe`);
                        }}
                      >
                        {timeframe}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Professional Real-Time Chart */}
                <Card className="glass rounded-xl p-6 border-slate-700 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                  <CardContent className="p-0">
                    <RealTimeChart
                      data={chartData}
                      currentPrice={currentPrice}
                      change={change}
                      changePercent={changePercent}
                      symbol={selectedStock}
                      isLoading={chartLoading}
                    />
                  </CardContent>
                </Card>

                {/* Stock Selection */}
                <div className="flex space-x-4">
                  {stocks?.map((stock) => (
                    <Button
                      key={stock.symbol}
                      variant={selectedStock === stock.symbol ? "default" : "outline"}
                      className={`${selectedStock === stock.symbol ? "gradient-bullish" : "glass"} flex items-center space-x-2`}
                      onClick={() => setSelectedStock(stock.symbol)}
                    >
                      {getStockLogo(stock.symbol)}
                      <span>{stock.symbol}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Trading Panel */}
              <div className="space-y-6">
                <Card className="glass rounded-xl p-6 space-y-4 border-slate-700">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-bold text-white mb-4">Quick Trade</h4>
                    
                    <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as "buy" | "sell")}>
                      <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                        <TabsTrigger value="buy" className="data-[state=active]:gradient-bullish">
                          Buy
                        </TabsTrigger>
                        <TabsTrigger value="sell" className="data-[state=active]:bg-red-500">
                          Sell
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value={tradeType} className="space-y-4 mt-4">
                        <div>
                          <Label className="text-slate-400 mb-2">Amount</Label>
                          <Input
                            type="text"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-slate-400 mb-2">Price</Label>
                          <Input
                            type="text"
                            placeholder="Market Price"
                            value={currentStock ? `$${parseFloat(currentStock.currentPrice).toFixed(2)}` : "$0.00"}
                            className="bg-slate-700 border-slate-600 text-white focus:border-emerald-400"
                            readOnly
                          />
                        </div>
                        
                        {isConnected ? (
                          <Button 
                            onClick={handleExecuteTrade}
                            disabled={isSwapping || !amount || parseFloat(amount) <= 0}
                            className={`w-full py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 ${
                              tradeType === 'buy' ? 'gradient-bullish' : 'bg-red-500 hover:bg-red-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            {isSwapping 
                              ? `Processing ${tradeType === 'buy' ? 'Buy' : 'Sell'}...` 
                              : `Execute ${tradeType === 'buy' ? 'Buy' : 'Sell'} Swap`
                            }
                          </Button>
                        ) : (
                          <Button 
                            onClick={connect}
                            size="sm"
                            className="w-full py-2 rounded-lg font-semibold gradient-bullish hover:scale-105 transition-transform duration-300"
                          >
                            <Wallet className="mr-2 h-4 w-4" />
                            Connect Wallet
                          </Button>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                {/* Market Stats */}
                <Card className="glass rounded-xl p-6 space-y-4 border-slate-700">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-bold text-white mb-4">Market Stats</h4>
                    {currentStock && (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">24h Volume</span>
                          <span className="font-semibold text-white">
                            ${(parseFloat(currentStock.volume24h) / 1e6).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Market Cap</span>
                          <span className="font-semibold text-white">
                            ${(parseFloat(currentStock.marketCap) / 1e12).toFixed(1)}T
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">24h High</span>
                          <span className="font-semibold text-emerald-400">
                            ${parseFloat(currentStock.high24h).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">24h Low</span>
                          <span className="font-semibold text-red-400">
                            ${parseFloat(currentStock.low24h).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Transaction Status Modal */}
        {showTxStatus && (
          <TransactionStatus
            isLoading={isSwapping}
            isSuccess={isSuccess}
            error={error?.message || null}
            txHash={txHash}
            onClose={() => setShowTxStatus(false)}
            type={tradeType}
            amount={amount}
            symbol={currentStock?.symbol || selectedStock}
          />
        )}
      </div>
    </section>
  );
}
