// // src/pages/Login.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom"; // ✅ for redirect
// import "./Login.css";

// function Login() {
//     const { user, login } = useAuth();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate(); // ✅ for redirecting after login

//     useEffect(() => {
//         if (user) {
//             navigate("/"); // ✅ if already logged in, go to homepage
//         }
//     }, [user, navigate]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         login(email, password);
//     };

//     return (
//         <div className="login">
//             <div className="login__formContainer">
//                 <h2>Sign In</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="email"
//                         placeholder="Email address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit">Sign In</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const { user, login, loginAsGuest } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [guestName, setGuestName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    const handleGuestLogin = (e) => {
        e.preventDefault();
        if (guestName.trim()) {
            loginAsGuest(guestName.trim());
            navigate("/");
        } else {
            alert("Please enter your name.");
        }
    };

    return (
        <div className="login">
            <div className="login__formContainer">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>

                <hr style={{ margin: "20px 0", opacity: 0.4 }} />

                <form onSubmit={handleGuestLogin}>
                    <input
                        type="text"
                        placeholder="Enter name to continue as Guest"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                    />
                    <button type="submit" className="guest-btn">
                        Continue as Guest
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
