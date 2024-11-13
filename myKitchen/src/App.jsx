import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Rezepte from './pages/Rezepte';
import AddRezept from './pages/AddRezept';
import GlobalFeed from './pages/GlobalFeed';


function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Startseite</Link> | <Link to="/rezepte">Über Uns</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rezepte" element={<Rezepte />} />
        <Route path="/add-rezept" element={<AddRezept />} />
        <Route path='/global-feed' element={<GlobalFeed />} />
      </Routes>
    </Router>
  );
}

export default App;