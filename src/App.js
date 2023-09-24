import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage'
import WelcomePage from './pages/WelcomePage/WelcomePage';
import FeaturePage from './pages/FeaturePage/FeaturePage';
import LinkPage from './pages/LinkPage/LinkPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FooterPage from './pages/FooterPage/FooterPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <HomePage/>
      <WelcomePage/>
      <FeaturePage/>
      <LinkPage/>
      <LoginPage/>
      <FooterPage/>
    </div>
  );
}

export default App;
