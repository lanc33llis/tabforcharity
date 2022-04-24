import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  id: ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  refreshToken: {
    type: String,
  },
  accessToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  totalMined: {
    type: Number,
    default: 0
  },
  timeMined: {
    type: Number,
    default: 0
  }
})

const conn = mongoose.createConnection(process.env.MONGODB_URI)
conn.model("User", userSchema)

export default conn

export { userSchema as User }