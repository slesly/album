import * as types from '../types'

const initState = {
    products: null,
}

export const productsReducer =  (state = initState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        default:
            return state
    }
}