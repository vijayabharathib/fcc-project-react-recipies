import React from 'react';
import ReactDOM from 'react-dom';
import test from 'tape';

import TestUtils from 'react-addons-test-utils';
import {
  findRenderedDOMComponentWithClass as findByClass,
  findRenderedDOMComponentWithTag as findByTag,
  scryRenderedDOMComponentsWithTag as scryByTag,
  scryRenderedDOMComponentsWithClass as scryByClass
} from 'react-addons-test-utils';
import jsdom from 'jsdom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import recipies from '../../src/scripts/reducers/RecipieReducers';
import Recipie from '../../src/scripts/components/Recipie';
import RecipieBox from '../../src/scripts/components/RecipieBox';

//there is no docucment/browser/window
//so, warm it up with jsdom empty document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window=document.defaultView;
/*
test("IT - RecipieBox - should add Recipie on form submit",(t) => {
  t.plan(3);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(
    <Provider store={store}><RecipieBox /></Provider>
  );
  //check initial state
  let actual=component.props.store.getState().length;
  let expected=0;
  let message="No recipie should be in box initially";
  t.equal(actual,expected,message);

  //add a recipie
  const textBox=findByTag(component,"input");
  expected="dosa";
  textBox.value=expected;
  const form=findByTag(component,"form");
  TestUtils.Simulate.change(textBox);
  TestUtils.Simulate.submit(form);
  // TODO: why not click on add recipie button instead of form submit +test
  //check state after recipie addition
  message="Recipie name passed through form should be added to store";
  const state=component.props.store.getState();
  actual=state[0].name;
  t.equal(actual,expected,message);

  //check rendered content after addition
  let recipie=findByTag(component,"h4");
  actual=recipie.innerHTML;
  expected="dosa";
  message="Recipie name sent through form should be rendered"
  t.equal(actual,expected,message);
  t.end();
});


test("IT - RecipieBox - delete button should remove recipie",(t) => {
  t.plan(2);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(<Provider store={store}><RecipieBox /></Provider>);
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 999,name: 'recipie2'});
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 1000,name: 'recipie3'});

  //check initial state
  let previousLength=component.props.store.getState().length; //3
  component.props.store.dispatch({type: 'DELETE_RECIPIE',id: 999});
  let actual=component.props.store.getState().length;
  let expected=previousLength-1; //1 after one is deleted
  let message="One recipie should be deleted directly through dispatch DELETE_RECIPIE action";
  t.equal(actual,expected,message);
  const deleteRecipie=findByClass(component,"c-recipie__delete");
  TestUtils.Simulate.click(deleteRecipie);
  //check state after recipie addition
  message="One recipie should be deleted on click button press";
  actual=component.props.store.getState().length;
  expected =0; //last recipie deleted
  t.equal(actual,expected,message);
  // TODO:10 +test Test delete button removes the correct recipie
  t.end();
});


test("IT - RecipieBox - edit button should render editable recipie",(t) => {
  t.plan(3);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(<Provider store={store}><RecipieBox /></Provider>);
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 888,name: 'recipie2'});
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 889,name: 'recipie3'});

  //check initial state
  component.props.store.dispatch({type: 'EDIT_RECIPIE',id: 889});
  let recipie=component.props.store.getState().filter((r)=>r.id===889)[0];
  let actual=recipie.editable;
  let expected=true; //1 after one is deleted
  let message="Recipie should be flagged as editable through dispatch EDIT_RECIPIE action";
  t.equal(actual,expected,message);

  let textBoxCount=scryByTag(component,"input").length;
  const editRecipies=scryByClass(component,"c-recipie__edit");
  //first recipie is already in editable mode
  //so only second recipie will have edit button (first one will have update)
  TestUtils.Simulate.click(editRecipies[0]);
  //check state after recipie addition
  message="Recipie should be editable on edit button click";

  //first recipie rendered is actually the last in store
  actual=component.props.store.getState()[0].editable
  expected =true; //last recipie deleted
  t.equal(actual,expected,message);

  //one more text box should be there
  expected=textBoxCount+1;
  actual=scryByTag(component,"input").length;
  message="Recipie edit button click should add recipie as input box";
  t.equal(actual,expected,message);
});
*/
test("IT - Ingredients - add ingredient button should display text input",(t) => {
  t.plan(3);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(<Provider store={store}><RecipieBox /></Provider>);
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 900,name: 'recipie'});
  let recipie=findByTag(component,"h2");
  TestUtils.Simulate.click(recipie);
  let actual=scryByTag(component,"h3").length;
  let expected=1;
  let message="One 'ingredient' header should be present";
  t.equal(actual,expected,message);


  actual=scryByClass(component,"c-ingredient__add");
  message="Ingredient header should have add button";
  expected=1;
  t.equal(actual.length,expected,message);
  const textBox=findByClass(component,"c-ingredient__add--editable");
  expected="salt";
  textBox.value=expected;
  const form=findByClass(component,"c-ingredient__new__form");
  TestUtils.Simulate.change(textBox);
  //TestUtils.Simulate.submit(form);
  // TODO: the submit wreck havoc!! 
  let state=component.props.store.getState();
  actual=state[0];
  expected=1;
  message="Add button should inlude ingredient to the recipie"
  t.equal(actual,expected,message);
});
