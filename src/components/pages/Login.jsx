import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error("REAL FIREBASE ERROR CODE:", err.code);
            if (
                err.code === "auth/invalid-credential" ||
                err.code === "auth/user-not-found" ||
                err.code === "auth/wrong-password"
            ) {
                setError("Las credenciales ingresadas son incorrectas.");
            } else if (err.code === "auth/invalid-email") {
                setError("El email no es válido.");
            } else {
                setError("Error inesperado. Intentá de nuevo.");
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto my-16 px-4">
            <div className="p-10 bg-zinc-900 rounded-2xl text-white border border-zinc-800">
                <h2 className="mb-7 text-3xl font-extrabold text-center">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-zinc-400">Correo electrónico</label>
                        <input
                            className="px-3.5 py-3 border border-zinc-700 rounded-lg bg-zinc-800 text-white focus:outline-none focus:border-white"
                            type="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-zinc-400">Contraseña</label>
                        <input
                            className="px-3.5 py-3 border border-zinc-700 rounded-lg bg-zinc-800 text-white focus:outline-none focus:border-white"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="px-7 py-3.5 rounded-lg bg-white text-zinc-900 font-extrabold uppercase tracking-wide hover:bg-zinc-200"
                    >
                        Iniciar Sesión
                    </button>
                    <div className="text-zinc-400 text-sm">
                        ¿No tenés una cuenta?
                        <Link to="/register" className="text-white font-bold ml-1.5">
                            Registrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
