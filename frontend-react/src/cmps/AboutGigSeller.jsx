import { GetToKnow } from '../cmps/GetToKnow'
import { useSelector } from 'react-redux'

export function AboutGigSeller({ owner, gig }) {
    if (!owner) return null


    return (
        <>
            < GetToKnow gig={gig} owner={owner} />
            <div className="about-gig-seller">
                <div className="gig-seller-details">
                    <div className="gig-seller-row-from">
                        <strong>From</strong>
                        <p>{owner.from}</p>
                    </div>
                    <div className="gig-seller-row-member-since">
                        <strong>Member since</strong>
                        <p>{owner.createAt}</p>
                    </div>
                    <div className="gig-seller-row-avg">
                        <strong>Avg. response time</strong>
                        <p>about 3 hours ago</p>
                    </div>
                    <div className="gig-seller-row-last-delivery">
                        <strong>Last delivery</strong>
                        <p>January 2025</p>
                    </div>
                    <div className="gig-seller-row-languages">
                        <strong>Languages</strong>
                        <p>{owner.languages?.length ? owner.languages.join(', ') : 'Not specified'}</p>
                    </div>
                    <div className='gig-seller-row-about'>
                        <p className='gig-seller-row-about'>{owner.about}</p>
                    </div>
                </div>
            </div >
        </>
    )
}
