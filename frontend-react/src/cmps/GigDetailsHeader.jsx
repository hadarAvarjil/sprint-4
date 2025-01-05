import { UserPreviewGigDetails } from '../cmps/UserPreviewGigDetails'

export function GigDetailsHeader({ gig, owner }) {
    const isFrom = "gig-details"

    return (
        <section className="gig-details-header">
            <h2 className="gig-title">{gig.title}</h2>
            <UserPreviewGigDetails
                key={gig._id}
                owner={owner} 
                isFrom={isFrom}
            />
        </section>
    )
}