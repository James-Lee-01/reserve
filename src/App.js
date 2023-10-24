import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useRef, useEffect } from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage'
import WelcomePage from './pages/WelcomePage/WelcomePage';
import FeaturePage from './pages/FeaturePage/FeaturePage';
import LinkPage from './pages/LinkPage/LinkPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FooterPage from './pages/FooterPage/FooterPage';
import BrowsePage from './pages/BrowsePage/BrowsePage';
import SingleCafePage from './pages/SingleCafePage/SingleCafePage'

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='*' element={
        <>
          <Navbar/>
          <HomePage/>
          <WelcomePage/>
          <FeaturePage/>
          <LinkPage/>
          <LoginPage/>
          <FooterPage/>
        </>
        }/>
        <Route path='browse/all' element={
          <BrowsePage/>
        }/>
        <Route path='browse/single/cafe/:id' element={
          <SingleCafePage/>
        }/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
