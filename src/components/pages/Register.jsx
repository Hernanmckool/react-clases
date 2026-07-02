import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const userCredential = await signup(email, password);
            const createdUser = userCredential.user;

            await setDoc(doc(db, "users", createdUser.uid), {
                name,
                email,
                role: "user",
            });

            navigate("/");
        } catch (err) {
            console.error("Error during registration:", err.code);
            if (err.code === "auth/email-already-in-use") {
                setError("Este email ya está registrado.");
            } else if (err.code === "auth/weak-password") {
                setError("La contraseña debe tener al menos 6 caracteres.");
            } else {
                setError("Ocurrió un error al registrarte. Intentá de nuevo.");
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto my-16 px-4">
            <div className="p-10 bg-zinc-900 rounded-2xl text-white border border-zinc-800">
                <h2 className="mb-7 text-3xl font-extrabold text-center">Crear Cuenta</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-zinc-400">Nombre Completo</label>
                        <input
                            className="px-3.5 py-3 border border-zinc-700 rounded-lg bg-zinc-800 text-white focus:outline-none focus:border-white"
                            type="text"
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-zinc-400">Correo electrónico</label>
                        <input
                            className="px-3.5 py-3 border border-zinc-700 rounded-lg bg-zinc-800 text-white focus:outline-none focus:border-white"
                            type="email"
                            placeholder="ejemplo@email.com"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="px-7 py-3.5 rounded-lg bg-white text-zinc-900 font-extrabold uppercase tracking-wide hover:bg-zinc-200"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
