import sendRequest from './autocomplete';

const successCallback = (response) => {
    return response.features.map(feature => {
        return {
            label: feature.properties.label,
            type: null
        };
    });
}

const errorCallback = (error) => error;

export default function requestBano(term) {
    return (dispatch) => {
        return dispatch(sendRequest(
            'http://api-adresse.data.gouv.fr/search',
            { q: term },
            'bano',
            successCallback,
            errorCallback,
        ));
    }
}
