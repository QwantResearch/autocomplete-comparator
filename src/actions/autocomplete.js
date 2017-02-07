import axios from 'axios';
import {RECEIVE_AUTOCOMPLETE_RESPONSE, RECEIVE_AUTOCOMPLETE_ERROR} from  '../constants/ActionTypes'

export const receiveAutocompleteResponse = (autocomplete_name, items, request_time) => {
    return {
        type: RECEIVE_AUTOCOMPLETE_RESPONSE,
        items,
        autocomplete: autocomplete_name,
        request_time
    }
}

export const receiveAutocompleteError = (autocomplete_name, error_message) => {
    return {
        type: RECEIVE_AUTOCOMPLETE_ERROR,
        error: error_message,
        autocomplete: autocomplete_name
    }
}

export default function sendRequest(url, params, autocomplete,
    successCallback, errorCallback, headers = {}) { return dispatch => {
    const startTime = new Date().getTime();
    return axios.get(url, {params, headers})
        .then(response => {
            dispatch(receiveAutocompleteResponse(
                autocomplete,
                successCallback(response.data),
                new Date().getTime() - startTime
            ));
        })
        .catch(error => {
            if (error.response && typeof errorCallback === 'function') {
                dispatch(receiveAutocompleteError(
                    autocomplete,
                    errorCallback(error.response.data)
                ));
            } else {
                dispatch(receiveAutocompleteError(autocomplete, error.message));
            }
        });
    }
};