import Core from '../Core'
import Store from './Store'


it('createStore', () => {
    const core = new Core({
        modules: [Store],
    })

    core.store.initialState.test = true
    const store = core.store.createStore()
    const state = store.getState()

    expect(state.test).toBeTruthy()
})
