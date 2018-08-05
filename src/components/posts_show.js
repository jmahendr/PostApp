import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

    componentDidMount() {
        //params.id is the id property from the router for the url
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    //Here we are passing an callback to action creator.
    //the action creator will execute the action and then invoke the callback passed to it.
    //with this approach, we navigate back to the index page only after the delete is performed.
    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return <div>Loading post {this.props.match.params.id}...</div>;
        }
        console.log(post);

        return (
            <div>
                <Link to="/" > &lt; Back to Index</Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                    >
                Delete Post
                </button>
                
                
                <h3>{ post.title }</h3>
                <h6>Categories: { post.categories }</h6>
                <p>{ post.content }</p>
            </div>
        );
    }
}

//here ownProps is the component properties. As it already has the router param.id,
//we can use it to extract the specific post from posts and set it in the 
//component state.
function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost }) (PostsShow);