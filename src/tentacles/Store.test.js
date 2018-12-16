import Octopus from '../Octopus'
import Store from './Store'


it('createStore', () => {
    const octopus = new Octopus({
        tentacles: [Store],
    })

    octopus.store.initialState.test = true
    const store = octopus.store.createStore()
    const state = store.getState()

    expect(state.test).toBeTruthy()
})
