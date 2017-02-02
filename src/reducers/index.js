import * as types from  '../constants/ActionTypes'

export default function(state = {}, action) {
    switch (action.type) {
        case types.RECEIVE_AUTOCOMPLETE_RESPONSE:
            return {
                ...state,
                [action.autocomplete]: {
                    ...state[action.autocomplete],
                    labels: action.labels,
                    request_time: action.request_time,
                    error:false,
                }
            };
        case types.RECEIVE_AUTOCOMPLETE_ERROR:
            return {
                ...state,
                [action.autocomplete]: {
                    ...state[action.autocomplete],
                    error: action.error,
                    labels: [],
                    request_time: 0
                }
            };
        case types.CHANGE_INPUT:
            return {
                ...state,
                [action.autocomplete]: {
                    ...state[action.autocomplete],
                    inputs: {
                        ...state[action.autocomplete].inputs,
                        [action.name]: action.value

                    }
                }
            };
        case types.CHANGE_SEARCH_TERM:
            return {
                ...state,
                term: action.term
            };
        default:
        return state;
    }
}
