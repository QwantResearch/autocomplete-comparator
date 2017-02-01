import React from 'react';

export default class Search extends React.Component {
    onInputChange(event) {
        if (event.target.value !== "") {
            this.props.onTermChange(event.target.value);
        }
    }

    render() {
        return (
            <input
                id="search"
                autoComplete="off"
                placeholder="Search for"
                className="form-control form-control-lg"
                type="text"
                onChange={this.onInputChange.bind(this)} />
        )
    }
}
