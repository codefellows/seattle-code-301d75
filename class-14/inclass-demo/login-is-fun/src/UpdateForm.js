import React from 'react';

class UpdateForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.updateCat}>
        <h3>Updating {this.props.cat.name}</h3>
        <label htmlFor="updateName">Name</label>
        <input id="updateName" defaultValue={this.props.cat.name} />
        <label htmlFor="updateColor">Color</label>
        <input id="updateColor" defaultValue={this.props.cat.color} />
        <input type="submit" value="Update Cat" />
      </form>
    )
  }
}

export default UpdateForm;
