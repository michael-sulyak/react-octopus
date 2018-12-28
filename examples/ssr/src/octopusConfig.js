import { Octopus, tentacles } from 'react-octopus'
import { createLogger } from 'redux-logger'
import { UserListReducer } from './apps/users/blocks'
import { applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'


export function getConfig() {
    const reducer = combineReducers({
        users: combineReducers({
            list: UserListReducer.$reducer,
        }),
    })

    const config = {
        tentacles: [
            tentacles.Store,
            tentacles.Helmet,
            tentacles.Router,
        ],
        debug: true,
        store: {
            enhancer: applyMiddleware(thunk, createLogger()),
            reducer: reducer,
        },
        componentForSSR: require('./components/AppServer').default,
        routes: require('./routes').default,
    }

    if (global.IS_SERVER) {
        config.tentacles.push(tentacles.SSR)
    } else {
        config.store.initialState = window.__INITIAL_STATE__
    }

    return config
}

export function getOctopus() {
    return Octopus.getInstance(getConfig)
}
