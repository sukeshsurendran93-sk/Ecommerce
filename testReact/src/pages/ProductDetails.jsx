import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleAddToCart = () => {
        api.post("/cart", { productId: id }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        })
    }

    useEffect(() => {
        api.get(`/products/${id}`).then(response => {
            setProduct(response.data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        })
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden">
                {/* Back Button */}
                <div className="p-6 border-b border-zinc-800">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-lg"
                    >
                        ← Back
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/2 bg-black p-8 flex items-center justify-center">
                        <div className="relative">
                            <img
                                src={import.meta.env.VITE_BASE_URL + product.image}
                                alt={product.name}
                                className="w-full max-h-[520px] object-contain rounded-3xl shadow-2xl"
                            />
                            {product.stock > 0 && (
                                <div className="absolute top-6 right-6 bg-green-500 text-black text-sm font-bold px-5 py-2 rounded-2xl">
                                    IN STOCK
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/2 p-10 lg:p-12 flex flex-col">
                        <div className="text-sm uppercase tracking-widest text-violet-400 mb-2">
                            {product.category}
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-bold text-white">
                                ₹{product.price}
                            </span>
                            {product.stock < 10 && product.stock > 0 && (
                                <span className="text-orange-400 text-sm font-medium">
                                    Only {product.stock} left!
                                </span>
                            )}
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                            {product.description}
                        </p>

                        {/* Action Area */}
                        <div className="mt-auto">
                            {localStorage.getItem("token") ? (
                                <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-3xl font-semibold text-xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/30">
                                    Add to Cart
                                </button>
                            ) : (
                                <button onClick={() => navigate('/login')} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-3xl font-semibold text-xl hover:brightness-110 active:scale-95 transition-all duration-200">
                                    Login
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails