import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import LandingPage from './pages/LandingPage';
import AdminPanel from './pages/AdminPanel';

const App = () => {
    const [cart, setCart] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPanel />} />

                <Route
                    path="*"
                    element={
                        <>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
                                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                                <Route path="/orders" element={<OrderHistory />} />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
