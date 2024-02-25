import React from 'react';

import './App.css';
import Header from './components/header';
import PersonalMapsPage from './components/personalMapsPage';
import PublicMapsPage from './components/publicMapsPage';
import SignInUpPanel from './components/signInUpPanel';
import UserMapsPage from 'components/userMapsPage';
import UserSettingsPage from 'components/userSettingsPage';

function App() {
  return (
    <div className="App">
      <Header />

      <UserSettingsPage />
    </div>
  );
}

export default App;
