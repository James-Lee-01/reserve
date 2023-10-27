import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import BrowsePage from './pages/BrowsePage/BrowsePage';
import SingleCafePage from './pages/SingleCafePage/SingleCafePage'
import LandingPage from './pages/LandingPage/LandingPage';
import AccountPage from './pages/AccountPage/AccountPage';
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
        <Route path='account' element={
          <AccountPage/>
        }/>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
