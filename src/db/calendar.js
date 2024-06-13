import { db } from "../models/index.js";

export async function getCalendarByTagDB(accountId, tagName) {
  const [results, metadata] = await db.sequelize.query(
    `
SELECT
    aq.*    
FROM
    account_question aq
JOIN
    question q ON aq.question_id = q.question_id
WHERE
    aq.account_id = :accountId and aq.tag like CONCAT('%', :tagName, '%')
ORDER BY
    aq.datetime_completed;
  `,
    {
      replacements: { accountId, tagName },
    }
  );
  return results;
}
