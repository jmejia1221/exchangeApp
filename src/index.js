import React from 'react';
import ReactDOM from 'react-dom';

// Global styles
import './globalStyles/styles.scss';

// Pages
import Home from "./pages/Home";

ReactDOM.render(
  <React.StrictMode>
      <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
