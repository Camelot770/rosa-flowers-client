import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from './store/user';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import BouquetDetail from './pages/BouquetDetail';
import Constructor from './pages/Constructor';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Nav from './components/layout/Nav';

function App() {
  const fetchProfile = useUserStore((s) => s.fetchProfile);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#F48FB1');
    }
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/bouquet/:id" element={<BouquetDetail />} />
        <Route path="/constructor" element={<Constructor />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
