import Octopus from './Octopus'


it('octopus.getInstance()', () => {
    const octopus1 = Octopus.getInstance({})
    const octopus2 = Octopus.getInstance({})

    expect(octopus1).toEqual(octopus2)
})

it('octopus._addTentacle()', () => {
    let mainData = {}

    class TestModule {
        name = 'test'

        constructor(octopus) {
            this.octopus = octopus
        }

        mount(data) {
            expect(data).toEqual(mainData)
            return true
        }
    }

    mainData.tentacles = [
        TestModule,
    ]

    const octopus = new Octopus(mainData)

    expect(octopus.tentacleNames).toContain('test')
    expect(octopus.test.name).toEqual('test')
    expect(octopus.test.octopus).toEqual(octopus)
})

it('octopus.hasTentacle()', () => {
    class TestModule {
        name = 'test'

        mount() {
            return true
        }
    }

    const octopus = new Octopus({
        tentacles: [TestModule],
    })


    expect(octopus.hasTentacle('test')).toBeTruthy()
    expect(octopus.hasTentacle('test2')).toBeFalsy()
})

it('octopus.event() and octopus.handle()', () => {
    const octopus = new Octopus({})
    let flag = false

    octopus.handle('test event', data => {
        flag = data.x
    })

    octopus.event('test event', { x: true })

    expect(flag).toBeTruthy()
})

it('octopus.asyncEvent() and octopus.asyncHandle()', async () => {
    const octopus = new Octopus({})
    let flag = false

    octopus.asyncHandle('test event', data => {
        return new Promise(resolve => {
            setTimeout(() => {
                flag = data.x
                resolve()
            })
        })
    })

    await octopus.asyncEvent('test event', { x: true })

    expect(flag).toBeTruthy()
})
