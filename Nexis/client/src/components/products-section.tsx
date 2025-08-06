import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import StockCard from "./stock-card";
import type { Stock } from "@shared/schema";

export default function ProductsSection() {
  const { data: stocks, isLoading } = useQuery<Stock[]>({
    queryKey: ["/api/stocks"],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="products">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Produtos</span> <span className="text-white">Disponíveis</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-dark rounded-2xl p-6 animate-pulse">
                <div className="h-24 bg-slate-700 rounded mb-4"></div>
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="products">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="text-gradient">Available</span> <span className="text-white">Products</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Onchain exposure to the world's top stocks, backed 1:1 by the underlying asset. 
            Modern investing designed for everyone.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stocks?.map((stock, index) => (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <StockCard stock={stock} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
