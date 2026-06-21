import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('amazon_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('amazon_isLoggedIn') === 'true';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toast, setToast] = useState({ show: false, productTitle: '', productImage: '' });

  useEffect(() => {
    localStorage.setItem('amazon_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amazon_isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => {
          const basePriceINR = Math.round(item.price * 83);
          const discount = Math.floor(Math.random() * 40) + 10;
          const mrp = Math.round(basePriceINR / (1 - discount / 100));
          return {
            id: item.id,
            title: item.title,
            price: basePriceINR,
            mrp: mrp,
            discount: discount,
            rating: item.rating.rate,
            reviewCount: item.rating.count,
            image: item.image,
            category: item.category,
            description: item.description,
          };
        });

        // Fixed mock products with relevant images
        const localMockProducts = [
          {
            id: 10001,
            title: "Apple iPhone 15 Pro (128 GB) - Blue Titanium",
            price: 129900,
            mrp: 134900,
            discount: 4,
            rating: 4.6,
            reviewCount: 1845,
            image: "https://m.media-amazon.com/images/I/81fxjeu8fdL._SX679_.jpg", // Actual iPhone 15 Pro image
            category: "electronics",
            description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.",
          },
          {
            id: 10002,
            title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Active Black",
            price: 29990,
            mrp: 34990,
            discount: 14,
            rating: 4.5,
            reviewCount: 3820,
            image: "https://m.media-amazon.com/images/I/51aXvjzcukL._SX522_.jpg", // Actual Sony WH-1000XM5 image
            category: "electronics",
            description: "Industry-leading noise cancellation. Two processors control 8 microphones for unprecedented noise cancellation.",
          },
          {
            id: 10003,
            title: "Mens Casual Premium Slim Fit Cotton T-Shirt - Crimson Red",
            price: 799,
            mrp: 1499,
            discount: 47,
            rating: 4.2,
            reviewCount: 940,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80", // Reliable T-shirt image
            category: "men's clothing",
            description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
          }
        ];

        setProducts([...localMockProducts, ...formattedData]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, productTitle: '', productImage: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setToast({
      show: true,
      productTitle: product.title,
      productImage: product.image,
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#eaeded] min-h-screen flex flex-col font-sans antialiased text-[#111]">
      <Header
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        categories={categories}
        onLogoClick={resetFilters}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                products={filteredProducts}
                isLoading={isLoading}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onAddToCart={addToCart}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cartItems={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={clearCart}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailsPage 
                products={products}
                onAddToCart={addToCart}
              />
            } 
          />
          <Route 
            path="/login" 
            element={
              <LoginPage 
                setIsLoggedIn={setIsLoggedIn} 
              />
            } 
          />
        </Routes>
      </main>

      <Footer />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in bg-white/95 backdrop-blur-md border border-emerald-500/30 shadow-2xl rounded-lg p-4 w-full max-w-sm flex items-start space-x-3 transition-all duration-300">
          <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600 mt-0.5 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-grow min-w-0">
            <h4 className="text-sm font-bold text-emerald-800">Added to Cart</h4>
            <p className="text-xs text-gray-700 truncate mt-0.5">{toast.productTitle}</p>
          </div>
          <img src={toast.productImage} alt={toast.productTitle} className="w-12 h-12 object-contain bg-white p-1 border border-gray-200 rounded shadow-sm shrink-0" />
        </div>
      )}
    </div>
  );
}

export default App;
