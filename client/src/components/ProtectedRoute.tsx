import useAuth from "../hooks/useAuth";
import React, {ReactElement, ReactNode} from "react";
import {
    Navigate,
} from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactElement
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute