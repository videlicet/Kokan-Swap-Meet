import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/0_index.css'

/* import routes*/
import App from './routes/1_App.tsx'
import Welcome from './routes/1.1_Welcome.tsx'
import Assets from './routes/4_Assets.tsx'
import Login from './routes/1.2_Login.tsx'
import Logout from './routes/1.3_Logout.tsx'
import HowItWorks from './routes/5_How_It_Works.tsx'
import About from './routes/6_About.tsx'
import EmailVerfication from './routes/7_Verification.tsx'
import User from './routes/2_User.tsx'
import UserProfile from './routes/2.1_User_Profile.tsx'
import UserAssets from './routes/2.2_User_Assets.tsx'
import UserRequests from './routes/2.3_User_Requests.tsx'
import UserRequestsIncoming from './routes/2.3.1_User_Requests_Incoming.tsx'
import UserRequestsOutgoing from './routes/2.3.2_User_Requests_Outgoing.tsx'
import Users from './routes/3_Users.tsx'
import UsersAssets from './routes/3.1_User_Assets.tsx'
import AssetsDetail from './routes/4.1_Assets_Detail.tsx'
import AssetsNew from './routes/4.2_Assets_New.tsx'

import ErrorPage from './routes/0_Error_Page.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: 'how-it-works',
        element: <HowItWorks />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '/email-verification',
        element: <EmailVerfication />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: 'me',
        element: <User />,
        children: [
          {
            path: 'assets',
            element: <UserAssets />,
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
          {
            path: 'requests',
            element: <UserRequests />,
            children: [
              {
                path: 'incoming',
                element: <UserRequestsIncoming />,
              },
              {
                path: 'outgoing',
                element: <UserRequestsOutgoing />,
              },
            ],
          },
        ],
      },
      {
        path: 'user/:id',
        element: <Users />,
        children: [
          {
            path: 'assets',
            element: <UsersAssets />,
          },
        ],
      },
      {
        path: 'assets',
        element: <Assets />,
      },
      {
        path: 'assets/:id',
        element: <AssetsDetail />,
      },
      {
        path: 'assets/new',
        element: <AssetsNew />,
      },
    ],
  },
])

root.render(
  //<React.StrictMode> {/* StrictMode is disabled because OAuth authentication fails when the URL authentication code is sent twice to GitHub*/}
  <RouterProvider router={router} />,
  //</React.StrictMode>
)
