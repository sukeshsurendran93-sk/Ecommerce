import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import ProductListing from "./pages/Admin/Index"
import { useSelector } from "react-redux"
import AddProduct from "./pages/Admin/AddProduct"
import EditProduct from "./pages/Admin/EditProduct"

function App() {
  const { token, role } = useSelector((state) => state.auth)
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/" element={token && role === "admin" ? <ProductListing /> : <Products />} />
        {role === "admin" && <Route path="/add-product" element={<AddProduct />} />}
        {role === "admin" && <Route path="/edit-product/:id" element={<EditProduct />} />}
      </Routes>
    </div>
  )
}

export default App
