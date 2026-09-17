import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';

import Home from './pages/Home.jsx';
import Books from './pages/Books.jsx';
import Book from './pages/Book.jsx';
import Reports from './pages/Reports.jsx';
import CaseReader from './pages/CaseReader.jsx';
import Audience from './pages/Audience.jsx';
import Insights from './pages/Insights.jsx';
import Article from './pages/Article.jsx';
import Event from './pages/Event.jsx';
import Publish from './pages/Publish.jsx';
import Institutions from './pages/Institutions.jsx';
import Careers from './pages/Careers.jsx';
import Basket from './pages/Basket.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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
          <Route path="/books/:code" element={<Book />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:caseId" element={<CaseReader />} />
          <Route path="/practice" element={<Audience />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/article/:id" element={<Article />} />
          <Route path="/insights/event/:id" element={<Event />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
