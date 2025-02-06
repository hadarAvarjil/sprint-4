import { orderService } from '../../services/order'
import { store } from '../store'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, SET_ORDER, UPDATE_ORDER, ADD_ORDER_MSG, SET_FILTER, SET_DROPDOWN_ORDERS } from '../reducers/order.reducer'

export async function loadOrders(filterBy = {}) {
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch(getCmdSetOrders(orders))
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function loadOrdersForDropDown(filterBy = {}) {
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch(getCmdSetDropdownOrders(orders))
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}


export async function saveOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        const actionType = savedOrder._id ? UPDATE_ORDER : ADD_ORDER
        store.dispatch({ type: actionType, order: savedOrder })
        return savedOrder
    } catch (err) {
        console.error('Cannot save order', err)
        throw err
    }
}

export async function loadOrder(orderId) {
    try {
        const order = await orderService.getById(orderId)
        store.dispatch(getCmdSetOrder(order))
    } catch (err) {
        console.log('Cannot load order', err)
        throw err
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch(getCmdremoveOrder(orderId))
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getCmdaddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getCmdupdateOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}
export function setFilter(filterBy) {
    return {
        type: SET_FILTER,
        filterBy,
    }
}


export async function addOrderMsg(orderId, txt) {
    try {
        const msg = await orderService.addOrderMsg(orderId, txt)
        store.dispatch(getCmdaddOrderMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add order msg', err)
        throw err
    }
}

function getCmdSetOrders(orders) {
    return {
        type: SET_ORDERS,
        orders
    }
}
function getCmdSetOrder(order) {
    return {
        type: SET_ORDER,
        order
    }
}
function getCmdSetDropdownOrders(orders) {
    return {
        type: SET_DROPDOWN_ORDERS,
        orders,
    }
}

function getCmdremoveOrder(orderId) {
    return {
        type: REMOVE_ORDER,
        orderId
    }
}
function getCmdaddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}
function getCmdupdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        order
    }
}
function getCmdaddOrderMsg(msg) {
    return {
        type: ADD_ORDER_MSG,
        msg
    }
}

async function unitTestActions() {
    await loadOrders()
    await addOrder(orderService.getEmptyOrder())
    await updateOrder({
        _id: 'm1oC7',
        title: 'Order-Good',
    })
    await removeOrder('m1oC7')
}
