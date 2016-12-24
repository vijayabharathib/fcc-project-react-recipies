import React from 'react';
import ReactDOM from 'react-dom';
import RecipieBox from '../src/App';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import {createRenderer} from 'react-addons-test-utils';

const test=addAssertions(tape,{jsxEquals});
const renderer=createRenderer();
test("Render RecipieBox",(assert) => {
  assert.plan(1);
  renderer.render(<RecipieBox />);
  const message="RecipieBox should have input form";
  const expected='div';
  const result=renderer.getRenderOutput()
  const actual=result.type;
  assert.equal(actual,expected,message);
  assert.end();
});
