import { db } from "../models/index.js";

export async function getQuestionsDB(accountId) {
  const [results, metadata] = await db.sequelize.query(
    `
    SELECT
        aq.*    
    FROM
        account_question aq
    JOIN
        question q ON aq.question_id = q.question_id
    WHERE
        aq.account_id = :accountId
    ORDER BY
        aq.datetime_completed;
  `,
    {
      replacements: { accountId },
    }
  );
  return results;
}

export async function getTagsDB(accountId) {
  const [results, metadata] = await db.sequelize.query(
    `
SELECT
    aq.tag    
FROM
    account_question aq
WHERE
    aq.account_id = :accountId
GROUP BY
    aq.tag
  `,
    {
      replacements: { accountId },
    }
  );
  return results;
}
