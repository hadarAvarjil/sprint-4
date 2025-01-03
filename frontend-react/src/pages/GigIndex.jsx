import { useState, useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig } from '../store/actions/gig.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/'
import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'

export function GigIndex() {
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const gigs = useSelector((storeState) => storeState.gigModule.gigs)
    const dispatch = useDispatch() 
 
    useEffect(() => {
        loadGigs(filterBy).catch(() => showErrorMsg('Cannot load gigs'))
    }, [filterBy]) 

    function onRemoveGig(gigId) {
        removeGig(gigId)
            .then(() => showSuccessMsg('Gig removed'))
            .catch(() => showErrorMsg('Cannot remove gig'))
    }
    console.log('Hi')

    function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.title = prompt('Title?')
        addGig(gig)
            .then((savedGig) => showSuccessMsg(`Gig added (id: ${savedGig._id})`))
            .catch(() => showErrorMsg('Cannot add gig'))
    }

    function onUpdateGig(gig) {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        updateGig(gigToSave)
            .then((savedGig) => showSuccessMsg(`Gig updated, new price: ${savedGig.price}`))
            .catch(() => showErrorMsg('Cannot update gig'))
    }

    function onSetFilter(filterBy) {
        dispatch({ type: 'SET_GIGS_FILTER', filterBy }) 
    }

    return (
        <main className="Gig-index main-layout">
            <div className="gigless">
                <GigFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <GigList gigs={gigs} onRemoveGig={onRemoveGig} onUpdateGig={onUpdateGig} onAddGig={onAddGig} />
            </div>
        </main>
    )
}

