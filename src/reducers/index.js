import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;


/*
  The key for the formReducer will have to "form" !
  https://redux-form.com/6.6.3/docs/gettingstarted.md/
*/