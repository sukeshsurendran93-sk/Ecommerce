const ProductFilter = ({ filter, setFilter }) => {
    return (
        <div className="max-w-9xl mx-auto px-6 pt-10">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                    <div className="md:col-span-2">
                        <label className="text-sm text-zinc-400 block mb-2">Search</label>
                        <input type="text" placeholder="Search premium products..." value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 text-lg outline-none" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">Category</label>
                        <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 outline-none">
                            <option value="">All Categories</option>
                            <option value="beauty">Beauty</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="groceries">Groceries</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">Min Price</label>
                        <input type="text" placeholder="₹1000" value={filter.minPrice} onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 outline-none" />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">Max Price</label>
                        <input type="text" placeholder="₹50000" value={filter.maxPrice} onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-3xl px-6 py-5 outline-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductFilter;