import React from 'react';
import logo from '../../assets/night.svg';
import { ILogo } from '../../interfaces/Logo';
export default class LogoNight extends React.Component<ILogo> {
    render() {
        const src = this.props.src || logo;
        return <img src={src} className="App-logo" alt="logo night" />

    }
}