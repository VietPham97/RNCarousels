
import React from 'react';
import { StatusBar } from 'react-native';
import Carousel from './src/Carousel';
import StockMarquee from './src/StockMarquee';

const data = [
  'AAPL', 'GOOGL', 'GOOG', 'MSFT', 'FB', 'TSM',
  'INTC', 'ORCL', 'CSCO', 'NVDA', 'IBM', 'SAP', 
  // 'TXN', 'QCOM', 'ADBE', 'AVGO', 'DCM', 'CRM', 
  // 'AABA', 'BIDU', 'ITW', 'ATVI', 'AMAT', 'ADP', 
  // 'MU', 'VMW', 'CTSH', 'INTU', 'NXPI', 'INFY', 
  // 'EA', 'ETN', 'HPQ', 'ADI', 'NOK', 'FISV', 'DXC', 
  // 'LRCX', 'NOW', 'HPE', 'WDC', 'WDAY', 'WIT', 'TWTR', 
  // 'ADSK', 'SNAP', 'WPP', 'RHT', 'KYO', 'CERN',
].map((item) => ({
  title: item,
  price: parseInt((Math.random() * 1000).toFixed(2), 10),
  change: parseInt((Math.random() * 100).toFixed(2), 10),
  isGain: Math.floor(Math.random() * 10).toFixed(2) > 5,
}));

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Carousel />
      {/* <StockMarquee data={data}/> */}
    </>
  );
};

export default App;
