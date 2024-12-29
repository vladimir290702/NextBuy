import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";

function App() {
  const [items, setItems] = useState([]);
  const value = {};

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000");

      const data = await res.json();

      setItems(data.items);
    };
    fetchData();
  });

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
