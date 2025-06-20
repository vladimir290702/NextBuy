import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Apparel from "./components/Apparel/Apparel";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import UserCart from "./components/UserCart/UserCart";
import Checkout from "./components/Checkout/Checkout";
import CreateListing from "./components/CreateListing/CreateListing";
import Dashboard from "./components/Dashboard/Dashboard";
import ShopOrders from "./components/ShopOrders/ShopOrders";
import OtherShops from "./components/OtherShops/OtherShops";
import InitialPage from "./components/CreateShop/InitialPage/InitialPage";
import CreateShop from "./components/CreateShop/CreateShop";
import FavouriteProducts from "./components/FavouriteProducts/FavouriteProducts";
import ReviewOrder from "./components/ReviewOrder/ReviewOrder";
import EditShopProfile from "./components/EditShopProfile/EditShopProfile";
import EditListings from "./components/EditShopListings/EditShopListings";
import VisitShop from "./components/VisitShop/VisitShop";
import ShopMessanger from "./components/ShopMessanger/ShopMessanger";
import UserChat from "./components/UserChat/UserChat";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apparel" element={<Apparel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-shop-initial" element={<InitialPage />} />
          <Route path="/create-shop" element={<CreateShop />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop-orders" element={<ShopOrders />} />
          <Route path="/other-shops" element={<OtherShops />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favourite-products" element={<FavouriteProducts />} />
          <Route path="/review-order" element={<ReviewOrder />} />
          <Route path="/shop/edit-profile" element={<EditShopProfile />} />
          <Route path="/shop/edit-listings" element={<EditListings />} />
          <Route path="/shop/other-shops/:id" element={<VisitShop />} />
          <Route path="/shop-messanger" element={<ShopMessanger />} />
          <Route path="/user-chat" element={<UserChat />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
