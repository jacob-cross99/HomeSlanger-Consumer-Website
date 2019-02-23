import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Match from './views/match'
import Matches from './views/matches'
import Profile from './views/profile'

import './global.css'

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className="container app">
          <Route exact path="/match" component={ Match } />
          <Route exact path="/matches" component={ Matches } />
          <Route exact path="/profiles/:id" component={ Profile } />
        </div>
      </Router>
    )
  }
}

export default App
