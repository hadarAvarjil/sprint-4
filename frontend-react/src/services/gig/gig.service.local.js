
import { storageService } from '../async-storage.service'
import { userService } from '../user'
import { utilService } from '../util.service.js'

const STORAGE_KEY = 'gig'
_createGigs()

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg,
}
window.cs = gigService
console.log('Hi')

async function query(filterBy = { txt: '', price: 0 }) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.title, 'i')
      gigs = gigs.filter(
        (gig) => regex.test(gig.title) || regex.test(gig.description)
      )
    }
    if (filterBy.price) {
      gigs = gigs.filter((gig) => gig.price <= filterBy.price)
    }
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
  if (gig._id) {
    savedGig = await storageService.put(STORAGE_KEY, gig)
  } else {
    gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(STORAGE_KEY, gig)
  }
  return savedGig
}

async function addGigMsg(gigId, txt) {
    const gig = await getById(gigId)
    if (!gig.msgs) gig.msgs = []
    const msg = {
      id: utilService.makeId(),
      by: userService.getLoggedinUser(),
      txt,
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)
    return msg
}

function getEmptyGig() {
    return {
        title: 'Gig-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(30, 600),
    }
}

function _createGigs() {
  let gigs = utilService.loadFromStorage(STORAGE_KEY);
  if (!gigs || !gigs.length) {
    gigs = [
      {
        _id: "g101",
        title: "I will create logos for your company",
        category: "Graphics & Design",
        tags: ["Logo & Brand Identity", "Art & Illustration", "Marketing Design"],
        price: 45.99,
        description: "I will design a unique and eye-catching logo for your brand.",
        daysToMake: 3,
        ownerId: "u101",
        imgUrls: [
          
                      "https://images.unsplash.com/photo-1627163439134-7a8c47e08208?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1625014618427-fbc980b974f5?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  ],
        likedByUsers: [],
        reviews: [
          {
            id: "101",
            userName: "HappyClient123",
            rating: 5,
            text: "Fantastic work! Highly recommended.",
          },
        ],
      },
      {
        _id: "g102",
        title: "I will design stunning website templates",
        category: "Graphics & Design",
        tags: ["Web & App Design", "Product & Gaming"],
        price: 59.99,
        description: "I specialize in creating beautiful and responsive website templates.",
        daysToMake: 7,
        ownerId: "u102",
        imgUrls: [
          "https://via.placeholder.com/400x300?text=Template1",
          "https://via.placeholder.com/400x300?text=Template2",
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "201",
            userName: "WebsiteOwner789",
            rating: 4.5,
            text: "Great templates for my online store.",
          },
        ],
      },
      {
        _id: "g103",
        title: "I will write engaging blog articles for your niche",
        category: "Writing & Translation",
        tags: ["Content Writing", "Editing & Critique"],
        price: 29.99,
        description: "High-quality blog articles to boost your website's SEO.",
        daysToMake: 3,
        ownerId: "u103",
        imgUrls: [
          "https://via.placeholder.com/400x300?text=Article1",
          "https://via.placeholder.com/400x300?text=Article2",
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "301",
            userName: "WebsiteOwnerXYZ",
            rating: 4,
            text: "Informative and SEO-friendly articles.",
          },
        ],
      },
      {
        _id: "g104",
        title: "I will compose a personalized song for your special occasion",
        category: "Music & Audio",
        tags: ["Music Production", "Audio Engineering"],
        price: 69.99,
        description: "Celebrate your moments with a custom song.",
        daysToMake: 7,
        ownerId: "u104",
        imgUrls: [
          "https://via.placeholder.com/400x300?text=Song1",
          "https://via.placeholder.com/400x300?text=Song2",
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "401",
            userName: "HappyCouple123",
            rating: 5,
            text: "Beautiful custom song for our wedding.",
          },
        ],
      },
      {
        _id: "g105",
        title: "I will create custom 3D animations for your project",
        category: "Video & Animation",
        tags: ["3D Animation", "Visual Effects"],
        price: 99.99,
        description: "Transform your ideas into stunning 3D animations.",
        daysToMake: 7,
        ownerId: "u105",
        imgUrls: [
          "https://via.placeholder.com/400x300?text=Animation1",
          "https://via.placeholder.com/400x300?text=Animation2",
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "501",
            userName: "MarketingGuru123",
            rating: 5,
            text: "Amazing 3D animations for our marketing video.",
          },
        ],
      },
      {
        _id: "g106",
        title: "I will provide coaching for your business growth",
        category: "Business",
        tags: ["Business Formation", "Growth"],
        price: 49.99,
        description: "Achieve your business goals with personalized coaching.",
        daysToMake: 3,
        ownerId: "u106",
        imgUrls: [
          "https://via.placeholder.com/400x300?text=Coaching1",
          "https://via.placeholder.com/400x300?text=Coaching2",
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "601",
            userName: "GoalAchieverXYZ",
            rating: 5,
            text: "Sophie's coaching was transformative for my business.",
          },
        ],
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, gigs);
  }
}


