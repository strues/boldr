
import { fromJS } from 'immutable';
import deepRemove from './deepRemove';

const json = {
  root: { props: { children: ['1', '5'] } },
  1: { props: { children: ['2', '3'] } },
  2: { props: { children: ['4'] } },
  3: { props: {} },
  4: { props: {} },
  5: { props: {} },
};

const map = fromJS(json);
const removed = deepRemove(map, '1');

it('deletes the root item', () => {
  expect(removed.get('1')).toBe(undefined);
});

it('deletes the root\'s children', () => {
  expect(removed.get('2')).toBe(undefined);
});

it('deletes the root\'s childrens children', () => {
  expect(removed.get('3')).toBe(undefined);
  expect(removed.get('4')).toBe(undefined);
});

it("doesn't delete extra items", () => {
  expect(removed.get('5')).toBe(map.get('5'));
});
