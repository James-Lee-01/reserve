import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import HomePage from './pages/HomePage/HomePage'
// import WelcomePage from './pages/WelcomePage/WelcomePage';
// import FeaturePage from './pages/FeaturePage/FeaturePage';
// import LinkPage from './pages/LinkPage/LinkPage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import FooterPage from './pages/FooterPage/FooterPage';
import BrowsePage from './pages/BrowsePage/BrowsePage';
import SingleCafePage from './pages/SingleCafePage/SingleCafePage'

import LandingPage from './pages/LandingPage/LandingPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='*' element={
        <LandingPage/>
        }/>
        
        <Route path='browse/all' element={
          <BrowsePage/>
        }/>
        <Route path='browse/single/cafe/:id' element={
          <SingleCafePage/>
        }/>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
