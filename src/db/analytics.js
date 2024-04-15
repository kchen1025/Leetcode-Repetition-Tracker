import { db } from "../models/index.js";

export async function getAvgTimeTakenDB(accountId) {
  const [results, metadata] = await db.sequelize.query(
    `select avg(aq.time_taken) as avg_time_taken, t.name as topic_name, t.id as topic_id 
    from account_question aq 
    join question q on q.question_id=aq.question_id 
    join question_topic qt on qt.question_id=aq.question_id 
    join topic t on t.id=qt.topic_id
    where aq.account_id = :accountId
    group by t.name, t.id
    order by avg_time_taken asc;`,
    {
      replacements: { accountId },
    }
  );
  return results;
}

export async function getAvgTimeTakenByTopicDB(accountId, topicId) {
  const [results, metadata] = await db.sequelize.query(
    `select q.question_id, t.name, q.title, avg(aq.time_taken) as avg_time_taken
    from account_question aq 
    join question q on q.question_id=aq.question_id 
    join question_topic qt on qt.question_id=aq.question_id 
    join topic t on t.id=qt.topic_id
    where t.id = :topicId and aq.account_id=:accountId
    group by t.name, q.title, q.question_id
    order by avg_time_taken asc;`,
    {
      replacements: { accountId, topicId },
    }
  );
  return results;
}

export async function getFailedProportionsDB(accountId) {
  const [results, metadata] = await db.sequelize.query(
    `
SELECT 
    t.name AS topic_name,
    COUNT(*) AS total_questions,
    COUNT(CASE WHEN aq.redo THEN 1 END) AS redo_questions,
    SUM((aq.time_taken > 30)::int) AS questions_over_30_sec
FROM 
    account_question aq
JOIN 
    question q ON aq.question_id = q.question_id
JOIN 
    question_topic qt ON q.question_id = qt.question_id
JOIN 
    topic t ON qt.topic_id = t.id
WHERE 
    aq.account_id = :accountId
GROUP BY 
    t.name
ORDER BY 
    total_questions asc;`,
    {
      replacements: { accountId },
    }
  );
  return results;
}

export async function getMetadataDB(accountId, topicId) {
  const [results, metadata] = await db.sequelize.query(
    `
        SELECT
            aq.question_id,
            q.title as computed_name,
            aq.name as actual_name,
            qt.topic_id,
            t.name as topic_name,
            aq.datetime_completed
        FROM
            account_question aq
        JOIN
            question q ON aq.question_id = q.question_id
        JOIN
            question_topic qt ON q.question_id = qt.question_id
        JOIN
            topic t ON qt.topic_id = t.id
        WHERE
            aq.account_id = :accountId and t.id = :topicId
        ORDER BY
            aq.datetime_completed;`,
    {
      replacements: { accountId, topicId },
    }
  );
  return results;
}
