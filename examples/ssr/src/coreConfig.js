import { Core, modules } from 'react-octopus'
import { createLogger } from 'redux-logger'
import { UserListBlock } from './apps/users/blocks'
import { combineReducers } from 'redux'


export function getConfig() {
    const reducer = combineReducers({
        users: combineReducers({
            list: UserListBlock._reducer,
        }),
    })

    const config = {
        modules: [
            modules.Store,
            modules.Requests,
            modules.Helmet,
            modules.Router,
        ],
        store: {
            middleware: [createLogger()],
            reducer: reducer,
        },
        componentForSSR: require('./components/AppServer').default,
        routes: require('./routes').default,
        requests: {
            middlewares: {
                prepareData: (data) => {
                    if (!data.headers['Content-Type']) {
                        data.headers['Content-Type'] = 'application/json'
                    }

                    if (data.body && data.headers['Content-Type'] === 'application/json') {
                        data.body = JSON.stringify(data.body)
                    }
                },
                prepareResult: (response) => {
                    if (response.status >= 500) {
                        console.log('Error!')
                        throw Error(response)
                    }

                    return response.json().then(json => ({
                        json: json,
                        response: response,
                        status: response.status,
                        ok: response.ok,
                    }))
                },
            },
            defaultHost: 'https://reqres.in/api',
        }
    }

    if (global.IS_SERVER) {
        config.modules.push(modules.SSR)
    } else {
        config.store.initialState = window.__INITIAL_STATE__
        config.store.middleware = [createLogger()]
    }

    return config
}


export function getCore() {
    return Core.getInstance(getConfig)
}
