import React from 'react';
import './App.css';
import HomePage from './HomePage';
import TopBar from './TopBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import About from './About';

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/about" exact component={About}></Route>
      </div>
    </Router>
  );
}

export default App;
