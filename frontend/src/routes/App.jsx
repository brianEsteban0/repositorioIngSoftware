import { useAuth } from '../context/AuthContext';
import { test } from '../services/auth.service';
import React, { useEffect, useState } from 'react';
import Opciones from '../components/Opciones';

function App() {
  
  const { user } = useAuth();

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Llama a la función test cuando el componente se monta
    const fetchData = async () => {
      try {
        const response = await test();
        setDatos(response);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <h4>Opciones</h4>
      <Opciones />
      <h1>Datos de Publicaciones:</h1>
      <ul>
        {datos.map((item) => (
          <li key={item._id}>{item.titulo}</li>
        ))}
      </ul>
      <h1>Pagina principal</h1>
      <button>Ver Publicaciones</button>
    </>
  );
}

export default App;
