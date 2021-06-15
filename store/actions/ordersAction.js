import * as types from '../types'
import firebase from '../../config/fbConfig'

const firestore = firebase.firestore()

export const fetchOrders = () => async dispatch => {
    // firebase code
    firestore.collection('orders').get().then(ordersCollection => {
        dispatch({
            type: types.GET_ORDERS,
            orders: ordersCollection.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
        })
    })
}

export const addOrder = values => async (dispatch, getState) => {
    const state = getState()
    const newOrder = {
        ...values,
        items: [...state.cart.items]
    }

    // firebase code
    firestore.collection('orders').add(newOrder)
    .then(() => {
        dispatch({
            type: types.ADD_ORDER,
            order: newOrder,
        })
    })
}