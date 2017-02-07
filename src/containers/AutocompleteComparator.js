import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Autocomplete from '../components/Autocomplete'
import Search from '../components/Search'
import powered_by_google from '../components/powered_by_google_on_white.png';

class AutocompleteComparator extends Component {
    render() {
        return (
            <div className="autocomplete col-md-9 offset-md-3 col-lg-10 offset-lg-2 pt-3">
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
                        <Autocomplete title="Bragi" {...this.props.bragi} />
                    </div>
                    <div className="col-md-3">
                        <Autocomplete title="Kraken" {...this.props.kraken} />
                    </div>
                    <div className="col-md-3">
                        <Autocomplete title="adresse.data.gouv.fr" {...this.props.ban} />
                    </div>
                    <div className="col-md-3">
                        <Autocomplete title="Google Places" {...this.props.google}>
                            <img src={powered_by_google} alt="Logo" />
                        </Autocomplete>
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
