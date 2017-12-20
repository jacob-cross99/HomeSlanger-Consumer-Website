import React, { Component } from 'react';
import PropTypes from 'prop-types';

import robot from '../../images/robot.png';

export default class Message extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text']).isRequired,
    sent: PropTypes.bool.isRequired,
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  renderText() {
    if(this.props.type !== 'text')
      return;

    return (
      <div className="text">
        { this.props.text }
      </div>
    );
  }

  render() {
    return (
      <div className={`message ${ this.props.sent ? 'sent':'received' }`}>
        <div className="avatar" style={{ backgroundImage: `url(${ robot })` }}></div>
        { this.renderText() }
      </div>
    );
  }
}
