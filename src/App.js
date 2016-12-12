import React, { Component } from 'react';
import './App.css';
import Recipie from './Recipie';

class RecipieBox extends Component {
  constructor(){
    super();
    this.state = {
      msg: "I am back here"
    }
  }

  update(e) {
    this.setState({msg: e.target.value});
  }

  render() {
    return (
      <div>
        <Recipie name="Chappatti" recipie="one;two" />
        <Speaker update={this.update.bind(this)} />
      </div>
    );
  }
}

RecipieBox.propTypes = {
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
}

RecipieBox.defaultProps ={
  name: "Guest",
  title: "Sweet"
}

class Speaker extends Component {
  render() {
    return (
      <input type="text" onChange={this.props.update} />
    )
  }
}
export default RecipieBox;
