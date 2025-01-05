import { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from './SvgIcon.jsx';
import { ImageCarousel } from './ImageCarousel.jsx';

export function GigPreview({ gig }) {
  const [newImgIndex, setNewImgIndex] = useState(0);
  const { owner, imgUrls, _id, title, price, level, rate } = gig || {};
  const { imgUrl, fullName } = owner || {};

  return (
    <div className="gig-preview">
      <div className="image-container">
        {imgUrls && imgUrls.length > 0 && (
          <ImageCarousel
            images={imgUrls}
            gigId={_id}
            newImgIndex={newImgIndex}
            setNewImgIndex={setNewImgIndex}
          />
        )}
        <button className="heart-icon">
        <SvgIcon iconName="transparentHeart" />
        </button>
      </div>

      {/* Gig Details */}
      <div className="gig-details">
        {/* User Info */}
        <div className="user-info">
          {imgUrl && (
            <img
              className="avatar"
              src={imgUrl}
              alt={`${fullName || 'User'} avatar`}
            />
          )}
          <div className="user-text">
            <span className="full-name">{`Ad by ${fullName || 'Unknown User'}`}</span>
            <span className="level">
              {level || 'No Level'}
              {level === 'Pro Talent' && <SvgIcon iconName="customCheckMarkSunIcon" />}
              {level === 'New Seller' && <SvgIcon iconName="newSeedlingIcon" />}
            </span>
          </div>
        </div>

        {/* Title */}
        {title && (
          <Link className="link-gig-details" to={`/gigdetails/${_id}`}>
            {title}
          </Link>
        )}

        {/* Rating and Price */}
        <div className="gig-meta">
          <div className="user-rating">
            <span className="rating-score">{rate ? `★${rate}` : 'No Rating'}</span>
          </div>
          <div className="price">
            {price ? `From ₪${price}` : 'No Price'}
          </div>
        </div>
      </div>
    </div>
  );
}
