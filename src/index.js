import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//BrowserRouter provides the hook to the history compent that lets react-router know of the url changes.
//Route Component provides the mapping between the url and the component
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id" component={PostsShow} />
        <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));


  /*
  The switch route acts like a switch statement and matches the routes
  in the sequence listed and matches the first route that statisfy.

  Otherwise(if switch is not used), both routes will match the 
  url like host:port/posts/new
  
  */