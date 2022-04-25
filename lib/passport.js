import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

import { getUser, createUser } from './db'

import fs from 'fs'

var clientID, clientSecret, callbackURL

if (process.env.NODE_ENV === 'production') {
  clientID = process.env.GOOGLE_CLIENT_ID
  clientSecret = process.env.GOOGLE_CLIENT_SECRET
  callbackURL = process.env.GOOGLE_CALLBACK_URL
} else {
  const googleSecrets = JSON.parse(fs.readFileSync("./client_secrets.json"))
  
  clientID = googleSecrets.web.client_id
  clientSecret = googleSecrets.web.client_secret
  callbackURL = googleSecrets.web.redirect_uris[0]
}

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
          refreshToken,
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