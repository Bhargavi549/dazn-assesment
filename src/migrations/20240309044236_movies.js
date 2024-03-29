/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("movies", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("genre").notNullable();
    table.decimal("rating", 3, 1);
    table.string("streaming_link");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};
