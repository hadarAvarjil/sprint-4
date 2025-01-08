import { useState, useEffect } from 'react'

import { userService } from '../services/user'
import { reviewService } from '../services/review'

import { GigReview } from "../cmps/GigReview.jsx"


export function GigReviewsList({ gig }) {
    const [gigReviews, setGigReviews] = useState([])

    useEffect(() => {
        loadGigReviews()
    }, [gig])

    async function loadGigReviews() {
        const storedReviews = JSON.parse(localStorage.getItem("review"));
        console.log("Stored Reviews:", storedReviews);
        if (!gig || gig.reviews.length === 0) return;
    
        try {
          
            const loadedGigReviews = await Promise.all(
                gig.reviews.map((review) => {
                    const reviewId = typeof review === 'string' ? review : review.id
                    console.log('Fetching review with ID:', reviewId)
                    return reviewService.getById(reviewId)
                })
            );

            console.log('Loaded Gig Reviews:', loadedGigReviews)
    
            // Fetch user details for each review
            const reviewsByUsers = await Promise.all(
                loadedGigReviews.map(async (review) => {
                    try {
                        const user = await userService.getById(review.userId)
                        return {
                            ...review,
                            username: user.username,
                            imgUrl: user.imgUrl,
                            country: user.country,
                        };
                    } catch (err) {
                        console.error(`Error fetching user with ID ${review.userId}:`, err);
                        return {
                            ...review,
                            username: 'Unknown',
                            imgUrl: null,
                            country: 'Unknown',
                        }
                    }
                })
            )
    
            setGigReviews(reviewsByUsers);
        } catch (err) {
            console.error('Unexpected error while loading gig reviews:', err)
        }
    }

    return (
        <section className="gig-reviews">
            <h3>Reviews</h3>
            {gigReviews.length !== 0 && (
                <ul className="reviews">
                    {gigReviews.map((review) => (
                        <li key={review.id}>
                            <GigReview review={review} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )

}