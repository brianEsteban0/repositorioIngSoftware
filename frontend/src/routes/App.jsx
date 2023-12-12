import { useAuth } from '../context/AuthContext';
import { test } from '../services/auth.service';
import React, { useEffect, useState } from 'react';

function App() {
  
  const { user } = useAuth();

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Llama a la función test cuando el componente se monta
    const fetchData = async () => {
      try {
        const response = await test();
        // Actualiza el estado con los datos devueltos por la función test
        setDatos(response);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <h1>Pagina principal</h1>
      <h1>Datos de Publicaciones:</h1>
      <ul>
        {datos.map((item) => (
          <li key={item.id}>{item.titulo}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
