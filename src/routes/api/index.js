import * as express from "express";
import { requireLogin } from "../../middlewares/index.js";
import cool from "cool-ascii-faces";
import {
  getAvgTimeTaken,
  getAvgTimeTakenByTopic,
  getFailedProportions,
  getMetadata,
} from "../../controllers/analyticsController.js";
import { getQuestions } from "../../controllers/questionsController.js";

export const apiRouter = express.Router();

// requireLogin is used to protect our route and return a 401 when we are not logged in
apiRouter.get("/", requireLogin, async (req, res) => {
  res.send(req.user);
});

apiRouter.get("/emoji", requireLogin, async (req, res) => {
  res.json({ message: cool() });
});

apiRouter.get("/current_user", requireLogin, async (req, res) => {
  res.send(req.user);
});

apiRouter.get("/questions", requireLogin, getQuestions);

apiRouter.get("/avg-time-taken", requireLogin, getAvgTimeTaken);
apiRouter.get(
  "/avg-time-taken/topic/:topicId",
  requireLogin,
  getAvgTimeTakenByTopic
);

apiRouter.get("/failed-proportions", requireLogin, getFailedProportions);

apiRouter.get("/metadata/topic/:topicId", requireLogin, getMetadata);
