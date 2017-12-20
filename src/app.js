import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './global.css';

import Buy from './views/buy';
import Login from './views/login';
import Profile from './views/profile';
import Properties from './views/properties';
import Property from './views/property';
import Register from './views/register';

import Navbar from './components/navbar';

import './global.css';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Route exact path="/" component={ Buy } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/properties" component={ Properties } />
          <Route path="/properties/:mlsId" component={ Property } />
        </div>
      </Router>
    );
  }
}

export default App;
