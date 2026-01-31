import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import faviconClaro from './assets/logos/icono_favicon_claro.ico?url';

const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
if (link) link.href = faviconClaro;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
