import { Helmet } from 'react-helmet'


export default class HelmetModule {
    name = 'helmet'

    constructor(octopus) {
        this.octopus = octopus
    }

    mount(data) {
        this.octopus.asyncHandle('afterRenderComponentOnServer', data => {
            data.helmet = Helmet.renderStatic()
        })

        return true
    }
}
