import {
  getAvgTimeTakenDB,
  getAvgTimeTakenByTopicDB,
  getFailedProportionsDB,
  getMetadataDB,
} from "../db/analytics.js";

export async function getAvgTimeTaken(req, res) {
  try {
    const results = await getAvgTimeTakenDB(req.user.id);
    res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}

export async function getAvgTimeTakenByTopic(req, res) {
  try {
    const results = await getAvgTimeTakenByTopicDB(
      req.user.id,
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
    const results = await getFailedProportionsDB(req.user.id);
    res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}

export async function getMetadata(req, res) {
  try {
    const results = await getMetadataDB(req.user.id, req.params.topicId);
    res.status(200).send({ results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}
