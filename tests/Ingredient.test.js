import React from 'react';
import ReactDOM from 'react-dom';
import Ingredient from '../src/Ingredient';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import {createRenderer} from 'react-addons-test-utils';

const test=addAssertions(tape,{jsxEquals});
const renderer=createRenderer();
test("Ingredient should render as list item",(assert) => {
  var del=function(){};
  assert.plan(2);
  renderer.render(<Ingredient name="water" key={1} onDelete={del} />);
  let message="Ingredient should be a list";
  let expected='li';
  const result=renderer.getRenderOutput()
  let actual=result.type;
  assert.equal(actual,expected,message);
  //rendered result should have the name passed on to it
  actual=result.props.children[0].props.children;
  expected="water";
  message="Rendered Ingredient should have the name passed to it";
  assert.equal(actual,expected,message);
  assert.end();
});
