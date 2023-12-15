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
import VerPublicaciones from './routes/verPublicaciones.jsx';
import PublicacionForm from './routes/AgregarPublicacion.jsx';
import EditarRubrica from './routes/rubricas/EditarRubrica.jsx';
import EvaluarPostulante from './routes/evaluacion/EvaluarPostulante.jsx';
import EvalPosPPublicaion from './routes/evaluacion/EvalPosPPublicaion.jsx';
import EvalPostulante from './routes/evaluacion/EvalPostulante.jsx';

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
        path: '/publicaciones/agregar',
        element: <PublicacionForm />,
      },
      {
        path: '/publicaciones/modificar',
        element: <modificarPublicaciones />,
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
    path: '/publicaciones/ver',
    element: <VerPublicaciones />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
