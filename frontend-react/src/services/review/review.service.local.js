import { httpService } from '../http.service.js'
import { storageService } from '../async-storage.service'

const BASE_URL = 'review/'
const STORAGE_KEY_R = 'review'

export const reviewService = {
    query,
    remove,
    save,
    getById
}

function query(filterBy = {}) {

    return httpService.get(BASE_URL, filterBy)
}

async function getById(reviewId) {
    console.log("Fetching review with ID:", reviewId);

    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEY_R)) || [];
    const review = reviews.find((r) => r.id === reviewId);

    if (!review) {
        throw new Error(`Get failed, cannot find entity with id: ${reviewId} in: ${STORAGE_KEY_R}`);
    }

    return review
}




function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function save(review) {
    if (review._id) {
        console.log('changed review')
        return httpService.put(BASE_URL, review)
    } else {
        console.log('created review')
        return httpService.post(BASE_URL, review)
    }
}

const reviews = [
    {
        "id": "r101",
        "userId": "u101",
        "userName": "HappyClient123",
        "rating": 5,
        "text": "Fantastic work! Highly recommended.",
        "gigId": "g101"
    },
    {
        "id": "r102",
        "userId": "u102",
        "userName": "HappyClient123",
        "rating": 5,
        "text": "Fantastic work! Highly recommended.",
        "gigId": "g101"
    },
    {
        "id": "r103",
        "userId": "u103",
        "userName": "HappyClient123",
        "rating": 5,
        "text": "Fantastic work! Highly recommended.",
        "gigId": "g101"
    },
    {
        "id": "r104",
        "userName": "WebsiteOwner789",
        "rating": 4.5,
        "text": "Great templates for my online store.",
        "gigId": "g102"
    },
    {
        "id": "r105",
        "userId": "u105",
        "userName": "WebsiteOwnerXYZ",
        "rating": 4,
        "text": "Informative and SEO-friendly articles.",
        "gigId": "g103"
    },
    {
        "id": "r106",
        "userId": "u105",
        "userName": "HappyCouple123",
        "rating": 5,
        "text": "Beautiful custom song for our wedding.",
        "gigId": "g104"
    },
    {
        "id": "r107",
        "userId": "u105",
        "userName": "MarketingGuru123",
        "rating": 5,
        "text": "Amazing 3D animations for our marketing video.",
        "gigId": "g105"
    },
    {
        "id": "r108",
        "userId": "u102",
        "userName": "GoalAchieverXYZ",
        "rating": 5,
        "text": "Sophie's coaching was transformative for my business.",
        "gigId": "g106"
    }
]
_createreviews()

async function _createreviews() {
    localStorage.setItem('review', JSON.stringify(reviews))
}

(async () => {
    try {
        const review = await reviewService.getById("r101");
        console.log("Fetched Review:", review);
    } catch (err) {
        console.error("Error:", err.message);
    }
})();