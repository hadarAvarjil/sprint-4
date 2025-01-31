import dotenv from 'dotenv'
import { userService } from '../user/user.db.service.js'
import { loggerService } from '../../services/logger.service.js'

export const authService = {
  signup,
  login,
  getLoginToken,
  validateToken,
}

dotenv.config()

async function login(username, password) {
  console.log(`Attempting to login user: ${username}`)
  loggerService.debug(`auth.service - login with username: ${username}`)

  const user = await userService.getByUsername(username)
  if (!user) throw new Error('Invalid username or password')

  if (password !== user.password) {
    throw new Error('Invalid username or password')
  }

  return user
}

async function signup(
  username,
  password,
  fullName,
  imgUrl,
  description = '',
  level = 'New Seller',
  rating = 0,
  country = 'United States',
  languages = [],
  education = [],
  skills = [],
  lastDelivery = null,
  balance = 0,
  isAdmin = false
) {
  console.log(`Attempting to signup user: ${username}`)

  if (!username || !password || !fullName) {
    throw new Error('Missing required details')
  }

  return userService.save({
    username,
    password, // שמירת הסיסמה כטקסט רגיל
    fullName,
    description,
    balance,
    level,
    rating,
    imgUrl,
    country,
    languages,
    education,
    skills,
    createdAt: Date.now(),
    lastDelivery,
    isAdmin,
  })
}

function getLoginToken(user) {
  const userInfo = {
    _id: user._id,
    fullName: user.fullName,
    isAdmin: user.isAdmin,
  }
  return JSON.stringify(userInfo)
}

function validateToken(loginToken) {
  try {
    const loggedinUser = JSON.parse(loginToken)
    return loggedinUser
  } catch (err) {
    console.log('Invalid login token')
  }
  return null
}
