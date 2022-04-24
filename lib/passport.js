import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

import { getUser, createUser } from './db'

import fs from 'fs'
const googleSecrets = JSON.parse(fs.readFileSync("./client_secrets.json"))

const clientID = googleSecrets.web.client_id
const clientSecret = googleSecrets.web.client_secret
const callbackURL = googleSecrets.web.redirect_uris[process.env.NODE_ENV === 'production' ? 1 : 0]

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
  const [user, error] = await getUser({ email })
  done(error, user, { error })
})

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { displayName, emails } = profile
      const [user, error] = await getUser({email: emails[0].value})
      if (error && error.message === "User not found") {
        const newUser = {
          name: displayName,
          email: emails[0].value,
          accessToken,
        }
        const [retUser, retError] = await createUser(newUser)
        done(retError, retUser, { error: retError })
      } else {
        done(error, user, { error })
      }
    },
  )
)

export default passport