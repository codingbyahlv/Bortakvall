import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./assets/scss/App.scss";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Gelatinfri from "./pages/Gelatinfri";
import Palmoljefri from "./pages/Palmoljefri";
import Vegansk from "./pages/Vegansk";
import Nyhet from "./pages/Nyhet";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/gelatinfri" element={<Gelatinfri />} />
        <Route path="/palmoljefri" element={<Palmoljefri />} />
        <Route path="/vegansk" element={<Vegansk />} />
        <Route path="/nyhet" element={<Nyhet />} />
      </Routes>
    </>
  );
};

export default App;
