import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    // Sample Data - Replace with Redux/API later
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products")
            .then((res) => {
                setProducts(res.data)
            })
    }, [])

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");

    // Get unique categories
    // const categories = ["All", ...new Set(products.map(p => p.category))];

    // // Filtered & Searched Products
    // const filteredProducts = useMemo(() => {
    //     return products.filter(product => {
    //         const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    //         const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    //         const matchesStock =
    //             stockFilter === "All" ||
    //             (stockFilter === "In Stock" && product.stock > 20) ||
    //             (stockFilter === "Low Stock" && product.stock <= 20);

    //         return matchesSearch && matchesCategory && matchesStock;
    //     });
    // }, [searchTerm, selectedCategory, stockFilter, products]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            // setProducts(products.filter(p => p.id !== id)); // Uncomment when using state
            console.log(`Deleted product with id: ${id}`);
        }
    };

    return (
        <div className="max-w-9xl mx-auto px-6 pt-10">
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-white">All Products</h2>
                    <Link to="/add-product" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 rounded-2xl font-semibold hover:brightness-110 transition-all flex items-center gap-2">
                        + Add New Product
                    </Link>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 mb-8 flex flex-wrap gap-4 items-center">
                    {/* Search Input */}
                    <div className="flex-1 min-w-[250px]">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="min-w-[180px]">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                        >
                            {/* {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))} */}
                        </select>
                    </div>

                    {/* Stock Filter */}
                    <div className="min-w-[180px]">
                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                        >
                            <option value="All">All Stock</option>
                            <option value="In Stock">In Stock (20+)</option>
                            <option value="Low Stock">Low Stock (≤20)</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden hover:border-violet-500 transition-all duration-300 group"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={import.meta.env.VITE_BASE_URL + product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-4 py-1 text-xs font-medium rounded-2xl 
                                    ${product.stock > 20
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                        {product.stock} left
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-sm text-violet-400 mb-1">{product.category}</div>
                                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="text-2xl font-bold text-white mb-6">
                                    ₹{product.price}
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 py-3 rounded-2xl text-sm font-medium transition-all">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-2xl text-sm font-medium transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 text-xl">
                        No products found matching your criteria.
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default ProductList;