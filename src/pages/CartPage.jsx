import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [isGift, setIsGift] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const subtotalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

  const handleCheckout = () => {
    setOrderId(`AMZ-4720953-${Math.floor(Math.random() * 900000 + 100000)}`);
    setCheckoutSuccess(true);
    onCheckout(); // Clears the cart globally
  };

  const handleContinueShopping = () => {
    setCheckoutSuccess(false);
    navigate('/');
  };

  if (checkoutSuccess) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 flex justify-center items-center bg-[#eaeded] min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-xl w-full border border-gray-100 text-center animate-fade-in">
          {/* Animated Success Checkmark */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full mb-6 border border-emerald-100 shadow-sm transform transition-all duration-700 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-[#007600] font-medium text-sm mb-4">Confirmed & Ready for Dispatch</p>
          
          <div className="bg-gray-50 border border-gray-100 rounded-md p-4 mb-8 text-left text-sm text-gray-600">
            <p className="mb-1 font-medium text-gray-700">Order details:</p>
            <p className="flex justify-between mb-1">
              <span>Order ID:</span>
              <span className="font-mono font-semibold">{orderId}</span>
            </p>
            <p className="flex justify-between mb-1">
              <span>Delivery estimate:</span>
              <span className="font-semibold text-gray-800">Tomorrow by 10 AM</span>
            </p>
            <p className="flex justify-between">
              <span>Payment status:</span>
              <span className="text-emerald-700 font-semibold uppercase text-xs tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">Cash on Delivery</span>
            </p>
          </div>

          <p className="text-gray-500 text-sm mb-8">
            Thank you for shopping with us! A confirmation email and SMS containing shipping details will be sent shortly.
          </p>

          <button
            onClick={handleContinueShopping}
            className="bg-gradient-to-b from-[#ffd814] to-[#f7ca00] border border-[#a88734] hover:border-[#846a29] active:from-[#f0c14b] active:to-[#e0b034] rounded-full py-2.5 px-8 text-sm text-[#111] shadow hover:shadow-md font-bold transition-all active:scale-[0.98] cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eaeded] min-h-screen">
      <div className="max-w-[1500px] mx-auto p-4 md:py-6 md:px-8">
        <h1 className="sr-only">Your Amazon Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left Column: Cart items */}
          <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-md shadow-sm border border-gray-200">
            <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 leading-none">Shopping Cart</h2>
              {cartItems.length > 0 && (
                <span className="text-sm text-gray-500 font-medium hidden sm:block">Price</span>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-50 p-6 rounded-full text-gray-400 mb-5 border border-gray-150">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Amazon Cart is empty</h3>
                <p className="text-gray-500 text-sm max-w-md mb-8 leading-relaxed">
                  Your shopping cart is waiting. Fill it with the best tech, fashion, and books available. Take a look at our current deals or search for products.
                </p>
                <Link
                  to="/"
                  className="bg-gradient-to-b from-[#ffd814] to-[#f7ca00] border border-[#a88734] hover:border-[#846a29] rounded-full py-2.5 px-8 text-sm text-[#111] shadow font-bold transition-all active:scale-[0.98] cursor-pointer inline-block"
                >
                  Go to Homepage
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start gap-4">
                    {/* Item Image */}
                    <div className="w-full sm:w-32 h-32 flex justify-center shrink-0 items-center bg-gray-50 rounded border border-gray-100 p-2 cursor-pointer">
                      <img src={item.image} alt={item.title} className="max-h-28 max-w-full object-contain" />
                    </div>

                    {/* Item Info */}
                    <div className="flex-grow min-w-0 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.id}`} className="text-base font-semibold text-gray-800 line-clamp-2 hover:text-[#c7511f] cursor-pointer leading-snug hover:underline">
                          {item.title}
                        </Link>
                        <p className="text-[#007600] text-xs font-semibold mt-1">In stock</p>
                        <p className="text-xs text-gray-500 mt-0.5">Eligible for FREE Shipping</p>
                        
                        {/* Gift Option checkbox */}
                        <label className="inline-flex items-center mt-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                          />
                          <span className="ml-1.5 text-xs text-gray-600">This is a gift <span className="text-[#007185] hover:underline">Learn more</span></span>
                        </label>
                      </div>

                      {/* Quantity Selector & Action row */}
                      <div className="flex items-center flex-wrap gap-4 mt-4">
                        {/* Stepper Input */}
                        <div className="flex items-center border border-gray-300 rounded shadow-sm overflow-hidden bg-gray-50">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 active:bg-gray-300 font-bold transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-sm bg-white font-bold text-gray-800 border-x border-gray-200 min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 active:bg-gray-300 font-bold transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="h-4 border-r border-gray-300 hidden sm:block" />

                        {/* Delete item button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs font-medium text-[#007185] hover:text-red-700 hover:underline cursor-pointer flex items-center space-x-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Item Price */}
                    <div className="w-full sm:w-auto text-right shrink-0 mt-2 sm:mt-0">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{formatPrice(item.price)}
                      </span>
                      {item.mrp > item.price && (
                        <div className="text-xs text-gray-500 line-through">
                          ₹{formatPrice(item.mrp)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Bottom subtotal helper */}
                <div className="pt-4 flex justify-end text-lg font-medium text-gray-800">
                  Subtotal ({subtotalCount} {subtotalCount === 1 ? 'item' : 'items'}):{' '}
                  <span className="font-extrabold text-gray-900 ml-1.5">₹{formatPrice(subtotalPrice)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Checkout panel */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1 flex flex-col gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="text-[#007600] flex items-start gap-1.5 text-xs mb-3 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Your order is eligible for <span className="font-bold">FREE Delivery</span>. Select this option at checkout.
                  </span>
                </div>

                <div className="text-lg font-medium text-gray-800 mb-3">
                  Subtotal ({subtotalCount} {subtotalCount === 1 ? 'item' : 'items'}):{' '}
                  <span className="font-extrabold text-gray-950 block mt-0.5 text-xl">₹{formatPrice(subtotalPrice)}</span>
                </div>

                {/* Order is gift checkbox */}
                <label className="flex items-center gap-2 mb-5 cursor-pointer select-none text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <span>This order contains a gift</span>
                </label>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-b from-[#ffd814] to-[#f7ca00] border border-[#a88734] hover:border-[#846a29] active:from-[#f0c14b] active:to-[#e0b034] rounded-md py-2 px-3 text-sm text-[#111] shadow-sm hover:shadow font-medium transition-all active:scale-[0.98] cursor-pointer"
                >
                  Proceed to Buy
                </button>
              </div>

              {/* Back to Homepage helper block */}
              <button
                onClick={() => navigate('/')}
                className="w-full text-center border border-gray-300 hover:bg-gray-50 rounded-md py-2 text-xs font-semibold text-gray-700 bg-white transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
