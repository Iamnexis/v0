import { motion } from "framer-motion";
import { CheckCircle, Clock, X, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TransactionStatusProps {
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | null;
  txHash?: string;
  onClose: () => void;
  type: 'buy' | 'sell';
  amount: string;
  symbol: string;
}

export function TransactionStatus({ 
  isLoading, 
  isSuccess, 
  error, 
  txHash, 
  onClose, 
  type, 
  amount, 
  symbol 
}: TransactionStatusProps) {
  if (!isLoading && !isSuccess && !error) return null;

  const getExplorerUrl = (hash: string) => {
    // This would vary based on the network
    return `https://etherscan.io/tx/${hash}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50 max-w-md"
    >
      <Card className="border border-slate-700 bg-slate-900/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {isLoading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="h-6 w-6 text-blue-400" />
                </motion.div>
              )}
              {isSuccess && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <X className="h-6 w-6 text-red-400" />
                </motion.div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">
                {isLoading && `Processing ${type === 'buy' ? 'Buy' : 'Sell'} Order...`}
                {isSuccess && `${type === 'buy' ? 'Buy' : 'Sell'} Order Completed!`}
                {error && `${type === 'buy' ? 'Buy' : 'Sell'} Order Failed`}
              </h3>
              
              <p className="text-sm text-slate-300 mt-1">
                {isLoading && `Swapping ${amount} ${type === 'buy' ? 'ETH for' : ''} ${symbol} ${type === 'sell' ? 'for ETH' : ''}`}
                {isSuccess && `Successfully swapped ${amount} ${type === 'buy' ? 'ETH for' : ''} ${symbol} ${type === 'sell' ? 'for ETH' : ''}`}
                {error && error}
              </p>
              
              {txHash && (
                <div className="mt-2 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => window.open(getExplorerUrl(txHash), '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Explorer
                  </Button>
                  <code className="text-xs text-slate-400 font-mono">
                    {txHash.slice(0, 6)}...{txHash.slice(-4)}
                  </code>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}