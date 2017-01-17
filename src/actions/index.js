export const RECEIVE_AUTOCOMPLETE_RESPONSE = 'RECEIVE_AUTOCOMPLETE_RESPONSE';
export const RECEIVE_AUTOCOMPLETE_ERROR = 'RECEIVE_AUTOCOMPLETE_ERROR';

import axios from 'axios';

const receiveAutocompleteResponse = (autocomplete_name, labels) => {
    return {
        type: RECEIVE_AUTOCOMPLETE_RESPONSE,
        labels,
        autocomplete: autocomplete_name
    }
}

const receiveAutocompleteError= (autocomplete_name, error_message) => {
    return {
        type: RECEIVE_AUTOCOMPLETE_ERROR,
        error: error_message,
        autocomplete: autocomplete_name
    }
}

const requestBragi = (term) => dispatch => {
    return axios.get(`${process.env.REACT_APP_BRAGI_HOST}/autocomplete`, {
        params: {
            q: term,
        }
    })
    .then(response => {
        dispatch(receiveAutocompleteResponse(
            'bragi',
            response.data.features.map(feature => feature.properties.geocoding.label))
        );
    })
    .catch(error => {
        dispatch(receiveAutocompleteError('bragi', error.message));
    });
};

const requestKraken = (term) => dispatch => {
    return axios.get(`${process.env.REACT_APP_NAVITIA_HOST}`, {
        params: {
            q: term,
        },
        headers: {
            'Authorization': process.env.REACT_APP_NAVITA_TOKEN
        }
    })
    .then(response => {
        const labels = response.data.hasOwnProperty("places")
            ? response.data.places.map(place => place.name)
            : [];

        dispatch(receiveAutocompleteResponse(
            'kraken',
            labels
        ));
    })
    .catch(error => {
        dispatch(receiveAutocompleteError('kraken', error.message));
    });
};

export const requestAutocompletes = (term = null) => {
    const thunk = dispatch => Promise.all([
        dispatch(requestBragi(term)),
        dispatch(requestKraken(term)),
    ]);

    thunk.meta = {
        debounce: {
            time: 500,
            key: 'request-autocompletes-action'
        }
    };

    return thunk;
}
