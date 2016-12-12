import React, { Component } from 'react';
import './App.css';
import RecipieList from './Recipie';

class RecipieBox extends Component {
  constructor(){
    super();
    this.state={recipies: []};
    //this.addRecipie.bind(this);
  }
  addRecipie(e) {
    let newRecipies=this.state.recipies;
    newRecipies.push({key: Date.now(), name: this.recipie_input.value});
    this.setState({recipies: newRecipies});
    this.recipie_input.value="";
    e.preventDefault();
  }
  deleteItem(i){
    let newRecipies=this.state.recipies;
    newRecipies=this.state.recipies.filter(function(recipie){
      return recipie.key!==i;
    });
    this.setState({recipies: newRecipies});
  }
  render() {

    return (
      <div>
        <form onSubmit={this.addRecipie.bind(this)}>
          <input
            type="text"
            className="c-recipie__control__textbox"
            ref={(input) => this.recipie_input=input}
            />
          <button className="c-recipie__control__submit">Add Recipie</button>
        </form>
        <RecipieList recipies={this.state.recipies} onDelete={this.deleteItem.bind(this)} />
      </div>
    );
  }
}

export default RecipieBox;
