import sendRequest from './autocomplete';

const getType = (value) => {
    let type;
     if (value === 'address' || value === 'street') {
        type = 'address';
      } else if (value === 'venue' ) {
          type = 'poi';
      } else {
        type = 'city';
    }

    return type;
}

const successCallback = (response) => {
    return response.features.map(feature => {
        const prop = feature.properties;

        const label = prop.label
        return {
            label: label,
            type: getType(prop.layer),
        };
    });
}

const errorCallback = (error) => error.long;


export default function requestPelias(term) {
    return (dispatch, getState) => {
        return dispatch(sendRequest(
            `https://search.mapzen.com/v1/autocomplete`,
            {text: term, api_key: process.env.REACT_APP_MAPZEN_KEY},
            'pelias',
            successCallback,
            errorCallback,
        ));
    }
}
