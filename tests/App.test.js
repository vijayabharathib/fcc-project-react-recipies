import React from 'react';
import ReactDOM from 'react-dom';
import IngredientList from '../src/Ingredients';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import {createRenderer} from 'react-addons-test-utils';

const test=addAssertions(tape,{jsxEquals});
const renderer=createRenderer();
test("Render Ingredients",(assert) => {
  var del=function(){};
  assert.plan(2);
  const ingredients=[{key:1,name: "flour"},{key:2,name:"water"},{key:3,name:"salt"}];
  renderer.render(<IngredientList ingredients={ingredients} onDelete={del} />);
  const message="Ingredient should list";
  const expected=2;
  const result=renderer.getRenderOutput()
  const actual=result.props.children.length;
  assert.equal(actual,expected,"Expect 2 children, should fail");
  assert.equal(actual,3,"Expect 3 children,should pass");
  assert.end();
});
