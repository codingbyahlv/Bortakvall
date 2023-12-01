import { Routes, Route } from "react-router-dom";
import AutoScroll from "./components/AutoScroll";
import Navigation from "./components/Navigation";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Products from "./pages/Products";
import TagProducts from "./pages/TagProducts";
import Checkout from "./pages/Checkout";
import "./assets/scss/App.scss";

const App = () => {
  return (
    <>
      <AutoScroll />
      <ScrollToTopButton />
      <Navigation />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/tags/:id/:name" element={<TagProducts />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
