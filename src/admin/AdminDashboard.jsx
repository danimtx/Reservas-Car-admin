import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/AdminDashboard.css';

export const AdminDashboard = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [filteredVehiculos, setFilteredVehiculos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get('https://localhost:44309/api/Vehiculos');
        setVehiculos(response.data);
        setFilteredVehiculos(response.data); // Inicialmente mostrar todos los vehículos
      } catch (error) {
        console.error("Error al obtener los vehículos:", error);
      }
    };

    fetchVehiculos();
  }, []);

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);
    if (categoria === "Todos") {
      setFilteredVehiculos(vehiculos);
    } else {
      setFilteredVehiculos(vehiculos.filter(vehiculo => vehiculo.categoria === categoria));
    }
  };

  const handleDeleteVehiculo = async (id) => {
    try {
      await axios.delete(`https://localhost:44309/api/Vehiculos/${id}`);
      // Actualizar el estado de vehículos eliminando el que se acaba de borrar
      setVehiculos(prevVehiculos => prevVehiculos.filter(vehiculo => vehiculo.id !== id));
      setFilteredVehiculos(prevVehiculos => prevVehiculos.filter(vehiculo => vehiculo.id !== id));
    } catch (error) {
      console.error("Error al borrar el vehículo:", error);
    }
  };

  return (
    <div className="admin-dashboard-background">
      <div className="admin-dashboard-container">
        <h2>Administrar Vehículos</h2>
  
        <div className="header-actions">
          <Link to="/admin/agregar-vehiculo" className="agregar-vehiculo-button">
            Agregar Nuevo Vehículo
          </Link>
          <select
            className="filtro-categoria"
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
          >
            <option value="Todos">Todos</option>
            <option value="Deportivos">Deportivos</option>
            <option value="4x4">4x4</option>
            <option value="Sedan">Sedan</option>
            <option value="Motos">Motos</option>
          </select>
        </div>
  
        <div className="vehiculos-grid">
          {filteredVehiculos.map((vehiculo) => (
            <div key={vehiculo.id} className="vehiculo-card">
              <img src={`https://localhost:44309/${vehiculo.foto}`} alt={vehiculo.marca} className="vehiculo-photo" />
              <div className="vehiculo-info">
                <h3 style={{color:"white"}}>{vehiculo.marca} {vehiculo.modelo}</h3>
                <p style={{color:"white"}}>{vehiculo.categoria}</p>
                {vehiculo.disponibilidad > 0 ? (
                  <span className="disponible">Disponible ({vehiculo.disponibilidad})</span>
                ) : (
                  <span className="agotado">Agotado</span>
                )}
                <div className="vehiculo-actions">
                  <Link to={`/admin/editar-vehiculo/${vehiculo.id}`} className="editar-vehiculo-button">
                    Editar Vehículo
                  </Link>
                  <button
                    onClick={() => handleDeleteVehiculo(vehiculo.id)}
                    className="borrar-vehiculo-button"
                  >
                    Borrar Vehículo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default AdminDashboard;
