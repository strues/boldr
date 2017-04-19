import {schema} from 'normalizr';

const template = new schema.Entity('templates', {idAttribute: 'id'});
// const tag = new schema.Entity('tags');
const arrayOfTemplate = new schema.Array(template);

export {arrayOfTemplate, template};
