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
import ObjectsLibraryHeader from 'components/objectsLibrary/objectsLibraryHeader';

export default function App() {
  return (
    <div className="App">
      <section className="background-black size-full-vertical-pagePercent flex-col-c-c">
        <h1>Произошла ошибка маршрутизации</h1>
      </section>
    </div>
  );
}