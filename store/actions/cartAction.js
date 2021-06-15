import * as types from '../types'
import firebase from '../../config/fbConfig'

const firestore = firebase.firestore()

export const fetchCartItems = () => async dispatch => {
    // firebase code
    firestore.collection('cart').get()
    .then(cartCollection => {
        dispatch({
            type: types.GET_CART,
            cart: cartCollection.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            }),
            quantity: cartCollection.docs.map(doc => doc.data()).reduce((a, b) => a + (b.count || 0), 0)
        })
    })
}

export const changeCartItem = (id, count) => async (dispatch, getState) => {
    const state = getState()

    const changedItemCartId = state.cart.items.find(item => item.productID === id)

    changedItemCartId.count = count

    // firebase code
    firestore.collection('cart').doc(changedItemCartId.id).set({
        ...changedItemCartId,
    })
    .then(() => {
        dispatch({
            type: types.CHANGE_CART_ITEM,
            cart: [...state.cart.items],
        })
    })
}

export const addCartItem = item => async (dispatch, getState) => {
    const state = getState()
    const isItemExist = state.cart.items.find(storeCartItem => storeCartItem.productID === item.id)
    if (isItemExist) {
        isItemExist.count++
        // firebase code
        firestore.collection('cart').doc(isItemExist.id).set({
            ...isItemExist,
        })
        .then(() => {
            dispatch({
                type: types.CHANGE_CART_ITEM,
                cart: [...state.cart.items],
            })
        })
    } else {
        const newItem = {
            productID: item.id,
            title: item.title,
            image: item.image,
            price: item.price,
            count: 1,
        }

        // firebase code
        firestore.collection('cart').add(newItem)
        .then(() => {
            dispatch({
                type: types.ADD_CART_ITEMS,
                cart: [...state.cart.items, newItem],
            })
        })
    }
}

export const deleteCartItem = id => async (dispatch, getState) => {
    const state = getState()

    const deletedItem = state.cart.items.find(storeCartItem => storeCartItem.productID === id)

    const newCartItems = state.cart.items.filter(storeCartItem => storeCartItem.productID !== id)
        // firebase code
        firestore.collection('cart').doc(deletedItem.id).delete()
        .then(() => {
            dispatch({
                type: types.DELETE_CART_ITEMS,
                cart: newCartItems,
            })
        })
}

export const emprtyCart = () => async (dispatch, getState) => {
        // firebase code
        firestore.collection('cart').get()
        .then(cartItems => {
            cartItems.forEach(item => {
                item.ref.delete();
            });
        })
        .then(() => {
            dispatch({
                type: types.EMPTY_CART,
                cart: [],
            })
        })
}