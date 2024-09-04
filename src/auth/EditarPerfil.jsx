import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Perfil.css'; 
import { Toaster, toast } from 'sonner'

const EditarPerfil = () => {
  const { user, login } = useAuth(); 
  const [perfil, setPerfil] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    user : user.user,
    password: user.password,
    email: user.email,
    telefono: user.telefono,
    direccion: user.direccion,
    foto: user.foto,
    id_roles : user.id_roles
  });


  const [file, setFile] = useState(null); // Nuevo estado para manejar el archivo de imagen
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Captura el archivo seleccionado

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let nuevaFotoUrl = perfil.foto; 

      // Si el usuario selecciona una nueva foto, súbela
      if (file) {
        const formData = new FormData();
        formData.append("Archivo", file); 

        const response = await axios.post("https://localhost:44309/api/Usuarios/GuardarImagen", formData);
        nuevaFotoUrl = response.data; // Actualiza la URL de la foto con la respuesta del servidor
      }

      // Actualizar los datos del usuario en el backend, con la nueva URL de la foto si es necesario
      const updatedPerfil = { ...perfil, foto: nuevaFotoUrl };
      const response = await axios.put(`https://localhost:44309/api/Usuarios/${user.id}`, updatedPerfil);

      if (response.status === 200) {
        // Actualizar el estado del usuario en el contexto de autenticación
        login({ ...user, ...updatedPerfil });
        toast.success("Perfil actualizado correctamente")
        navigate("/ver-perfil"); // Redirigir de vuelta a ver perfil
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al actualizar el perfil.");
    }
  };

  const handleCancel = () => {
    navigate("/ver-perfil"); // Redirigir de vuelta a ver perfil
  };

  return (
    <div className="perfil-background">
      <div className="editar-perfil-container">
        <h2 style={{color:"white"}}>Editar Perfil</h2>
        <div className="perfil-photo-container">
          <img
            src={file ? URL.createObjectURL(file) : `https://localhost:44309/${perfil.foto}`}
            alt="Foto de perfil"
            className="perfil-photo-preview"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={perfil.nombre} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Apellido:</label>
              <input type="text" name="apellido" value={perfil.apellido} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Usuario:</label>
              <input type="text" name="user" value={perfil.user} disabled />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input type="email" name="email" value={perfil.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Teléfono:</label>
              <input type="tel" name="telefono" value={perfil.telefono} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Dirección:</label>
              <input type="text" name="direccion" value={perfil.direccion} onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <label>Foto de Perfil:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <Toaster position="top-center" richColors/>
          <div className="form-buttons">
            <button type="submit" className="guardar-cambios-button">Guardar Cambios</button>
            <button type="button" onClick={handleCancel} className="cancelar-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default EditarPerfil;
