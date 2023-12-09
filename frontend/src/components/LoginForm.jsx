import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  const handleGuestLogin = () => {
    // Lógica para ingresar como visitante
    // Los visitantes únicamente pueden ver las publicaciones
    navigate('/guest');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          type="email"
          {...register('email', { required: true })}
        />
        <input
          type="password"
          name="password"
          {...register('password', { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
      
      {/* Botón para ingresar como visitante */}
      <button onClick={handleGuestLogin}>Ingresar como visitante</button>
    </div>
  );
}

export default LoginForm;
