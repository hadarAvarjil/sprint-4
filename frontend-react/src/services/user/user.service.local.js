import { storageService } from '../async-storage.service'

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

const users = [
    {
        _id: 'u101',
        fullName: 'Peter Parker',
        avatar:
            'https://qph.cf2.quoracdn.net/main-qimg-9fde28d147c243b690bdf975f8474145-lq',
        username: 'peter123',
        password: '123',
        level: 'level 2',
        rating: 4.9,
        isAdmin: false
    },
    {
        _id: 'u002',
        fullName: 'Jane Doe',
        username: 'jane123',
        password: '123',
        avatar:
            'https://img.freepik.com/premium-photo/robot-face-with-green-eyes-black-face_14865-1671.jpg?w=2000',
        level: 'level 1',
        rating: 4.9,
        isAdmin: true
    },
]
_createUsers()

async function _createUsers() {
    localStorage.setItem('user', JSON.stringify(users))
}