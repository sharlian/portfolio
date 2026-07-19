import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageSwitch } from './components/LanguageSwitch';
import { SiteNav } from './components/SiteNav';
import { LanguageProvider } from './i18n/LanguageProvider';
import { HomePage } from './pages/HomePage';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <LanguageSwitch />
        <header className="site-header"><SiteNav /></header>
        <Routes><Route element={<HomePage />} path="*" /></Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
