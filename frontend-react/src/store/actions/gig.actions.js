import { gigService } from '../../services/gig'
import { store } from '../store'
import { ADD_GIG, REMOVE_GIG, SET_GIGS, SET_GIG, UPDATE_GIG, ADD_GIG_MSG } from '../reducers/gig.reducer'

export async function loadGigs(filterBy) {
    try {
        const gigs = await gigService.query(filterBy)
        store.dispatch(getCmdSetGigs(gigs))
    } catch (err) {
        console.log('Cannot load gigs', err)
        throw err
    }
}

export async function loadGig(gigId) {
    try {
        const gig = await gigService.getById(gigId)
        store.dispatch(getCmdSetGig(gig))
    } catch (err) {
        console.log('Cannot load gig', err)
        throw err
    }
}


export async function removeGig(gigId) {
    try {
        await gigService.remove(gigId)
        store.dispatch(getCmdremoveGig(gigId))
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}

export async function addGig(gig) {
    try {
        const savedGig = await gigService.save(gig)
        store.dispatch(getCmdaddGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot add gig', err)
        throw err
    }
}

export async function updateGig(gig) {
    try {
        const savedGig = await gigService.save(gig)
        store.dispatch(getCmdupdateGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err
    }
}

export async function addGigMsg(gigId, txt) {
    try {
        const msg = await gigService.addGigMsg(gigId, txt)
        store.dispatch(getCmdaddGigMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add gig msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetGigs(gigs) {
    return {
        type: SET_GIGS,
        gigs
    }
}
function getCmdSetGig(gig) {
    return {
        type: SET_GIG,
        gig
    }
}
function getCmdremoveGig(gigId) {
    return {
        type: REMOVE_GIG,
        gigId
    }
}
function getCmdaddGig(gig) {
    return {
        type: ADD_GIG,
        gig
    }
}
function getCmdupdateGig(gig) {
    return {
        type: UPDATE_GIG,
        gig
    }
}
function getCmdaddGigMsg(msg) {
    return {
        type: ADD_GIG_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadGigs()
    await addGig(gigService.getEmptyGig())
    await updateGig({
        _id: 'm1oC7',
        title: 'Gig-Good',
    })
    await removeGig('m1oC7')
    // TODO unit test addGigMsg
}
