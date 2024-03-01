import React from 'react';

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import './App.css';

import App from './App';
import Header from './components/mapsPart/header';
import PersonalMapsPage from './components/mapsPart/personalMapsPage';
import PublicMapsPage from 'components/mapsPart/publicMapsPage';
import SignInUpPage from './components/signInUp/signInUpPage';
import UserMapsPage from 'components/mapsPart/userMapsPage';
import UserSettingsPage from 'components/mapsPart/userSettingsPage';
import SingleMapPage from 'components/mapsPart/singleMapPage';
import GraphicEditorHeader from 'components/graphicEditor/graphicEditorHeader';
import GraphicEditorPage from 'components/graphicEditor/graphicEditorPage';
import ObjectsLibraryHeader from 'components/objectsLibrary/objectsLibraryHeader';
import MainMapsPart from 'components/mapsPart/mainMapsPart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/maps",
    element: <MainMapsPart />,
    children: [
      {
        path: "public",
        element: <PublicMapsPage />,
      },
      {
        path: "personal",
        element: <PersonalMapsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
