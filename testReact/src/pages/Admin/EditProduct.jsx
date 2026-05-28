import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [existingImage, setExistingImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (res.data) {
                    setProduct(res.data);
                    setExistingImage(res.data.image);

                    setFormData({
                        name: res.data.name || "",
                        price: res.data.price || "",
                        category: res.data.category || "",
                        stock: res.data.stock || "",
                        description: res.data.description || "",
                        image: null,
                    });

                    if (res.data.image) {
                        setImagePreview(`${import.meta.env.VITE_BASE_URL}${res.data.image}`);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
                alert("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5MB");
            return;
        }

        setFormData((prev) => ({ ...prev, image: file }));

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("stock", formData.stock);
            data.append("description", formData.description);

            if (formData.image) {
                data.append("image", formData.image);
            }

            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/products/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.status === 200) {
                alert("Product updated successfully!");
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to update product");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-xl">Loading product details...</div>;
    }

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl p-10">
                    <h2 className="text-4xl font-bold text-center mb-8 text-white">
                        Edit Product
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-4 outline-none text-lg resize-y"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Product Image</label>
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 hover:border-violet-500 rounded-3xl p-8 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-48 h-48 object-cover rounded-2xl mb-4"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">📷</div>
                                    )}
                                    <span className="text-violet-400 font-medium">
                                        {imagePreview ? "Change Image" : "Click to Upload New Image"}
                                    </span>
                                </label>
                            </div>
                            {existingImage && !imagePreview && (
                                <p className="text-xs text-zinc-500 mt-2 text-center">
                                    Current image will be kept if no new image is uploaded.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-2xl font-semibold text-xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isSubmitting ? "Updating Product..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;