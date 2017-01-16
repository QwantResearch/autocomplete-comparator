import {
    RECEIVE_AUTOCOMPLETE_RESPONSE,
    RECEIVE_AUTOCOMPLETE_ERROR
} from '../actions';

const autocompletes = [
    'bragi', 'kraken'
];

const initialState = autocompletes.reduce((state, autocomplete) => {
    state[autocomplete] = {
        labels: [],
        error: false
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
                    labels: action.labels
                }
            };
        case RECEIVE_AUTOCOMPLETE_ERROR:
            return {
                ...state,
                [action.autocomplete]: {
                    ...state[action.autocomplete],
                    error: action.error
                }
            };
        default:
        return state;
    }
}
