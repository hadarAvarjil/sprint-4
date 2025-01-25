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
        if (!gig || !Array.isArray(gig.reviews) || gig.reviews.length === 0) return;

        try {
            const reviewsByUsers = await Promise.all(
                gig.reviews.map(async (review) => {
                    try {
                        const user = await userService.getById(review.userId);
                        return {
                            ...review,
                            username: user.username,
                            imgUrl: user.avatar,
                            country: user.from,
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
        <section className="gig-reviews" id="reviews-section">
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