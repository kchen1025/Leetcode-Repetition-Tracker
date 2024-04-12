import {
  getAvgTimeTakenDB,
  getAvgTimeTakenByTopicDB,
  getFailedProportionsDB,
} from "../db/analytics.js";

export async function getAvgTimeTaken(req, res) {
  try {
    const results = await getAvgTimeTakenDB(req.params.accountId);
    res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}

export async function getAvgTimeTakenByTopic(req, res) {
  try {
    const results = await getAvgTimeTakenByTopicDB(
      req.params.accountId,
      req.params.topicId
    );
    res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}

export async function getFailedProportions(req, res) {
  try {
    const results = await getFailedProportionsDB(req.params.accountId);
    res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}
