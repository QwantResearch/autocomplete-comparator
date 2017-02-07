import React from 'react';
import './Autocomplete.css';
import classNames from 'classnames';

class Autocomplete extends React.PureComponent {
    render() {
        const {title, error, items, request_time} = this.props;

        let requestTime = null;
        if (items.length > 0) {
            requestTime = <div className="badge badge-info rounded-0">{request_time} ms</div>;
        }

        return (
            <div>
                <div className="card">
                    <div className="card-header">{title}</div>
                    {requestTime}
                    { error &&
                        <div
                            className="card-block card-inverse card-danger"
                            style={{wordWrap: 'break-word'}}>
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
                {this.props.children}
            </div>
        )
    }
}

Autocomplete.propTypes = {
    children: React.PropTypes.element,
    title: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    request_time: React.PropTypes.number.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
    })).isRequired,
}

export default Autocomplete;
