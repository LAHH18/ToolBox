// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

function ProtectedRoute({ allowedRoles }) {
  const { loading, isAuthenticated, user } = useAuth();
  
  if (loading) return <h1>Loading...</h1>;

  // Si no está autenticado, redirige al login
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  // Si tiene roles específicos, valida que el usuario pertenezca a ellos
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/error404" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
