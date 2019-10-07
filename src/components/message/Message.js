import React from 'react';
import PropTypes from 'prop-types';

import './Message.scss';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            style: {
                display: 'inline-block',
                width: 'auto'
            }
        }
    }

    render() {
        return (
            <div className="Message" style={this.state.style} ref={this.ref}>
                <span className="Message-text">{this.props.text}</span>
            </div>
        )
    }

    componentDidMount() {
        let style = {...this.state.style};
        style.display = null;
        style.width = (this.getWidth() + 4) + 'px';
        this.setState({style: style});
    }

    getWidth() {
        return this.ref.current.offsetWidth;
    }
}

Message.propTypes = {
    text: PropTypes.any.isRequired
}

export default Message;