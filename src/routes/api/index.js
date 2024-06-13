import * as express from "express";
import { requireLogin } from "../../middlewares/index.js";
import cool from "cool-ascii-faces";
import {
  getAvgTimeTaken,
  getAvgTimeTakenByTopic,
  getFailedProportions,
  getMetadata,
} from "../../controllers/analyticsController.js";
import {
  getQuestions,
  getTags,
} from "../../controllers/questionsController.js";
import { getCalendarByTag } from "../../controllers/calendarController.js";

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
apiRouter.get("/questions/tags", requireLogin, getTags);

apiRouter.get("/avg-time-taken", requireLogin, getAvgTimeTaken);
apiRouter.get(
  "/avg-time-taken/topic/:topicId",
  requireLogin,
  getAvgTimeTakenByTopic
);

apiRouter.get("/calendar/tag", requireLogin, getCalendarByTag);

apiRouter.get("/failed-proportions", requireLogin, getFailedProportions);

apiRouter.get("/metadata/topic/:topicId", requireLogin, getMetadata);
