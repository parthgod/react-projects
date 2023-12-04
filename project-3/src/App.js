import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StockOverviewPage from './pages/StockOverviewPage';
import StockDetailPage from './pages/StockDetailPage';
import { WatchListContextProvider } from './context/watchListContext';

function App() {
  return (
    <div className='container'>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StockOverviewPage />} />
            <Route path='/detail/:symbol' element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
