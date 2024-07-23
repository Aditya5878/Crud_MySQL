
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from "./components/context/ContextProvider";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
    </StrictMode>,
  document.getElementById('root')
)
