import React from 'react';
import { createRoot } from 'react-dom/client';

import './client/index.css';
import App from './client/App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

// import ReactDOM from 'react-dom';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
