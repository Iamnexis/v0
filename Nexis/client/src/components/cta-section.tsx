import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Rocket, Download, Shield, Clock, TrendingUp } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bullish opacity-10"></div>
      <motion.div 
        className="max-w-4xl mx-auto text-center space-y-8 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl lg:text-6xl font-bold">
          <span className="text-white">Ready to</span><br />
          <span className="text-gradient">Revolutionize</span><br />
          <span className="text-white">Your Investments?</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Join thousands of investors who have already discovered the future of stock trading.
          Get started today with just a few clicks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/trading">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gradient-bullish px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 animate-glow">
                <Rocket className="mr-3 h-5 w-5" />
                Start Trading Now
              </Button>
            </motion.div>
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              disabled
              variant="outline" 
              className="bg-slate-600 text-slate-400 px-10 py-4 rounded-xl font-bold text-lg cursor-not-allowed opacity-50"
            >
              <Download className="mr-3 h-5 w-5" />
              Download App - Soon
            </Button>
          </motion.div>
        </div>
        
        <div className="flex justify-center items-center space-x-8 text-slate-400 flex-wrap gap-4">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="h-5 w-5 text-emerald-400" />
            <span>100% Secure</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="h-5 w-5 text-blue-400" />
            <span>Instant Execution</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="h-5 w-5 text-amber-400" />
            <span>No Hidden Fees</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
