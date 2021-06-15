import * as types from '../types'
import firebase from '../../config/fbConfig'
export const fetchProducts = () => async dispatch => {
    // firebase code
    const firestore = firebase.firestore()
    firestore.collection('products').get().then(productsCollection => {
        dispatch({
            type: types.GET_PRODUCTS,
            products: productsCollection.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
        })
    })
}