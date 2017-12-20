import React, { Component } from 'react';

import open from '../../images/open.svg';
import close from '../../images/close.png';
import robot from '../../images/robot.png';

import Message from '../message';

import './styles.css';

export default class RoboChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      typing: false,
      inputActive: false,
      messages: [],
      quickReplies: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
  }

  handleInput(e) {
    if(e.keyCode === 13 && !e.shiftKey)
      this.sendMessage(e);
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.scroll.scrollTop = this.scroll.scrollHeight;
    });
  }

  sendBotMessage(text) {
    let messages = this.state.messages;

    messages.push({
      type: 'text',
      text,
      sent: false
    });

    this.setState({ messages });
    this.scrollToBottom();
  }

  sendMessage(e) {
    e.preventDefault();

    const message = this.input.textContent;
    if(message && message.length > 0) {
      let messages = this.state.messages;

      messages.push({
        type: 'text',
        text: message,
        sent: true
      });

      this.input.textContent = '';
      this.setState({ messages });
      this.scrollToBottom();

      setTimeout(() => {
        this.setState({ typing: true });

        setTimeout(() => {
          this.setState({ typing: false, quickReplies: ['Yes', 'No'] });
          this.sendBotMessage('The surrounding neighborhood has a very low crime rate compared to the average in Arizona. There was a total of 3 crimes in the last 30 days. Would you like to know more?')
        }, 2500);
      }, 800);
    }
  }

  quickReply(message) {
    let messages = this.state.messages;

    messages.push({
      type: 'text',
      text: message,
      sent: true
    });

    this.setState({ messages, quickReplies: [] });
    this.scrollToBottom();
  }

  renderQuickReplies() {
    return this.state.quickReplies.map(quickReply => {
      return <div className="quick-reply" onClick={ e => this.quickReply(quickReply) }>{ quickReply }</div>;
    });
  }

  renderMessages() {
    return this.state.messages.map((message, index) => {
      return (
        <Message { ...message } key={ index } />
      );
    });
  }

  renderTyping() {
    if(!this.state.typing)
      return;

    return (
      <div className="message received">
        <div className="avatar" style={{ backgroundImage: `url(${ robot })` }}></div>
        <div className="text">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="robochat">
        <div></div>
        <div className={`robochat-fab ${ this.state.open ? 'active':'inactive' }`} onClick={ this.handleClick }>
          <img className="open-icon" src={ open } />
          <img className="close-icon" src={ close } />
        </div>
        <div className={`chat-window ${ !this.state.open ? 'inactive':'active' }`}>

          <div className="header">
            <img className="picture" src={ robot } alt="" />
            <div className="name">
              Robo Realtor
            </div>
            <div className="close" onClick={ this.handleClick }>
              <img src={ close } alt="" />
            </div>
          </div>

          <div className="message-list" ref={ ref => this.scroll = ref }>
            { this.renderMessages() }

            { this.renderTyping() }

            <div className="quick-replies">
              { this.renderQuickReplies() }
            </div>
          </div>

          <form className={`user-input ${ this.state.open ? 'active':'inactive' }`}>
            <div
              role="button"
              tabIndex="0"
              onFocus={ e => this.setState({ inputActive: true }) }
              onBlur={ e => this.setState({ inputActive: false }) }
              ref={ e => this.input = e }
              onKeyDown={ this.handleInput }
              contentEditable="true"
              placeholder="Write a reply..."
              className="text"
            >
            </div>
          </form>

        </div>
      </div>
    );
  }
}
