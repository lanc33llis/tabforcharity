import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { deleteUser, createUser, updateUser } from '../../lib/db'

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    const { accessToken, email, _id, ...nonSensitive } = req.user["_doc"]
    const mineroApiRes = await fetch('https://api.minero.cc/stats/payout?secret=e21db08b6957edf74b227866351a978c')
    const data  = await mineroApiRes.json()
    const payout = data.payoutPer1MHashes
    const xmrToUsd = data.xmrToUsd
    res.json({user: {...nonSensitive, payout, xmrToUsd}})
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