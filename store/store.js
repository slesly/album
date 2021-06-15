import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reduxFirestore ,getFirestore } from 'redux-firestore'
import { reactReduxFirebase ,getFirebase } from 'react-redux-firebase'

import fbConfig from '../config/fbConfig'
import rootReducer from './reducers'

const initState = {}

const store = createStore(rootReducer, initState, 
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reduxFirestore(fbConfig),
      reactReduxFirebase(fbConfig)
    )
)


export default store