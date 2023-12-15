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
    <form onSubmit={handleSubmit(onSubmit)}>
      Email
      <input
        title='Correo'
        name="email"
        type="email"
        {...register('email', { required: true })}
      />
      Password
      <input
        type="password"
        name="password"
        {...register('password', { required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
      <button onClick={() => navigate('/publicaciones/ver')}>Ingresar como Visitante</button>
      {/* Mostrar las publicaciones */}
      <div>
      </div>
    </form>
  );
}

export default LoginForm;
