import React from 'react';

import './App.css';
import Header from './components/header';
import PersonalMapsPage from './components/personalMapsPage';
import PublicMapsPage from './components/publicMapsPage';
import SignInUpPage from './components/signInUpPage';
import UserMapsPage from 'components/userMapsPage';
import UserSettingsPage from 'components/userSettingsPage';
import SingleMapPage from 'components/singleMapPage';
import GraphicEditorHeader from 'components/graphicEditorHeader';
import GraphicEditorPage from 'components/graphicEditorPage';

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
