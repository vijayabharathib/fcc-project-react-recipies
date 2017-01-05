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

test("IT - RecipieBox - should add Recipie on form submit",(assert) => {
  assert.plan(3);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(
    <Provider store={store}><RecipieBox /></Provider>
  );
  //check initial state
  let actual=component.props.store.getState().length;
  let expected=0;
  let message="No recipie should be in box initially";
  assert.equal(actual,expected,message);

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
  assert.equal(actual,expected,message);

  //check rendered content after addition
  let recipie=findByTag(component,"h4");
  actual=recipie.innerHTML;
  expected="dosa";
  message="Recipie name sent through form should be rendered"
  assert.equal(actual,expected,message);
  assert.end();
});


test("IT - RecipieBox - delete button should remove recipie",(assert) => {
  assert.plan(2);
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
  assert.equal(actual,expected,message);
  const deleteRecipie=findByClass(component,"c-recipie__delete");
  TestUtils.Simulate.click(deleteRecipie);
  //check state after recipie addition
  message="One recipie should be deleted on click button press";
  actual=component.props.store.getState().length;
  expected =0; //last recipie deleted
  assert.equal(actual,expected,message);
  // TODO:10 +test Test delete button removes the correct recipie
  assert.end();
});


test("IT - RecipieBox - edit button should render editable recipie",(assert) => {
  assert.plan(3);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(<Provider store={store}><RecipieBox /></Provider>);
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 888,name: 'recipie2'});
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 889,name: 'recipie3'});

  //check initial state
  component.props.store.dispatch({type: 'EDIT_RECIPIE',id: 889});
  let actual=component.props.store.getState()[1].editable;
  let expected=true; //1 after one is deleted
  let message="Recipie should be flagged as editable through dispatch EDIT_RECIPIE action";
  assert.equal(actual,expected,message);

  let textBoxCount=scryByTag(component,"input").length;
  const editRecipies=scryByClass(component,"c-recipie__edit");
  TestUtils.Simulate.click(editRecipies[0]);
  //check state after recipie addition
  message="Recipie should be editable on edit button click";
  actual=component.props.store.getState()[0].editable
  expected =true; //last recipie deleted
  assert.equal(actual,expected,message);

  //one more text box should be there
  expected=textBoxCount+1;
  actual=scryByTag(component,"input").length;
  message="Recipie edit button click should add recipie as input box";
  assert.equal(actual,expected,message);
  assert.end();
});

test("IT - RecipieBox - update button should render new recipie",(assert) => {
  assert.plan(2);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(<Provider store={store}><RecipieBox /></Provider>);
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 899,name: 'recipie1'});
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 900,name: 'recipie2'});

  //check initial state
  component.props.store.dispatch({type: 'UPDATE_RECIPIE',id: 900,name: "new name"});
  let actual=component.props.store.getState()[1].name;
  let expected="new name"; //1 after one is deleted
  let message="Recipie should have new name through dispatch UPDATE_RECIPIE action";
  assert.equal(actual,expected,message);

  const editRecipies=scryByClass(component,"c-recipie__edit");
  TestUtils.Simulate.click(editRecipies[0]);
  const recipieName=findByClass(component,"c-recipie__name--editable");
  recipieName.value="shiny name";

  const form=findByClass(component,"c-recipie__update--form");
  TestUtils.Simulate.change(recipieName);
  TestUtils.Simulate.submit(form);
  // TODO: why not click on that update button instead of form submit? + test
  //check state after recipie update
  message="Recipie should be updated with new name on update button click";
  actual=component.props.store.getState()[0].name
  expected ="shiny name"; //recipie has new name
  assert.equal(actual,expected,message);
  /*
  //one more text box should be there
  expected=textBoxCount+1;
  actual=scryByTag(component,"input").length;
  message="Recipie edit button click should add recipie as input box";
  assert.equal(actual,expected,message);
  assert.end();*/
});
