import React from 'react';

export default class AutocompleteInput extends React.Component {
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.handleInputChange(
            name,
            value
        );
    }
}
