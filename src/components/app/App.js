import React from 'react';
import './App.scss';

import Message from '../message/Message';

function getTimeOfDay() {
  let now = new Date();
  let hours =  now.getHours();
  if (hours >= 5 && hours < 19) return 'nice day';
  if (hours >= 19 && hours < 22) return 'nice evening';
  if (hours >= 22 || hours < 5) return 'good night';
}

const MESSAGES = [
  <span>Hey there <span role="img" aria-label="waving hand">👋</span></span>,
  <span>I'm Xavi</span>,
  <span>I manipulate data and craft things on the web</span>,
  <span>I'm currently looking for a job.<br/>You can contact me at <a href="mailto:velasco.llaurado@gmail.com">velasco.llaurado@gmail.com</a></span>,
  <span><a href="twitter.com/Velah_">twitter.com/Velah_</a><br/><a href="github.com/Velah">github.com/Velah</a><br/><a href="https://www.linkedin.com/in/velasco-llaurado">linkedin.com/in/velasco-llaurado/</a></span>,
  <span>Have a {getTimeOfDay()}</span>,
  <span><span role="img" aria-label="eyes">👀</span> XVL.</span>
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

  renderMessage(timeout=2000) {
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
