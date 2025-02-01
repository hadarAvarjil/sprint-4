export const SET_GIGS = 'SET_GIGS'
export const SET_GIG = 'SET_GIG'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const ADD_GIG_MSG = 'ADD_GIG_MSG'
export const SET_FILTER = 'SET_FILTER'
import { gigService } from '../../services/gig.service.js'
const initialState = {
    gigs: [],
    gig: null,
    filterBy: gigService.getFilterFromParams(new URLSearchParams(window.location.search)),
}


export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        case SET_GIG:
            newState = { ...state, gig: action.gig }
            break
        case REMOVE_GIG:
            const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigs, lastRemovedGig }
            break
        case ADD_GIG:
            newState = { ...state, gigs: [...state.gigs, action.gig] }
            break
        case UPDATE_GIG:
            gigs = state.gigs.map(gig => (gig._id === action.gig._id) ? action.gig : gig)
            newState = { ...state, gigs }
            break
        case ADD_GIG_MSG:
            newState = { ...state, gig: { ...state.gig, msgs: [...state.gig.msgs || [], action.msg] } }
            break
        case SET_FILTER: 
            newState = { ...state, filterBy: action.filterBy }
            break
        default:
    }
    return newState
}

