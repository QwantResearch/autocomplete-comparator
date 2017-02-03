import React from 'react';
import Config from './Config';

export default class KrakenConfig extends Config {
    render() {
        return (
            <div>
                <div className="form-group">
                    <input
                        placeholder="Host"
                        className="form-control"
                        type="text"
                        name="bragi_host"
                        value={this.props.inputs.bragi_host}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
