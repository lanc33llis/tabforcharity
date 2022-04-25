import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { deleteUser, createUser, updateUser } from '../../lib/db'

const mineroToken = process.env.MINERO_PRIVATE_TOKE

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    const { accessToken, _id, ...nonSensitive } = req.user["_doc"]

    res.json({user: nonSensitive})
  })
  .post(async (req, res) => {
    if (req.isAuthenticated()) {
      const body = JSON.parse(req.body)
      const { update, set } = body
      if (update) {
        const [upUser, upErr] = await updateUser({ email: req.user.email, update: { "$inc": { "totalMined": update.hashes, "timeMined": update.time } }})
      }
    }
    res.status(200).end()
  })
  
export default handler