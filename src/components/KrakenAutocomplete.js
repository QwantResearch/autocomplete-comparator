import React from 'react';

export default class KrakenAutocomplete extends React.Component {
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.handleInputChange(
            name,
            value
        );
    }

    handleSubmit(event) {
        this.props.onTermChange();

        event.preventDefault();
    }

    render() {
        return (
            <div>
                {this.props.children}
                <form style={{marginTop: "1rem"}} onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input
                            placeholder="Navitia host"
                            className="form-control"
                            type="text"
                            name="host"
                            value={this.props.inputs.host}
                            onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder="Coverage"
                            className="form-control"
                            type="text"
                            name="coverage"
                            value={this.props.inputs.coverage}
                            onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder="Token"
                            className="form-control"
                            type="text"
                            name="token"
                            value={this.props.inputs.token}
                            onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <input className="btn btn-primary" type="submit" value="Update" />
                </form>
            </div>
        );
    }
}
