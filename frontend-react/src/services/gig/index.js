const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { gigService as local } from '../gig.service.js'
import { gigService as remote } from './gig.service.remote'

function getEmptyGig() {
	return {
		vendor: makeId(),
		speed: getRandomIntInclusive(80, 240),
		msgs: [],
	}
}

function getDefaultFilter() {
    return {
        title: '',
        cat: '',
        min: '',
        max: '',
        level: '',
        tag: '',
        time: '',
        page: 1,
    };
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = { getEmptyGig, getDefaultFilter, ...service }



if (DEV) window.gigService = gigService
