import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected, connect, disconnect, address } = useWeb3();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bullish rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45" />
            </div>
            <span className="font-orbitron font-bold text-xl text-gradient">NEXIS</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/#products" className="text-white hover:text-emerald-400 transition-colors duration-300">
              Products
            </Link>
            <Link href="/trading" className="text-white hover:text-emerald-400 transition-colors duration-300">
              Exchange
            </Link>
            <Link href="/trading" className="text-white hover:text-emerald-400 transition-colors duration-300">
              Dashboard
            </Link>
          </div>
          
          {isConnected ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-slate-300">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <Button 
                onClick={disconnect}
                variant="outline" 
                className="glass px-4 py-2 rounded-lg font-semibold text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              onClick={connect}
              className="gradient-bullish px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 animate-glow hidden md:block"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-dark rounded-lg mt-2 p-4 space-y-4">
            <Link href="/#products" className="block text-white hover:text-emerald-400 transition-colors">
              Products
            </Link>
            <Link href="/trading" className="block text-white hover:text-emerald-400 transition-colors">
              Exchange
            </Link>
            <Link href="/trading" className="block text-white hover:text-emerald-400 transition-colors">
              Dashboard
            </Link>
            {isConnected ? (
              <div className="space-y-2">
                <div className="text-sm text-slate-300 text-center">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <Button 
                  onClick={disconnect}
                  className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold text-white"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connect}
                className="w-full gradient-bullish py-2 rounded-lg font-semibold text-white"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
