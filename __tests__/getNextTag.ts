import { getNextTag } from '../src/modules/getNextTag'

test('when patch', () => {
  expect(getNextTag('0.1.0', 'patch')).toEqual('0.1.1')
  expect(getNextTag('0.1.9', 'patch')).toEqual('0.2.0')
})

test('when minor', () => {
  expect(getNextTag('0.1.0', 'minor')).toEqual('0.2.0')
  expect(getNextTag('0.9.0', 'minor')).toEqual('1.0.0')
})

test('when minor and pajor', () => {
  expect(getNextTag('0.9.9', 'patch')).toEqual('1.0.0')
})

test('when major', () => {
  expect(getNextTag('0.1.0', 'major')).toEqual('1.1.0')
  expect(getNextTag('9.0.0', 'major')).toEqual('10.0.0')
})
