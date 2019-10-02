import React from 'react';
export default class Greet extends React.Component {
    render() {
        const message = this.props.name ? `, ${this.props.name}!` : ' !!!';
        return <h1>Hello there{message}</h1>;
    }
}