import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Forgot from "./pages/Forgot";
import ResetPassword from "./pages/ResetPassword";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user?.currentUser);
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={user ? <Home/> : <Navigate replace to="/login" /> } />
          <Route exact path="/products/:category" element={<ProductList/>} />
          <Route exact path="/product/:id" element={<Product/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/success" element={<Success/>} />
          <Route exact path="/login" element={user ? <Navigate replace to="/" /> : <Login/>} />
          <Route exact path="/forgot" element={<Forgot />} />
          <Route exact path="/register" element={user ? <Navigate replace to="/" /> : <Register/>} />
          <Route exact path="/reset/:id" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
