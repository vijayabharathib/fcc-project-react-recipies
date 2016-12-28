import React from 'react';
import ReactDOM from 'react-dom';
import IngredientList from '../src/IngredientList';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import {createRenderer} from 'react-addons-test-utils';

const test=addAssertions(tape,{jsxEquals});
const renderer=createRenderer();
test("Render Ingredients",(assert) => {
  var del=function(){};
  assert.plan(1);
  const ingredients=[{key:1,name: "flour"},{key:2,name:"water"}];
  renderer.render(<IngredientList ingredients={ingredients} onDelete={del} />);
  const message="Ingredient should list";
  const expected=2;
  const result=renderer.getRenderOutput()
  const actual=result.props.children[2].props.children.length;
  assert.equal(actual,expected,"Ingredient list should have 2 list items");
  assert.end();
});
