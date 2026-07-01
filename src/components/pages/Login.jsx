import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../styles/pages/AuthForm.module.css";

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
                setError("The credentials entered are incorrect.");
            } else if (err.code === "auth/invalid-email") {
                setError("The email is not valid.");
            } else {
                setError("Unexpected error. Please try again.");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Log In</h2>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        Log In
                    </button>
                    <div>
                        Don't have an account?
                        <Link to="/register" className={styles.link}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
