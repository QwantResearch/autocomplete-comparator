import React from 'react';
import powered_by_google from './powered_by_google_on_white.png';

export default function GoogleAutocomplete(props) {
    return (
        <div>
            {props.children}
            <img src={powered_by_google} alt="Logo" />
        </div>
    )
}
