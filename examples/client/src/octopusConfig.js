import { applyMiddleware, combineReducers } from 'redux'
import { Octopus, tentacles } from 'react-octopus'
import { createLogger } from 'redux-logger'
import { UserListReducer } from './apps/users/blocks'
import thunk from 'redux-thunk'


export function getConfig() {
    const reducer = combineReducers({
        users: combineReducers({
            list: UserListReducer.$reducer,
        }),
    })

    return {
        tentacles: [
            tentacles.Store,
        ],
        debug: true,
        store: {
            enhancer: applyMiddleware(thunk, createLogger()),
            reducer: reducer,
        },
    }
}

export function getOctopus() {
    return Octopus.getInstance(getConfig)
}
