import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.string('picture');
    table.string('password');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('last_login').defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('user');
};
