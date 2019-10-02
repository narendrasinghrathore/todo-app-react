import React from 'react';
import logo from '../../list.svg';
export default class Logo extends React.Component {
    render() {
        const src = this.props.src || logo;
        return <img src={src} className="App-logo" alt="logo" />

    }
}