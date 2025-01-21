import { UserPreviewGigDetails } from '../cmps/UserPreviewGigDetails'
import SvgIcon from './SvgIcon.jsx'
import { Link } from 'react-router-dom';

export function GigDetailsHeader({ gig, owner }) {
    const isFrom = "gig-details"

    return (
        <section className="gig-details-header">
            <div className="gig-tags flex">
                <span className="home-icon">

                    <Link to={`/gig`}> <SvgIcon iconName="homeBlack" /></Link>
                    <span className="separator"> / </span>
                </span>
                {gig.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                        {tag}
                        {idx < gig.tags.length - 1 && <span className="separator"> / </span>}
                    </span>
                ))}
            </div>
            <h2 className="gig-title">{gig.title}</h2>
            <UserPreviewGigDetails
                key={gig._id}
                owner={owner}
                gig={gig}
                isFrom={isFrom}
            />
        </section>
    )
}