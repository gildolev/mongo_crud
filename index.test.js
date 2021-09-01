const { expect } = require('@jest/globals')
const { getuser, add } = require('./index')
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('insert new user',  () => {
   expect(add('aaa@bbb.ccc').toEqual('ok'))
})
// test('test start',()=>{

// })