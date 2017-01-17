import reducers from './index';

describe('reducer', () => {
    it('handles RECEIVE_AUTOCOMPLETE_RESPONSE', () => {
        const initial_state = {
            autocomplete_name:{
                labels:[],
                error: false
            }
        };

        const action = {
            type:'RECEIVE_AUTOCOMPLETE_RESPONSE',
            labels:['Bob', 'Bobette'],
            autocomplete:'autocomplete_name'
        };

        let next_state = reducers(initial_state, action);

        expect(next_state).toEqual({
            autocomplete_name:{
                labels: ['Bob', 'Bobette'],
                error: false
            }
        });
    });

    it('handles RECEIVE_AUTOCOMPLETE_ERROR', () => {
        const initial_state = {
            autocomplete_name:{
                labels:['Bob', 'Bobette'],
                error: false
            }
        };

        const action = {
            type:'RECEIVE_AUTOCOMPLETE_ERROR',
            error: 'Network error',
            autocomplete:'autocomplete_name'
        };

        let next_state = reducers(initial_state, action);

        expect(next_state).toEqual({
            autocomplete_name:{
                labels: ['Bob', 'Bobette'],
                error: 'Network error'
            }
        });
    });
});
