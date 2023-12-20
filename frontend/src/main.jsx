import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import Rubricas from './routes/rubricas/Rubricas.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import RubricForm from './routes/rubricas/CrearRubricas.jsx';
import EditarRubrica from './routes/rubricas/EditarRubrica.jsx';
import EvaluarPostulante from './routes/evaluacion/EvaluarPostulante.jsx';
import EvalPosPPublicaion from './routes/evaluacion/EvalPosPPublicaion.jsx';
import EvalPostulante from './routes/evaluacion/EvalPostulante.jsx';
import Postulacion from './routes/postulacion/postulacion.jsx';
import Resultados from './routes/ganadores/Resultados.jsx';
import ResultadoPostulantes from './routes/ganadores/ResultadoPostulantes.jsx';

import Publicaciones from './routes/Publicaciones.jsx'
import PublicacionForm from './routes/AgregarPublicacion.jsx';
import VerPublicaciones from './routes/VerPublicaciones.jsx'
import ModificarPublicacion from './routes/ModificarPublicacion.jsx';

import PublicacionResultado from './routes/publicacion_resultados/PublicacionResultado.jsx';
import PublicacionResultadoForm from './routes/publicacion_resultados/CrearPublicacionResultados.jsx';
import VerPublicacionesResultados from './routes/publicacion_resultados/VerPublicacionesResultados.jsx';
import ModificarPublicacionResultados from './routes/publicacion_resultados/ModificarPublicacionResultados.jsx';

import FormularioPostulacion from './routes/Postulante.routes.jsx';

import VerPostulante from './routes/evaluacion/VerPostulante.jsx';
import PublicacionResultados from './routes/publicacion_resultados/PublicacionResultado.jsx';
import InicioPubliResult from './routes/publicacion_resultados/InicioPubliResult.jsx';
const publicacionesRoutes = [
  {
    path: '/publicaciones/ver',
    element: <VerPublicaciones />,
  },
  {
    path: '/publicacion_resultado/ver',
    element: <VerPublicacionesResultados />,
  }
];

const adminRoutes = [
  {
    path: '/publicaciones/agregar',
    element: <PublicacionForm />,
  },
  {
    path: '/publicacion_resultados/crear',
    element: <PublicacionResultadoForm />,
  },
  {
    path: '/publicaciones/modificar',
    element: <ModificarPublicacion />,
  },
  {
    path: '/publicacion_resultados/modificar',
    element: <ModificarPublicacionResultados />,
  }
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
      },
      {
        path: '/publicaciones/modificar/',
        element: <ModificarPublicacion />,
      },
      {
        path: '/publicacion_resultados/modificar/',
        element: <ModificarPublicacionResultados />,
      },
      {
        path: '/publicaciones/agregar',
        element: <PublicacionForm />,
      },
      {
        path: '/publicacion_resultados/crear/:id',
        element: <PublicacionResultadoForm />,
      },
      {
        path: '/publicaciones/modificar/:id',
        element: <ModificarPublicacion />,
      },
      {
        path: '/publicacion_resultados/modificar/:id',
        element: <ModificarPublicacionResultados />,
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
        path: '/evaluacion/evaluar/:id/:rut',
        element: <EvalPostulante/>,
      },
      {
        path: '/evaluacion/ver-postulante/:rut',
        element: <VerPostulante/>,
      },
      {
        path: '/postulacion',
        element: <FormularioPostulacion/>,
      },
      {
        path: '/resultados',
        element: <Resultados/>,
      },
      {
        path: '/resultados/:id',
        element: <ResultadoPostulantes/>,
      },
      {
        path: '/postulacion/formulario/:id',
        element: <Postulacion/>,
      },
      {
        path: '/publicacion_resultados/PorPublicacion',
        element: <InicioPubliResult/>,
      }
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
    element: <PublicacionResultados />
  },
  {
    path: '/publicaciones/verInvitado',
    element: <VerPublicaciones />,
  },
  {
    path: '/publicacion_resultados/verInvitado',
    element: <VerPublicacionesResultados />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
