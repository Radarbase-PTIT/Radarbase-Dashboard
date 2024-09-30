import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import AssignECG from './modules/AssignECG/AssignECG'
import CreateMedicalTest from './modules/MedicalTest/CreateMedicalTest.jsx';
import EditMedicalTest from './modules/MedicalTest/EditMedicalTest.jsx';
import Login from './modules/Login/Login'
import MustAuth from './middlewares/MustAuth';
import { StrictMode } from 'react'
import ViewDetailMedicalTest from './modules/MedicalTest/ViewDetailMedicalTest';
import { createRoot } from 'react-dom/client'
import routes from './routes/index.js'

const router = createBrowserRouter([
  {
    path: routes.browser.login,
    element: <Login />
  },
  {
    path: '/',
    element: <MustAuth />,
    children: [
      {
        path: routes.browser.medicalTest.viewDetail,
        element: <ViewDetailMedicalTest />
      },
      {
        path: routes.browser.medicalTest.create,
        element: <CreateMedicalTest />
      },
      {
        path: routes.browser.medicalTest.edit,
        element: <EditMedicalTest />
      },
      {
        path: routes.browser.home,
        index: true,
        element: <AssignECG />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
