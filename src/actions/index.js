import * as types from  '../constants/ActionTypes'
import axios from 'axios';
import loadGoogleMapsAPI from 'load-google-maps-api';

const mapsapi = loadGoogleMapsAPI({
    key: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ['places'],
    language: 'fr'
});

const receiveAutocompleteResponse = (autocomplete_name, items, request_time) => {
    return {
        type: types.RECEIVE_AUTOCOMPLETE_RESPONSE,
        items,
        autocomplete: autocomplete_name,
        request_time
    }
}

const receiveAutocompleteError= (autocomplete_name, error_message) => {
    return {
        type: types.RECEIVE_AUTOCOMPLETE_ERROR,
        error: error_message,
        autocomplete: autocomplete_name
    }
}

const sendRequest = (url, params, autocomplete, 
    successCallback, errorCallback = null, headers = {}) => dispatch => {
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
            if (error.response && typeof errorCallback === 'function') {
                dispatch(receiveAutocompleteError(
                    autocomplete,
                    errorCallback(error.response.data)
                ));
            } else {
                dispatch(receiveAutocompleteError(autocomplete, error.message));
            }
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
                            predictions.map(prediction => {
                                return {
                                    label: prediction.description,
                                    type: null
                                };
                            }),
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

export const handleInputChange = (autocomplete_name, name, value) => {
    return {
        type: types.CHANGE_INPUT,
        autocomplete: autocomplete_name,
        name,
        value
    }
}

export const requestAutocompletes = (term = null) => {
    const thunk = (dispatch, getState) => {
        if (getState().term === '') {
            return;
        }
        Promise.all([
            dispatch(sendRequest(
                `${process.env.REACT_APP_BRAGI_HOST}/autocomplete`,
                { q: term},
                'bragi',
                response => response.data.features.map(feature => {
                    let type;
                    const geocoding = feature.properties.geocoding;
                    if (geocoding.type === 'public_transport:stop_area') {
                        type = 'stop_area';
                    } else if (geocoding.type === 'house' || geocoding.type === 'street') {
                        type = 'address';
                    } else {
                        type = geocoding.type;
                    }

                    return {
                        label: feature.properties.geocoding.label,
                        type
                    };
                })
            )),
            dispatch(sendRequest(
                `${getState().kraken.inputs.host}/v1/coverage/${getState().kraken.inputs.coverage}/places`,
                { q: term},
                'kraken',
                response => {
                    if (response.data.hasOwnProperty("places")) {
                        return response.data.places.map(place => {
                            return {
                                label: place.name,
                                type: null
                            };
                        });
                    }

                    return [];
                },
                err => err.message,
                { 'Authorization': getState().kraken.inputs.token }
            )),
            dispatch(sendRequest(
                'http://api-adresse.data.gouv.fr/search',
                { q: term },
                'bano',
                response => response.data.features.map(feature => {
                    return {
                        label: feature.properties.label,
                        type: null
                    };
                })
            )),
            dispatch(sendRequestGooglePlaces(term, 'google')),
        ]);
    }

    thunk.meta = {
        debounce: {
            time: 500,
            key: 'request-autocompletes-action'
        }
    };

    return thunk;
}

export const changeSearchTerm = (term) => {
    return {
        type: types.CHANGE_SEARCH_TERM,
        term
    }
}
