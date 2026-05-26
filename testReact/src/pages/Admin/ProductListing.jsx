import { useEffect, useState } from "react";

const ProductList = () => {
    // Sample data - replace with Redux/API later
    const [products, setProducts] = useState([
        { id: 1, name: "Wireless Headphones", price: 2499, category: "Electronics", stock: 45, image: "https://via.placeholder.com/50" },
        { id: 2, name: "Smart Watch", price: 3999, category: "Wearable", stock: 23, image: "https://via.placeholder.com/50" },
        { id: 3, name: "Laptop Backpack", price: 1299, category: "Fashion", stock: 67, image: "https://via.placeholder.com/50" },
    ]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-white">All Products</h2>
                <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 rounded-2xl font-semibold hover:brightness-110">
                    + Add New Product
                </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-700">
                                <th className="text-left py-5 px-8 text-zinc-400 font-medium">Image</th>
                                <th className="text-left py-5 px-8 text-zinc-400 font-medium">Product Name</th>
                                <th className="text-left py-5 px-8 text-zinc-400 font-medium">Category</th>
                                <th className="text-left py-5 px-8 text-zinc-400 font-medium">Price</th>
                                <th className="text-left py-5 px-8 text-zinc-400 font-medium">Stock</th>
                                <th className="text-center py-5 px-8 text-zinc-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-zinc-700 hover:bg-zinc-800/50 transition-colors">
                                    <td className="py-5 px-8">
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-2xl" />
                                    </td>
                                    <td className="py-5 px-8 font-medium">{product.name}</td>
                                    <td className="py-5 px-8 text-zinc-400">{product.category}</td>
                                    <td className="py-5 px-8 font-semibold">₹{product.price}</td>
                                    <td className="py-5 px-8">
                                        <span className={`px-4 py-1 rounded-full text-sm ${product.stock > 20 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {product.stock} left
                                        </span>
                                    </td>
                                    <td className="py-5 px-8 text-center">
                                        <button className="text-violet-400 hover:text-violet-500 mr-4">Edit</button>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-400 hover:text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;