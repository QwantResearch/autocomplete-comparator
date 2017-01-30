export const RECEIVE_AUTOCOMPLETE_RESPONSE = 'RECEIVE_AUTOCOMPLETE_RESPONSE';
export const RECEIVE_AUTOCOMPLETE_ERROR = 'RECEIVE_AUTOCOMPLETE_ERROR';

import axios from 'axios';

const receiveAutocompleteResponse = (autocomplete_name, labels, request_time) => {
    return {
        type: RECEIVE_AUTOCOMPLETE_RESPONSE,
        labels,
        autocomplete: autocomplete_name,
        request_time
    }
}

const receiveAutocompleteError= (autocomplete_name, error_message) => {
    return {
        type: RECEIVE_AUTOCOMPLETE_ERROR,
        error: error_message,
        autocomplete: autocomplete_name
    }
}

const sendRequest = (url, params, autocomplete, successCallback, headers = {}) => dispatch => {
    const startTime = new Date().getTime();
    return axios.get(url, {params, headers})
        .then(response => {
            dispatch(receiveAutocompleteResponse(
                autocomplete,
                successCallback(response),
                new Date().getTime() - startTime
            ));
        })
        .catch(error => {
            dispatch(receiveAutocompleteError(autocomplete, error.message));
        });
};

export const requestAutocompletes = (term = null) => {
    const thunk = dispatch => Promise.all([
        dispatch(sendRequest(
            `${process.env.REACT_APP_BRAGI_HOST}/autocomplete`,
            { q: term},
            'bragi',
            response => response.data.features.map(feature => feature.properties.geocoding.label)
        )),
        dispatch(sendRequest(
            process.env.REACT_APP_NAVITIA_HOST,
            { q: term},
            'kraken',
            response => {
                return response.data.hasOwnProperty("places")
                    ? response.data.places.map(place => place.name)
                    : [];
            },
            { 'Authorization': process.env.REACT_APP_NAVITA_TOKEN }
        )),
        dispatch(sendRequest(
            'http://api-adresse.data.gouv.fr/search',
            { q: term},
            'bano',
            response => response.data.features.map(feature => feature.properties.label)
        )),
    ]);

    thunk.meta = {
        debounce: {
            time: 500,
            key: 'request-autocompletes-action'
        }
    };

    return thunk;
}
