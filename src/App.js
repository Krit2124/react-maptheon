import './App.css';
import Header from './components/header';
import PersonalMapsPage from './components/personalMapsPage';
import PublicMapsPage from './components/publicMapsPage';
import SignInUpPanel from './components/signInUpPanel';

function App() {
  return (
    <div className="App">
      <Header />

      {/* <SignInUpPanel /> */}

      <PersonalMapsPage />
    </div>
  );
}

export default App;
