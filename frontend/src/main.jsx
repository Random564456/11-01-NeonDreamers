import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/index.jsx';
import './index.css'
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Analytics from './pages/Analytics/index.jsx';
import Info from './pages/Info/index.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/analytics' element={<Analytics />}/>
        <Route path='/Info' element={<Info />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
)
