import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, BarChart3, Zap } from 'lucide-react';

interface RealTimeChartProps {
  data: Array<{
    time: string;
    price: number;
    volume: number;
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    sma?: number;
    rsi?: number;
  }>;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  symbol: string;
  isLoading?: boolean;
}

export function RealTimeChart({ 
  data, 
  currentPrice, 
  change, 
  changePercent, 
  symbol,
  isLoading 
}: RealTimeChartProps) {
  const isPositive = (change || 0) >= 0;
  const lineColor = isPositive ? '#10b981' : '#ef4444';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const formatPrice = (value: number) => {
    if (isNaN(value) || value === null || value === undefined) return '$0.00';
    return `$${Number(value).toFixed(2)}`;
  };
  const formatChange = (value: number) => {
    if (isNaN(value) || value === null || value === undefined) return '0.00';
    return value >= 0 ? `+${Number(value).toFixed(2)}` : Number(value).toFixed(2);
  };
  const formatPercent = (value: number) => {
    if (isNaN(value) || value === null || value === undefined) return '0.00%';
    return `${value >= 0 ? '+' : ''}${Number(value).toFixed(2)}%`;
  };

  return (
    <div className="space-y-4">
      {/* Price Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
            <span>{symbol}/USD</span>
            <Activity className="w-5 h-5 text-emerald-400" />
          </h3>
          {currentPrice && (
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-orbitron font-bold text-white">
                {formatPrice(currentPrice)}
              </span>
              {change !== undefined && (
                <motion.div 
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-semibold ${
                    isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.3 }}
                >
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{formatChange(change)}</span>
                  {changePercent !== undefined && (
                    <span>({formatPercent(changePercent)})</span>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-sm text-slate-400">Live Price</div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Professional Trading Chart */}
      <div className="h-80 w-full space-y-2">
        {/* Main Price Chart */}
        <div className="h-56 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={lineColor} stopOpacity={0.4}/>
                  <stop offset="50%" stopColor={lineColor} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={lineColor} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id={`volume-gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              
              {/* Enhanced Grid */}
              <CartesianGrid 
                strokeDasharray="2 2" 
                stroke="#374151" 
                opacity={0.4}
                horizontal={true}
                vertical={false}
              />
              
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                interval="preserveStartEnd"
                tickMargin={8}
              />
              
              <YAxis 
                yAxisId="price"
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                tickFormatter={formatPrice}
                width={60}
                orientation="right"
              />
              
              <YAxis 
                yAxisId="volume"
                domain={[0, 'dataMax']}
                axisLine={false}
                tickLine={false}
                tick={false}
                width={0}
              />
              
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                labelStyle={{ color: '#94a3b8', fontWeight: 600 }}
                formatter={(value: number, name: string) => {
                  if (name === 'price') {
                    return [formatPrice(value), 'Price'];
                  }
                  if (name === 'volume') {
                    return [`${(value / 1000000).toFixed(1)}M`, 'Volume'];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => `Time: ${label}`}
              />
              
              {/* Volume Bars (subtle background) */}
              <Bar
                yAxisId="volume"
                dataKey="volume"
                fill={`url(#volume-gradient-${symbol})`}
                opacity={0.3}
                radius={[1, 1, 0, 0]}
              />
              
              {/* Simple Moving Average (SMA) */}
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="sma"
                stroke="#8b5cf6"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
                opacity={0.7}
              />
              
              {/* Main Price Line */}
              <Area
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke={lineColor}
                strokeWidth={3}
                fill={`url(#gradient-${symbol})`}
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: lineColor,
                  stroke: '#0f172a',
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))'
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* Enhanced Price & Technical Indicators Overlay */}
          <div className="absolute top-4 right-4 space-y-2">
            {/* Current Price */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-slate-600">
              <div className="text-xs text-slate-400">Current Price</div>
              <div className={`text-lg font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatPrice(currentPrice || 0)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {data.length > 0 && data[data.length - 1]?.sma && (
                  <>SMA(10): {formatPrice(data[data.length - 1].sma)}</>
                )}
              </div>
            </div>
            
            {/* Technical Indicators */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 border border-slate-600">
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">RSI:</span>
                  <span className={`font-medium ${
                    (data[data.length - 1]?.rsi || 50) > 70 ? 'text-red-400' : 
                    (data[data.length - 1]?.rsi || 50) < 30 ? 'text-emerald-400' : 'text-yellow-400'
                  }`}>
                    {data[data.length - 1]?.rsi?.toFixed(1) || '50.0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trend:</span>
                  <span className={`font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isPositive ? '↗ Bull' : '↘ Bear'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Volume Chart */}
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis 
                domain={[0, 'dataMax']}
                axisLine={false}
                tickLine={false}
                tick={false}
                width={60}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#10b981"
                strokeWidth={1}
                fill="url(#volume-gradient-GOOGL)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced indicators and stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-slate-400">Live</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <BarChart3 className="w-4 h-4" />
            <span>Professional Chart</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs">
          <div className="text-slate-400">
            Vol: <span className="text-white font-medium">
              {data.length > 0 ? `${(data[data.length - 1]?.volume / 1000000 || 0).toFixed(1)}M` : '0M'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-400">30s updates</span>
          </div>
        </div>
      </div>
    </div>
  );
}