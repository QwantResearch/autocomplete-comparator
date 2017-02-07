import * as types from  '../constants/ActionTypes'
import requestBragi from './bragi';
import requestKraken from './kraken';
import requestBano from './bano';
import requestGooglePlaces from './google';

export const handleInputChange = (autocomplete_name, name, value) => {
    return {
        type: types.CHANGE_INPUT,
        autocomplete: autocomplete_name,
        name,
        value
    }
}

export const changeSearchTerm = (term) => {
    return {
        type: types.CHANGE_SEARCH_TERM,
        term
    }
}

export const requestAutocompletes = (term = null) => {
    const thunk = (dispatch, getState) => {
        if (getState().term === '') {
            return;
        }
        Promise.all([
            dispatch(requestBragi(term)),
            dispatch(requestKraken(term)),
            dispatch(requestBano(term)),
            dispatch(requestGooglePlaces(term)),
        ]);
    }

    thunk.meta = {
        debounce: {
            time: 500,
            key: 'request-autocompletes-action'
        }
    };

    return thunk;
}
