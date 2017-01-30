import React from 'react';

export default function Autocomplete({title, error, labels, request_time}) {
    let requestTime = null;
    if (labels.length > 0) {
        requestTime = <span className="badge badge-info">{request_time} ms</span>;
    }

    return (
        <div>
            <div>
                <h5>{title} {requestTime} </h5>
                { error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
            </div>
            {!error &&
                <ul>{labels.map((label, i) => <li key={i}>{label}</li>)}</ul>}
        </div>
    )
}
