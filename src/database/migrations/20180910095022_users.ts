import * as Knex from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username")
      .notNullable()
      .unique();
    users.string("password").notNullable();
    users.string("department").notNullable();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists("users");
};
