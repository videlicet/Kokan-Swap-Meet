import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/0_index.css'

/* import routes*/
import App from './routes/1_App.tsx'
import Welcome from './routes/1.1_Welcome.tsx' // TD change numbers
import Assets from './routes/3_Assets.tsx'
import Login from './routes/1.1_Login.tsx'
import Logout from './routes/1.2_Logout.tsx'
import HowItWorks from './routes/4_How_It_Works.tsx'
import About from './routes/5_About.tsx'
import EmailVerfication from './routes/6_Verification.tsx'
import User from './routes/2_User.tsx'
import UserSettings from './routes/2.1_User_Settings.tsx'
import UserAssets from './routes/2.2_User_Assets.tsx'
import UserRequests from './routes/2.3_User_Requests.tsx'
import UserRequestsIncoming from './routes/2.3.1_User_Requests_Incoming.tsx'
import UserRequestsOutgoing from './routes/2.3.2_User_Requests_Outgoing.tsx'
import AssetsDetail from './routes/3.1_Assets_Detail.tsx'
import AssetsNew from './routes/3.2_Assets_New.tsx'

import ErrorPage from './routes/0_Error_Page.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!);

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
      {
        path: "/",
        element: <Welcome />
      },
      {
        path: "how-it-works",
        element: <HowItWorks />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "/email-verification",
        element: <EmailVerfication />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "user/:id",
        element: <User />,
        children: [
          {
            path: "assets",
            element: <UserAssets />
          },
          {
            path: "settings",
            element: <UserSettings />
          },
          {
            path: "requests",
            element: <UserRequests/>,
            children: [
              {
                path: "incoming",
                element: <UserRequestsIncoming />
              },
              {
                path: "outgoing",
                element: <UserRequestsOutgoing />
              }
            ]
          }         
        ]
      },
      {
        path: "assets",
        element: <Assets />
      },
      {
        path: "assets/:id",
        element: <AssetsDetail />
      },
      {
        path: "assets/new",     // QQ will this route work or collide with assets/:id, e.g. if there the param is the asset name and the asset called new
        element: <AssetsNew />
      }
    ],
}]);

root.render(
  //<React.StrictMode> // TD enable after finding workaround for refresh
    <RouterProvider router={router} />
  //</React.StrictMode>
);