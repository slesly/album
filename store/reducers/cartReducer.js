import * as types from '../types'

const initState = {
    items: null,
    quantity: 0
}

export const cartReducer =  (state = initState, action) => {
    switch (action.type) {
        case types.GET_CART:
            return {
                ...state,
                items: action.cart,
                quantity: action.cart.reduce((a, b) => a + (b.count || 0), 0)
            }
        case types.CHANGE_CART_ITEM:
            return {
                ...state,
                items: action.cart,
                quantity: action.cart.reduce((a, b) => a + (b.count || 0), 0)
            }
        case types.ADD_CART_ITEMS:
            return {
                ...state,
                items: action.cart,
                quantity: action.cart.reduce((a, b) => a + (b.count || 0), 0)
            }
        case types.DELETE_CART_ITEMS:
            return {
                ...state,
                items: action.cart,
                quantity: action.cart.reduce((a, b) => a + (b.count || 0), 0)
            }
        case types.EMPTY_CART:
            return {
                ...state,
                items: action.cart,
                quantity: 0
            }
        default:
            return state
    }
}