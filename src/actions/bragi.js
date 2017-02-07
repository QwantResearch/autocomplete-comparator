import sendRequest from './autocomplete';

const successCallback = (response) => {
    return response.features.map(feature => {
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
    });
}

const errorCallback = (error) => error.long;

export default function requestBragi(term) {
    return (dispatch, getState) => {
        return dispatch(sendRequest(
            `${getState().bragi.inputs.bragi_host}/autocomplete`,
            { q: term},
            'bragi',
            successCallback,
            errorCallback,
        ));
    }
}
