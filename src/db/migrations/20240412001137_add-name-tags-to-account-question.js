export async function up(knex) {
  return knex.raw(`
        alter table account_question add column name text;
        alter table account_question add column tag text;
        ALTER TABLE account_question ALTER COLUMN question_id DROP NOT NULL;
    `);
}

export async function down(knex) {
  return knex.raw(`
  ALTER TABLE account_question ALTER COLUMN question_id SET NOT NULL;
  alter table account_question drop column tag;
  alter table account_question drop column name;
    `);
}
