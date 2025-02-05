import { storageService } from '../async-storage.service'
import { utilService } from '../util.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user'
const STORAGE_KEY = 'user'


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
    // fullname: user.fullname,
    imgUrl: user.imgUrl,
    score: user.score,
    isAdmin: user.isAdmin,
    fullName: user.fullName
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}


async function _createAdmin() {
  const user = {
    username: 'admin',
    password: 'admin',
    fullname: 'Mustafa Adminsky',
    imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    score: 10000,
  }

  const newUser = await storageService.post(BASE_URL, userCred)
}

function getUserRatingCount(user) {
  let countMax = 1000
  let countMin = 1
  switch (user.level) {
    case 1:
      countMax = 100
      break
    case 2:
      countMin = 101
      countMax = 500
      break
    case 3:
      countMin = 501
      break

    default:
      break
  }
  return utilService.getRandomIntInclusive(countMin, countMax)
}

// const users = [
//   {
//     _id: 'u101',
//     fullName: 'Michael Johnson',
//     avatar:
//       'https://res.cloudinary.com/dtffr5wya/image/upload/v1736450821/user5_q3foea.webp',
//     username: 'michael123',
//     password: '123',
//     level: 3,
//     rating: 4.9,
//     isAdmin: false,
//     ordersInQueue: 350,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'Germany',
//     languages: ['English', 'Hebrew', 'Russian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//     extraSkills: 16
//   },
//   {
//     _id: 'u102',
//     fullName: 'Sarah Thompson',
//     avatar:
//       'https://res.cloudinary.com/dtffr5wya/image/upload/v1736450821/user6_kleh1k.webp',
//     username: 'sarah123',
//     password: '123',
//     level: 'Pro Talent',
//     rating: 4.8,
//     isAdmin: false,
//     ordersInQueue: 500,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'Argentina',
//     languages: ['English', 'Hebrew', 'Russian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },
//   {
//     _id: 'u103',
//     fullName: 'James Smith',
//     avatar:
//       'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5654d3568f8747212dd091b08fe74c0e-1647431958963/990b0a86-6471-411d-924d-3dc8e36edd84.jpg',
//     username: 'james123',
//     password: '123',
//     level: 'Pro Talent',
//     rating: 4.7,
//     isAdmin: false,
//     ordersInQueue: 350,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'Italy',
//     languages: ['English', 'Hebrew', 'Russian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },
//   {
//     _id: 'u104',
//     fullName: 'Emily Davis',
//     avatar:
//       'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/22f08dfbaf47e57403f63b2b4907f823-1664365762969/fc9a7ca8-9d41-40d1-93b4-3f5bc9590756.jpg',
//     username: 'emily123',
//     password: '123',
//     level: 2,
//     rating: 4.9,
//     isAdmin: false,
//     ordersInQueue: 350,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'France',
//     languages: ['English', 'Hebrew', 'Russian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },
//   {
//     _id: 'u105',
//     fullName: 'Robert Brown',
//     avatar:
//       'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/92ac15d229eed1f1268a9e4386ab9737-1698169005889/f9e22136-fc15-4815-a21a-1c8888c143b8.jpg',
//     username: 'robert123',
//     password: '123',
//     level: 3,
//     rating: 4.8,
//     isAdmin: false,
//     ordersInQueue: 350,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'Germany',
//     languages: ['English', 'Hebrew', 'Russian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },
//   {
//     _id: 'u106',
//     fullName: 'Sophia Wilson',
//     avatar:
//       'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1ac47e17fe087ed4c26ecd9cc76fa610-1540164169333/7b9bde04-bdce-4954-a4c6-5e20fd4a4652.jpg',
//     username: 'sophia123',
//     password: '123',
//     level: 3,
//     rating: 4.6,
//     isAdmin: false,
//     ordersInQueue: 350,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'France',
//     languages: ['English', 'Hebrew', 'Russian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },
//   {
//     _id: 'u107',
//     fullName: 'Jane Foster',
//     avatar:
//       'https://res.cloudinary.com/dtffr5wya/image/upload/v1736451803/user16_qzvmct.webp',
//     username: 'jane123',
//     password: '123',
//     level: 2,
//     rating: 4.9,
//     isAdmin: true,
//     ordersInQueue: 350,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'France',
//     languages: ['English', 'Hebrew', 'Russian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },
//   {
//     _id: 'u1011',
//     fullName: 'Coding Foster',
//     avatar:
//       'https://res.cloudinary.com/dtffr5wya/image/upload/v1736451803/user16_qzvmct.webp',
//     username: 'jane123',
//     password: '123',
//     level: 3,
//     rating: 4.2,
//     isAdmin: true,
//     ordersInQueue: 350,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'France',
//     languages: ['English', 'Hebrew', 'Italian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },
//   {
//     _id: 'g110',
//     fullName: 'Janny Scarlet',
//     avatar:
//       'https://res.cloudinary.com/dtffr5wya/image/upload/v1736451803/user16_qzvmct.webp',
//     username: 'Janny123',
//     password: '123',
//     level: 2,
//     rating: 1.2,
//     isAdmin: true,
//     ordersInQueue: 10,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'Argentina',
//     languages: ['English', 'Hebrew', 'Italian'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content. ustomer satisfaction is my top priority. Clients include household names such as Marriott, Microsoft, Coca-Cola, Honda and more!'

