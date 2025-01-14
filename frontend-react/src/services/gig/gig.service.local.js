
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

async function query(filterBy = { txt: '', price: 0, cat: '' }) {
  var gigs = await storageService.query(STORAGE_KEY)

  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    gigs = gigs.filter(
      (gig) => regex.test(gig.title) || regex.test(gig.description)
    )
  }

  if (filterBy.price) {
    gigs = gigs.filter((gig) => gig.price <= filterBy.price)
  }

  if (filterBy.cat) {
    gigs = gigs.filter(gig => gig.category === filterBy.cat)
  }

  return gigs
}

function getById(gigId) {
  return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
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
            id: "r101",
            userId: "u107",
            rating: 5,
            text: "Fantastic work! Highly recommended.",
            duration: "5 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })

          },
          {
            id: "r102",
            userId: "u102",
            rating: 5,
            text: "Fantastic work! Highly recommended.",
            duration: "4 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })

          },
          {
            id: "r103",
            userId: "u103",
            rating: 5,
            text: "Fantastic work! Highly recommended.",
            duration: "6 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })

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
        ownerId: "g110",
        imgUrls: [
          "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://plus.unsplash.com/premium_photo-1672280783572-4a254a8e71d5?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&q=80&w=1982&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "r101",
            userId: "u103",
            rating: 5,
            text: "Fantastic work! Highly recommended.",
            duration: "6 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })

          },
          {
            id: "r102",
            userId: "u103",
            rating: 5,
            text: "Fantastic work! Highly recommended.",
            duration: "11 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
          },
          {
            id: "r103",
            userId: "u102",
            rating: 5,
            text: "Fantastic work! Highly recommended.",
            duration: "15 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
          },
        ],
      },
      {
        _id: "g111",
        title: "I will provide hilarious video game 'assistance",
        category: "Video & Animation",
        tags: ["Video Game Help", "Editing & Critique","Gaming Shenanigans"],
        price: 59.99,
        description: "Are you tired of serious video game help? Look no further! I offer 'assistance' that's guaranteed to make you laugh. Expect unexpected in-game antics, questionable advice, and loads of humor. Let's turn your gaming experience into a comedy show!",
        daysToMake: "Express 24H",
        ownerId: "u102",
        imgUrls: [
          "https://cdn.oneesports.gg/cdn-data/2023/04/HonkaiStarRail_fight_March7th_NoUID-1024x576.jpg",
          "https://images.unsplash.com/photo-1668554245893-2430d0077217?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://steamuserimages-a.akamaihd.net/ugc/594780161286882425/A47BB6497BE6F2ADE5025B788371A451548057DC/?imw=1024&imh=640&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
          "https://as2.ftcdn.net/v2/jpg/05/94/67/61/1000_F_594676149_iWmSdOenTt4qeIXk2K7ns7jluleq6z30.jpg",
          "https://i.pinimg.com/1200x/21/59/e3/2159e3e67e1d70966fd6a117fa1fc97b.jpg"
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "r104",
            rating: 4.5,
            text: "Great templates for my online store.",
            duration: "10 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
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
          "https://i.pinimg.com/736x/18/56/ec/1856ec9952897140028e99266db376c7.jpg",
          "https://i.ytimg.com/vi/e_654r3-RDw/maxresdefault.jpg",
          "https://i.ytimg.com/vi/_PAvtT0oRxA/maxresdefault.jpg",
          "https://i.pinimg.com/originals/e0/b0/b9/e0b0b9aed78851f9b5d6e3de764fc931.jpg",
          "https://photoshopcafe.com/wp-content/uploads/2019/01/comic-book.jpg"
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "r105",
            rating: 4,
            text: "Informative and SEO-friendly articles.",
            duration: "12 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
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
          "https://plus.unsplash.com/premium_photo-1661301044600-8856088002c7?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1518117940395-1ac64e773a75?auto=format&fit=crop&q=80&w=2076&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://plus.unsplash.com/premium_photo-1661270443731-c45d03f37d93?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "r106",
            userId: "u105",
            rating: 5,
            text: "Beautiful custom song for our wedding.",
            duration: "10 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
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
          "https://www.classical-music.uk/media/210527/adobestock_133816186.jpeg?&width=780&quality=60",
          "https://www.careersinmusic.com/wp-content/uploads/2015/05/composer.jpg",
          "https://www.careersinmusic.com/wp-content/uploads/2023/03/make-music-online-free-1024x683.jpg",
          "https://t4.ftcdn.net/jpg/06/23/40/77/240_F_623407783_fttTA4xS771ajMoMRXcGjGg8NoohsAbD.jpg",
          "https://www.tracksandfields.com/blog/wp-content/webpc-passthru.php?src=https://www.tracksandfields.com/blog/wp-content/uploads/2016/02/sheetmusic_header.jpg&nocache=1"
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "r107",
            userId: "u105",
            rating: 5,
            text: "Amazing 3D animations for our marketing video.",
            duration: "6 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
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
        daysToMake: "Up to 3 days",
        ownerId: "u106",
        imgUrls: [
          "https://img.freepik.com/premium-vector/cute-robot-mascot-logo-cartoon-character-illustration_8169-227.jpg",
          "https://img.freepik.com/premium-vector/cute-robot-logo-vector-design-template_612390-492.jpg",
          "https://img.freepik.com/free-vector/hand-drawn-data-logo-template_23-2149203374.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais",
          "https://img.freepik.com/free-vector/cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais",
          "https://img.freepik.com/free-vector/cute-robot-holding-clipboard-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5184.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais"
        ],
        likedByUsers: [],
        reviews: [
          {
            id: "r108",
            userId: "u102",
            rating: 5,
            text: "Sophie's coaching was transformative for my business.",
            duration: "3 days",
            price: '$100 - $200',
            createAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
          },
        ],
      },

      {
                _id: "g110",
                title: "I will compose a personalized song for your special occasion",
                category: "Music & Audio",
                tags: [
                  "Lessons & Transcriptions",
                  "Music Production & Writing",
                  "Audio Engineering & Post Production"
                ],
                price: 69.99,
                description: "Elevate your online presence with custom digital avatars. Whether you're a content creator, gamer, or social media enthusiast, I'll design unique avatars that represent your personality and style.",
                daysToMake: 7,
                ownerId: "u1024",
                imgUrls: [
            "https://www.pcworld.com/wp-content/uploads/2023/06/puff-Daniel-Lez%CC%87uch-Unsplash.jpg?resize=1024%2C576&quality=50&strip=all",
                        "https://i.pcmag.com/imagery/roundups/07zK5ZMCRXxdm3S7ZnlT3Xw-10.fit_lim.size_768x.jpg",
                        "https://i.pcmag.com/imagery/roundups/05ndzgdtChn6KbVqVnZdaJf-3.fit_lim.size_768x.png",
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_600,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png",
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_450,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg"
                ],
                likedByUsers: [],
                reviews: [
                  {
                    id: "401",
                    userName: "HappyCouple123",
                    rating: 5,
                    text: "Sophia composed the most beautiful song for our wedding day. It was incredibly touching and brought tears to our eyes. She captured our love story perfectly, and we couldn't be happier!"
                  },
                  {
                    id: "402",
                    userName: "AnniversaryBliss456",
                    rating: 4.8,
                    text: "We hired Sophia to create a song for our anniversary celebration, and it was a hit! The melody and lyrics were exquisite. Sophia's talent shines through in her work, and we highly recommend her."
                  },
                  {
                    id: "403",
                    userName: "EventPlannerXYZ",
                    rating: 4.5,
                    text: "Sophia's songwriting skills are impressive. She composed a theme song for our corporate event that left a lasting impression on our guests. However, there were minor delays in delivery."
                  }
                ]
              },
      
    ]
    utilService.saveToStorage(STORAGE_KEY, gigs)
  }
}


