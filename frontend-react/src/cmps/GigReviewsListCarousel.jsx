import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SvgIcon from './SvgIcon.jsx'


import { userService } from "../services/user.service.js";
import { GigReview } from "../cmps/GigReview.jsx";

export function GigReviewsListCarousel({ gig }) {
    const [gigReviews, setGigReviews] = useState([]);

    useEffect(() => {
        loadGigReviews();
    }, [gig]);

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
                            imgUrl: user.imgUrl,
                            country: user.from
                        };
                    } catch (err) {
                        console.error(`Error fetching user with ID ${review.userId}:`, err);
                        return {
                            ...review,
                            username: "Unknown",
                            imgUrl: null,
                            country: "Unknown"
                        };
                    }
                })
            );

            setGigReviews(reviewsByUsers);
        } catch (err) {
            console.error("Unexpected error while loading gig reviews:", err);
        }
    }

    const settings = {
        dots: false, // Disable dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, // Enable arrows
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <section className="gig-reviews-list-carousel">
            <section className="reviews-title flex">
                <h3>What people loved about this freelancer</h3>
                <span
                    className="reviews-count"
                    onClick={() => {
                        const reviewsSection = document.getElementById('reviews-section');
                        if (reviewsSection) {
                            reviewsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    See all reviews
                </span> 
            </section>
            {gigReviews.length !== 0 ? (
                <Slider {...settings}>
                    {gigReviews.map((review) => (
                        <div key={review.id}>
                            <GigReview review={review} />
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>No reviews available.</p>
            )}
        </section>
    );
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center", 
                background: "white",
                color: "black",
                borderRadius: "50%",
                height: "32px",
                width: "32px",
                zIndex: 1,
                cursor: "pointer",
                boxShadow:'rgba(0, 0, 0, 0.02) 0px 1.2px 1.92251px 0px, rgba(0, 0, 0, 0.04) 0px 2px', 
                marginRight:'-12px',
                marginTop:'-14px'
                
               
            }}
            onClick={onClick}
        >
            <SvgIcon iconName={'rightArrow'} />
        </div>
    )
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className} 
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                color: "black",
                borderRadius: "50%",
                height: "32px",
                width: "32px",
                zIndex: 1,
                cursor: "pointer",
                boxShadow:'rgba(0, 0, 0, 0.02) 0px 1.2px 1.92251px 0px, rgba(0, 0, 0, 0.04) 0px 2px',
                marginTop:'-14px',
            }}
            onClick={onClick}
        >
            <SvgIcon  iconName={'leftArrow'} />
        </div>
    )
}