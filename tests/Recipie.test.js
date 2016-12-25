import React from 'react';
import ReactDOM from 'react-dom';
import jsdom from 'jsdom';
import Recipie from '../src/Recipie';
import Ingredient from '../src/Ingredients';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import TestUtils from 'react-addons-test-utils';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window=document.defaultView;
const test=addAssertions(tape,{jsxEquals});
const renderer=TestUtils.createRenderer();
test("Render Recipie",(assert) => {
  let recipie="doughnut";
  var del=function(){};
  assert.plan(1);
  renderer.render(<Recipie key="x" name={recipie}  delete={del} />);
  const message="Recipie should have a name chappati";
  const expected=recipie;
  const result=renderer.getRenderOutput();
  const recipieTitle=result.props.children[0];
  const actual=recipieTitle.props.children;
  assert.equal(actual,expected,message);
  assert.end();
});

test("Recipie should toggle ingredient when title is clicked",(assert) => {
  var del=function(){};
  assert.plan(2);
  const component=TestUtils.renderIntoDocument(<Recipie key="x" name="omlet"  delete={del} />);
  let message="Recipie should hide ingredients by default";
  let expected=false;
  let actual=component.state.displayIngredient;
  assert.equal(actual,expected,message);
  //TOGGLE recipie and check state change

  let recipieTitle=TestUtils.findRenderedDOMComponentWithTag(component,"h4");
  TestUtils.Simulate.click(recipieTitle);
  actual=component.state.displayIngredient;
  expected=true; //component.state.displayIngredient should be true
  message="Recipie should show ingredients when recipie title is clicked";
  assert.equal(actual,expected,message);

  assert.end();
});


test("Recipie should render all ingredients from state",(assert) => {
  var del=function(){};
  assert.plan(1);
  const component=TestUtils.renderIntoDocument(<Recipie key="x" name="omlet"  delete={del} />);
  component.setState({ingredients: [{key: 1, name: "salt"},{key:2,name:"water"}]});
  component.setState({displayIngredient: true});
  const lists=TestUtils.scryRenderedDOMComponentsWithClass(component, "c-ingredient");
  const message="Recipie should render two ingredients from state";
  const expected=2;
  const actual=lists.length;
  assert.equal(actual,expected,message);
});


test("Recipie - ingredient should be removed from recipie state on delete",(assert) => {
  var del=function(){};
  assert.plan(1);
  const component=TestUtils.renderIntoDocument(<Recipie key="x" name="omlet"  delete={del} />);
  component.setState({ingredients: [{key: 1, name: "salt"}]});
  component.setState({displayIngredient: true});
  let deleteButton=TestUtils.findRenderedDOMComponentWithClass(component,"c-ingredient__delete");
  TestUtils.Simulate.click(deleteButton);
  const actual=component.state.ingredients.length;
  const message="Recipie state should delete ingredient on delete button click";
  const expected=0;
  assert.equal(actual,expected,message);
  assert.end();
});

test("Recipie - ingredient should be added",(assert) => {
  var del=function(){};
  assert.plan(1);
  const component=TestUtils.renderIntoDocument(<Recipie key="x" name="omlet"  delete={del} />);
  const initialIngredientCount=component.state.ingredients.length
  component.addIngredient();
  const message="Recipie state should add ingredient through addIngredient func";
  const expected=initialIngredientCount+1;
  const actual=component.state.ingredients.length;
  assert.equal(actual,expected,message);
  assert.end();
});

test("Recipie - ingredient title add button",(assert) => {
  var del=function(){};
  assert.plan(1);
  const component=TestUtils.renderIntoDocument(<Recipie key="x" name="omlet"  delete={del} />);
  component.setState({displayIngredient: true});
  const initialIngredientCount=component.state.ingredients.length
  const addButton=TestUtils.findRenderedDOMComponentWithClass(component,"c-ingredient__add");
  TestUtils.Simulate.click(addButton);
  const message="Ingredient add button should introduce new ingredient";
  const expected=initialIngredientCount+1;
  const actual=component.state.ingredients.length;
  assert.equal(actual,expected,message);
  assert.end();
});
