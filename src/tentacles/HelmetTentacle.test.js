import HelmetModule from './HelmetTentacle'
import Octopus from '../Octopus'
import { Helmet } from 'react-helmet'


it('Add module', () => {
    const octopus = new Octopus({
        tentacles: [HelmetModule],
    })

    expect(octopus.hasTentacle('helmet')).toBeTruthy()
})

it('Create store', async () => {
    const octopus = new Octopus({
        tentacles: [HelmetModule],
    })

    const data = {}

    Helmet.canUseDOM = false
    await octopus.asyncEvent('afterRenderComponentOnServer', data)

    expect(data.helmet).toBeDefined()
})
