import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import Parser from 'html-react-parser';

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/Routes";


function App() {

  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
