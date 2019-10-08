import React from 'react';
import PropTypes from 'prop-types';

import './Message.scss';

var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
}

var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
}

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
        style.width = pxToRem(this.getWidth());
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