//   },
//   {
//     _id: 'u1024',
//     fullName: 'Jessica Kimberly',
//     avatar:
//       'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/32174966/original/13102889_10209675038819539_3441425076441038959_n.jpg',
//     username: 'Jes',
//     password: '123',
//     level: 1,
//     rating: 1.2,
//     isAdmin: true,
//     ordersInQueue: 230,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'Israel',
//     languages: ['English', 'Hebrew', 'German'],
//     isTopRated: true,
//     about: 'I enjoy working with businesses to create high quality promotional content.',
//     skills: ["Graphic designer", "Responsive designer", "Adobe Photoshop expert", "Website designer", "WordPress expert", "SEO expert", "UI/UX designer"],
//   },

//   {
//     _id: 'u1026',
//     fullName: 'Emily Davis',
//     avatar:
//       'https://res.cloudinary.com/dtffr5wya/image/upload/v1737138844/u1026-profile_iiq1iu.webp',
//     username: 'emily_designs',
//     password: 'design123',
//     level: 2,
//     rating: 4.9,
//     isAdmin: false,
//     ordersInQueue: 200,
//     createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
//     from: 'Italy',
//     languages: ['English', 'Spanish'],
//     isTopRated: false,
//     about: 'Passionate about crafting visually stunning designs that make brands stand out. Let me bring your vision to life!',
//     skills: [
//       'Graphic Designer',
//       'Logo Creation',
//       'Brand Identity Specialist',
//       'Adobe Illustrator Pro',
//       'Creative Strategist',
//       'Packaging Designer',
//       'Typography Expert',
//     ],
//   },
//   {
//     _id: "u1027",
//     fullName: "Compi Johnson",
//     avatar: "https://res.cloudinary.com/dtffr5wya/image/upload/v1737145984/u1027_Profile_dnpbdi.webp",
//     username: "sophia_ai_pro",
//     password: "ai_expert2025",
//     level: 3,
//     rating: 4.8,
//     isAdmin: false,
//     ordersInQueue: 350,
//     createAt: "Jan, 2025",
//     from: "Argentina",
//     languages: ["English", "German", "French"],
//     isTopRated: true,
//     about: "Expert in artificial intelligence services, specializing in machine learning, AI development, and advanced analytics. I help businesses leverage AI for innovation.",
//     skills: [
//       "Machine Learning Engineer",
//       "Data Scientist",
//       "AI Developer",
//       "Python Specialist",
//       "Deep Learning Expert",
//       "Neural Network Architect",
//       "Data Visualization Pro"
//     ]
//   },
//   {
//     _id: "u1028",
//     fullName: "Ethan Parker",
//     avatar: "https://res.cloudinary.com/dtffr5wya/image/upload/v1737146055/u1028_ophcm0.webp",
//     username: "ethan_photos",
//     password: "photo_master2025",
//     level: 3,
//     rating: 4.7,
//     isAdmin: false,
//     ordersInQueue: 150,
//     createAt: "Jan, 2025",
//     from: "Japan",
//     languages: ["English", "Spanish"],
//     isTopRated: false,
//     about: "Professional photographer with a passion for capturing moments that tell stories. Specialized in portrait, landscape, and event photography.",
//     skills: [
//       "Portrait Photography",
//       "Event Photography",
//       "Photo Editing",
//       "Lightroom Expert",
//       "Photoshop Specialist",
//       "Landscape Photography",
//       "Creative Direction"
//     ]
//   },
//   {
//     _id: "u1029",
//     fullName: "Olivia Carter",
//     avatar: "https://res.cloudinary.com/dtffr5wya/image/upload/v1737147402/u1029_qks4hx.webp",
//     username: "olivia_biz_pro",
//     password: "business2025",
//     level: 3,
//     rating: 4.9,
//     isAdmin: false,
//     ordersInQueue: 320,
//     createAt: "Jan, 2025",
//     from: "Japan",
//     languages: ["English", "French"],
//     isTopRated: true,
//     about: "Experienced business consultant specializing in corporate strategy, market analysis, and growth solutions. Passionate about helping companies achieve their goals.",
//     skills: [
//       "Business Consultant",
//       "Corporate Strategy",
//       "Market Analysis",
//       "Financial Planning",
//       "Leadership Training",
//       "Project Management",
//       "Growth Solutions Specialist"
//     ]
//   },
//   {
//     _id: "u1030",
//     fullName: "Liam Evans",
//     avatar: "https://res.cloudinary.com/dtffr5wya/image/upload/v1737148674/u1030_hgz3vs.webp",
//     username: "data_master",
//     password: "data2025",
//     level: 3,
//     rating: 4.7,
//     isAdmin: false,
//     ordersInQueue: 180,
//     createAt: "Jan, 2025",
//     from: "Israel",
//     languages: ["English", "French"],
//     isTopRated: false,
//     about: "Experienced data analyst specializing in transforming raw data into actionable insights. Passionate about data visualization, analytics, and automation.",
//     skills: [
//       "Data Analysis",
//       "Data Visualization",
//       "Python Programming",
//       "SQL Expert",
//       "Excel Specialist",
//       "Automation Scripts",
//       "Big Data Processing"
//     ]
//   },
//   {
//     _id: "u1031",
//     fullName: "Sophia Bennett",
//     avatar: "https://res.cloudinary.com/dtffr5wya/image/upload/v1737149837/u1031_vulfqd.webp",
//     username: "sophia_marketer",
//     password: "marketing2025",
//     level: "Pro Talent",
//     rating: 4.9,
//     isAdmin: false,
//     ordersInQueue: 250,
//     createAt: "Jan, 2025",
//     from: "Argentina",
//     languages: ["English", "Spanish"],
//     isTopRated: true,
//     about: "Experienced digital marketing expert specializing in SEO, social media marketing, and growth strategies. Passionate about helping businesses scale with effective campaigns.",
//     skills: [
//       "SEO Specialist",
//       "Social Media Marketing",
//       "Content Strategy",
//       "Google Ads Expert",
//       "Analytics & Reporting",
//       "Influencer Marketing",
//       "Brand Development"
//     ]
//   },
//   {
//     _id: "u1032",
//     fullName: "James Roberts",
//     avatar: "https://res.cloudinary.com/dtffr5wya/image/upload/v1737150936/u1032_twcygy.webp",
//     username: "tech_guru",
//     password: "codeMaster2025",
//     level: "New Seller",
//     rating: 1,
//     isAdmin: false,
//     ordersInQueue: 210,
//     createAt: "Jan, 2025",
//     from: "Argentina",
//     languages: ["English", "German"],
//     isTopRated: false,
//     about: "Experienced software engineer specializing in web development, app development, and automation. Passionate about delivering clean and efficient code.",
//     skills: [
//       "Full-Stack Development",
//       "Python Programming",
//       "JavaScript Specialist",
//       "Web Development",
//       "App Development",
//       "Database Management",
//       "Automation Scripts"
//     ]
//   }


// ]

// _createUsers()

// async function _createUsers() {
//   localStorage.setItem('user', JSON.stringify(users))
// }