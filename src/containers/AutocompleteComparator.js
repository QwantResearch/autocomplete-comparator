import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Autocomplete from '../components/Autocomplete'
import Search from '../components/Search'

class AutocompleteComparator extends Component {
    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Search onTermChange={this.props.actions.requestAutocompletes} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <Autocomplete
                        title="Bragi"
                        labels={this.props.bragi.labels}
                        error={this.props.bragi.error} />
                </div>
                <div className="col-md-3">
                    <Autocomplete
                        title="Kraken"
                        labels={this.props.kraken.labels}
                        error={this.props.kraken.error} />
                </div>
                <div className="col-md-3">
                    <Autocomplete
                        title="Bano"
                        labels={this.props.bano.labels}
                        error={this.props.bano.error} />
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
