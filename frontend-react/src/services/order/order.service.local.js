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

async function query() {
    let orders = await storageService.query(STORAGE_KEY)
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
        // buyerId: '',
        // buyerName: '',
        sellerId: '',
        price: 0,
        createdAt: Date.now(),
        orderState: 'pending'
    }
}

async function createOrder(gigId, sellerId, price, title, daysToMake) {
    console.log(gigId, sellerId, price, title, daysToMake);

    const order = getEmptyOrder()
    // order.buyerId = buyerId
    // order.buyerName = buyerName
    order.gigId = gigId
    order.sellerId = sellerId
    order.price = price
    order.title = title
    order.daysToMake = daysToMake
    console.log('order', order);

    return order
}

