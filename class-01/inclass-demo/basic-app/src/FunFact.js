import React from 'react';

class FunFact extends React.Component {
  render() {
    // the info sent by the parent component shows up as props
    // we access them with this.props.____
    // we sent a title and body from App.js
    // so now we have access to this.props.title and this.props.body
    console.log(this.props.title);
    return (
      <>
        <h4>{this.props.title}</h4>
        <p>{this.props.potato}</p>
      </>
    );
  }
}

// export so that we can use it in another file by importing
export default FunFact;
