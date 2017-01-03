import React from 'react';
import ReactDOM from 'react-dom';
import test from 'tape';

import TestUtils from 'react-addons-test-utils';
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
  const component=TestUtils.renderIntoDocument(<Provider store={store}><RecipieBox /></Provider>);
  //check initial state
  let actual=component.props.store.getState().length;
  let expected=0;
  let message="No recipie should be in box initially";
  assert.equal(actual,expected,message);

  //add a recipie
  const textBox=TestUtils.findRenderedDOMComponentWithTag(component,"input");
  expected="dosa";
  textBox.value=expected;
  const form=TestUtils.findRenderedDOMComponentWithTag(component,"form");
  TestUtils.Simulate.change(textBox);
  TestUtils.Simulate.submit(form);

  //check state after recipie addition
  message="Recipie name passed through form should be added to store";
  const state=component.props.store.getState();
  actual=state[0].name;
  assert.equal(actual,expected,message);

  //check rendered content after addition
  let recipie=TestUtils.findRenderedDOMComponentWithTag(component,"h4");
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
  const deleteRecipie=TestUtils.findRenderedDOMComponentWithClass(component,"c-recipie__delete");
  TestUtils.Simulate.click(deleteRecipie);
  //check state after recipie addition
  message="One recipie should be deleted on click button press";
  actual=component.props.store.getState().length;
  expected =0; //last recipie deleted
  assert.equal(actual,expected,message);
  // TODO:10 +test Test delete button removes the correct recipie
  assert.end();
});
