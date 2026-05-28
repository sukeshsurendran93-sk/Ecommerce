import { FaCartShopping, FaUser, FaTimeline } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slice/authSlice"
import { useState } from "react"

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-black/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-9xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-3xl tracking-tighter">E</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            E-Shop
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-lg">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/cart"
                                    className="flex items-center gap-2 hover:text-violet-400 transition-colors"
                                >
                                    <FaCartShopping className="text-xl" /> Cart
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-3 bg-red-600 text-white font-semibold rounded-3xl hover:bg-red-700 transition-all duration-300 flex items-center gap-2"
                                >
                                    <FaUser /> Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-8 py-3 bg-white text-black font-semibold rounded-3xl hover:bg-violet-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                            >
                                <FaUser /> Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-3xl text-white focus:outline-none"
                    >
                        {isMenuOpen ? <FaTimeline /> : "☰"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-6 py-6 border-t border-zinc-800">
                        <div className="flex flex-col gap-6 text-lg">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to="/cart"
                                        className="flex items-center gap-3 hover:text-violet-400 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaCartShopping className="text-2xl" /> Cart
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <FaUser /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="w-full py-4 bg-white text-black font-semibold rounded-3xl text-center hover:bg-violet-500 hover:text-white transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaUser className="inline mr-2" /> Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;