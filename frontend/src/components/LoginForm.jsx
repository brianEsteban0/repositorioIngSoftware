import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import { fetchPublicaciones } from '../services/VerPublicaciones.service';

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [publicaciones, setPublicaciones] = useState([]);

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  const obtenerPublicaciones = () => {
    fetchPublicaciones()
      .then((data) => {
        setPublicaciones(data);
      })
      .catch((error) => {
        console.error('Error fetching publications:', error);
      });
  };

  return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
      <form onSubmit={handleSubmit(onSubmit)} className="text-center p-4">
        <h1 className="mb-4">Inicia sesion!</h1>
        
        {/* Resto del formulario */}
        
        <div className="mb-3">
          <input
            placeholder="Correo"
            name="email"
            type="email"
            {...register('email', { required: true })}
            className="form-control"
          />
          {errors.email && <span className="text-danger">Este campo es obligatorio</span>}
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            {...register('password', { required: true })}
            className="form-control"
          />
          {errors.password && <span className="text-danger">Este campo es obligatorio</span>}
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>

        <button
          type="button"
          onClick={() => navigate('/publicaciones/ver')}
          className="btn btn-secondary ms-2"
        >
          Ingresar como Visitante
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
