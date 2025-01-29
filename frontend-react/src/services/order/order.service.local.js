import { storageService } from '../async-storage.service'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    createOrder,
}
window.cs = orderService

async function query(filterBy) {
    
    let orders = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        orders = orders.filter(order => order.sellerId === filterBy)
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    await storageService.remove(STORAGE_KEY, orderId)
}
async function save(order) {
    let savedOrder;
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order);
    } else {
        savedOrder = await storageService.post(STORAGE_KEY, order);
    }
    return savedOrder;
}

function getEmptyOrder() {
    return {
        gigId: '',
        buyerId: '',
        sellerId: '',
        price: 0,
        createdAt: Date.now(),
        orderState: 'pending'
    }
}

async function createOrder(buyerId, gigId, sellerId, price, title, daysToMake) {
    const order = getEmptyOrder()

    order.buyerId = buyerId
    order.gigId = gigId
    order.sellerId = sellerId
    order.price = price
    order.title = title
    order.daysToMake = daysToMake
    return order
}

