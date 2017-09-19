/* eslint-disable object-shorthand */
import path from 'path';
import fs from 'fs-extra';
import { get as getAppRoot } from 'app-root-dir';

/**
 * Path of the current working directory, with symlinks taken
 * into account.
 * @type {String}
 */
export const ROOT = getAppRoot();

const CONFIG_DIR_NAME = '.boldr';

/**
 * Get the path from the user's project root
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
export function resolveFromRoot(...args) {
  return path.resolve(ROOT, ...args);
}

export const boldrConfigDir = resolveFromRoot(CONFIG_DIR_NAME);
