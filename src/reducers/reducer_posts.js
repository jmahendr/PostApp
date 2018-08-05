import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';


export default function (state = { }, action) {
    switch (action.type) {
        case FETCH_POSTS:
            //look at notes below
            return _.mapKeys(action.payload.data, 'id');
            
        case FETCH_POST:
            const post = action.payload.data;
            return { ...state,  [action.payload.data.id]: post };

        case DELETE_POST:
            return _.omit(state, action.payload);
            
        default:
            return state;
    }
}


/* The loadash mapKeys takes the array, and a key string
            returns a object with a collection of properties 
            that have the same key and the object itself
            e.g [{ id:1, title:'abc' }, { id:2, title:'def' }] will become 
                {
                    '1': { id:1, title:'abc' },
                    '2': { id:2, title:'def' }
                }
*/