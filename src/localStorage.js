import initialState from './store/initialState';

const stateKey = 'autocomplete-comparator';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(stateKey);
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return initialState;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(stateKey, serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};
