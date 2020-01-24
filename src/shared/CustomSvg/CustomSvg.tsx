import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import './CustomSvg.css';
export default function CustomSvg(props: { src: string, alt: string, click?: Function }) {
    return (
        <IconButton aria-label={props.alt} color="primary" onClick={() => props.click ? props.click() : null}>
            <img src={props.src} className="icon" alt={props.alt} />
        </IconButton >
    );
}