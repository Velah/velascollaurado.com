import React from 'react';

class Emoji extends React.Component {
    render() {
        return (<span className="Emoji" role="img" aria-label={this.props.label}>{this.props.emoji}</span>)
    }
}

export default Emoji;