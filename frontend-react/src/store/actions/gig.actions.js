import { gigService } from '../../services/gig/gig.service.local.js'
import { store } from '../store'
import { ADD_GIG, REMOVE_GIG, SET_GIGS, SET_GIG, UPDATE_GIG, ADD_GIG_MSG, SET_FILTER, SET_LIKED_GIGS, SET_RECOMMENDED_GIGS } from '../reducers/gig.reducer'

export async function loadGigs(filterBy = {}) {
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
console.log('Hi')

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

export async function saveGig(gig) {
    const type = gig._id ? UPDATE_GIG : ADD_GIG
    try {
        const savedGig = await gigService.save(gig)
        store.dispatch({ type, gig: savedGig })
        return savedGig
    } catch (err) {
        console.log('Cannot save gig', err)
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
export function setFilter(filterBy) {
 
    
    return {
        type: SET_FILTER,
        filterBy,
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
export async function toggleGigLike(gigId) {
    return async (dispatch, getState) => {
        try {
            const loggedInUser = getState().userModule.user;
            if (!loggedInUser) throw new Error('User not logged in');

            const gigs = getState().gigModule.gigs;
            const gig = gigs.find(gig => gig._id === gigId);
            if (!gig) throw new Error('Gig not found');

            const updatedGig = { ...gig };
            updatedGig.likedByUsers = Array.isArray(updatedGig.likedByUsers) ? [...updatedGig.likedByUsers] : [];

            if (updatedGig.likedByUsers.includes(loggedInUser._id)) {
                updatedGig.likedByUsers = updatedGig.likedByUsers.filter(userId => userId !== loggedInUser._id);
            } else {
                updatedGig.likedByUsers.push(loggedInUser._id);
            }
            await gigService.save(updatedGig);

            dispatch({ type: 'UPDATE_GIG', gig: updatedGig });
        } catch (err) {
            console.error('Failed to toggle like on gig:', err);
        }
    };
}


export async function loadLikedGigs() {
    try {
        const loggedInUser = store.getState().userModule.user;
        if (!loggedInUser) throw new Error('User not logged in');

        const gigs = await gigService.query();
        const likedGigs = gigs.filter((gig) =>
            gig.likedByUsers?.includes(loggedInUser._id)
        );

        store.dispatch({ type: 'SET_LIKED_GIGS', likedGigs });
    } catch (err) {
        console.error('Cannot load liked gigs:', err);
        throw err;
    }
}

export async function loadRecommendedGigs(category) {
    try {
        const gigs = await gigService.query({ category });
        store.dispatch({ type: 'SET_RECOMMENDED_GIGS', gigs });
    } catch (err) {
        console.error('Cannot load recommended gigs:', err);
        throw err;
    }
}


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

async function unitTestActions() {
    await loadGigs()
    await addGig(gigService.getEmptyGig())
    await updateGig({
        _id: 'm1oC7',
        title: 'Gig-Good',
    })
    await removeGig('m1oC7')
}
