import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { collections, getProject } from './data/projects';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { LanguageProvider } from './i18n/LanguageProvider';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectPage } from './pages/ProjectPage';
import { getDeskMode } from './utils/deskMode';
import './styles/global.css';
import './styles/shell.css';

export default function App({ now = new Date() }: { now?: Date }) {
  const mode = getDeskMode(now);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="portfolio-app" data-mode={mode}>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          <Routes><Route element={<HomePage now={now} />} path="/" /><Route element={<WorkRoute />} path="/works/:slug" /><Route element={<CollectionPage />} path="/works" /><Route element={<NotFoundPage />} path="*" /></Routes>
          <SiteFooter />
        </div>
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
