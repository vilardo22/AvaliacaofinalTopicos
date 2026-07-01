import React from 'react';
import { createRoot } from 'react-dom/client'; // Importação alterada para /client
import App from './App';

// Seleciona a div 'root' do seu index.html
const container = document.getElementById('root');

// O "!" diz ao TypeScript que temos certeza de que o elemento existe
const root = createRoot(container!); 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);