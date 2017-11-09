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

export default function requestNavitia(term) {
    return (dispatch, getState) => {
        return dispatch(sendRequest(
            `https://api.navitia.io/v1/places`,
            { q: term},
            'navitia',
            successCallback,
            errorCallback,
            {'Authorization': process.env.REACT_APP_NAVITIA_KEY }
        ));
    }
}
