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
    if (process.env.NODE_ENV === "production") {
      res.redirect("/");
    } else {
      res.redirect("http://localhost:5173/");
    }
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (process.env.NODE_ENV === "production") {
      res.redirect("/signin");
    } else {
      res.redirect("http://localhost:5173/");
    }
  });
});
