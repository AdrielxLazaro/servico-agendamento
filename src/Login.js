import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        if (email === 'admin@admin.com' && senha === 'admin123456') {
            localStorage.setItem("admin", "true");
            navigate("/admin");
        } else {
            alert("Email ou senha incorretos!");
        }
    }

    return (
        <div className="container">
            <h1>Login Admin</h1>

            <form onSubmit={handleLogin}>
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="input"
                    type= "password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button
                    className="button" 
                 type="submit">Entrar
                 </button>
            </form>
        </div>
    );
}
export default Login;