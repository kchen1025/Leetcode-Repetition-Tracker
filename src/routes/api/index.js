import * as express from "express";
// import Account from '../../controllers/Account.controller';
import { requireLogin } from "../../middlewares/index.js";
import cool from "cool-ascii-faces";

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
