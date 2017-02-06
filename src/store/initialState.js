const autocompletes = [
    'bragi', 'kraken', 'bano', 'google'
];

const autocompleteInitialState = {
    items: [],
    error: null,
    request_time: 0,
};

const initialState = autocompletes.reduce((state, autocomplete) => {
    state[autocomplete] = {
        ...autocompleteInitialState,
        inputs: {}
    };

    return state;
}, {});

initialState.term = "";

initialState.bragi.inputs = {
    host: '',
};

initialState.kraken.inputs = {
    navitia_host: 'https://api.navitia.io',
    navitia_coverage: 'fr-idf',
    navitia_token: ''
};

export default initialState;
