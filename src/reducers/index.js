import {
    RECEIVE_AUTOCOMPLETE_RESPONSE,
    RECEIVE_AUTOCOMPLETE_ERROR
} from '../actions';

const autocompletes = [
    'bragi', 'kraken', 'bano', 'google'
];

const initialState = autocompletes.reduce((state, autocomplete) => {
    state[autocomplete] = {
        labels: [],
        error: false,
        request_time: 0,
    };

    return state;
}, {});

export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_AUTOCOMPLETE_RESPONSE:
            return {
                ...state,
                [action.autocomplete]: {
                    ...state[action.autocomplete],
                    labels: action.labels,
                    request_time: action.request_time,
                    error:false,
                }
            };
        case RECEIVE_AUTOCOMPLETE_ERROR:
            return {
                ...state,
                [action.autocomplete]: {
                    ...state[action.autocomplete],
                    error: action.error,
                    labels: [],
                    request_time: 0
                }
            };
        default:
        return state;
    }
}
