import React from 'react';

export default class Search extends React.PureComponent {
    onInputChange(event) {
        this.props.changeSearchTerm(event.target.value);
        if (event.target.value !== "") {
            this.props.onTermChange(event.target.value);
        }
    }

    componentDidMount() {
        this.textInput.focus();
    }

    render() {
        return (
            <input
                id="search"
                autoComplete="off"
                placeholder="Search for"
                className="form-control form-control-lg"
                type="text"
                value={this.props.term}
                ref={input => this.textInput = input}
                onChange={this.onInputChange.bind(this)} />
        )
    }
}
