import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "../styles/pages/AuthForm.module.css";

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
                setError("This email is already registered.");
            } else if (err.code === "auth/weak-password") {
                setError("Password must be at least 6 characters.");
            } else {
                setError("An error occurred while registering. Please try again.");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Create Account</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Jane Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="example@email.com"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Minimum 6 characters"
                        />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
