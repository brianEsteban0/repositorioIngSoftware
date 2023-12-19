import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Root.css";

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const { user } = useAuth();

  return (
    <div>
    <div className="d-flex justify-content-between align-items-center principal bg-success text-dark bg-opacity-50">
      <div className="titulo">
        <h1 className="display-3 ">Postulacion Concursos Proyectos</h1>
      </div>
      <div className="mailbuton">
        <div className="text-muted">Correo: {user.email}</div>
        <div>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Inicio
          </button>
          <button className="btn btn-dark" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <hr className="custom-border"/>
    </div>
    
    <div className="bg-secondary text-dark bg-opacity-10">
      <Outlet />
    </div>
    
  </div>
  );
}

export default Root;
