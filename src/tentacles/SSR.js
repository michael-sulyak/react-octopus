import React from 'react'
import ReactDOMServer from 'react-dom/server'


export default class SSR {
    name = 'ssr'
    componentForSSR = null

    constructor(octopus) {
        this.octopus = octopus
    }

    mount(data) {
        this.componentForSSR = data.componentForSSR
        return !!this.componentForSSR
    }

    async render(req, res) {
        const octopus = this.octopus
        const data = {
            props: {
                location: req.url,
                context: {},
            },
            req,
            res,
        }

        await octopus.asyncEvent('beforeCreateElementOnServer', data)
        const element = React.createElement(this.componentForSSR, data.props)

        await octopus.asyncEvent('beforeRenderComponentOnServer', data)
        data.html = ReactDOMServer.renderToString(element)
        await octopus.asyncEvent('afterRenderComponentOnServer', data)

        return new Promise(resolve => resolve(data))
    }
}
