export const RECEIVE_AUTOCOMPLETE_RESPONSE = 'RECEIVE_AUTOCOMPLETE_RESPONSE';
export const RECEIVE_AUTOCOMPLETE_ERROR = 'RECEIVE_AUTOCOMPLETE_ERROR';

import axios from 'axios';
import loadGoogleMapsAPI from 'load-google-maps-api';

const mapsapi = loadGoogleMapsAPI({
    key: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ['places'],
    language: 'fr'
});

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

const sendRequestGooglePlaces = (term, autocomplete, successCallback) => dispatch => {
    mapsapi
        .then(googleMaps => {
            return new window.google.maps.places.AutocompleteService();
        }).then(autocompleteService => {
            const startTime = new Date().getTime();
            autocompleteService.getPlacePredictions(
                { input: term},
                (predictions, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        dispatch(receiveAutocompleteResponse(
                            'google',
                            predictions.map(prediction => prediction.description),
                            new Date().getTime() - startTime
                        ));
                    } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                        dispatch(receiveAutocompleteResponse(
                            'google',
                            [],
                            0
                        ));
                    } else {
                        dispatch(receiveAutocompleteError('google', status));
                    }
                }
            )
        }).catch((err) => {
            console.error(err);
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
            { q: term },
            'bano',
            response => response.data.features.map(feature => feature.properties.label)
        )),
        dispatch(sendRequestGooglePlaces(term, 'google')),
    ]);

    thunk.meta = {
        debounce: {
            time: 500,
            key: 'request-autocompletes-action'
        }
    };

    return thunk;
}
