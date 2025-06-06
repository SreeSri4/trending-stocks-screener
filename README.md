# Trending Stocks Screener

A React-based stock screening application that allows users to filter and analyze Indian stocks based on various technical and fundamental criteria.

## Features

- **Multiple Screening Criteria**: Choose from different filters including:
  - Volume Buzzers (High volume with price momentum)
  - 52 Week High stocks
  - 1 Month High stocks
  - Stocks up 100% in a year

- **Real-time Data**: Fetches live data from TradingView API
- **Comprehensive Metrics**: Displays key metrics including:
  - Current price and price change
  - Volume and relative volume
  - SMA20 and distance from SMA
  - Market capitalization
  - Sector classification

- **Interactive Interface**: 
  - Dropdown selection for screening criteria
  - Refresh button for manual data updates
  - Responsive table layout
  - Color-coded gains/losses

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trending-stocks-screener
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install react react-dom lucide-react
npm install -D tailwindcss @tailwindcss/forms postcss autoprefixer
```

4. Initialize Tailwind CSS:
```bash
npx tailwindcss init -p
```

5. Create `src/index.css` with Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Project Structure

```
src/
├── index.js                 # Application entry point
├── index.css               # Tailwind CSS imports
├── TrendingStocksScreener.js # Main component
└── ...

tailwind.config.js          # Tailwind configuration
package.json               # Dependencies and scripts
README.md                 # This file
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Usage

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

3. Use the dropdown menu to select different screening criteria:
   - **Volume Buzzers**: Stocks with high relative volume and price momentum
   - **52 Week High**: Stocks at or near their 52-week highs
   - **1 Month High**: Stocks at or near their 1-month highs
   - **100% up in a Year**: Stocks that have doubled in the past year

4. Click the refresh button to update data manually

## API Integration

The application integrates with TradingView's stock screener API to fetch real-time data for Indian stocks listed on NSE. The API provides comprehensive market data including:

- Price and volume information
- Technical indicators (SMA, relative volume)
- Fundamental data (market cap, sector)
- Performance metrics

## Filtering Criteria

### Volume Buzzers
- Price > ₹30
- Average 60-day volume > 100,000
- Price change > 3%
- Relative volume > 3x
- Market cap > ₹800 crores

### 52 Week High
- Stocks trading at 52-week highs
- Price > ₹30
- Market cap > ₹800 crores
- Average volume > 100,000

### 1 Month High
- Stocks at 1-month highs
- Similar volume and market cap filters
- NSE-listed stocks only

### 100% up in a Year
- Annual performance > 100%
- Large-cap stocks only
- Active trading volume

## Customization

You can modify the screening criteria by editing the `getPayloadForCriteria` function in `TrendingStocksScreener.js`. Each criterion has its own API payload with specific filters.

## Technologies Used

- **React**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **TradingView API**: Stock data source

## Browser Compatibility

This application works on modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Fetch API

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for educational and informational purposes only. Stock market investments carry risk, and past performance does not guarantee future results. Always consult with a financial advisor before making investment decisions.

## Support

For support, email your-email@example.com or create an issue in the GitHub repository.