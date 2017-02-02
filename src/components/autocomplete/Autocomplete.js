import React from 'react';
import './Autocomplete.css';
import classNames from 'classnames';

export default class Autocomplete extends React.PureComponent {
    render() {
        const {title, error, items, request_time} = this.props;

        let requestTime = null;
        if (items.length > 0) {
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
                    <ul className="list-group list-group-flush">
                        {items.map((item, i) => {
                            const liClass = classNames({
                                'list-group-item': true,
                                'type-logo': item.type !== null,
                                [`pic-${item.type}`]: item.type !== null
                            });
                            return <li className={liClass} key={i}>{item.label}</li>
                        })}
                    </ul>}
            </div>
        )
    }
}
