import './App.css';
import Header from './components/header/header';
import PublicMapsPage from './components/publicMapsPage/publicMapsPage';
import SignInUpPanel from './components/signInUpPanel/signInUpPanel';

function App() {
  return (
    <div className="App">
      <Header />

      {/* <SignInUpPanel /> */}

      <PublicMapsPage />
    </div>
  );
}

export default App;
