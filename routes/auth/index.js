import * as express from "express";
import passport from "passport";

export const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    res.redirect("http://localhost:5173/");
  });
});
