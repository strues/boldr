import { createSelector } from 'reselect';

export const getEntities = (state) => state.entities;
export const getTagEntities = (state) => state.entities.tags;
