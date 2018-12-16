import { combineReducers } from 'redux'
import { Octopus, tentacles } from 'react-octopus'
import { createLogger } from 'redux-logger'
import { UserListReducer } from './apps/users/blocks'


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
            middleware: [createLogger()],
            reducer: reducer,
        },
    }
}

export function getOctopus() {
    return Octopus.getInstance(getConfig)
}
