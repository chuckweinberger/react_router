import { Categories } from '../constants/categories'
import React, { Component, PropType } from 'react';
import { createPost } from '../actions/storyActions';
import { hideModal } from '../actions/uiActions';
import { connect } from 'react-redux';
import { Field, FieldArray, arrayPush, reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { map, filter } from 'lodash'

const validate = values => {
  const errors = { post: {} }
  const post = values.post

  if (!post.contents) {
    errors.contents = 'Required'
  } else if ((post.contents.length > 500) || (post.contents.length < 5)) {
    errors.post.contents = 'Posts must be between 5 and 500 characters long'
  }

  return errors
}

const renderInput = ({ name, input, label, type, componentClass, meta: { touched, error, warning }}) => {
  
  let validationState = null;
  if(touched) 
    if (error) {
      validationState = "error"
    } else if (warning){
    validationState = "warning"
    } else {
      validationState = "success"
    }
  
  return (
    <FormGroup controlId={name} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <div>
        <FormControl {...input} placeholder={label} type={type} componentClass={componentClass} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </FormGroup>
  )
}

    
    
class CreatePostModal extends Component {
  
  componentWillMount(){
    this.setState({ showModal: true })
  }

  close() {
    this.setState({ showModal: false });
  }
  
  onModalClose() {
    this.props.dispatch(hideModal());
  }

  render() {
    
    const modal = this;

    const onSubmit = (values) => {
      
      return new Promise((resolve, reject) => {
      
        //dispatch the post creation action
        this.props.dispatch(createPost(values))
        .then(result => {
          modal.close();
          resolve(result)
        })
        .catch((errors) => { 
          reject(errors)
        })

      })
    }
        
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    
    return (
      
      <div>
        <Modal  show={this.state.showModal} 
                onHide={this.close.bind(this)}
                onExited={this.onModalClose.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a new Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field name="post.contents" component={renderInput} componentClass="textarea" label="Add to the Story"/>
              {error && <strong>{error}</strong>}
              <div>
                <Button type="submit" disabled={ submitting}>Create</Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

// Decorate the form component
CreatePostModal = reduxForm({
  form: 'createPost',
  validate
})(CreatePostModal);

CreatePostModal = connect(
  state => ({ initialValues: { post: { story: state.ui.showingItem._id, type: "post" } } })
)(CreatePostModal)

export default CreatePostModal;