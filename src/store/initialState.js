const autocompletes = [
    'bragi', 'kraken', 'bano', 'google'
];

const autocompleteInitialState = {
    items: [],
    error: false,
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

initialState.kraken.inputs = {
    host: 'https://api.navitia.io',
    coverage: 'fr-idf',
    token: ''
};

export default initialState;
