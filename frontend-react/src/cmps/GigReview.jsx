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
        Japan: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1737144994/Flag_of_Japan.svg_pmozsw.webp',
        Israel: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1737144932/Israel_jr4jnd.png',
        Argentina: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1737144994/Flag_of_Argentina.svg_whdtwz.png',
        Spain: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190117/Flag_of_Spain_fms23r.svg',
        Colombia: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190117/Flag_of_Colombia.svg_dkgc5d.png',
        China: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190117/Flag_of_the_People_s_Republic_of_China.svg_jt7c5t.png',
        Brazil: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190103/brazil_fbakic.png',
        Hungary: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190103/hungary_vwyptx.png',
        India: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190102/india_lo1t0a.webp',
        Canada: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190102/canada_gx2ahk.png',
        Mexico: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190102/mexico_flag_wnrgie.png',
        Australia: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190103/Australia_prpqhk.jpg',
        Chile: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190102/chile_qs8f5m.png',
        Mongolia: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190103/mongolia_lllghz.png',
        Ethiopia: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190780/ethiopia_h2k6hd.png',
        Bulgaria: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190720/bulgaria_cs5g56.png',
        Ghana: 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738190719/ghana_vrbelb.png'
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
                        <div className="country-info">
                            <img
                                className="reviewer-country-img"
                                src={flagImages[country] || '/path/to/default-flag.png'}
                                alt={`${country}'s flag`}
                            />
                            <p className="review-country">{country}</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="review-content">
                <div className="rating-line"></div>
                <div className="review-rating">
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                    <label className="review-rating-span">{rating}</label>
                    <div className="circle-separator"></div>
                    <span className="review-date">2 months ago</span>
                </div>
                <p className="review-text">{text}</p>
            </div>

            <footer className="review-footer">
                <div className="price-info">
                    <span className="review-price">{price}</span>
                    <label className="price-label">Price</label>
                </div>
                <div className="vertical-line"></div>
                <div className="review-duration">
                    <span>{duration}</span>
                    <label className="duration-label">Duration</label>
                </div>
            </footer>
        </div>
    )
}