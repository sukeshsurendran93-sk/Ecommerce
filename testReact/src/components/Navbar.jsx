import { FaCartShopping, FaUser } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slice/authSlice"
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <nav className="bg-black/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-9xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-3xl tracking-tighter">E</span>
                    </div>
                    <h1
                        className="text-4xl font-black tracking-tighter bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        E-Shop
                    </h1>
                </div>

                <div className="flex items-center gap-8 text-lg">

                    {localStorage.getItem("token") ? (
                        <>
                            <Link to="/" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
                                <FaCartShopping /> Cart
                            </Link>
                            <button onClick={handleLogout} className="px-8 py-3 bg-red-600 text-white font-semibold rounded-3xl hover:bg-red-700 hover:text-white transition-all duration-300 flex items-center gap-2">
                                <FaUser /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="px-8 py-3 bg-white text-black font-semibold rounded-3xl hover:bg-violet-500 hover:text-white transition-all duration-300 flex items-center gap-2">
                            <FaUser /> Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar