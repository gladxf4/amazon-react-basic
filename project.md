# Amazon Clone React Project Analysis

## Overview
This is a front-end e-commerce application (Amazon clone) built using React and Vite. It simulates a premium online shopping experience with product browsing, categorized filtering, searching, a persistent shopping cart, and mock authentication.

## Technology Stack
- **Core:** React 19
- **Routing:** React Router v7 (`react-router-dom`)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Code Quality:** ESLint
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Data Persistence:** Browser `localStorage` (for cart items and login state)

## Directory Structure
- `public/` - Static assets, including local mock images (`/static/img/`).
- `src/` - Application source code.
  - `components/` - Reusable UI components.
    - `Footer.jsx` - The application footer.
    - `Header.jsx` - Top navigation bar featuring the logo, location widget, dynamic search bar, Language selector, Cart button, and User Login state.
    - `ProductCard.jsx` - Card component for displaying individual product details (image, dynamic delivery date, price, rating).
  - `pages/` - Route-level page components.
    - `HomePage.jsx` - Main view displaying the product grid and an auto-rotating Hero Banner Carousel.
    - `CartPage.jsx` - The shopping cart view showing added items, quantities, totals, and checkout flow.
    - `ProductDetailsPage.jsx` - A dedicated page for viewing detailed product information, larger images, and a sticky "Buy Box".
    - `LoginPage.jsx` - Mock authentication page.
  - `App.jsx` - The root component that holds the global state (`products`, `cart`, `isLoggedIn`) and defines the `<Routes>`.
  - `main.jsx` - The entry point rendering the React tree wrapped in `<BrowserRouter>` to the DOM.
  - `index.css` & `App.css` - Global styles, custom animations (`animate-fade-in`, `animate-slide-in`), and Tailwind imports.

## Application Workflow & Architecture

### State Management (`App.jsx`)
The application relies on local component state at the `App` level to manage data across the app:
- **`products`**: An array containing all available products (mixed from API and local mocks).
- **`cart`**: An array of items in the shopping cart. It is initialized from `localStorage` and synced back to `localStorage` whenever it changes.
- **`isLoggedIn`**: A boolean tracking the mock user login state. It persists via `localStorage`. When true, the user is recognized as "Akshat".
- **`searchQuery` & `selectedCategory`**: Filters applied to the product list.
- **`toast`**: Controls the professional "Added to Cart" notification popup.

### Data Fetching
On component mount, `App.jsx` fetches product data from the `fakestoreapi.com/products` API. 
The fetched data is transformed to include localized pricing details (calculating INR base price, random discount, and MRP). It is then combined with hardcoded local mock products to populate the `products` state.

### Core Features
1. **Routing & Navigation:** Uses `react-router-dom` to smoothly navigate between the Home (`/`), Cart (`/cart`), Product Details (`/product/:id`), and Login (`/login`) views.
2. **Dynamic Product Browsing:** The Home page features an animated Hero Carousel. Products are displayed in a responsive grid. Clicking a product takes the user to a detailed view with consistent, dynamic delivery date estimates based on the product ID.
3. **Filtering & Searching:** The `Header` contains a search input and category dropdown. Changing these updates the state in `App.jsx`, immediately filtering the products passed down to the `HomePage`.
4. **Shopping Cart & Checkout:**
   - Users can add items to the cart from the home page or product details page.
   - The cart automatically groups identical products and increments their quantity.
   - The `CartPage` allows users to change quantities, remove items, clear the entire cart, and proceed to a professionally animated "Order Placed" success screen.
5. **Mock Authentication:** Users can click "Sign In" in the header to navigate to a mocked Amazon login page. Entering credentials logs the user in, updating the header to display their name.
6. **Polished UI/UX:** The app features several micro-interactions such as a pop effect on the cart icon, smooth fade-ins for checkouts, and a sliding toast notification for cart additions.
