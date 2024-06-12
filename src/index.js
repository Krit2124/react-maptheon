import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import './App.css';

import App from 'App';
import PersonalMapsPage from './components/mapsPart/personalMapsPage';
import PublicMapsPage from 'components/mapsPart/publicMapsPage';
import SignInUpPage from './components/signInUp/signInUpPage';
import UserMapsPage from 'components/mapsPart/userMapsPage';
import UserSettingsPage from 'components/mapsPart/userSettingsPage';
import SingleMapPage from 'components/mapsPart/singleMapPage';
import MainMapsPart from 'components/mapsPart/mainMapsPart';
import MapCardList from 'components/mapsPart/mapCardList';
import Authorization from 'components/signInUp/authorization';
import Registration from 'components/signInUp/registration';
import MainGraphicEditor from 'components/graphicEditor/mainGraphicEditor';
import ErrorPage from 'errorPage';
import PersonalSingleMapPage from 'components/mapsPart/personalSingleMapPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'maps',
        element: <MainMapsPart />,
        children: [
          {
            path: 'public',
            element: <PublicMapsPage />,
          },
          {
            path: 'personal',
            element: <PersonalMapsPage />,
            children: [
              {
                path: 'yours',
                element: <MapCardList reqCards="personal" />,
              },
              {
                path: 'favourite',
                element: <MapCardList reqCards="favourite" />,
              },
            ],
          },
          {
            path: 'user/:id_user',
            element: <UserMapsPage />,
          },
          {
            path: 'singleMap/:id_map/:id_user',
            element: <SingleMapPage />,
          },
          {
            path: 'personalSingleMap/:id',
            element: <PersonalSingleMapPage />,
          },
          {
            path: 'profileSettings/:id',
            element: <UserSettingsPage />,
          },
        ],
      },
      {
        path: 'sign',
        element: <SignInUpPage />,
        children: [
          {
            path: 'in',
            element: <Authorization />,
          },
          {
            path: 'up',
            element: <Registration />,
          },
        ],
      },
      {
        path: 'editor/:id_map',
        element: <MainGraphicEditor />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();