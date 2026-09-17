import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';

import Home from './pages/Home.jsx';
import Books from './pages/Books.jsx';
import Catalogue from './pages/Catalogue.jsx';
import LLR from './pages/LLR.jsx';
import Book from './pages/Book.jsx';
import Audience from './pages/Audience.jsx';
import Insights from './pages/Insights.jsx';
import Article from './pages/Article.jsx';
import Event from './pages/Event.jsx';
import Publish from './pages/Publish.jsx';
import Institutions from './pages/Institutions.jsx';
import Careers from './pages/Careers.jsx';
import Basket from './pages/Basket.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

// A navigation goes to the top of the new page, except when the link carries a
// hash — /contact#feedback has to land on the block it names, and forcing the
// top would make the footer's feedback button look broken.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/ebooks" element={<Books digital />} />
          <Route path="/llr" element={<LLR />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/books/:code" element={<Book />} />
          <Route path="/practice" element={<Audience />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/article/:id" element={<Article />} />
          <Route path="/insights/event/:id" element={<Event />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* URLs this release drops. They existed in the previous build and may
              be bookmarked or indexed, so they redirect rather than quietly
              rendering the home page under the old address. */}
          <Route path="/reports" element={<Navigate to="/llr" replace />} />
          <Route path="/reports/*" element={<Navigate to="/llr" replace />} />
          <Route path="/signin" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
