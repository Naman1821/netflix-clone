// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
    const { user } = useAuth();

    // If no user, redirect to /login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If logged in, show the children
    return children;
}

export default PrivateRoute;
