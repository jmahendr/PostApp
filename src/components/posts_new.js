import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error? 'has-danger' : '' }`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    { ...field.input } //expand all the properties of file.input object.
                                       //typically we will have all the onXXXEvents here.
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        
        //Here call the action to initiate the axios.post method.
        this.props.createPost(values , ()=> {
            //navigate the user back to post index page.
            this.props.history.push('/');
        });
        
    }

    render() {
        //here we assign handleSubmit as  reference to handleSubmit of this.props.
        const { handleSubmit } = this.props;
        return (
            //here we bind the handleSubmit to the onSubmit method defined in this component
            <form onSubmit={handleSubmit(this.onSubmit.bind(this)) }>
                <Field
                    label="Title For Post" 
                    name="title"
                    component={ this.renderField }
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={ this.renderField }
                />
                <Field 
                    label="Post Content"
                    name="content"
                    component={ this.renderField }
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

/*
 * If the errors is empty object, reduxForm considers that the  
 * form is valid.
 * 
 * 'values' is a object that contains all the fields in the component.
 * this function is passed on as callback to reduxForm below.
 */
function validate(values) {
    const errors = {};

    //validate inputs from values object
    if(!values.title || values.title.lenght < 3) {
        errors.title = "Enter a title";
    }
    if(!values.categories) {
        errors.categories = "Enter some categories";
    }
    if(!values.content) {
        errors.content = "Enter post content";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
}) (
    connect(null, { createPost }) (PostsNew)
);

/*
    The reduxForm in the import is similar to the connect method of component.
    It allows our component to connect to "form: formReducer" 
       reducer in the reducers/index.js that we wiredin.
    It also provides a unique identifier for the form.

    Refer: https://redux-form.com/6.6.3/docs/gettingstarted.md/


*/