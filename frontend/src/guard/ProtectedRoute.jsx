import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute ({ isAllowed, redirectTo = "/" }) {
    const { loading, user } = useContext(AuthContext);

    // Mientras el Contexto lee el localStorage, no hacemos nada
    if (loading) return <h1>Cargando...</h1>;

    // Si la condición no se cumple (no hay user o no tiene el rol), redirigimos
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    // Si todo está bien, mostramos los componentes hijos (Outlet)
    return <Outlet />;
};

export default ProtectedRoute