import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/thunks/authThunk";

const Register = () => {
    const { role, token, error, isLoading } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            Navigate("/");
        }
    }, [token, Navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!name || !email || !password) {
            setError("Please fill all the fields");
            return;
        }

        dispatch(register({ name, email, password }));
    };

    return (
        <div className="flex-1 flex items-center justify-center px-6 py-10">
            <div className="w-full lg:w-2/3 ">
                <div className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl p-10 relative overflow-hidden">
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-xl">
                            <span className="text-white font-black text-5xl">E</span>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-center mb-3">
                        Create Account
                    </h2>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 text-center py-3 rounded-2xl mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-3xl font-semibold text-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-70"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>

                        <div className="text-center text-zinc-400 pt-2">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-violet-400 font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
