import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { deleteUser, createUser, updateUser } from '../../lib/db'

const handler = nextConnect()

handler
  .use(auth)
  .get((req, res) => {
    const { accessToken, email, _id, ...nonSensitive } = req.user["_doc"]
    res.json({user: nonSensitive})
  })
  
export default handler