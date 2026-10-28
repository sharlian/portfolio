import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectPage } from './pages/ProjectPage';
import './styles/global.css';
import './styles/shell.css';
import './styles/portfolio.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="portfolio-app">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<CollectionPage />} path="/works" />
          <Route element={<CollectionPage />} path="/works/:slug" />
          <Route element={<ProjectPage />} path="/projects/:slug" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
