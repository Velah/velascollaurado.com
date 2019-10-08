import React from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

class Icon extends React.Component {
    render() {
        return (<i className={'Icon ' + this.props.iconStyle + ' fa-' + this.props.icon} style={this.props.style}></i>)
    }
}

Icon.propTypes = {
    iconStyle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    style: PropTypes.object,
}

export default Icon;