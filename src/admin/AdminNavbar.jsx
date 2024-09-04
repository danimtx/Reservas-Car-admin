import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import ReactPlayer from 'react-player';
import logo from "..//assets//images//logoauto.png";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleVerPerfil = () => {
    navigate("/ver-perfil");
  };

  return (
    <nav className="client-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/admin/dashboard"> <img src={logo} alt="Foto de perfil" className="user-photo" /> </Link>
        </div>
        <div className="navbar-links">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/reservas">Administrar Reservas</Link>
        </div>
        <div className="navbar-user">
          <img src={`https://localhost:44309/${user?.foto}`} alt="Foto de perfil" className="user-photo" />
          <span onClick={handleVerPerfil} className="user-name">{user?.nombre}</span>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
