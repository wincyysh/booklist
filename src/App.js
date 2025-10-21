/*
 * @fileoverview Main App component with routing
 * @author Yingshi Huang <wincyysh@gmail.com>
 * @version 2.0.0
 * @license MIT
 */
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ReadingListPage from './pages/ReadingListPage';
import BestsellersPage from './pages/BestsellersPage';
import AboutPage from './pages/AboutPage';
import PageNotFound from './pages/PageNotFound';
import AddYourOwnRecommendation from './pages/AddYourOwnRecommendation';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Router>
      
        <header id="main-header">
          <div id="icon-text" className={menuOpen ? "open" : ""}>
            <a href="/">
              <img src="/portrait.png" alt="icon" width="90" height="90"/>
              <span>Home</span>
            </a>            
          </div>
          
          <button id="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

          <div id="nav-links" className={menuOpen ? "open" : ""}>
            <ul>
              <li><a href="/"></a></li>
              <li><a href="/search">🔍</a></li>
              <li><a href="/reading-list">Penguin List</a></li>
              <li><a href="/bestsellers">Bestsellers</a></li>
              <li><a href='/add-your-own-recommendation'>AddYourOwnRecommendation</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
        </header>

        <main onClick={() => setMenuOpen(false)}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/reading-list" element={<ReadingListPage/>}/>
            <Route path="/bestsellers" element={<BestsellersPage/>}/>
            <Route path='/add-your-own-recommendation' element={<AddYourOwnRecommendation/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </main>

    </Router>
  );
};

export default App;