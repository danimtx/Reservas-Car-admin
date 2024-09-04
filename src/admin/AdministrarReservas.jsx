import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/AdministrarReservas.css';

export const AdministrarReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('https://localhost:44309/api/Reservas');
        const reservasFiltradas = response.data.filter(item => item.reservas.estado === 'Reservado');
        setReservas(reservasFiltradas);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="administrar-reservas-background">
      <div className="administrar-reservas-container">
        <h2>Administrar Reservas</h2>
  
        <div className="reservas-grid">
          {reservas.map((item) => (
            <div key={item.reservas.id} className="reserva-card">
              <img src={`https://localhost:44309/${item.vehiculos.foto}`} alt={item.vehiculos.marca} className="vehiculo-photo" />
              <div className="reserva-info">
                <h3 style={{color:"white"}}>{item.vehiculos.marca} - {item.vehiculos.modelo}</h3>
                <p style={{color:"white"}}>Usuario: {item.usuarios.nombre} {item.usuarios.apellido}</p>
                <p style={{color:"white"}}>Fecha Inicio: {new Date(item.reservas.fechaInicio).toLocaleDateString()}</p>
                <p style={{color:"white"}}>Fecha Fin: {new Date(item.reservas.fechaFin).toLocaleDateString()}</p>
                <Link to={`/admin/administrar-reserva/${item.reservas.id}`} className="administrar-reserva-button">
                  Administrar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default AdministrarReservas;
