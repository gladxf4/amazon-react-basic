import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, MapPin, ShoppingCart } from 'lucide-react';

function Header({
  cartCount,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = ['All'],
  onLogoClick,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLogoClick = () => {
    onLogoClick();
    navigate('/');
  };

  return (
    <header className="flex flex-col sticky top-0 z-40 shadow-sm font-sans min-w-[320px]">
      {/* Top Nav - Main Belt */}
      <div className="bg-[#131921] text-white flex items-center px-2 sm:px-4 py-2 text-sm h-[60px]">

        {/* Left Side: Logo & Location */}
        <div className="flex items-center space-x-1 shrink-0">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="flex items-start border border-transparent hover:border-white p-1.5 rounded-sm cursor-pointer mt-1"
          >
            <img
              className="w-24 object-contain mt-2 invert"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon Logo"
            />
            <div className="flex flex-col ml-1 hidden sm:flex pt-1">
              <span className="text-white font-bold text-sm leading-tight">.in</span>
              <span className="text-[#00a8e1] font-bold text-[15px] leading-tight tracking-tight mt-[-2px]">prime</span>
            </div>
          </div>

          {/* Deliver To */}
          <div className="flex items-center border border-transparent hover:border-white p-1 rounded-sm cursor-pointer hidden md:flex h-[50px] px-2">
            <MapPin className="w-5 h-5 mt-3 mr-1 text-white" />
            <div className="flex flex-col leading-tight pt-1">
              <span className="text-xs text-gray-300">{isLoggedIn ? 'Deliver to Akshat' : 'Deliver to'}</span>
              <span className="font-bold text-sm text-white">New Delhi 110001</span>
            </div>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex flex-1 items-center h-10 rounded-md overflow-hidden bg-white mx-4 focus-within:ring-2 focus-within:ring-[#f3a847] w-full"
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-100 text-gray-600 text-xs h-full px-2 border-r border-gray-300 outline-none hover:bg-gray-200 cursor-pointer w-auto max-w-[120px]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-full p-2 flex-1 border-none outline-none text-black text-sm"
            type="text"
            placeholder="Search Amazon.in"
          />

          <button
            type="submit"
            className="h-full w-12 flex items-center justify-center bg-[#febd69] hover:bg-[#f3a847] cursor-pointer text-gray-800 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Right Navigation */}
        <div className="flex items-center justify-end space-x-1 shrink-0 ml-auto sm:ml-0 h-[50px]">

          {/* Language / Region */}
          <div className="flex items-end border border-transparent hover:border-white p-2 rounded-sm cursor-pointer hidden lg:flex h-full pb-3">
            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="IN" className="w-5 h-4 mr-1 object-cover" />
            <span className="text-sm font-bold leading-none">EN</span>
            <span className="text-[10px] text-gray-400 ml-1 leading-none">▼</span>
          </div>

          {/* Account & Lists */}
          <div className="flex flex-col justify-center border border-transparent hover:border-white p-2 rounded-sm cursor-pointer hidden md:flex h-full leading-tight group relative">
            <Link to={isLoggedIn ? "#" : "/login"} className="text-white hover:no-underline">
              <span className="text-xs whitespace-nowrap block">{isLoggedIn ? "Hello, Akshat" : "Hello, Sign in"}</span>
              <span className="font-bold text-sm whitespace-nowrap flex items-center">Account & Lists <span className="text-[10px] text-gray-400 ml-1 mt-1">▼</span></span>
            </Link>
            
            {/* Logout Dropdown (visible on hover if logged in) */}
            {isLoggedIn && (
              <div className="absolute top-full right-0 mt-0 w-48 bg-white text-black shadow-lg rounded-sm border border-gray-200 hidden group-hover:block z-50 p-3">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <div className="flex flex-col justify-center border border-transparent hover:border-white p-2 rounded-sm cursor-pointer hidden lg:flex h-full leading-tight">
            <span className="text-xs text-white">Returns</span>
            <span className="font-bold text-sm">& Orders</span>
          </div>

          {/* Cart Section */}
          <Link
            to="/cart"
            className="flex items-center border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer h-full relative select-none hover:no-underline text-white group"
          >
            <div className="relative flex items-center pt-2 transform transition-transform duration-300 group-hover:scale-110">
              <span className="absolute top-0 left-4 font-bold text-[#f3a847] w-[20px] text-center leading-none z-10">
                {cartCount}
              </span>
              <span className="nav-cart-icon nav-sprite opacity-90 inline-block filter brightness-0 invert"></span>
            </div>
            <span className="font-bold hidden sm:block mt-auto text-sm self-end mb-1">Cart</span>
          </Link>

        </div>
      </div>

      {/* Mobile Search Bar (shows only on small screens) */}
      <div className="bg-[#131921] p-2 sm:hidden flex w-full border-t border-gray-700">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-center h-10 rounded-md overflow-hidden bg-white w-full focus-within:ring-2 focus-within:ring-[#f3a847]"
        >
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-full p-2 flex-1 border-none outline-none text-black text-sm w-full"
            type="text"
            placeholder="Search Amazon.in"
          />
          <button
            type="submit"
            className="h-full w-12 flex items-center justify-center bg-[#febd69] hover:bg-[#f3a847] cursor-pointer text-gray-800"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Sub Nav (Amazon Belt Below Main Header) */}
      <div className="bg-[#232f3e] text-white flex items-center px-3 py-1 text-sm font-medium overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="flex items-center border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0">
          <Menu className="w-5 h-5 mr-1" />
          <span className="font-bold">All</span>
        </div>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white">Amazon miniTV</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white">Sell</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white">Best Sellers</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white">Today's Deals</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white">Mobiles</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white">Customer Service</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white hidden md:block">Electronics</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white hidden md:block">Prime</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white hidden lg:block">New Releases</a>
        <a href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer flex-shrink-0 hover:no-underline text-white hidden lg:block">Amazon Pay</a>
      </div>
    </header>
  );
}

export default Header;
