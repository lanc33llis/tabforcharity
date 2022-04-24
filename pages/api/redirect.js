import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import passport from '../../lib/passport'

const handler = nextConnect()

handler
  .use(auth)
  .get(passport.authenticate('google'), (req, res) => {
    res.setHeader('Location', '/dashboard')
    res.status(302).end()
  })

export default handler