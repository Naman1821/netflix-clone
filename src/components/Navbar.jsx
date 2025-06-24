// import React from "react";
// import "./Navbar.css"; // styling file banayenge

// function Navbar() {
//     return (
//         <div className="navbar">
//             <img
//                 className="logo"
//                 src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
//                 alt="Netflix Logo"
//             />
//             <img
//                 className="avatar"
//                 src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
//                 alt="User Avatar"
//             />
//         </div>
//     );
// }

// export default Navbar;
// import React, { useEffect, useState } from "react";
// import "./Navbar.css";

// function Navbar() {
//     const [show, setShow] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 100) {
//                 setShow(true);
//             } else {
//                 setShow(false);
//             }
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <div className={`navbar ${show && "navbar--black"}`}>
//             <img
//                 className="logo"
//                 src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
//                 alt="Netflix Logo"
//             />
//             <img
//                 className="avatar"
//                 src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
//                 alt="User Avatar"
//             />
//         </div>
//     );
// }

// export default Navbar;
// components/Navbar.jsx
// src/components/Navbar.jsx
// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; // ✅ added
import "./Navbar.css";

function Navbar() {
    const [show, setShow] = useState(false);
    const { user, logout } = useAuth(); // ✅

    useEffect(() => {
        const handleScroll = () => setShow(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`navbar ${show ? "navbar--black" : ""}`}>
            <img
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            <div className="navbar__right">
                {user ? (
                    <>
                        <span className="navbar__user">Hi, {user.email}</span>
                        <button className="navbar__btn" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="navbar__btn">Login</button>
                    </Link>
                )}
                <img
                // className="avatar"(logout k pass symbal dene ke lie ya logo k lie image)
                // src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                // alt="User Avatar"
                />
            </div>
        </div>
    );
}

export default Navbar;
