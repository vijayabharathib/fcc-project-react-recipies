import React from 'react';
import ReactDOM from 'react-dom';
import jsdom from 'jsdom';
import Recipie from '../src/Recipie';
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

test("Recipie ingredient toggle",(assert) => {
  var del=function(){};
  assert.plan(1);
  const component=TestUtils.renderIntoDocument(<Recipie key="x" name="omlet"  delete={del} />);
  const message="Recipie toggle should add ingredients";
  const expected=2;
  const actual=component.props;
  //const result=component.props;
  //result.props.children[0].props.onClick();
  //const actual=result.props;
  assert.equal(actual,expected,message);
  assert.end();
});
