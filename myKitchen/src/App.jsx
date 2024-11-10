import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Rezepte from './pages/Rezepte';


function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Startseite</Link> | <Link to="/rezepte">Über Uns</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rezepte" element={<Rezepte />} />
      </Routes>
    </Router>
  );
}

export default App;