
export function GigReview({ review }) {
    const {
        userName,
        imgUrl,
        country,
        rating,
        createdAt,
        txt,
        priceRange,
        duration,
    } = review

    return (
        <div className="gig-review">
            <header className="review-header">
                <div className="reviewer-info">
                    <img
                        className="reviewer-img"
                        src={imgUrl || '/path/to/default-avatar.png'}
                        alt={`${userName}'s profile`}
                    />
                    <div>
                        <h4>{userName}</h4>
                        <p className="review-country">{country}</p>
                    </div>
                </div>
                <span className="repeat-client">{/* Repeat Client Badge if applicable */}</span>
            </header>

            <div className="review-content">
                <div className="review-rating">
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                    <span className="review-date">{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <p className="review-text">{txt}</p>
            </div>

            <footer className="review-footer">
                <div className="review-price">₪{priceRange}</div>
                <div className="review-duration">{duration}</div>
            </footer>
        </div>
    );
}