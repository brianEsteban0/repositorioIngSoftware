import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import Rubricas from './routes/rubricas/Rubricas.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import RubricForm from './routes/rubricas/CrearRubricas.jsx';
import Publicaciones from './routes/Publicaciones.jsx'
import ModificarPublicacion from './routes/ModificarPublicacion.jsx';
import VerPublicaciones from './routes/VerPublicaciones.jsx'
import PublicacionForm from './routes/AgregarPublicacion.jsx';
import EditarRubrica from './routes/rubricas/EditarRubrica.jsx';
import EvaluarPostulante from './routes/evaluacion/EvaluarPostulante.jsx';
import EvalPosPPublicaion from './routes/evaluacion/EvalPosPPublicaion.jsx';
import EvalPostulante from './routes/evaluacion/EvalPostulante.jsx';

import PublicacionResultado from './routes/publicacion_resultados/PublicacionResultado.jsx';
import PublicacionResultadoForm from './routes/publicacion_resultados/CrearPublicacionResultados.jsx';
import EditarPublicacionResultados from './routes/publicacion_resultados/EditarPublicacionResultados.jsx';
import VerPublicacionesResultados from './routes/publicacion_resultados/VerPublicacionesResultados.jsx';

import VerPostulante from './routes/evaluacion/VerPostulante.jsx';
const publicacionesRoutes = [
  {
    path: '/publicaciones/ver',
    element: <VerPublicaciones />,
  },
];

const adminRoutes = [
  {
    path: '/publicaciones/agregar',
    element: <PublicacionForm />,
  },
  {
    path: '/publicaciones/modificar',
    element: <ModificarPublicacion />,
  },
  // ... Otras rutas específicas del administrador
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/rubricas',
        element: <Rubricas />,
      },
      {
        path: '/rubricas/generar',
        element: <RubricForm />,
      },
      {
        path: '/publicaciones',
        element: <Publicaciones />,
      },
      {
        path: '/publicaciones/modificar/',
        element: <ModificarPublicacion />,
      },
      {
        path: '/publicaciones/agregar',
        element: <PublicacionForm />,
      },
      {
        path: '/publicaciones/modificar/:id',
        element: <ModificarPublicacion />,
      },
      {
        path: '/rubricas/editar/:id',
        element: <EditarRubrica/>,
      },
      {
        path: '/evaluacion',
        element: <EvaluarPostulante/>,
      },
      {
        path: '/evaluacion/postulantes/:id',
        element: <EvalPosPPublicaion/>,
      },
      {
        path: '/evaluacion/evaluar/:rut',
        element: <EvalPostulante/>,
      },
      {
        path: '/evaluacion/ver-postulante/:rut',
        element: <VerPostulante/>,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/publicaciones',
    element: <Publicaciones />,
  },
  {
    path: '/publicacion_resultados',
    element: <PublicacionResultado />
  },
  {
    path: '/publicaciones/ver',
    element: <VerPublicaciones />,
  },
  {
    path: '/publicacion_resultados/ver',
    element: <VerPublicacionesResultados />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
