import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Rodriguez",
    role: "Investor",
    avatar: "MR",
    content: "The most intuitive platform I've ever used. I was able to diversify my portfolio with tokenized stocks simply and safely.",
    gradient: "gradient-bullish"
  },
  {
    name: "John Silva",
    role: "Trader",
    avatar: "JS",
    content: "Excellent for anyone who wants exposure to the US market without complications. Clean interface and fast execution.",
    gradient: "gradient-electric"
  },
  {
    name: "Ana Costa",
    role: "Investor",
    avatar: "AC",
    content: "Revolutionary! I can finally invest in US stocks with the transparency and security of blockchain.",
    gradient: "gradient-gold"
  }
];

export default function SuccessSection() {
  const { data: metrics } = useQuery({
    queryKey: ["/api/market/metrics"],
  });

  const displayMetrics = [
    {
      value: metrics?.totalUsers || "45,231",
      label: "Active Users",
      gradient: "gradient-bullish"
    },
    {
      value: metrics?.totalVolume ? `$${(parseFloat(metrics.totalVolume) / 1e9).toFixed(1)}B` : "$2.4B",
      label: "Volume Traded",
      gradient: "gradient-electric"
    },
    {
      value: `+${metrics?.avgReturn || "23.7"}%`,
      label: "Average Return",
      gradient: "gradient-gold"
    },
    {
      value: `${metrics?.uptime || "99.9"}%`,
      label: "Uptime",
      gradient: "text-emerald-400"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="text-gradient">Proven</span> <span className="text-white">Results</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Thousands of investors are already achieving consistent returns with our platform.
          </p>
        </motion.div>
        
        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {displayMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-dark rounded-2xl p-8 text-center transition-transform duration-300 border-slate-700">
                <CardContent className="p-0">
                  <div className={`text-4xl font-orbitron font-bold mb-2 ${
                    metric.gradient.includes('gradient') 
                      ? `${metric.gradient} bg-clip-text text-transparent` 
                      : metric.gradient
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-slate-400">{metric.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="glass-dark rounded-2xl p-6 space-y-4 border-slate-700">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${testimonial.gradient} rounded-full flex items-center justify-center`}>
                      <span className="font-bold text-white">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 italic mb-4">"{testimonial.content}"</p>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
