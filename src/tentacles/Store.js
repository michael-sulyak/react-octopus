import { createStore } from 'redux'


export default class Store {
    name = 'store'
    reducer = (state) => state
    initialState = {}
    enhancer = undefined

    constructor(octopus) {
        this.octopus = octopus
    }

    mount(data) {
        const config = data.store || {}
        this.initialState = config.initialState || this.initialState
        this.enhancer = config.enhancer || this.enhancer
        this.reducer = config.reducer || this.reducer

        this.octopus.asyncHandle('beforeCreateElementOnServer', data => {
            data.props.store = this.createStore()
        })

        return true
    }

    createStore() {
        const dataForStore = {
            reducer: this.reducer,
            preloadedState: this.initialState,
            enhancer: this.enhancer,
        }

        this.octopus.event('beforeCreateStore', dataForStore)

        const store = createStore(
            dataForStore.reducer,
            dataForStore.preloadedState,
            dataForStore.enhancer,
        )

        this.octopus.event('afterCreateStore', store)

        return store
    }
}
