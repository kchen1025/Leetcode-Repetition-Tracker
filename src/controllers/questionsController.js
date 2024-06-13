import { getQuestionsDB, getTagsDB } from "../db/questions.js";
import { pivot } from "../utils/pivot.js";

export async function getQuestions(req, res) {
  try {
    const results = await getQuestionsDB(req.user.id);

    const questionIdMap = pivot(results, "question_id");

    const reducedQuestions = Object.keys(questionIdMap).reduce(
      (acc, question_id) => {
        const questions = questionIdMap[question_id];

        questions.sort((a, b) => {
          if (a.datetime_completed > b.datetime_completed) {
            return -1;
          }
          return 1;
        });

        const mostRecentQuestion = questions[0];

        const {
          name,
          datetime_completed: most_recent_datetime_completed,
          tag,
          time_taken: most_recent_time_taken,
        } = mostRecentQuestion;

        const avg_time_taken = Math.trunc(
          questions.reduce((acc, elem) => {
            acc += elem.time_taken;
            return acc;
          }, 0) / questions.length
        );

        const obj = {
          id: question_id,
          name,
          most_recent_datetime_completed,
          tag,
          most_recent_time_taken,
          avg_time_taken,
          times_solved: questions.length,
          history: [...questions],
        };

        acc = [...acc, obj];
        return acc;
      },
      []
    );

    res.status(200).send({ results: reducedQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}

export async function getTags(req, res) {
  try {
    const results = await getTagsDB(req.user.id);

    res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}
