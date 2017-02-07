import { schema } from 'normalizr';

const setting = new schema.Entity('settings', {
  idAttribute: 'key',
});

const arrayOfSetting = new schema.Array(setting);

export { arrayOfSetting, setting };
