import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import { getProfile } from '../../auth';

import logo from '../../images/logo.png';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const nav = () => {
      if(!getProfile())
        return (
          <ul className="navbar-nav my-2 my-lg-0">
            <li className="nav-item">
              <NavLink to="/register" className="nav-link" activeClassName="active">
                Register
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/login" className="nav-link" activeClassName="active">
                Login
              </NavLink>
            </li>
          </ul>
        );

      return (
        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item">
            <NavLink to="/favorites" className="nav-link" activeClassName="active">
              Favorites
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/profile" className="nav-link" activeClassName="active">
              Profile
            </NavLink>
          </li>
        </ul>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
        <NavLink to="/">
          <img src={ logo } width="30" height="30" className="ml-5" alt="" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

          </ul>

          { nav() }
        </div>
      </nav>
    );
  }
}
