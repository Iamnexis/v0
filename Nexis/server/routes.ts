import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTradeSchema, insertStockSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all stocks
  app.get("/api/stocks", async (req, res) => {
    try {
      const stocks = await storage.getAllStocks();
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stocks" });
    }
  });

  // Get stock by symbol
  app.get("/api/stocks/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const stock = await storage.getStockBySymbol(symbol.toUpperCase());
      
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }
      
      res.json(stock);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stock" });
    }
  });

  // Get price history for a stock
  app.get("/api/stocks/:symbol/history", async (req, res) => {
    try {
      const { symbol } = req.params;
      const { limit } = req.query;
      
      const stock = await storage.getStockBySymbol(symbol.toUpperCase());
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }
      
      const history = await storage.getStockPriceHistory(
        stock.id, 
        limit ? parseInt(limit as string) : undefined
      );
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch price history" });
    }
  });

  // Create a trade
  app.post("/api/trades", async (req, res) => {
    try {
      const tradeData = insertTradeSchema.parse(req.body);
      const trade = await storage.createTrade(tradeData);
      res.status(201).json(trade);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid trade data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create trade" });
    }
  });

  // Get market metrics
  app.get("/api/market/metrics", async (req, res) => {
    try {
      const stocks = await storage.getAllStocks();
      
      const totalVolume = stocks.reduce((sum, stock) => 
        sum + parseFloat(stock.volume24h), 0
      );
      
      const totalMarketCap = stocks.reduce((sum, stock) => 
        sum + parseFloat(stock.marketCap), 0
      );
      
      const avgReturn = stocks.reduce((sum, stock) => 
        sum + parseFloat(stock.dayChangePercent), 0
      ) / stocks.length;

      const metrics = {
        totalUsers: 45231,
        totalVolume: totalVolume.toFixed(0),
        totalMarketCap: totalMarketCap.toFixed(0),
        avgReturn: avgReturn.toFixed(1),
        uptime: 99.9,
        activeUsers: "45K+"
      };

      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market metrics" });
    }
  });

  // Simulate real-time price updates
  app.post("/api/stocks/:symbol/update-price", async (req, res) => {
    try {
      const { symbol } = req.params;
      const stock = await storage.getStockBySymbol(symbol.toUpperCase());
      
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }

      // Simulate price change (±2%)
      const currentPrice = parseFloat(stock.currentPrice);
      const changePercent = (Math.random() - 0.5) * 4; // ±2%
      const newPrice = currentPrice * (1 + changePercent / 100);
      const priceChange = newPrice - currentPrice;
      
      const updatedStock = await storage.updateStock(stock.id, {
        currentPrice: newPrice.toFixed(2),
        dayChange: priceChange.toFixed(2),
        dayChangePercent: changePercent.toFixed(2)
      });

      // Add to price history
      await storage.addPriceHistory({
        stockId: stock.id,
        price: newPrice.toFixed(2)
      });

      res.json(updatedStock);
    } catch (error) {
      res.status(500).json({ message: "Failed to update stock price" });
    }
  });

  // Real-time stock data endpoint (proxy to avoid CORS)
  app.get("/api/stocks/:symbol/realtime", async (req, res) => {
    try {
      const { symbol } = req.params;
      
      // Realistic simulation data that changes over time
      const basePrice = symbol === 'GOOGL' ? 175.42 : symbol === 'AMZN' ? 185.21 : 28.45;
      const time = Date.now() / 1000;
      const dailyTrend = Math.sin(time / 3600) * 2.5;
      const randomVariation = (Math.random() - 0.5) * 1.8;
      
      const currentPrice = basePrice + dailyTrend + randomVariation;
      const change = dailyTrend + randomVariation;
      const changePercent = (change / basePrice) * 100;
      
      const data = {
        symbol,
        price: Number(currentPrice.toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        volume: Math.floor(Math.random() * 8000000 + 12000000),
        high: Number((currentPrice + Math.abs(change) + Math.random() * 1.5).toFixed(2)),
        low: Number((currentPrice - Math.abs(change) - Math.random() * 1.5).toFixed(2)),
        previousClose: Number(basePrice.toFixed(2)),
        timestamp: Date.now()
      };
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch real-time data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
