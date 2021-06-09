import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AboutTheApp extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.shouldShowModal} onHide={this.props.hideModal}>
          <Modal.Header closeButton>
            This is a nice app.
          </Modal.Header>
          <Modal.Body>
            Our app helps you track household expenses & inventory.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default AboutTheApp;
