/*
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
  
  return (
    <Router basename="booklist">
      <div>
        <div id="begin">
          <h1>The Booklist</h1>
          <p>Timeless, modern inspiration</p>
        </div>
        <button id='menu-button' onClick={()=> setMenuOpen(!menuOpen)} aria-label='nav'>
          <span class="material-symbols-outlined">menu</span>
        </button>
        <nav id='nav-links' className={menuOpen ? 'open' : ''}>
          <ul>
            <li><Link to="/" onClick={()=> setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/search" onClick={()=> setMenuOpen(false)}>Search</Link></li>
            <li><Link to="/reading-list" onClick={()=> setMenuOpen(false)}>Publisher List</Link></li>
            <li><Link to="/add-your-own" onClick={()=> setMenuOpen(false)}>Add Books</Link></li>
            <li><Link to="/about" onClick={()=> setMenuOpen(false)}>About</Link></li>
          </ul>
        </nav>
      </div>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/reading-list" element={<ReadingListPage />}/>
          <Route path="/add-your-own" element={<AddYourOwnRecommendation/>}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </main>
      <footer>© 2025 The Booklist — Designed with love for book readers</footer>
    </Router>
  );
};

export default App;