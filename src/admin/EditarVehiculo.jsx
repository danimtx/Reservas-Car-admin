import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/Perfil.css'; // Reutilizando estilos del perfil para consistencia
import { Toaster, toast } from 'sonner';

const EditarVehiculo = () => {
  const { id } = useParams(); // Obtener el ID del vehículo de la URL
  const [vehiculo, setVehiculo] = useState({
    marca: '',
    modelo: 0,
    categoria: '',
    gama: '',
    puertas: 0,
    traccion: '',
    capacidadCarga: '',
    cilindrada: '',
    procedencia: '',
    descripcion: '',
    precio: 0,
    color: '',
    disponibilidad: 0,
    foto: ''
  });

  const [file, setFile] = useState(null); // Estado para manejar el archivo de imagen
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const response = await axios.get(`https://localhost:44309/api/Vehiculos/${id}`);
        setVehiculo(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del vehículo:", error);
        toast.error("Hubo un error al cargar los detalles del vehículo.");
      }
    };

    fetchVehiculo();
  }, [id]);

  const handleChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Captura el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let nuevaFotoUrl = vehiculo.foto;

      // Si se selecciona una nueva foto, súbela
      if (file) {
        const formData = new FormData();
        formData.append("Archivo", file); 

        const response = await axios.post("https://localhost:44309/api/Vehiculos/GuardarImagen", formData);
        nuevaFotoUrl = response.data; // Actualiza la URL de la foto con la respuesta del servidor
      }

      // Actualizar los datos del vehículo en el backend
      const updatedVehiculo = { ...vehiculo, foto: nuevaFotoUrl };
      const response = await axios.put(`https://localhost:44309/api/Vehiculos/${id}`, updatedVehiculo);

      if (response.status === 200) {
        toast.success("Vehículo actualizado correctamente");
        navigate("/admin/dashboard"); // Redirigir al dashboard del admin
      }
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
      toast.error("Hubo un error al actualizar el vehículo.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard"); // Redirigir al dashboard del admin
  };

  return (
    <div className="perfil-background">
      <div className="editar-perfil-container">
        <h2 style={{color:"white"}}>Editar Vehículo</h2>
        <div className="perfil-photo-container">
          <img
            src={file ? URL.createObjectURL(file) : `https://localhost:44309/${vehiculo.foto}`}
            alt="Foto del vehículo"
            className="perfil-photo-preview"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>Marca:</label>
              <input type="text" name="marca" value={vehiculo.marca} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Modelo:</label>
              <input type="number" name="modelo" value={vehiculo.modelo} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Categoría:</label>
              <input type="text" name="categoria" value={vehiculo.categoria} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Gama:</label>
              <input type="text" name="gama" value={vehiculo.gama} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Puertas:</label>
              <input type="number" name="puertas" value={vehiculo.puertas} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Tracción:</label>
              <input type="text" name="traccion" value={vehiculo.traccion} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Capacidad de Carga:</label>
              <input type="text" name="capacidadCarga" value={vehiculo.capacidadCarga} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Cilindrada:</label>
              <input type="text" name="cilindrada" value={vehiculo.cilindrada} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Procedencia:</label>
              <input type="text" name="procedencia" value={vehiculo.procedencia} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Descripción:</label>
              <textarea name="descripcion" value={vehiculo.descripcion} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Precio:</label>
              <input type="number" name="precio" value={vehiculo.precio} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Color:</label>
              <input type="text" name="color" value={vehiculo.color} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Disponibilidad:</label>
              <input type="number" name="disponibilidad" value={vehiculo.disponibilidad} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Foto del Vehículo:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
          <Toaster position="top-center" richColors />
          <div className="form-buttons">
            <button type="submit" className="guardar-cambios-button">Guardar Cambios</button>
            <button type="button" onClick={handleCancel} className="cancelar-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarVehiculo;
