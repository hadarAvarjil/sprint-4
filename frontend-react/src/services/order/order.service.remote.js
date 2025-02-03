import { httpService } from '../http.service'

const BASE_URL = 'order/'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  createOrder,
}

async function query(filterBy = {}) {
    const orders = await httpService.get(BASE_URL, filterBy)
    return orders
}

async function getById(orderId) {
    const order = await httpService.get(BASE_URL + orderId)
    return order
}

function remove(orderId) {
    return httpService.delete(BASE_URL + orderId)
}

async function save(order) {
    let savedOrder;
    if (order._id) {
      savedOrder = await httpService.put(`order/${order._id}`, order)
    } else {
      savedOrder = await httpService.post(BASE_URL, order);
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
    orderState: 'Pending'
  }
}

async function createOrder(buyerId, gigId, sellerId, price, title, daysToMake, gigFirstImgUrl) {
  const order = getEmptyOrder()

  order.buyerId = buyerId
  order.gigId = gigId
  order.sellerId = sellerId
  order.price = price
  order.title = title
  order.daysToMake = daysToMake
  order.gigFirstImgUrl = gigFirstImgUrl
  return order
}
