import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import KrakenConfig from '../../components/KrakenConfig'
import BragiConfig from '../../components/BragiConfig'
import './AutocompleteConfig.css';

class AutocompleteConfig extends Component {
    handleSubmit(event) {
        this.props.actions.requestAutocompletes(this.props.term);

        event.preventDefault();
    }

    render() {
        return (
            <div className="col-lg-2 col-md-3 bg-faded sidebar">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <dl>
                        <dt>Bragi</dt>
                        <dd>
                            <BragiConfig
                                inputs={this.props.bragi.inputs}
                                handleInputChange={this.props.actions.handleInputChange.bind(null, "bragi")}>
                            </BragiConfig>
                        </dd>

                        <dt>Kraken</dt>
                        <dd>
                            <KrakenConfig
                                inputs={this.props.kraken.inputs}
                                handleInputChange={this.props.actions.handleInputChange.bind(null, "kraken")}>
                            </KrakenConfig>
                        </dd>
                    </dl>
                    <input className="btn btn-primary" type="submit" value="Update" />
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteConfig);
