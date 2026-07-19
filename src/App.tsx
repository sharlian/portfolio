import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { collections, getProject } from './data/projects';
import { LanguageSwitch } from './components/LanguageSwitch';
import { SiteNav } from './components/SiteNav';
import { LanguageProvider } from './i18n/LanguageProvider';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectPage } from './pages/ProjectPage';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <LanguageSwitch />
        <header className="site-header"><SiteNav /></header>
        <Routes><Route element={<HomePage />} path="/" /><Route element={<WorkRoute />} path="/works/:slug" /><Route element={<CollectionPage />} path="/works" /><Route element={<NotFoundPage />} path="*" /></Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

function WorkRoute() {
  const { slug } = useParams();
  if (collections.some((collection) => collection.slug === slug)) return <CollectionPage />;
  if (getProject(slug ?? '')) return <ProjectPage />;
  return <NotFoundPage />;
}
