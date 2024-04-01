export async function up(knex) {
  return knex.raw(`
    CREATE UNIQUE INDEX idx_account_google_id ON account(google_id);

    create table question(
      question_id int primary key,
      title text,
      slug text,
      problem text,
      difficulty text,
      success_rate numeric,
      total_submissions int,
      total_accepted int,
      likes int,
      dislikes int,
      hints text,
      similar_questions integer ARRAY,
      added timestamptz default now(),
      updated timestamptz default now()
    );

    create table account_question(
      id serial primary key,
      account_id int not null,
      question_id int not null,
      questions text,
      answers text,
      time_taken int,
      redo boolean,
      datetime_completed timestamptz,
      added timestamptz default now(),
      updated timestamptz default now(),
      CONSTRAINT fk_account
          FOREIGN KEY(account_id) 
            REFERENCES account(id),
      CONSTRAINT fk_question
          FOREIGN KEY(question_id) 
            REFERENCES question(question_id)
    );

    create table topic(
      id serial primary key,
      name text not null,      
      added timestamptz default now(),
      updated timestamptz default now()
    );
    CREATE UNIQUE INDEX idx_topic_name ON topic(name);

    create table question_topic(
      id serial primary key,
      question_id int not null,
      topic_id int not null,
      added timestamptz default now(),
      updated timestamptz default now(),      
      CONSTRAINT fk_question
          FOREIGN KEY(question_id) 
            REFERENCES question(question_id),
      CONSTRAINT fk_topic
          FOREIGN KEY(topic_id) 
            REFERENCES topic(id)
    );
  `);
}

export async function down(knex) {
  return knex.raw(`
  DROP INDEX if exists idx_account_google_id;
  DROP TABLE IF EXISTS question_topic;
  DROP TABLE IF EXISTS topic;
  DROP TABLE IF EXISTS account_question;
  DROP TABLE IF EXISTS question;  
  `);
}
