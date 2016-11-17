import React, { Component, PropType } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { hideModal } from '../actions/uiActions'
import { connect } from 'react-redux'


class ModalWrapper extends Component {
  
  componentWillMount(){
   this.setState({ showModal: true })
  }

  close() {
    this.setState({ showModal: false });
  }
  
  onModalClose() {
    this.props.onModalClosed();
  }
  
  

  render() {

    return (
      <div>
        <p>Click to get the full Modal experience!</p>

        <Modal  show={this.state.showModal} 
                onHide={this.close.bind(this)}
                onExited={this.onModalClose.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.contentsComponent}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' className={this.props.onAcceptClick ? '' : 'hidden'} onClick={this.props.onAcceptClick}>Accept</Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default ModalWrapper