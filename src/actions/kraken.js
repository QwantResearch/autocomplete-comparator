import sendRequest from './autocomplete'

const successCallback = (response) => {
    if (response.hasOwnProperty("places")) {
        return response.places.map(place => {
            return {
                label: place.name,
                type: place.embedded_type === 'administrative_region' ? 'city' : place.embedded_type
            };
        });
    }

    return [];
}

const errorCallback = (error) => error.message;

export default function requestKraken(term) {
    return (dispatch, getState) => {
        return dispatch(sendRequest(
            `${getState().kraken.inputs.navitia_host}/v1/coverage/${getState().kraken.inputs.navitia_coverage}/places`,
            { q: term},
            'kraken',
            successCallback,
            errorCallback,
            { 'Authorization': getState().kraken.inputs.navitia_token }
        ));
    }
}
