import { storageService } from '../async-storage.service'
import { utilService } from '../util.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user'

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  saveLoggedinUser,
}
window.userService = userService

async function getUsers() {
  const users = await storageService.query(BASE_URL)
  return users.map(user => {
    delete user.password
    return user
  })
}

async function getById(userId) {
  return await storageService.get(BASE_URL, userId)
}

function remove(userId) {
  return storageService.remove(BASE_URL, userId)
}

async function update({ _id, score }) {
  const user = await storageService.get(BASE_URL, _id)
  user.score = score
  await storageService.put(BASE_URL, user)

  // When admin updates other user's details, do not update loggedinUser
  const loggedinUser = getLoggedinUser()
  if (loggedinUser._id === user._id) saveLoggedinUser(user)

  return user
}

async function login(userCred) {
  const users = await storageService.query(BASE_URL)
  const user = users.find(user => user.username === userCred.username)

  if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
  if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  userCred.score = 10000

  const user = await storageService.post(BASE_URL, userCred)
  return saveLoggedinUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    score: user.score,
    isAdmin: user.isAdmin
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
  const user = {
    username: 'admin',
    password: 'admin',
    fullname: 'Mustafa Adminsky',
    imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    score: 10000,
  }

  const newUser = await storageService.post(BASE_URL, userCred)
  console.log('newUser: ', newUser)
}

function getUserRatingCount(user) {
  let countMax = 1000
  let countMin = 1
  switch (user.level) {
    case 'Level 1':
      countMax = 100
      break
    case 'Level 2':
      countMin = 101
      countMax = 500
      break
    case 'Pro Talent':
      countMin = 501
      break

    default:
      break
  }
  return utilService.getRandomIntInclusive(countMin, countMax)
}

const users = [
  {
    _id: 'u101',
    fullName: 'Michael Johnson',
    avatar:
      'https://res.cloudinary.com/dtffr5wya/image/upload/v1736450821/user5_q3foea.webp',
    username: 'michael123',
    password: '123',
    level: 'level 2',
    rating: 4.9,
    isAdmin: false,
    ordersInQueue: 350,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'Germany',
    languages: ['English', 'Hebrew', 'Russian'],
    isTopRated: true,
  },
  {
    _id: 'u102',
    fullName: 'Sarah Thompson',
    avatar:
      'https://res.cloudinary.com/dtffr5wya/image/upload/v1736450821/user6_kleh1k.webp',
    username: 'sarah123',
    password: '123',
    level: 'level 3',
    rating: 4.8,
    isAdmin: false,
    ordersInQueue: 500,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'Germany',
    languages: ['English', 'Hebrew', 'Russian'],
    isTopRated: true,
  },
  {
    _id: 'u103',
    fullName: 'James Smith',
    avatar:
      'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5654d3568f8747212dd091b08fe74c0e-1647431958963/990b0a86-6471-411d-924d-3dc8e36edd84.jpg',
    username: 'james123',
    password: '123',
    level: 'level 1',
    rating: 4.7,
    isAdmin: false,
    ordersInQueue: 350,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'Italy',
    languages: ['English', 'Hebrew', 'Russian'],
    isTopRated: true,
  },
  {
    _id: 'u104',
    fullName: 'Emily Davis',
    avatar:
      'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/22f08dfbaf47e57403f63b2b4907f823-1664365762969/fc9a7ca8-9d41-40d1-93b4-3f5bc9590756.jpg',
    username: 'emily123',
    password: '123',
    level: 'level 2',
    rating: 4.9,
    isAdmin: false,
    ordersInQueue: 350,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'France',
    languages: ['English', 'Hebrew', 'Russian'],
    isTopRated: true,
  },
  {
    _id: 'u105',
    fullName: 'Robert Brown',
    avatar:
      'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/92ac15d229eed1f1268a9e4386ab9737-1698169005889/f9e22136-fc15-4815-a21a-1c8888c143b8.jpg',
    username: 'robert123',
    password: '123',
    level: 'level 2',
    rating: 4.8,
    isAdmin: false,
    ordersInQueue: 350,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'Germany',
    languages: ['English', 'Hebrew', 'Russian'],
    isTopRated: true,
  },
  {
    _id: 'u106',
    fullName: 'Sophia Wilson',
    avatar:
      'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1ac47e17fe087ed4c26ecd9cc76fa610-1540164169333/7b9bde04-bdce-4954-a4c6-5e20fd4a4652.jpg',
    username: 'sophia123',
    password: '123',
    level: 'level 1',
    rating: 4.6,
    isAdmin: false,
    ordersInQueue: 350,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'France',
    languages: ['English', 'Hebrew', 'Russian'],
    isTopRated: true,
  },
  {
    _id: 'u107',
    fullName: 'Jane Foster',
    avatar:
      'https://res.cloudinary.com/dtffr5wya/image/upload/v1736451803/user16_qzvmct.webp',
    username: 'jane123',
    password: '123',
    level: 'level 1',
    rating: 4.9,
    isAdmin: true,
    ordersInQueue: 350,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'France',
    languages: ['English', 'Hebrew', 'Russian'],
    isTopRated: true,
  },
  {
    _id: 'u1011',
    fullName: 'Coding Foster',
    avatar:
      'https://res.cloudinary.com/dtffr5wya/image/upload/v1736451803/user16_qzvmct.webp',
    username: 'jane123',
    password: '123',
    level: 'level 3',
    rating: 4.2,
    isAdmin: true,
    ordersInQueue: 350,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'France',
    languages: ['English', 'Hebrew', 'Italian'],
    isTopRated: true,
  },
  {
    _id: 'g110',
    fullName: 'Janny Scarlet',
    avatar:
      'https://res.cloudinary.com/dtffr5wya/image/upload/v1736451803/user16_qzvmct.webp',
    username: 'Janny123',
    password: '123',
    level: 'level 1.4',
    rating: 1.2,
    isAdmin: true,
    ordersInQueue: 10,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'France',
    languages: ['English', 'Hebrew', 'Italian'],
    isTopRated: true,
  },
  {
    _id: 'u1024',
    fullName: 'Jessica Kimberly',
    avatar:
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/32174966/original/13102889_10209675038819539_3441425076441038959_n.jpg',
    username: 'Jes',
    password: '123',
    level: 'level 4',
    rating: 1.2,
    isAdmin: true,
    ordersInQueue: 230,
    createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
    from: 'France',
    languages: ['English', 'Hebrew', 'German'],
    isTopRated: true,
  }
  
  
]

_createUsers()

async function _createUsers() {
  localStorage.setItem('user', JSON.stringify(users))
}