module.exports.up = async (db) => {
  await db.schema.createTable('profile_social_media', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table.uuid('profile_id').notNullable();
    table.string('facebook_url', 255).nullable();
    table.string('twitter_url', 255).nullable();
    table.string('github_url', 255).nullable();
    table.string('linkedin_url', 255).nullable();
    table.string('google_url', 255).nullable();
    table.string('stackoverflow_url', 255).nullable();

     // fk | uuid
    table
      .foreign('profile_id')
      .references('id')
      .inTable('profile')
      .onDelete('cascade')
      .onUpdate('cascade');
    // indexes
    table.index('profile_id');
  });

};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('profile_social_media');
};

module.exports.configuration = { transaction: true };
