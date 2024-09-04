// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import ProtectedRoute from './ProtectedRoute';
import AdminNavbar from './admin/AdminNavbar';
import AdminDashboard from './admin/AdminDashboard';
import EditarVehiculo from './admin/EditarVehiculo';
import VerPerfil from './auth/VerPerfil';
import EditarPerfil from './auth/EditarPerfil';
import AgregarVehiculo from './admin/AgregarVehiculo';
import AdministrarReservas from './admin/AdministrarReservas';
import DetalleReserva from './admin/DetalleReserva';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Rutas protegidas para administradores */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminNavbar />
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/editar-vehiculo/:id" 
            element={
              <ProtectedRoute>
                <AdminNavbar />
                <EditarVehiculo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ver-perfil" 
            element={
              <ProtectedRoute>
                <AdminNavbar />
                <VerPerfil />
              </ProtectedRoute>
            } 
          />

            <Route 
            path="/editar-perfil" 
            element={
              <ProtectedRoute>
                <AdminNavbar />
                <EditarPerfil />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/agregar-vehiculo" 
            element={
              <ProtectedRoute>
                <AdminNavbar />
                <AgregarVehiculo />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/reservas" 
            element={
              <ProtectedRoute>
                <AdminNavbar />
                <AdministrarReservas />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/administrar-reserva/:id" 
            element={
              <ProtectedRoute>
                <AdminNavbar />
                <DetalleReserva />
              </ProtectedRoute>
            } 
          />

          {/* Ruta por defecto redirige al login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
