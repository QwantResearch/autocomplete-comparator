import reducer from './index';

describe('reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            bragi:{
                labels:[],
                error: false,
                request_time: 0,
            },
            kraken:{
                labels:[],
                error: false,
                request_time: 0,
            },
            bano:{
                labels:[],
                error: false,
                request_time: 0,
            },
            google:{
                labels:[],
                error: false,
                request_time: 0,
            }
        })
    });

    it('handles RECEIVE_AUTOCOMPLETE_RESPONSE', () => {
        const initial_state = {
            autocomplete_name:{
                labels:[],
                error: false,
                request_time: 0,
            }
        };

        const action = {
            type:'RECEIVE_AUTOCOMPLETE_RESPONSE',
            labels:['Bob', 'Bobette'],
            autocomplete:'autocomplete_name',
            request_time: 10
        };

        expect(
            reducer(initial_state, action)
        ).toEqual({
            autocomplete_name:{
                labels: ['Bob', 'Bobette'],
                error: false,
                request_time: 10
            }
        });
    });

    it('handles RECEIVE_AUTOCOMPLETE_RESPONSE when error before', () => {
        const initial_state = {
            autocomplete_name:{
                labels:[],
                error: true,
                request_time: 0,
            }
        };

        const action = {
            type:'RECEIVE_AUTOCOMPLETE_RESPONSE',
            labels:['Bob', 'Bobette'],
            autocomplete:'autocomplete_name',
            request_time: 10
        };

        expect(
            reducer(initial_state, action)
        ).toEqual({
            autocomplete_name:{
                labels: ['Bob', 'Bobette'],
                error: false,
                request_time: 10
            }
        });
    });

    it('handles RECEIVE_AUTOCOMPLETE_ERROR', () => {
        const initial_state = {
            autocomplete_name:{
                labels:['Bob', 'Bobette'],
                error: false,
                request_time: 10
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
            autocomplete_name:{
                labels: [],
                error: 'Network error',
                request_time: 0
            }
        });
    });
});
