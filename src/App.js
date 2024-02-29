import React from 'react';

import './App.css';
import Header from './components/mapsPart/header';
import PersonalMapsPage from './components/mapsPart/personalMapsPage';
import PublicMapsPage from './components/mapsPart/publicMapsPage';
import SignInUpPage from './components/signInUp/signInUpPage';
import UserMapsPage from 'components/mapsPart/userMapsPage';
import UserSettingsPage from 'components/mapsPart/userSettingsPage';
import SingleMapPage from 'components/mapsPart/singleMapPage';
import GraphicEditorHeader from 'components/graphicEditor/graphicEditorHeader';
import GraphicEditorPage from 'components/graphicEditor/graphicEditorPage';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <GraphicEditorHeader />

      <GraphicEditorPage />
    </div>
  );
}

export default App;
