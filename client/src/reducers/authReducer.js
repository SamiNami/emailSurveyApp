import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            // if there is no payload, payload will be an empty string that is falsy
            return action.payload || false;
        default:
            return state;
    }
}
