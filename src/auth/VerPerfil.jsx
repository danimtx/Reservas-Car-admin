import React from 'react';
import { useAuth } from '../auth/AuthContext'; // Asegúrate de importar tu contexto de autenticación
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Perfil.css'; // Asegúrate de agregar los estilos

const VerPerfil = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const navigate = useNavigate();

  const handleEditarPerfil = () => {
    navigate("/editar-perfil");
  };

  return (
    <div className="perfil-background">
      <div className="perfil-container">
        <h2 style={{color:"white"}}>Mi Perfil</h2>
        <div className="perfil-photo-container">
          <img
            src={`https://localhost:44309/${user.foto}`}
            alt="Foto de perfil"
            className="perfil-photo-preview"
          />
        </div>
        <div className="perfil-info">
          <div className="input-row">
            <div className="input-group">
              <label>Nombre:</label>
              <p>{user.nombre}</p>
            </div>
            <div className="input-group">
              <label>Apellido:</label>
              <p>{user.apellido}</p>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Usuario:</label>
              <p>{user.user}</p>
            </div>
            <div className="input-group">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Teléfono:</label>
              <p>{user.telefono}</p>
            </div>
            <div className="input-group">
              <label>Dirección:</label>
              <p>{user.direccion}</p>
            </div>
          </div>
        </div>
        <button className="editar-perfil-button" onClick={handleEditarPerfil}>
          Editar Perfil
        </button>
      </div>
    </div>
  );
  
};

export default VerPerfil;
