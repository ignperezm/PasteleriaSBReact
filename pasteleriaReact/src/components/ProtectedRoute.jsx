import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        //si no hay token, te manda al login
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRoles = decodedToken.roles;

        //si el rol que se pide no lo tiene el usuario
        if (role && !userRoles.includes(role)) {
            //te manda al login o a una página de no autorizado
            return <Navigate to="/login" />;
        }

        //si el token es valido y el rol es correcto, te deja pasar
        return children;

    } catch (error) {
        //si el token es invalido, lo limpia y te manda al login
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
