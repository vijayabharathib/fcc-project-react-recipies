import React from 'react';
import ReactDOM from 'react-dom';
import RecipieBox from '../../src/scripts/components/RecipieBox';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import {createRenderer} from 'react-addons-test-utils';
import {scryRenderedDOMComponentsWithClass as findElementsByClass} from 'react-addons-test-utils';
import {findRenderedDOMComponentWithClass as findElementByClass} from 'react-addons-test-utils'
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import recipies from '../../src/scripts/reducers/RecipieReducers';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window=document.defaultView;
const test=addAssertions(tape,{jsxEquals});
const renderer=createRenderer();

test("IT - RecipieBox should add Recipie on form submit",(assert) => {
  assert.plan(2);
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
  assert.end();
});


test("IT - RecipieBox - delete button should remove recipie",(assert) => {
  assert.plan(3);
  let store = createStore(recipies);
  const component=TestUtils.renderIntoDocument(<Provider store={store}><RecipieBox /></Provider>);
  //check initial state
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 999,name: 'dosa'});
  component.props.store.dispatch({type: 'ADD_RECIPIE',id: 1000,name: 'dosa'});
  let previousLength=component.props.store.getState().length;
  component.props.store.dispatch({type: 'DELETE_RECIPIE',id: 999});

  let actual=component.props.store.getState().length;
  let expected=previousLength-1;
  let message="One recipie should be deleted directly through dispatch DELETE_RECIPIE action";
  assert.equal(actual,expected,message);

  const deleteRecipie=TestUtils.findRenderedDOMComponentWithClass(component,"c-recipie__delete");
  TestUtils.Simulate.click(deleteRecipie);
  //check state after recipie addition
  message="One recipie should be deleted on click button press";
  actual=component.props.store.getState().length;
  expected =0 //one recipie deleted
  assert.equal(actual,expected,message);
  // TODO:10 +test Test delete button removes the correct recipie
  assert.end();
});
