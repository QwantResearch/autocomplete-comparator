import loadGoogleMapsAPI from 'load-google-maps-api';
import {receiveAutocompleteResponse, receiveAutocompleteError} from './autocomplete';

const mapsapi = loadGoogleMapsAPI({
    key: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ['places'],
    language: 'fr'
});

export default function requestGooglePlaces(term) {
    return dispatch => {
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
    }
};
