# NEXIS - Tokenized Stock Trading Platform

## Overview

NEXIS is a modern web application that enables trading of tokenized stocks through blockchain technology. The platform provides real-time stock market data, trading capabilities, and portfolio management for tokenized versions of major company stocks like Google (GOOGL), Amazon (AMZN), and Circle (CRCL). Built with a React frontend and Express backend, it offers a seamless trading experience with 1:1 exposure to underlying assets through blockchain tokens.

## Recent Changes (January 2025)

- ✅ Removed "Proven Results" and "Watch Demo" sections from home page per user request
- ✅ Integrated real-time stock price data with Yahoo Finance API fallback when Alpha Vantage fails
- ✅ Added authentic company logos for GOOGL (Google), AMZN (Amazon), and CRCL (Circle) 
- ✅ Implemented live price charts with area graphs and real-time price indicators
- ✅ Enhanced MetaMask swap functionality with transaction status tracking
- ✅ Added functional timeframe buttons (1H, 1D, 1W, 1M) for chart periods
- ✅ Updated stock cards with real-time animated mini charts
- ✅ Fixed $NaN price display issues with proper number validation
- ✅ Made "Download App" button non-clickable with "Soon" indicator

**Recent Updates (August 2025):**
- Integrated WalletConnect for Web3 wallet connectivity
- Converted all content from Portuguese to English
- Enhanced navigation with wallet connection status
- Added modern "bullish" design theme with glass morphism effects

## User Preferences

Preferred communication style: Simple, everyday language.
Preferred wallet integration: WalletConnect for decentralized wallet connections
UI Language: English (converted from Portuguese)

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom design system using shadcn/ui components
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling for consistent design
- **Animations**: Framer Motion for smooth transitions and interactions
- **Web3 Integration**: WalletConnect with Wagmi for wallet connectivity across multiple chains (Mainnet, Polygon, Base, Arbitrum)

### Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage**: In-memory storage implementation with interface for easy database migration
- **API Design**: RESTful endpoints for stocks, trades, users, and price history
- **Session Management**: Express sessions with PostgreSQL session store support

### Database Schema
- **Users**: User accounts with portfolio tracking
- **Stocks**: Tokenized stock information with real-time pricing
- **Trades**: Buy/sell transaction records
- **Price History**: Historical price data for charting and analysis

### Development Workflow
- **Build System**: Vite for frontend bundling with HMR support
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Development Server**: Integrated Express server with Vite middleware

### UI/UX Design
- **Design System**: Custom dark theme with emerald accent colors
- **Responsive Design**: Mobile-first approach with glass morphism effects
- **Typography**: Inter and Orbitron fonts for modern financial aesthetic
- **Component Library**: Comprehensive UI components with consistent styling

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, TanStack Query for data fetching
- **Backend Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect configuration
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation

### Database Infrastructure
- **Primary Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Session Storage**: PostgreSQL session store with connect-pg-simple
- **Database Driver**: Neon Database serverless driver for connection pooling

### UI Component Libraries
- **Base Components**: Radix UI primitives for accessibility and behavior
- **Styling**: Tailwind CSS with custom configuration and design tokens
- **Form Handling**: React Hook Form with Zod validation schemas
- **Date Utilities**: date-fns for date manipulation and formatting

### Development Tools
- **Type Safety**: Zod for runtime validation and TypeScript integration
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Experience**: Replit-specific plugins for enhanced development workflow

### Third-Party Integrations
- **Real-time Data**: Mock stock price updates with configurable intervals
- **Token Integration**: Blockchain token address mapping for each stock
- **Market Data**: Simulated market metrics and trading volume data
- **WalletConnect**: Web3Modal integration for connecting various crypto wallets
- **Multi-chain Support**: Support for Ethereum mainnet, Polygon, Base, and Arbitrum networks