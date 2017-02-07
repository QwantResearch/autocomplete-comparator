import reducer from './index';

describe('reducer', () => {
    let items;

    beforeEach(function() {
        items = [{label: 'Bob'},  {label: 'Bobette'}];
    });

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({})
    });

    it('handles RECEIVE_AUTOCOMPLETE_RESPONSE', () => {
        const initial_state = {
            term: '',
            autocomplete_name:{
                items: [],
                error: null,
                request_time: 0,
                inputs: {}
            }
        };

        const action = {
            type:'RECEIVE_AUTOCOMPLETE_RESPONSE',
            items,
            autocomplete:'autocomplete_name',
            request_time: 10,
            inputs: {}
        };

        expect(
            reducer(initial_state, action)
        ).toEqual({
            term: '',
            autocomplete_name:{
                items,
                error: null,
                request_time: 10,
                inputs: {}
            }
        });
    });

    it('handles RECEIVE_AUTOCOMPLETE_RESPONSE when error before', () => {
        const initial_state = {
            term: '',
            autocomplete_name:{
                items:[],
                error: 'an error',
                request_time: 0,
                inputs: {}
            }
        };

        const action = {
            type:'RECEIVE_AUTOCOMPLETE_RESPONSE',
            items,
            autocomplete:'autocomplete_name',
            request_time: 10
        };

        expect(
            reducer(initial_state, action)
        ).toEqual({
            term: '',
            autocomplete_name:{
                items,
                error: null,
                request_time: 10,
                inputs: {}
            }
        });
    });

    it('handles RECEIVE_AUTOCOMPLETE_ERROR', () => {
        const initial_state = {
            term: '',
            autocomplete_name:{
                items,
                error: null,
                request_time: 10,
                inputs: {}
            }
        };

        const action = {
            type:'RECEIVE_AUTOCOMPLETE_ERROR',
            error: 'Network error',
            autocomplete:'autocomplete_name'
        };

        expect(
            reducer(initial_state, action)
        ).toEqual({
            term: '',
            autocomplete_name:{
                items: [],
                error: 'Network error',
                request_time: 0,
                inputs: {}
            }
        });
    });

    it('handles CHANGE_INPUT', () => {
        const initial_state = {
            term: '',
            autocomplete_name:{
                items:[],
                error: null,
                request_time: 0,
                inputs: {
                    host: "",
                    token: ""
                }
            }
        };

        let action = {
            type:'CHANGE_INPUT',
            name: 'host',
            value: 'bob',
            autocomplete:'autocomplete_name'
        };

        const next_state = reducer(initial_state, action);

        expect(
            next_state
        ).toEqual({
            term: '',
            autocomplete_name:{
                items: [],
                error: null,
                request_time: 0,
                inputs: {
                    host: "bob",
                    token: ""
                }
            }
        });

        action = {
            type:'CHANGE_INPUT',
            name: 'token',
            value: 'bobette',
            autocomplete:'autocomplete_name'
        };

        expect(
            reducer(next_state, action)
        ).toEqual({
            term: '',
            autocomplete_name:{
                items: [],
                error: null,
                request_time: 0,
                inputs: {
                    host: "bob",
                    token: "bobette"
                }
            }
        });
    });

    it('handles CHANGE_SEARCH_TERM', () => {
        const initial_state = {
            term: "",
            autocomplete_name:{
                items: [],
                error: null,
                request_time: 0,
                inputs: {}
            }
        };

        let action = {
            type:'CHANGE_SEARCH_TERM',
            term: 'bob'
        };

        const next_state = reducer(initial_state, action);

        expect(
            next_state
        ).toEqual({
            term: 'bob',
            autocomplete_name:{
                items: [],
                error: null,
                request_time: 0,
                inputs: {}
            }
        });
    });
});
