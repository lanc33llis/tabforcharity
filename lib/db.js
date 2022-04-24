import mongoose from "./mongoose"
import { Types } from "mongoose"

import { UpdateResult, DeleteResult } from "mongodb"
import crypto from 'crypto'

export async function createUser({name, email, refreshToken, accessToken}) {
  const User = mongoose.model("User")

  const user = await User.findOne({ email })  
  if (user) {
    return [null, Error("User already exists")]
  } else {
    try {
      const newUser = new User({
        name,
        email,
        refreshToken,
        accessToken
      })

      await newUser.save()
      return [newUser, null]
    } catch (err) {
      return [null, err]
    }
  }
}

export async function getUser({ email }) {
  const User = mongoose.model("User")

  try {
    const user = await User.findOne({ email })
    if (user) {
      return [user, null]
    }
    return [null, Error("User not found")]
  } catch (err) {
    return [null, err]
  }
}

export async function updateUser({email, update}) {
  const User = mongoose.model("User")

  try {
    const retUpdate = await User.updateOne({ email }, { "$set": update })
    return [retUpdate, null]
  } catch (err) {
    return [null, err]
  }
}

export async function deleteUser({email}) {
  const User = mongoose.model("User")

  try {
    const deleteResult = await User.deleteOne({ email })
    return [deleteResult, null]
  } catch (err) {
    return [null, err]
  }
} 