/* eslint-disable id-match, no-prototype-builtins */
// Related Models
import BaseModel, { mergeSchemas } from './BaseModel';

class Profile extends BaseModel {
  static tableName = 'profile';

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['firstName', 'accountId', 'lastName', 'username'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      accountId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      username: { type: 'string' },
      bio: { type: 'string' },
      location: { type: 'string' },
      website: { type: 'string' },
      avatarUrl: { type: 'string' },
      profileImage: { type: 'string' },
      language: { type: 'string' },
      birthday: { type: 'date' },
    },
  });

  static addTimestamps = true;
  /**
   * An array of attribute names that will be excluded from being returned.
   *
   * @type {array}
   */
  static hidden = [];

  /**
   * Before inserting make sure we hash the password if provided.
   *
   * @param {object} queryContext
   */
  $beforeInsert(queryContext) {
    super.$beforeInsert(queryContext);
    if (this.firstName) {
      this.firstName = this.firstName.trim();
    }
    if (this.lastName) {
      this.lastName = this.lastName.trim();
    }
  }

  static relationMappings = {
    account: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'profile.accountId',
        to: 'account.id',
      },
    },
    socialMedia: {
      relation: BaseModel.HasOneRelation,
      modelClass: `${__dirname}/Social`,
      join: {
        from: 'profile.id',
        to: 'profile_social_media.profileId',
      },
    },
  };

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default Profile;