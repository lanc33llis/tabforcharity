import nextConnect from 'next-connect'
import passport from '../../lib/passport'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get((req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard')
    } else {
      next()
    }
  }, passport.authenticate('google', { scope: ['profile', 'email'] }))

export default handler