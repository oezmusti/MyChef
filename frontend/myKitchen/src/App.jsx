import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Rezepte from './pages/Rezepte';
import AddRezept from './pages/AddRezept';
import GlobalFeed from './pages/GlobalFeed';
import RezeptDetail from './pages/RezeptDetail'; // Verlinkung zu RezeptDetail
import Search from './pages/Search';

import Register from './pages/Register';
import LogIn from './pages/LogIn';
import EditRezept from './pages/EditRezept';

function App() {

  const rezept = {
    name: 'Hamburger',
    time: '30',
    img: '/uploads/hamburger.jpg',
    kategori: 'Vollkost',
    url: '/user/hamburger',
    isliked: 'false',
  };

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
        <Route path='/details' element={<RezeptDetail />} /* Verlinkung zu RezeptDetail */ />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/serch' element={<Search />} />
        <Route path='/edit-rezept' element={<EditRezept />} /* Verlinkung um Rezepte zu bearbeiten */ />
      </Routes>
    </Router>
  );
}

export default App;