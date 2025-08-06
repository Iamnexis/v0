import { Link } from "wouter";
import { motion } from "framer-motion";

const footerLinks = {
  products: [
    { name: "Tokenized Stocks", href: "/#products" },
    { name: "Spot Trading", href: "/trading" },
    { name: "Portfolio Tracker", href: "/trading" },
    { name: "Trading API", href: "#" }
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "API Status", href: "#" },
    { name: "Contact", href: "#" }
  ],
  legal: [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Compliance", href: "#" }
  ]
};

const socialLinks = [
  { name: "Twitter", href: "#", icon: "🐦" },
  { name: "Discord", href: "#", icon: "💬" },
  { name: "Telegram", href: "#", icon: "📱" }
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bullish rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45" />
              </div>
              <span className="font-orbitron font-bold text-xl text-gradient">NEXIS</span>
            </Link>
            <p className="text-slate-400">
              The future of stock investing through blockchain tokens.
              Transparent, secure and accessible for everyone.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div 
              key={category} 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-white capitalize">{category}</h4>
              <ul className="space-y-2 text-slate-400">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400">
              2025 © Nexis. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <span>🇺🇸 English</span>
              <span>•</span>
              <span>Base Network</span>
              <span>•</span>
              <span>Secure & Audited</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
