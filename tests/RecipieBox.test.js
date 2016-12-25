import React from 'react';
import ReactDOM from 'react-dom';
import RecipieBox from '../src/App';
import Recipie from '../src/Recipie';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import {createRenderer} from 'react-addons-test-utils';
import {scryRenderedDOMComponentsWithClass as findElementsByClass} from 'react-addons-test-utils';
import {findRenderedDOMComponentWithClass as findElementByClass} from 'react-addons-test-utils'
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window=document.defaultView;
const test=addAssertions(tape,{jsxEquals});
const renderer=createRenderer();
test("RecipieBox should have a form",(assert) => {
  assert.plan(1);
  renderer.render(<RecipieBox />);
  const message="RecipieBox should have a form";
  const expected='form';
  const result=renderer.getRenderOutput()
  const actual=result.props.children[0].type;
  assert.equal(actual,expected,message);
  assert.end();
});

test("RecipieBox form should have an input text field",(assert) => {
  assert.plan(1);
  renderer.render(<RecipieBox />);
  const message="RecipieBox form should have a text field";
  const expected='text';
  const result=renderer.getRenderOutput();
  const actual=result.props.children[0].props.children[0].props.type;
  assert.equal(actual,expected,message);
  assert.end();
});

test("RecipieBox should add Recipie on form submit",(assert) => {
  assert.plan(2);
  const component=TestUtils.renderIntoDocument(<RecipieBox />);
  //check initial state
  let actual=component.state.recipies.length;
  let expected=0;
  let message="No recipie should be in box initially";
  assert.equal(actual,expected,message);

  //add a recipie
  const textBox=TestUtils.findRenderedDOMComponentWithClass(component,"c-recipie__control__textbox");
  textBox.value="dosa";
  const form=TestUtils.findRenderedDOMComponentWithTag(component,"form");
  TestUtils.Simulate.change(textBox);
  TestUtils.Simulate.submit(form);

  //check state after recipie addition
  message="One recipie should be added on form submit";
  actual=component.state.recipies.length;
  expected =1 //one recipie should be in state
  assert.equal(actual,expected,message);
  assert.end();
});


test("RecipieBox - delete button should remove recipie",(assert) => {
  assert.plan(2);
  const component=TestUtils.renderIntoDocument(<RecipieBox />);
  component.setState({recipies:[{key: 1,name: "dosa"}]});
  //check initial state
  let actual=component.state.recipies.length;
  let expected=1;
  let message="One recipie should be in box after addition";
  assert.equal(actual,expected,message);

  const deleteRecipie=TestUtils.findRenderedDOMComponentWithClass(component,"c-recipie__delete");
  TestUtils.Simulate.click(deleteRecipie);
  //check state after recipie addition
  message="One recipie should be deleted on click button press";
  actual=component.state.recipies.length;
  expected =0 //one recipie deleted
  assert.equal(actual,expected,message);

  assert.end();
});
