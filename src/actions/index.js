import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=jmahendr';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    /*
    Axios request will be a promise that the .get() method returns
    this is returned as a payload in the action object.
    the react-promise will intercept and resolve the promise and let it pass thru
    the various reducers 
    */
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback) {
    //Initiate the axios post, then in the promise, pass in a function that will
    //invoke the callback function that was passed by the onSubmit method of the component
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then( ()=> callback() );

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then( () => callback() );

    return {
        type: DELETE_POST,
        payload: id
    }
}