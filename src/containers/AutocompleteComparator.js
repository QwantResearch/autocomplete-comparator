import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Autocomplete from '../components/autocomplete/Autocomplete'
import GoogleAutocomplete from '../components/GoogleAutocomplete'
import KrakenAutocomplete from '../components/KrakenAutocomplete'
import Search from '../components/Search'

class AutocompleteComparator extends Component {
    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Search
                        term={this.props.term}
                        onTermChange={this.props.actions.requestAutocompletes}
                        changeSearchTerm={this.props.actions.changeSearchTerm} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <Autocomplete
                        title="Bragi"
                        items={this.props.bragi.items}
                        request_time={this.props.bragi.request_time}
                        error={this.props.bragi.error} />
                </div>
                <div className="col-md-3">
                    <KrakenAutocomplete
                        inputs={this.props.kraken.inputs}
                        handleInputChange={this.props.actions.handleInputChange.bind(null, "kraken")}
                        onTermChange={this.props.actions.requestAutocompletes.bind(null, this.props.term)} >
                        <Autocomplete
                            title="Kraken"
                            items={this.props.kraken.items}
                            request_time={this.props.kraken.request_time}
                            error={this.props.kraken.error} />
                    </KrakenAutocomplete>
                </div>
                <div className="col-md-3">
                    <Autocomplete
                        title="Bano"
                        items={this.props.bano.items}
                        request_time={this.props.bano.request_time}
                        error={this.props.bano.error} />
                </div>
                <div className="col-md-3">
                    <GoogleAutocomplete>
                        <Autocomplete
                            title="Google Places"
                            items={this.props.google.items}
                            request_time={this.props.google.request_time}
                            error={this.props.google.error} />
                    </GoogleAutocomplete>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteComparator);
