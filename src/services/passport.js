import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AccountController from "../controllers/Account.controller.js";

export default (passport) => {
  // server-side authentication setup
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const Account = AccountController();
    const existingUser = await Account.findAll({ where: { id } });
    done(null, existingUser[0].toJSON());
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "whatever",
        clientSecret: process.env.GOOGLE_SECRET || "whatever",
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("accesstoken", accessToken, refreshToken, profile);
        const Account = AccountController();
        const existingUser = await Account.findAll({
          where: { google_id: profile.id },
        });

        // look for this profile.id in our database. if it doesn't exist, create one.
        // if it does, sign in
        if (existingUser?.length) {
          done(null, existingUser[0].toJSON());
        } else {
          // doesn't exist, create it
          const email = profile?.emails?.filter((x) => x)[0].value;
          const newAccount = await Account.create({
            username: profile.displayName,
            google_id: profile.id,
            email,
            name: profile.displayName,
          });
          done(null, newAccount.toJSON());
        }
      }
    )
  );
};
