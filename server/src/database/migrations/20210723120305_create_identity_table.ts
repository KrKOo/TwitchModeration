import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('identity', (table) => {
    table.increments();
    table
      .integer('id_user')
      .notNullable()
      .unsigned()
      .index()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table.integer('provider').notNullable();
    table.string('access_token').notNullable();
    table.string('refresh_token').notNullable();
    table.timestamp('expires_at').notNullable();
    table.unique(['id_user', 'provider']);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('identity');
};
