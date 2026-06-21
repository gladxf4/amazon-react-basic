import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerImages = [
  'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg', // Example Amazon banner 1
  'https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg', // Example Amazon banner 2
  'https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg', // Example Amazon banner 3
  'https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg', // Example Amazon banner 4
];

function HomePage({ products, isLoading, searchQuery, selectedCategory, onAddToCart }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);

  return (
    <div className="flex flex-col items-center mx-auto max-w-[1500px] pb-10 bg-[#e3e6e6]">
      <div className="w-full relative min-h-[500px]">
        {/* Banner Carousel */}
        <div className="relative group">
          <div className="overflow-hidden relative h-[250px] sm:h-[400px] lg:h-[600px] mb-[-100px] sm:mb-[-250px] lg:mb-[-350px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]">
            {bannerImages.map((img, index) => (
              <img
                key={index}
                className={`absolute top-0 left-0 w-full h-full object-cover md:object-top z-[-1] transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                src={img}
                alt={`Banner ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute top-[20%] sm:top-[30%] left-4 p-2 md:p-4 rounded-md focus:outline-none hover:border-2 border-transparent hover:border-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-10 h-10 text-gray-800 bg-white/50 rounded" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-[20%] sm:top-[30%] right-4 p-2 md:p-4 rounded-md focus:outline-none hover:border-2 border-transparent hover:border-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next slide"
          >
            <ChevronRight className="w-10 h-10 text-gray-800 bg-white/50 rounded" />
          </button>
        </div>

        {/* The products will be pulled up over the bottom of the mask */}
        <div className="relative z-10">
          {/* Active Search & Filter Subheader */}
          {(searchQuery || selectedCategory !== 'All') && (
            <div className="mx-2 sm:mx-6 mb-4 z-10 relative">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded shadow-sm border border-gray-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="text-sm sm:text-base text-gray-800 font-medium">
                  {searchQuery ? (
                    <>
                      Showing results for <span className="font-bold text-[#c7511f]">"{searchQuery}"</span>
                    </>
                  ) : (
                    <span>Showing products</span>
                  )}
                  {selectedCategory !== 'All' && (
                    <>
                      {' '}in{' '}
                      <span className="font-semibold text-gray-900 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider inline-block mt-0.5 sm:mt-0">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-semibold bg-gray-50 border px-3 py-1 rounded-md self-end sm:self-auto">
                  {products.length} {products.length === 1 ? 'item' : 'items'} found
                </div>
              </div>
            </div>
          )}

          {/* Loading state skeleton if products haven't loaded */}
          {isLoading && (
            <div className="flex mx-[5px] flex-wrap justify-center px-1 sm:px-4 mt-10">
              {Array(8)
                .fill()
                .map((_, i) => (
                  <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center p-2">
                    <div className="bg-white rounded p-5 w-full max-w-sm flex flex-col animate-pulse h-[400px]">
                      <div className="bg-gray-200 h-[200px] w-full rounded mb-4" />
                      <div className="bg-gray-200 h-4 w-3/4 rounded mb-2" />
                      <div className="bg-gray-200 h-4 w-1/2 rounded mb-4" />
                      <div className="bg-gray-200 h-6 w-1/4 rounded mt-auto" />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Empty state if search returns nothing */}
          {!isLoading && products.length === 0 && (
            <div className="mx-2 sm:mx-6 z-10 relative">
              <div className="flex flex-col items-center justify-center bg-white p-12 sm:p-16 rounded-md shadow-md border border-gray-200 max-w-3xl mx-auto mt-6 text-center">
                <div className="bg-orange-50 p-4 rounded-full text-orange-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No results for {searchQuery ? `"${searchQuery}"` : selectedCategory}</h3>
                <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-6">
                  Try checking your spelling, using more general keywords, or changing the category filter in the dropdown.
                </p>
              </div>
            </div>
          )}

          {/* Dynamic Product Grid */}
          {!isLoading && products.length > 0 && (
            <div className="flex mx-[5px] flex-wrap justify-center px-1 sm:px-4">
              {products.map((product) => (
                <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    mrp={product.mrp}
                    discount={product.discount}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    image={product.image}
                    category={product.category}
                    onAddToCart={() => onAddToCart(product)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
