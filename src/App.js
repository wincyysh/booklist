/*
 * @author Yingshi Huang <wincyysh@gmail.com>
 * @version 2.0.0
 * @license MIT
 */
import { lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const HomePage = lazy(()=>import('./pages/HomePage'));
const SearchPage = lazy(()=>import('./pages/SearchPage'));
const ReadingListPage = lazy(()=>import('./pages/ReadingListPage'));
const AboutPage = lazy(()=>import('./pages/AboutPage'));
const PageNotFound = lazy(()=>import('./pages/PageNotFound'));
const AddYourOwnRecommendation = lazy(()=>import('./pages/AddYourOwnRecommendation'));

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    document.body.classList.remove("menu-open");
  }, []);

  return (
    <Router basename="booklist">

      <div id="begin">      
        <button id='menu-button' onClick={
          ()=> {
            const newState = !menuOpen;
            setMenuOpen(newState);
            if(newState) {
              document.body.classList.add("menu-open");
            }else {
              document.body.classList.remove("menu-open");
            }
          }
        } aria-label='nav'>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div id='title-block'>
          <h1>The Booklist</h1>
          <p>Timeless, modern inspiration</p>
        </div>
      </div>
      <div id='mobile-header' className={menuOpen ? 'open' : ''}>
        <nav id='nav-links' >
          <ul>
            <li><Link to="/" onClick={()=> {
              setMenuOpen(false);
              document.body.classList.remove("menu-open");
            }}>Home</Link></li>
            <li><Link to="/search" onClick={()=> {
              setMenuOpen(false);
              document.body.classList.remove("menu-open");
            }}>Search</Link></li>
            <li><Link to="/reading-list" onClick={()=> {
              setMenuOpen(false);
              document.body.classList.remove("menu-open");
            }}>Publisher List</Link></li>
            <li><Link to="/add-your-own" onClick={()=> {
              setMenuOpen(false);
              document.body.classList.remove("menu-open");
            }}>Add Books</Link></li>
            <li><Link to="/about" onClick={()=> {
              setMenuOpen(false);
              document.body.classList.remove("menu-open");
            }}>About</Link></li>
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
      <section id="quote">
        <p>“A reader lives a thousand lives before he dies. The man who never reads lives only one.”</p>
      </section>
      <footer>© 2025 The Booklist — Designed with love for book readers</footer>
    </Router>
  );
};

export default App;