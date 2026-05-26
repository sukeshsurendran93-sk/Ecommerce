import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl p-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <div>
                        <button onClick={() => window.history.back()} className="mb-4 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 outline-none text-lg">Back</button>
                    </div>
                    <div className="md:w-1/2">
                        <img src={product.thumbnail} alt={product.title} className="w-full rounded-2xl" />
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>
                        <p className="text-zinc-400 text-lg mb-4">{product.description}</p>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-2xl font-bold text-emerald-400">${product.price}</span>
                            <span className="text-zinc-400">({product.discountPercentage}% off)</span>
                        </div>
                        {
                            localStorage.getItem("token") ? (
                                <button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-4 rounded-3xl font-semibold hover:brightness-110 transition-all active:scale-95">
                                    Add to Cart
                                </button>
                            ) : (
                                <button onClick={goToLogin} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-4 rounded-3xl font-semibold hover:brightness-110 transition-all active:scale-95">
                                    Login to add to Cart
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails