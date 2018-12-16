import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'


export default class Store {
    name = 'store'
    reducer = (state) => state
    initialState = {}
    middleware = [thunk]

    constructor(core) {
        this.core = core
    }

    mount(data) {
        const config = data.store || {}
        this.initialState = config.initialState || this.initialState
        this.middleware = [
            ...this.middleware,
            ...config.middleware || [],
        ]
        this.reducer = config.reducer || this.reducer

        this.core.asyncHandle('beforeCreateElementOnServer', data => {
            data.props.store = this.createStore()
        })

        return true
    }

    createStore() {
        const dataForStore = {
            reducer: this.reducer,
            preloadedState: this.initialState,
            enhancer: applyMiddleware(...this.middleware),
        }

        this.core.event('beforeCreateStore', dataForStore)

        const store = createStore(
            dataForStore.reducer,
            dataForStore.preloadedState,
            dataForStore.enhancer,
        )

        this.core.event('afterCreateStore', store)

        return store
    }
}
