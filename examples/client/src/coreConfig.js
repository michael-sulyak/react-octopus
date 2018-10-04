import { combineReducers } from 'redux'
import { Core, modules } from 'react-octopus'
import { createLogger } from 'redux-logger'
import { UserListBlock } from './apps/users/blocks'


export function getConfig() {
    const reducer = combineReducers({
        users: combineReducers({
            list: UserListBlock._reducer,
        }),
    })

    return {
        modules: [
            modules.Store,
            modules.Requests,
        ],
        debug: true,
        store: {
            middleware: [createLogger()],
            reducer: reducer,
        },
        requests: {
            middlewares: {
                prepareData: (data) => {
                    data.headers['Content-Type'] = 'application/json'
                    data.body = data.body && JSON.stringify(data.body)
                },
                prepareResult: (response) => (
                    response.json().then(json => ({
                        json,
                        response,
                        status: response.status,
                        ok: response.ok,
                    }))
                ),
            },
            defaultHost: 'https://reqres.in/api',
        }
    }
}

export function getCore() {
    return Core.getInstance(getConfig)
}
