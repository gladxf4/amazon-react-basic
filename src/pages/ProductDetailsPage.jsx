import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

function ProductDetailsPage({ products, onAddToCart }) {
  const { id } = useParams();
  
  // Find the product, ID from URL is a string, product ID might be number
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-[#007185] hover:underline hover:text-[#c7511f]">
          Return to Home
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

  return (
    <div className="bg-white min-h-screen pb-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 py-2 px-4 border-b border-gray-200">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <span className="capitalize hover:underline cursor-pointer">{product.category}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900 truncate inline-block max-w-[200px] align-bottom">
          {product.title}
        </span>
      </div>

      <div className="max-w-[1500px] mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Product Image Gallery */}
        <div className="md:col-span-5 flex justify-center sticky top-24 self-start">
          <div className="p-4 w-full flex justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[500px] object-contain cursor-crosshair"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:col-span-4 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight mb-2">
            {product.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-2 pb-2 border-b border-gray-200">
            <div className="flex items-center text-[#007185] hover:text-[#c7511f] cursor-pointer">
              <span className="font-bold mr-1">{product.rating}</span>
              <div className="flex text-[#ffa41c]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-[#007185] hover:underline cursor-pointer">
              {product.reviewCount} ratings
            </span>
          </div>

          <div className="py-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl text-[#cc0c39] font-light">-{product.discount}%</span>
              <span className="text-3xl font-semibold text-[#0f1111]">
                <span className="text-sm align-super font-normal mr-0.5">₹</span>
                {formatPrice(product.price)}
              </span>
            </div>
            {product.mrp > product.price && (
              <div className="text-sm text-gray-500 mt-1">
                M.R.P.: <span className="line-through">₹{formatPrice(product.mrp)}</span>
              </div>
            )}
            <p className="text-sm mt-1">Inclusive of all taxes</p>
          </div>

          <div className="flex justify-between border-y border-gray-200 py-4 my-4">
            <div className="flex flex-col items-center text-center max-w-[80px]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-[#007185] mb-2">
                <RotateCcw className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#007185]">7 days Replacement</span>
            </div>
            <div className="flex flex-col items-center text-center max-w-[80px]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-[#007185] mb-2">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#007185]">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center max-w-[80px]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-[#007185] mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#007185]">1 Year Warranty</span>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="font-bold text-base mb-2">About this item</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-800">
              {product.description?.split('. ').map((sentence, index) => 
                sentence.trim() ? <li key={index}>{sentence.trim()}</li> : null
              )}
            </ul>
          </div>
        </div>

        {/* Buy Box */}
        <div className="md:col-span-3">
          <div className="border border-gray-300 rounded-lg p-4 sticky top-24 bg-white shadow-sm">
            <div className="text-2xl font-bold mb-3">
              <span className="text-sm align-super font-normal mr-0.5">₹</span>
              {formatPrice(product.price)}
            </div>
            
            <div className="text-sm mb-4">
              <span className="text-[#007185] hover:underline cursor-pointer">FREE delivery</span> 
              <span className="font-bold text-gray-900 block mt-1">{new Date(Date.now() + ((product.id % 4) + 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
            
            <div className="text-lg text-[#007600] font-medium mb-4">
              In stock
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              <div className="flex justify-between mb-1"><span>Ships from</span><span>Amazon</span></div>
              <div className="flex justify-between mb-1"><span>Sold by</span><span className="text-[#007185]">Cocoblu Retail</span></div>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0c14b] border border-[#fcd200] hover:border-[#f2c200] rounded-full py-2 px-4 mb-3 text-sm text-[#111] shadow-sm font-medium transition-all"
            >
              Add to Cart
            </button>
            
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-[#ffa41c] hover:bg-[#fa9917] active:bg-[#f09211] border border-[#ff8f00] hover:border-[#fa8900] rounded-full py-2 px-4 text-sm text-[#111] shadow-sm font-medium transition-all"
            >
              Buy Now
            </button>
            
            <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200">
              <ShieldCheck className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-[#007185] hover:underline cursor-pointer">
                Secure transaction
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
