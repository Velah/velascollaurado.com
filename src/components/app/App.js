import React from 'react';
import './App.scss';

import Emoji from '../emoji/Emoji';
import Icon from '../icon/Icon';
import Message from '../message/Message';

function getTimeOfDay() {
  let now = new Date();
  let hours =  now.getHours();
  if (hours >= 5 && hours < 19) return 'nice day';
  if (hours >= 19 && hours < 22) return 'nice evening';
  if (hours >= 22 || hours < 5) return 'good night';
}

const MESSAGES = [
  <span>Hey there <Emoji label="waving hand" emoji="👋"></Emoji></span>,
  <span>I'm Xavi</span>,
  <span>I work with data and craft things on the web</span>,
  <span>I'm currently looking for a job.<br/>You can contact me at <a href="mailto:velasco.llaurado@gmail.com">velasco.llaurado@gmail.com</a></span>,
  <span>
    <Icon style={{color: '#00acee'}} iconStyle="fab" icon="twitter"></Icon> <a href="https://twitter.com/Velah_">/Velah_</a><br/>
    <Icon style={{color: '#6e5494'}} iconStyle="fab" icon="github"></Icon> <a href="https://github.com/Velah">/Velah</a><br/>
    <Icon style={{color: '#0e76a8'}} iconStyle="fab" icon="linkedin-in"></Icon> <a href="https://www.linkedin.com/in/velasco-llaurado">/Velasco-Llaurado</a>
  </span>,
  <span>Have a {getTimeOfDay()}</span>,
  <span><Emoji label="eyes" emoji="👀"></Emoji> XVL.</span>
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.state = {
      renderedMessages: [],
      nextMessage: MESSAGES[0],
      nextIndex: 0
    }
  }
  render() {
    return (
      <div id="App" className="App">
        {this.state.renderedMessages.map((message, index) => {
            return <Message text={message} key={index}></Message>
        })}
      </div>
    );
  }

  componentDidMount() {
    this.renderMessage(0);
  }
  
  componentDidUpdate() {
    this.renderMessage();
  }

  renderMessage(timeout=2600) {
    if (this.state.nextMessage !== '') {
      setTimeout(() => {this.setState({
        renderedMessages: [...this.state.renderedMessages, this.state.nextMessage],
        nextMessage: this.state.nextIndex + 1 < MESSAGES.length ? MESSAGES[this.state.nextIndex + 1] : '',
        nextIndex: this.state.nextIndex + 1
      })}, timeout);
    }
    
  }
}

export default App;
