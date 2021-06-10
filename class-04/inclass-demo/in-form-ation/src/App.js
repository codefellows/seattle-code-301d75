import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: 'user'
    }
  }
  handleFormSubmit = e => {
    // keep the form from refreshing the page, which is its default behavior
    e.preventDefault();
    console.log('submitted');
    // but what if we wanted to access specific data on form submit?
    // option A: since we've been updating state w/ username the whole time, we can access it in the state
    // immediate updating: every time the user types, the state is updated, so it's always correct
    // we needed the immediate updates for another feature, displaying the username in the h2
    // downside: every time the user types, we are running a bit of code to update the state
    console.log(this.state.username);
    // option B: we have not been updating the DOB, but we can access it directly via the form input.
    // upside: we don't bother keeping track of that value until we care about it
    console.log(e.target.bootstrapFormDob.value);
  }

  handleNameTyped = e => {
    this.setState({
      username: e.target.value
    })
  }
  render() {
    return (
      <>
        <h1>In-form-ation</h1>
        <h2 id="nameHeader">Welcome, {this.state.username}!</h2>
        <main>
          <form onSubmit={this.handleFormSubmit} id="myForm">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onInput={this.handleNameTyped} />
            <br />
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob" id="dob" />
            <br />
            <select>
              <option value="1">1 horn</option>
              <option value="2">2 horns</option>
            </select>

            <input type="submit" value="Click me!" />
          </form>
          <Container>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="bootstrapFormName">
                <Form.Label>Name</Form.Label>
                <Form.Control onInput={this.handleNameTyped} />
              </Form.Group>
              <Form.Group controlId="bootstrapFormDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date"></Form.Control>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Container>
        </main>
      </>
    )
  }
}

export default App;
