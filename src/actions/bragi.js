import sendRequest from './autocomplete';

const getType = (value) => {
    let type;
    if (value === 'public_transport:stop_area') {
        type = 'stop_area';
    } else if (value === 'house' || value === 'street') {
        type = 'address';
    } else {
        type = value;
    }

    return type;
}

const successCallback = (response) => {
    return response.features.map(feature => {
        const geocoding = feature.properties.geocoding;

        return {
            label: geocoding.label,
            type: getType(geocoding.type),
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
