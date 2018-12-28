import { matchRoutes } from 'react-router-config'


export default class Router {
    name = 'router'

    constructor(octopus) {
        this.octopus = octopus
    }

    mount(data) {
        const octopus = this.octopus
        this.routes = data.routes

        if (!this.routes) {
            throw Error('Routes not defined!')
        }

        // Call componentWillRenderOnServer()
        octopus.asyncHandle('beforeRenderComponentOnServer', async (data) => {
            const { req } = data

            const [path, search] = req.url.split('?')
            const matchingRoutes = matchRoutes(this.routes, path)

            for (const { route, match } of matchingRoutes) {
                const props = {
                    ...data.props,
                    match: match.params,
                    location: {
                        path,
                        search: search || '',
                    },
                }

                await octopus.asyncEvent('componentWillRenderOnServer', props)
                const componentWillRenderOnServer = route.component.componentWillRenderOnServer

                if (componentWillRenderOnServer instanceof Function) {
                    await componentWillRenderOnServer(octopus, props)
                }
            }
        })

        // Add status for HTTP response or redirect
        octopus.asyncHandle('afterRenderComponentOnServer', data => {
            const { res, props } = data

            if (props.context.url) {
                res.redirect(301, props.context.url)
            }

            const status = props.context.status || 200
            res.status(status)
        })

        return true
    }
}
