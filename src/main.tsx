import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './routes/1_App.tsx'
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  /*errorElement: <ErrorPage />,
  children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menus",
        element: <Menu />,
        children: [
          {
            path: ":menuID",
            element: <MenuInfo />,
          },
          {
            path: ":menuID/recipes/:recipeID",
            element: <Recipe />,
          }
        ]
      },
    ],*/
}]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);