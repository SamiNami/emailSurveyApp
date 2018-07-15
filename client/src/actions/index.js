import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    return function(dispatch) {
        axios.get('/api/curret_user')
        .then( res => dispatch({ type: FETCH_USER, payload: res }));
    }
};
