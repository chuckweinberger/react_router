import { Categories } from '../constants/categories'
import React, { Component, PropType } from 'react';
import { createStory } from '../actions/storyActions';
import { hideModal } from '../actions/uiActions';
import { connect } from 'react-redux';
import { Field, FieldArray, arrayPush, reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { map, filter } from 'lodash'


const categories = map(Categories, function(cat){ return { name: cat, val: false }})

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  } else if ((values.title.length > 50) || (values.title.length < 3)) {
    errors.title = 'Must be between 3 and 50 characters long'
  }
  if (!values.contents) {
    errors.contents = 'Required'
  } else if ((values.contents.length > 500) || (values.contents.length < 5)) {
    errors.contents = 'Stories must be between 5 and 500 characters long'
  }
  if (!values.lat) {
    errors.lat = 'Required'
  } else if (isNaN(Number(values.lat))) {
    errors.lat = 'Must be a number'
  } else if ((Number(values.lat) < -90) || (Number(values.lat) > 90)) {
    errors.lat = 'Latitude must be between -90 and 90'
  }
  if (!values.lon) {
    errors.lon = 'Required'
  } else if (isNaN(Number(values.lon))) {
    errors.lon = 'Must be a number'
  } else if ((Number(values.lon) < -180) || (Number(values.lon) > 180)) {
    errors.lon = 'Longitude must be between -180 and 180'
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

const renderCategories = ({ fields, meta: { touched, error } }) => 
  <ul>
    <li><label>Pick a news category for the story</label></li>
    {fields.map((category, index) =>
        <li key={index} >
          <Field
            name={category}
            component="input"
            type="checkbox"
            class="test"
            format={(value, name) => value.val}
            normalize={(value, previousValue, allValues, previousAllValues) => (
              {name: previousValue.name, val: value}
            )}
          />
          {" "}
          <label>{categories[index].name}</label>
        </li>
    )}
  </ul>

    
    
    
class CreateStoryModal extends Component {
  
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
      
        //make sure to modify the form values as needed by the server
        const normalize = (values) => {
        
          //placeholder for the new story normalized for acceptance by the server
          let normedVals = { story:{ title: values.title } };
        
          //turn an array containing objects of all possible categories along w/ their truthiness into
          //an array that contains only true categories 
          let normedCategories = [];
          for (var i=0;i<values.categories.length;i++){
            if(values.categories[i].val) normedCategories.push(values.categories[i].name)
          }
          normedVals.story.categories = normedCategories;
          //move the story's contents into the first post for that story
          normedVals.story.posts = [{ contents: values.contents,
                              type: "post",
                              attachments:[]
                            }]
          //change lat and lon from strings to numbers
          normedVals.story.lat = Number(values.lat);
          normedVals.story.lon = Number(values.lon);
          //and set the type of this posting to "story" type
          normedVals.story.type = "story";
          return normedVals
        }
      
        values = normalize(values);
      
        //dispatch the story creation action
        this.props.dispatch(createStory(values))
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
            <Modal.Title>Create a new Story</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field name="title" component={renderInput} type="text" label="Enter Story Title"/>
              <Field name="contents" component={renderInput} componentClass="textarea" label="Story Contents"/>
              <FieldArray name="categories" component={renderCategories}/>
              <Field name="lat" component={renderInput} type="text" label="Enter Latitude"/>
              <Field name="lon" component={renderInput} type="text" label="Enter Longitude"/>
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
CreateStoryModal = reduxForm({
  form: 'createStory',
  validate,
  initialValues: {
    categories
  }
})(CreateStoryModal);

export default CreateStoryModal;
  
