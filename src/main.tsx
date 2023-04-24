import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/0_index.css'

import App from './routes/1_App.tsx'
//import Assets from './routes/3_Assets.tsx'
import Login from './routes/1.1_Login.tsx'
import HowItWorks from './routes/4_How_It_Works.tsx'
import About from './routes/5_About.tsx'
import User from './routes/2_User.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  //errorElement: <ErrorPage />,
  children: [
     /* {
        path: "/",
        element: <Assets />
      },*/
      {
        path: "how-it-works",
        element: <HowItWorks />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "user/:id",
        element: <User />
      },
    ],
}]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


/*
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
 */