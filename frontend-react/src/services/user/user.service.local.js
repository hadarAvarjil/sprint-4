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
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      username: 'michael123',
      password: '123',
      level: 'level 2',
      rating: 4.9,
      isAdmin: false,
      ordersInQueue: 350,
    },
    {
      _id: 'u108',
      fullName: 'Sarah Thompson',
      avatar:
        'https://cdn.pixabay.com/photo/2017/09/12/22/49/avatar-2746943_960_720.png',
      username: 'sarah123',
      password: '123',
      level: 'level 3',
      rating: 4.8,
      isAdmin: false,
      ordersInQueue: 500,
    },
    {
      _id: 'u103',
      fullName: 'James Smith',
      avatar:
        'https://cdn.pixabay.com/photo/2016/03/31/19/57/avatar-1295404_960_720.png',
      username: 'james123',
      password: '123',
      level: 'level 1',
      rating: 4.7,
      isAdmin: false,
      ordersInQueue: 350,
    },
    {
      _id: 'u104',
      fullName: 'Emily Davis',
      avatar:
        'https://cdn.pixabay.com/photo/2021/08/12/14/47/woman-6547399_960_720.png',
      username: 'emily123',
      password: '123',
      level: 'level 2',
      rating: 4.9,
      isAdmin: false,
      ordersInQueue: 350,
    },
    {
      _id: 'u105',
      fullName: 'Robert Brown',
      avatar:
        'https://cdn.pixabay.com/photo/2016/03/31/19/57/avatar-1295404_960_720.png',
      username: 'robert123',
      password: '123',
      level: 'level 2',
      rating: 4.8,
      isAdmin: false,
      ordersInQueue: 350,
    },
    {
      _id: 'u106',
      fullName: 'Sophia Wilson',
      avatar:
        'https://cdn.pixabay.com/photo/2021/02/10/15/29/man-6005338_960_720.png',
      username: 'sophia123',
      password: '123',
      level: 'level 1',
      rating: 4.6,
      isAdmin: false,
      ordersInQueue: 350,
    },
    {
      _id: 'u108',
      fullName: 'Jane Foster',
      avatar:
        'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000',
      username: 'jane123',
      password: '123',
      level: 'level 1',
      rating: 4.9,
      isAdmin: true,
      ordersInQueue: 350,
    },
  ]
  
_createUsers()

async function _createUsers() {
    localStorage.setItem('user', JSON.stringify(users))
}