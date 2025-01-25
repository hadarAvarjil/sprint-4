import { httpService } from '../http.service'
const BASE_URL = 'review/'

export const reviewService = {
	add,
	query,
	remove,
	getById,
	save
}

async function getById(orderId) {
    const order = await httpService.get(BASE_URL + orderId)
    return order
}


function query(filterBy) {
	var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
	return httpService.get(`review${queryStr}`)
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, aboutUserId }) {
	return await httpService.post(`review`, { txt, aboutUserId })
}

function save(order) {
    if (order._id) return httpService.put(BASE_URL, order)
    else return httpService.post(BASE_URL, order)
}
