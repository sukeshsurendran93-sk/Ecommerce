import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import ProductFilter from "../components/ProductFilter"
import axios from "axios"

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((res) => {
                console.log(res.data)
                setProducts(res.data)
            })
    }, [])


    const [filter, setFilter] = useState({
        search: "",
        category: "",
        minPrice: "",
        maxPrice: ""
    })

    const filteredProducts = products.filter((product) => {
        const searchMatch = filter.search === "" || product.title.toLowerCase().includes(filter.search.toLowerCase())
        const categoryMatch = filter.category === "" || product.category === filter.category
        const minPriceMatch = filter.minPrice === "" || product.price >= filter.minPrice
        const maxPriceMatch = filter.maxPrice === "" || product.price <= filter.maxPrice
        return searchMatch && categoryMatch && minPriceMatch && maxPriceMatch
    })

    return (
        <>
            <ProductFilter filter={filter} setFilter={setFilter} />
            <div className="max-w-9xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center col-span-full text-zinc-400 text-lg py-20">No products found</div>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default Products