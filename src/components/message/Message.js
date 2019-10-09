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
                width: 'auto',
                height: 'auto',
                borderBottomLeftRadius: 0,
            },
            pointsStyle: {
                display: 'none'
            },
            textStyle: {
                display: 'auto'
            }
        }
        this.pointsWidth = '2.25rem';
        this.width = 'auto';
        this.writingSpeed = 50;    // In milliseconds
    }

    render() {
        return (
            <div className="Message" style={this.getStyle()} ref={this.ref}>
                <span className="Message-points" style={this.state.pointsStyle}>···</span>
                <span className="Message-text" style={this.state.textStyle}>{this.props.text}</span>
            </div>
        )
    }

    componentDidMount() {
        let style = {...this.getStyle()};
        let pointsStyle = {...this.state.pointsStyle};
        let textStyle = {...this.state.textStyle};

        this.width = pxToRem(this.getWidth());              // Using display: inline-block to automatically get the best width
        style.display = null;                               // After getting the width, display can return to block
        style.width = this.pointsWidth;                     // Match the three points width
        pointsStyle.display = "block";                      // Show the points
        textStyle.display = "none";                         // Hide the text

        this.setState({style: style, width: this.state.width, pointsStyle: pointsStyle, textStyle: textStyle}, () => {
            let style = {...this.getStyle()};
            let pointsStyle = {...this.state.pointsStyle};
            let textStyle = {...this.state.textStyle};

            style.borderBottomLeftRadius = "1.25rem";       
            style.width = this.width;                       // Match the text width
            pointsStyle.display = "none";                   // Hide the points
            textStyle.display = "block";                    // Display the text

            setTimeout(() => {
                this.setState({style: style}, () => {
                    setTimeout(() => {
                        this.setState({pointsStyle: pointsStyle, textStyle: textStyle});
                    }, 250)                                 // It should match the transition time in the scss
                });
            }, this.getWritingTime());
        });
    }

    getWidth() {
        return this.ref.current.offsetWidth + 13;
    }

    getStyle() {
        let propsStyle = this.props.style ? this.props.style : {};
        return Object.assign(propsStyle, this.state.style);
    }

    getTextLength() {
        let text = this.props.text.props.children;

        if (typeof(text) == 'string') {
            return text.length;
        } else {
            let length = 0;
            text.forEach((element) => {
                let elementLength = element.length;
                if (typeof(elementLength) === 'number') {
                    length += element.length;
                }
            });
            return length;
        }
    }

    getWritingTime() {
        return this.getTextLength() * this.writingSpeed;
    }
}

Message.propTypes = {
    text: PropTypes.any.isRequired
}

export default Message;