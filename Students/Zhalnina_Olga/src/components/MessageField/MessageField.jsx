import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

import { sendMessage } from '../../store/actions/messages_actions.js';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class MessagesField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUserAnswer: false,
      text: ''
    }
  }

  handleSend = (text, sender) => {
    this.setState({text: ''});
    if (sender == 'Me') {
      this.sendMessage(text, sender);
      this.setState.isUserAnswer = true;
    }
  }

  sendMessage = (text, sender) => {
    let { messages } = this.props;
    let messageId = Object.keys(messages).length + 1;
    this.props.sendMessage(messageId, sender, text);
  }

  handleChange = (evt) => {
    if (evt.keyCode !== 13) this.setState({ text: evt.target.value })
    // evt.keyCode !== 13 ? 
    // this.setState({ text: evt.target.value }) :
    // this.handleSend(evt)
  }

  componentDidUpdate() {
    let { messages } = this.props;
    let messageId = Object.keys(messages).length + 1;
    if (this.state.isUserAnswer) {
      setTimeout(() => {
        this.props.sendMessage(messageId, null, 'cyber answer...');
        this.setState.isUserAnswer = false;
      }, 1000);
    }    
  }

  render() {
    let { messages } = this.props;

    let msgArr = [];

    Object.keys(messages).forEach(key => {
      msgArr.push (<Message 
        text={ messages[key].text } 
        sender={ messages[key].user } 
        key={ key }/>);
    });

    return (<div className="d-flex flex-column w-50">
              <div>
                { msgArr }
              </div>
              <hr/>
              <div className="controls d-flex w-100">
                <input 
                  type="text" 
                  className="w-75"
                  onChange={ this.handleChange }
                  onKeyUp = { this.handleChange }
                  value={ this.state.text }
                />
                <button type="button" onClick={ () => this.handleSend(this.state.text, 'Me') }>Send</button>
              </div>
            </div>)
  }
}
const mapStateToProps = ({ msgReducer }) => ({
  messages: msgReducer.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessagesField);