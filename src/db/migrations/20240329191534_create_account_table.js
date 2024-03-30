export async function up(knex) {
  return knex.raw(`
    create table account(
      id serial primary key,
      google_id text,
      username text not null,
      email text not null,
      name text not null,
      date_of_birth timestamptz,
      last_login timestamptz,
      added timestamptz default now(),
      updated timestamptz default now()
    )
  `);
}

export async function down(knex) {
  return knex.raw("DROP TABLE IF EXISTS account");
}
