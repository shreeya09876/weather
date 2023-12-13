import React from 'react'
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import Saved from './Saved';
import Search from './Search';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  
  return (
    
    <Router>
    <div className="App">
      <div className="container mt-5" > 
      <NavBar></NavBar> 
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved" element={<Saved />} />
        </Routes>

      </div>
      </div>
    </Router>
    
  );
}

export default App;