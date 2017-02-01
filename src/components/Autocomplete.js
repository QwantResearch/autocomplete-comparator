import React from 'react';

export default function Autocomplete({title, error, labels, request_time}) {
    let requestTime = null;
    if (labels.length > 0) {
        requestTime = <div className="badge badge-info rounded-0">{request_time} ms</div>;
    }

    return (
        <div className="card">
            <div className="card-header">{title}</div>
            {requestTime}
            { error &&
                <div className="card-block card-inverse card-danger">
                    {error}
                </div>}
            {!error &&
                    <ul className="list-group list-group-flush">{labels.map((label, i) => <li className="list-group-item" key={i}>{label}</li>)}</ul>}
        </div>
    )
}
