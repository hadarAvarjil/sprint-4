import { legacy_createStore as createStore, combineReducers } from 'redux'

import { gigReducer } from './reducers/gig.reducer'
import { userReducer } from './reducers/user.reducer'
import { reviewReducer } from './reducers/review.reducer'
import { orderReducer } from './reducers/order.reducer'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
    orderModule: orderReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

