import { type User, type InsertUser, type Stock, type InsertStock, type Trade, type InsertTrade, type PriceHistory, type InsertPriceHistory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Stocks
  getAllStocks(): Promise<Stock[]>;
  getStock(id: string): Promise<Stock | undefined>;
  getStockBySymbol(symbol: string): Promise<Stock | undefined>;
  createStock(stock: InsertStock): Promise<Stock>;
  updateStock(id: string, updates: Partial<Stock>): Promise<Stock | undefined>;
  
  // Trades
  createTrade(trade: InsertTrade): Promise<Trade>;
  getUserTrades(userId: string): Promise<Trade[]>;
  
  // Price History
  addPriceHistory(priceHistory: InsertPriceHistory): Promise<PriceHistory>;
  getStockPriceHistory(stockId: string, limit?: number): Promise<PriceHistory[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private stocks: Map<string, Stock> = new Map();
  private trades: Map<string, Trade> = new Map();
  private priceHistory: Map<string, PriceHistory> = new Map();

  constructor() {
    this.initializeStocks();
  }

  private initializeStocks() {
    const mockStocks: InsertStock[] = [
      {
        symbol: "GOOGL",
        name: "Google Stock",
        tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
        currentPrice: "175.32",
        dayChange: "4.12",
        dayChangePercent: "2.4",
        volume24h: "2400000",
        marketCap: "1200000000000",
        high24h: "178.45",
        low24h: "172.10",
        logo: "google"
      },
      {
        symbol: "AMZN",
        name: "Amazon Stock",
        tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
        currentPrice: "186.75",
        dayChange: "3.31",
        dayChangePercent: "1.8",
        volume24h: "1800000",
        marketCap: "1900000000000",
        high24h: "189.20",
        low24h: "183.40",
        logo: "amazon"
      },
      {
        symbol: "CRCL",
        name: "Circle Stock",
        tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
        currentPrice: "42.18",
        dayChange: "2.09",
        dayChangePercent: "5.2",
        volume24h: "850000",
        marketCap: "8500000000",
        high24h: "43.50",
        low24h: "40.10",
        logo: "circle"
      }
    ];

    mockStocks.forEach(async (stock) => {
      await this.createStock(stock);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      portfolioValue: "0.00",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Stocks
  async getAllStocks(): Promise<Stock[]> {
    return Array.from(this.stocks.values());
  }

  async getStock(id: string): Promise<Stock | undefined> {
    return this.stocks.get(id);
  }

  async getStockBySymbol(symbol: string): Promise<Stock | undefined> {
    return Array.from(this.stocks.values()).find(stock => stock.symbol === symbol);
  }

  async createStock(insertStock: InsertStock): Promise<Stock> {
    const id = randomUUID();
    const stock: Stock = { 
      ...insertStock, 
      id, 
      updatedAt: new Date()
    };
    this.stocks.set(id, stock);
    return stock;
  }

  async updateStock(id: string, updates: Partial<Stock>): Promise<Stock | undefined> {
    const stock = this.stocks.get(id);
    if (!stock) return undefined;
    
    const updatedStock = { 
      ...stock, 
      ...updates, 
      updatedAt: new Date()
    };
    this.stocks.set(id, updatedStock);
    return updatedStock;
  }

  // Trades
  async createTrade(insertTrade: InsertTrade): Promise<Trade> {
    const id = randomUUID();
    const trade: Trade = { 
      ...insertTrade, 
      id, 
      timestamp: new Date()
    };
    this.trades.set(id, trade);
    return trade;
  }

  async getUserTrades(userId: string): Promise<Trade[]> {
    return Array.from(this.trades.values()).filter(trade => trade.userId === userId);
  }

  // Price History
  async addPriceHistory(insertPriceHistory: InsertPriceHistory): Promise<PriceHistory> {
    const id = randomUUID();
    const priceHistory: PriceHistory = { 
      ...insertPriceHistory, 
      id, 
      timestamp: new Date()
    };
    this.priceHistory.set(id, priceHistory);
    return priceHistory;
  }

  async getStockPriceHistory(stockId: string, limit = 50): Promise<PriceHistory[]> {
    return Array.from(this.priceHistory.values())
      .filter(history => history.stockId === stockId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
