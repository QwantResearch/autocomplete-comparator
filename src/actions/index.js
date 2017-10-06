import * as types from  '../constants/ActionTypes'
import requestBragi from './bragi';
import requestPhoton from './photon';
import requestPelias from './pelias';
import requestKraken from './kraken';
import requestNavitia from './navitia';
import requestBan from './ban';
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
            dispatch(requestPelias(term)),
            dispatch(requestNavitia(term)),
            dispatch(requestPhoton(term)),
            dispatch(requestKraken(term)),
            dispatch(requestBan(term)),
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
