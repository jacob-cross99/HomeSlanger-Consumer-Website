import React, { Component } from 'react';
import axios, { setToken, setProfile } from '../../auth';

import './styles.css';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.register = this.register.bind(this);
  }

  update(prop, e) {
    this.setState({ [prop]: e.target.value });
  }

  register() {
    this.setState({ loading: true });

    axios().post('auth/register', this.state).then(resp => {
      const { data } = resp;

      if(data.error) {
        this.setState({ loading: false });
        return alert(data.error.message);
      }

      setToken(data.token);
      setProfile(data.user);
      this.props.history.push('/');
      this.setState({ loading: false });
    }).catch(err => {
      this.setState({ loading: false });
      alert('Failed to connect with server... Please try again');
    });
  }

  render() {
    const button = () => {
      if(this.state.loading)
        return (
          <button className="btn btn-primary btn-block" disabled>
            <i className="fa fa-spinner fa-pulse"></i>
          </button>
        );

      return (
        <button className="btn btn-primary btn-block" onClick={ this.register }>
          Register
        </button>
      );
    };

    return (
      <div className="register">
        <div className="form">
          <h2>Register</h2>

          <input className="form-control" type="text" placeholder="Full name" onChange={ e => this.update('fullName', e) } />
          <input className="form-control" type="tel" placeholder="Phone number" onChange={ e => this.update('phoneNumber', e) } />
          <input className="form-control" type="email" placeholder="Email address" onChange={ e => this.update('email', e) } />
          <input className="form-control" type="password" placeholder="Password" onChange={ e => this.update('password', e) } />

          { button() }
        </div>
      </div>
    );
  }
}
