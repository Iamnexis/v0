export const mockStocks = [
  {
    symbol: "GOOGL",
    name: "Google Stock",
    currentPrice: 175.32,
    dayChange: 4.12,
    dayChangePercent: 2.4,
    volume24h: 2400000,
    marketCap: 1200000000000,
    high24h: 178.45,
    low24h: 172.10,
    logo: "google",
    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
  },
  {
    symbol: "AMZN", 
    name: "Amazon Stock",
    currentPrice: 186.75,
    dayChange: 3.31,
    dayChangePercent: 1.8,
    volume24h: 1800000,
    marketCap: 1900000000000,
    high24h: 189.20,
    low24h: 183.40,
    logo: "amazon",
    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
  },
  {
    symbol: "CRCL",
    name: "Circle Stock", 
    currentPrice: 42.18,
    dayChange: 2.09,
    dayChangePercent: 5.2,
    volume24h: 850000,
    marketCap: 8500000000,
    high24h: 43.50,
    low24h: 40.10,
    logo: "circle",
    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
  }
];

export const mockMetrics = {
  totalUsers: 45231,
  totalVolume: "2400000000",
  avgReturn: 23.7,
  uptime: 99.9,
  activeUsers: "45K+"
};

export const mockPriceHistory = (stockId: string) => {
  const basePrice = mockStocks.find(s => s.symbol === stockId)?.currentPrice || 100;
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
    price: basePrice + (Math.random() - 0.5) * 10,
    stockId
  }));
};
