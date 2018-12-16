import { Octopus, tentacles } from 'react-octopus'
import { createLogger } from 'redux-logger'
import { UserListReducer } from './apps/users/blocks'
import { combineReducers } from 'redux'


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
            middleware: [createLogger()],
            reducer: reducer,
        },
        componentForSSR: require('./components/AppServer').default,
        routes: require('./routes').default
    }

    if (global.IS_SERVER) {
        config.tentacles.push(tentacles.SSR)
    } else {
        config.store.initialState = window.__INITIAL_STATE__
        config.store.middleware = [createLogger()]
    }

    return config
}

export function getOctopus() {
    return Octopus.getInstance(getConfig)
}
