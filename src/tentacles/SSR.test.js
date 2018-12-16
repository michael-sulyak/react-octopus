import Octopus from '../Octopus'
import SSR from './SSR'


it('render', async () => {
    let isRendered = false

    const component = () => {
        isRendered = true
        return 'html'
    }

    const octopus = new Octopus({
        tentacles: [SSR],
        componentForSSR: component,
    })

    await octopus.ssr.render(
        () => {
        },
        () => {
        },
    ).then(data => {
        expect(data.html).toEqual('html')
    })

    expect(isRendered).toBeTruthy()
})
