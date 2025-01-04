import { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from './SvgIcon.jsx';
import { ImageCarousel } from './ImageCarousel.jsx';

export function GigPreview({ gig }) {

    const [newImgIndex, setNewImgIndex] = useState(0);
    const { owner, imgUrls, _id, title, price } = gig || {};
    const { imgUrl, fullName, level, rate } = owner || {};

    return (
        <>
            {imgUrls && imgUrls.length > 0 && (
                <ImageCarousel
                    images={imgUrls} 
                    gigId={_id} 
                    newImgIndex={newImgIndex}
                    setNewImgIndex={setNewImgIndex}
                />
            )}
            <div className="preview-userinfo">
                <div className="preview-user-info">
                    {imgUrl && (
                        <img
                            className="avatar"
                            src={imgUrl} 
                            alt={`${fullName || 'User'} gig avatar`}
                        />
                    )}
                    <span className="full-name">{fullName || 'Unknown User'}</span>
                    <span className="level">
                        {level || 'No Level'}
                        {level === 'Pro Talent' && <SvgIcon iconName="customCheckMarkSunIcon" />}
                        {level === 'New Seller' && <SvgIcon iconName="newSeedlingIcon" />}
                    </span>
                </div>
                <div className="user-rating">
                    <span className="rating-score">{rate ? `★${rate}` : 'No Rating'}</span>
                </div>
                {title && (
                    <Link className="link-gig-details" to={`/gigdetails/${_id}`}>
                        {title}
                    </Link>
                )}
                <span className="price">{price ? `From $${price}` : 'No Price'}</span>
            </div>
        </>
    );
}
