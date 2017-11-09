import sendRequest from './autocomplete';

const mapping_type = {
    municipality: 'city',
    housenumber: 'address',
    street: 'address',
    locality: 'poi',
};

const successCallback = (response) => {
    return response.features.map(feature => {
        const properties = feature.properties;

        return {
            label: properties.label,
            type: mapping_type[properties.type]
        };
    });
}

const errorCallback = (error) => error;

export default function requestBan(term) {
    return (dispatch) => {
        return dispatch(sendRequest(
            'http://all.addok.xyz/search',
            { q: term },
            'ban',
            successCallback,
            errorCallback,
        ));
    }
}
