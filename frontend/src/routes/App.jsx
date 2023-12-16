import { useAuth } from '../context/AuthContext';
import { test } from '../services/auth.service';
import React, { useEffect, useState } from 'react';
import Opciones from '../components/Opciones';
import './app.css';

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
      <h4 className='subtitle'>Opciones</h4>
      <div className='inicioopciones'> 
        <Opciones />
      </div>
      
    </>
  );
}

export default App;
