import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Apparel from "./components/Apparel/Apparel";
import ShopProfile from "./components/ShopProfile/ShopProfile";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apparel-man" element={<Apparel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop-profile" element={<ShopProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
