import React from 'react';

export default function Autocomplete({title, error, labels}) {
    return (
        <div>
            <div>
                <h5>{title}</h5>
                { error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
            </div>

            <ul>
                { !error && labels.map((label, i) => <li key={i}>{label}</li>) }
            </ul>
        </div>
    )
}
