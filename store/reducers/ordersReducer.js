import * as types from '../types'

const initState = {
    orders: [],
}

export const ordersReducer =  (state = initState, action) => {
    switch (action.type) {
        case types.GET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            }
        case types.ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.order],
            }
        default:
            return state
    }
}