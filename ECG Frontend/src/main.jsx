import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import MeasurementList from './modules/Measurements/MeasurementList.jsx'
import Login from './modules/Login/Login'
import MustAuth from './middlewares/MustAuth';
import { StrictMode } from 'react'
import MeasurementDetail from './modules/Measurements/MeasurementDetail.jsx';
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
        path: routes.browser.measurements.viewDetail,
        element: <MeasurementDetail />
      },
      {
        path: routes.browser.home,
        index: true,
        element: <MeasurementList />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
