import React from 'react';
import Config from './Config';

export default class KrakenConfig extends Config {
    render() {
        return (
            <div>
                <div className="form-group">
                    <input
                        placeholder="Navitia Host"
                        className="form-control"
                        type="text"
                        name="navitia_host"
                        value={this.props.inputs.navitia_host}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Navitia Coverage"
                        className="form-control"
                        type="text"
                        name="navitia_coverage"
                        value={this.props.inputs.navitia_coverage}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Navitia Token"
                        className="form-control"
                        type="text"
                        name="navitia_token"
                        value={this.props.inputs.navitia_token}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
