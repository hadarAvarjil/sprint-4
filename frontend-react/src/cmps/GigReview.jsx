
export function GigReview({ review }) {
    const {
        username,
        imgUrl,
        country,
        rating,
        createAt,
        text,
        price,
        duration,
    } = review


    const flagImages = {
        Germany: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1736502946/flag_Germany_yebov4.png',
        France: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1736503610/Flag_France_s39umw.png',
        Italy: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1736503614/Flag_Italy_ws6uah.png',
    }

    return (
        <div className="gig-review">
            <header className="review-header">
                <div className="reviewer-info">
                    <img
                        className="reviewer-img"
                        src={imgUrl || '/path/to/default-avatar.png'}
                        alt={`${username}'s profile`}
                    />
                    <div>
                        <h4>{username}</h4>
                        <p className="review-country">{country}</p>
                        <img
                            className="reviewer-country-img"
                            src={flagImages[country] || '/path/to/default-flag.png'}
                            alt={`${country}'s flag`}
                        />
                    </div>
                </div>
            </header>
            <div className="review-content">
                <div className="review-rating">
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                    <span className="review-date">{createAt}</span>
                </div>
                <p className="review-text">{text}</p>
            </div>

            <footer className="review-footer">
                <div className="review-price">₪ {price}</div>
                <div className="review-duration">{duration}</div>
            </footer>
        </div>
    )
}