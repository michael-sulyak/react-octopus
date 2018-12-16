import Router from './Router'
import Octopus from '../Octopus'


it('Add module `Router`', () => {
    const octopus = new Octopus({
        tentacles: [Router],
        routes: {},
    })

    expect(octopus.hasTentacle('router')).toBeTruthy()
})
