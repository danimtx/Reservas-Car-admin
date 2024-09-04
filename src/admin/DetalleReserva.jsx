import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/DetalleReserva.css';

export const DetalleReserva = () => {
  const { id } = useParams();
  const [reservaData, setReservaData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`https://localhost:44309/api/Reservas/${id}`);
        setReservaData(response.data);
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };

    fetchReserva();
  }, [id]);

  const handleUpdateReserva = async (estado) => {
    try {
      await axios.put(`https://localhost:44309/api/Reservas/${id}`, {
        ...reservaData.reservas,
        estado: estado
      });
      navigate('/admin/reservas');
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  if (!reservaData) {
    return <div>Cargando...</div>;
  }

  const { reservas, usuarios, vehiculos } = reservaData;

  return (
    <div className="detalle-reserva-background">
      <div className="detalle-reserva-container">
        <h2>Detalle de la Reserva</h2>
        
        <div className="vehiculo-info">
          <img src={`https://localhost:44309/${vehiculos.foto}`} alt={vehiculos.marca} className="vehiculo-photo" />
          <h3>{vehiculos.marca} - {vehiculos.modelo}</h3>
          <p>Especificaciones: {vehiculos.descripcion}</p>
        </div>
        
        <div className="usuario-info">
          <h4>Información del Usuario</h4>
          <p>Nombre: {usuarios.nombre} {usuarios.apellido}</p>
          <p>Email: {usuarios.email}</p>
          <p>Teléfono: {usuarios.telefono}</p>
        </div>
        
        <div className="reserva-actions">
          <button onClick={() => handleUpdateReserva('Cancelado')} className="cancelar-button">Cancelar Reserva</button>
          <button onClick={() => handleUpdateReserva('Comprado for you <3')} className="comprado-button">Marcar como Vendido</button>
        </div>
      </div>
    </div>
  );
  
  
};

export default DetalleReserva;
