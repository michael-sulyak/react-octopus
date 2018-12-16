import Logger from './tentacles/Logger'


export default class Octopus {
    tentacleNames = []
    handlers = {}
    asyncHandlers = {}

    constructor(data) {
        this.debug = !!data.debug

        for (const tentacle of data.tentacles || []) {
            this._addTentacle(tentacle)
        }

        // Must have logger
        if (!this.logger) {
            this._addTentacle(Logger)
        }

        const tentacleNames = [...this.tentacleNames]

        for (const tentacleName of tentacleNames) {
            const isMounted = this[tentacleName].mount(data)

            if (!isMounted) {
                this._removeTentacle(this[tentacleName])
            }
        }
    }

    static getInstance(data) {
        if (!Octopus._instance) {
            const initialData = data instanceof Function ? data() : data
            Octopus._instance = new Octopus(initialData)
        }

        return Octopus._instance
    }

    _addTentacle(Tentacle) {
        const instance = new Tentacle(this)

        if (instance.name in this) {
            throw new Error(`Tentacle '${Tentacle.name}' already exists.`)
        }

        this[instance.name] = instance
        this.tentacleNames.push(instance.name)
    }

    _removeTentacle(tentacle) {
        const tentacleName = tentacle.name
        delete this[tentacleName]

        const index = this.tentacleNames.indexOf(tentacleName)

        if (index > -1) {
            this.tentacleNames.splice(index, 1)
        }

        if (this.debug) {
            this.logger.warn(`Tentacle '${tentacleName}' is removed from the Octopus. 😭`, '🐙')
        }
    }

    hasTentacle(tentacleName) {
        return this.tentacleNames.indexOf(tentacleName) > -1
    }

    handle(eventName, handler) {
        if (!(eventName in this.handlers)) {
            this.handlers[eventName] = []
        }

        this.handlers[eventName].push(handler)
    }

    asyncHandle(eventName, handler) {
        if (!(eventName in this.asyncHandlers)) {
            this.asyncHandlers[eventName] = []
        }

        this.asyncHandlers[eventName].push(handler)
    }

    event(eventName, data) {
        if (eventName in this.handlers) {
            for (const handler of this.handlers[eventName]) {
                handler(data)
            }
        }
    }

    asyncEvent(eventName, data) {
        if (eventName in this.asyncHandlers) {
            return Promise.all(this.asyncHandlers[eventName].map(asyncHandler => (
                asyncHandler(data)
            )))
        }
    }

    about(logger) {
        logger = logger || this.logger.getWithPrefix('i')

        logger.log('About \'octopus\' 🔥')

        logger.logList('Modules', this.moduleNames)
        logger.logList('Handler events', Object.keys(this.handlers))

        for (const moduleName of this.moduleNames) {
            if (this[moduleName].about instanceof Function) {
                logger.log('')
                logger.log(`About 'octopus.${moduleName}' 🔥`)
                this[moduleName].about(logger)
            }
        }

        logger.log('')
    }
}
