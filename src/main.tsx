import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/0_index.css'

/* import routes*/
import App from './routes/1_App.tsx'
import Welcome from './routes/1.1_Welcome.tsx'
import ErrorPage from './routes/0_Error_Page.tsx'
import Assets from './routes/3_Assets.tsx'
import Login from './routes/1.1_Login.tsx'
import Logout from './routes/1.2_Logout.tsx'
import SignUp from './routes/1.3_SignUp.tsx'
import HowItWorks from './routes/4_How_It_Works.tsx'
import About from './routes/5_About.tsx'
import User from './routes/2_User.tsx'
import UserSettings from './routes/2.1_User_Settings.tsx'
import UserAssets from './routes/2.2_User_Assets.tsx'
import UserRequests from './routes/2.3_User_Requests.tsx'
import UserRequestsIncoming from './routes/2.3.1_User_Requests_Incoming.tsx'
import UserRequestsOutgoing from './routes/2.3.2_User_Requests_Outgoing.tsx'
import AssetsDetail from './routes/3.1_Assets_Detail.tsx'
import AssetsNew from './routes/3.2_Assets_New.tsx'

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
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "sign-up",
        element: <SignUp />
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
        path: "asssets",
        element: <Assets />
      },
      {
        path: "assets/:id",
        element: <AssetsDetail />
      },
      {
        path: "assets/new",     // QQ will this route work or collide with assets/:id
        element: <AssetsNew />
      }
    ],
}]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);