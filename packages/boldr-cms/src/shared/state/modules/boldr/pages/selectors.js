import { createSelector } from 'reselect';

export const getPages = createSelector(
  [
    (state) => state.boldr.pages.labels,
    (state) => state.boldr.pages.byLabel,
  ],
  (labels, byLabel) => labels.map(label => byLabel[label]),
);

export function getPageByLabel(state, pageLabel) {
  return state.boldr.pages.labels[pageLabel];
}
