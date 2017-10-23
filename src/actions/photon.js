import sendRequest from './autocomplete';

const getType = (value) => {
    let type;
    if (value === 'city' || value === 'administrative') {
        type = 'city';
    } else if (value === 'house' || value === 'street') {
        type = 'address';
    } else {
        type = value;
    }

    return type;
}

const successCallback = (response) => {
    return response.features.map(feature => {
        const prop = feature.properties;

        let label;
        if (prop.housenumber != null) {
            label = prop.housenumber + " " + prop.street;
        } else {
            label = prop.name;
        }
        if (prop.city != null) {
            label += ', ' + prop.city;
        }
        if (prop.country != null) {
            label += ', ' + prop.country;
        }
        return {
            label: label,
            type: getType(prop.osm_value),
        };
    });
}

const errorCallback = (error) => error.long;

export default function requestPhoton(term) {
    return (dispatch, getState) => {
        return dispatch(sendRequest(
            `https://photon.komoot.de/api`,
            {q: term},
            'photon',
            successCallback,
            errorCallback,
        ));
    }
}
