module.exports.up = async (db) => {
  await db.schema.createTable('social', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.uuid('userId').unsigned().notNullable();
    table.string('facebookUrl', 255).nullable();
    table.string('twitterUrl', 255).nullable();
    table.string('githubUrl', 255).nullable();
    table.string('linkedinUrl', 255).nullable();
    table.string('googleUrl', 255).nullable();
    table.string('stackoverflowUrl', 255).nullable();

     // fk | uuid
    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');
    // indexes
    table.index('userId');
  });

};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('social');
};

module.exports.configuration = { transaction: true };
