module.exports.up = async (db) => {
  await db.schema.createTable('profile_social_media', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table.uuid('profileId').notNullable();
    table.string('facebookUrl', 255).nullable();
    table.string('twitterUrl', 255).nullable();
    table.string('githubUrl', 255).nullable();
    table.string('linkedinUrl', 255).nullable();
    table.string('googleUrl', 255).nullable();
    table.string('stackoverflowUrl', 255).nullable();

     // fk | uuid
    table
      .foreign('profileId')
      .references('id')
      .inTable('profile')
      .onDelete('cascade')
      .onUpdate('cascade');
    // indexes
    table.index('profileId');
  });

};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('profile_social_media');
};

module.exports.configuration = { transaction: true };
