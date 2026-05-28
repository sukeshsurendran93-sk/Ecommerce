import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/thunks/productThunks";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product)

    const [filter, setFilter] = useState({
        search: "",
        category: "All",
        minPrice: "",
        maxPrice: ""
    });

    // Fetch products
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Filter logic
    const filteredProducts = products.filter((product) => {
        const searchMatch = !filter.search ||
            product.name.toLowerCase().includes(filter.search.toLowerCase());

        const categoryMatch = filter.category === "All" ||
            product.category === filter.category;

        const minPriceMatch = !filter.minPrice ||
            product.price >= Number(filter.minPrice);

        const maxPriceMatch = !filter.maxPrice ||
            product.price <= Number(filter.maxPrice);

        return searchMatch && categoryMatch && minPriceMatch && maxPriceMatch;
    });

    const categories = ["All", ...new Set(products.map(p => p.category))];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500">Error</h1>
                    <p className="text-xl text-zinc-400 mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ProductFilter filter={filter} setFilter={setFilter} categories={categories} />

            <div className="max-w-9xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full text-center text-zinc-400 text-lg py-20">
                            No products found
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;