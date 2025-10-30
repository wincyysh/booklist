/*
 * @fileoverview Main App component with routing
 * @author Yingshi Huang <wincyysh@gmail.com>
 * @version 2.0.0
 * @license MIT
 */
import { lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const HomePage = lazy(()=>import('./pages/HomePage'));
const SearchPage = lazy(()=>import('./pages/SearchPage'));
const ReadingListPage = lazy(()=>import('./pages/ReadingListPage'));
const AboutPage = lazy(()=>import('./pages/AboutPage'));
const PageNotFound = lazy(()=>import('./pages/PageNotFound'));
const AddYourOwnRecommendation = lazy(()=>import('./pages/AddYourOwnRecommendation'));


const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const basename = process.env.NODE_ENV === 'production' ? 'booklist' : '';
  return (
    <Router basename={basename}>
      
        <header id="main-header">
          <div id="icon-text" className={menuOpen ? "open" : ""}>
            <Link to="/">
              <img src="./public/portrait.png" alt="icon" width="90" height="90"/>
              <span>Home</span>
            </Link>            
          </div>
          
          <button id="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

          <div id="nav-links" className={menuOpen ? "open" : ""}>
            <ul>
              <li><Link to="/search">🔍</Link></li>
              <li><Link to="/reading-list">Penguin List</Link></li>
              <li><Link to='/add-your-own-recommendation'>AddYourOwnRecommendation</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </header>

        <main onClick={() => setMenuOpen(false)}>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/search" element={<SearchPage />}/>
            <Route path="/reading-list" element={<ReadingListPage />}/>
            <Route path='/add-your-own-recommendation' element={<AddYourOwnRecommendation/>}/>
            <Route path="/about" element={<AboutPage />}/>
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </main>

    </Router>
  );
};

export default App;