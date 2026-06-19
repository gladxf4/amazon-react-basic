import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('amazon_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentView, setCurrentView] = useState('home');
  const [toast, setToast] = useState({ show: false, productTitle: '', productImage: '' });

  useEffect(() => {
    localStorage.setItem('amazon_cart', JSON.stringify(cart));
  }, [cart]);

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
          };
        });
        setProducts(formattedData);
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
    setCurrentView('home');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentView('home');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setCurrentView('home');
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
        onCartClick={() => setCurrentView('cart')}
      />

      <main className="flex-grow">
        {currentView === 'home' ? (
          <Home
            products={filteredProducts}
            isLoading={isLoading}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onAddToCart={addToCart}
          />
        ) : (
          <Cart
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={clearCart}
            onBackToShopping={resetFilters}
          />
        )}
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
            <button
              onClick={() => {
                setCurrentView('cart');
                setToast({ show: false, productTitle: '', productImage: '' });
              }}
              className="mt-2 text-xs font-bold text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer flex items-center"
            >
              Go to Cart
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <img src={toast.productImage} alt={toast.productTitle} className="w-12 h-12 object-contain bg-white p-1 border border-gray-200 rounded shadow-sm shrink-0" />
          <button
            onClick={() => setToast({ show: false, productTitle: '', productImage: '' })}
            className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
