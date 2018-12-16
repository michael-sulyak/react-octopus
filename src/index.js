import Octopus from './Octopus'
import Logger from './tentacles/Logger'
import Store from './tentacles/Store'
import HelmetTentacle from './tentacles/HelmetTentacle'
import SSR from './tentacles/SSR'
import Router from './tentacles/Router'


const tentacles = {
    Logger,
    Store,
    Helmet: HelmetTentacle,
    SSR,
    Router,
}

export {
    Octopus,
    tentacles,
}
