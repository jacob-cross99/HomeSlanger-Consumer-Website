import React, { Component } from 'react';

import { getProfile } from '../../auth';

import './styles.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    this.setState({ profile: getProfile() });
  }

  render() {
    return (
      <div className="profile">
        <div className="row">
          <div className="col col-xl-3 offset-xl-5 white-bg">
            <div className="details">
              <img src="http://mhalabs.org/wp-content/uploads/upme/1451456913_brodie.jpg" />
              <div className="name">
                { this.state.profile.fullName }
              </div>
            </div>
            <div className="actions">
              <div className="action">
                <i className="fa fa-lock float-left cool-purple"></i>
                <span className="title">Change Password</span>
                <i className="fa fa-chevron-right float-right"></i>
              </div>

              <div className="grey-line pull-right"></div>

              <div className="action">
                <i className="fa fa-bell float-left cool-red"></i>
                <span className="title">Notification Settings</span>
                <i className="fa fa-chevron-right float-right"></i>
              </div>

              <div className="grey-line pull-right"></div>

              <div className="action">
                <i className="fa fa-question-circle float-left cool-green"></i>
                <span className="title">Help & FAQ</span>
                <i className="fa fa-chevron-right float-right"></i>
              </div>
            </div>
            <button className="btn btn-block btn-default">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
