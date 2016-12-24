import React from 'react';
import ReactDOM from 'react-dom';
import RecipieList from '../src/RecipieList';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import {createRenderer} from 'react-addons-test-utils';

const test=addAssertions(tape,{jsxEquals});
const renderer=createRenderer();
test("Render RecipieList",(assert) => {
  assert.plan(1);
  renderer.render(<RecipieList recipies={[]}/>);
  const message="RecipieList should render";
  const expected='ul';
  const result=renderer.getRenderOutput()
  const actual=result.type;
  assert.equal(actual,expected,message);
  assert.end();
});
