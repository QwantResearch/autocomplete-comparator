import sendRequest from './autocomplete';

const getType = (value) => {
    let type;
    if (value === 'region' || value === 'locality' || value === 'county') {
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
        return {label: 'bob', type: 'bobette'};
        // const prop = feature.properties;

        // const label = prop.label
        // return {
        //     label: label,
        //     type: getType(prop.layer),
        // };
    });
}

const errorCallback = (error) => error.long;

// export default function requestPelias(term) {
//     return (dispatch, getState) => {
//         return dispatch(sendRequest(
//             `https://search.mapzen.com/v1/autocomplete`,
//             {text: term, api_key: process.env.REACT_APP_MAPZEN_KEY},
//             'pelias',
//             successCallback,
//             errorCallback,
//         ));
//     }
// }

export default function requestPelias1(term) {
    return (dispatch, getState) => {
        return dispatch(sendRequest(
            `https://photon.komoot.de/api`,
            {q: term},
            'pelias',
            successCallback,
            errorCallback,
        ));
    }
}