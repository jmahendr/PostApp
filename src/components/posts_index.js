import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {

    //lifecycle method invoked when the component is shown in the DOM
    //this is a good point to load the data
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

/* connect method arguments
Here the first mapStateToProps
{ fecthPosts } - mapDispatchToProps 
as the key and the value are the same we are recuding it from its 
long notation of {fetchPosts: fetchPosts}
*/ 
export default connect(mapStateToProps, { fetchPosts }) (PostsIndex);



/*
The Link component fires a new action for the react-router as defined in its "to" attribute
*/