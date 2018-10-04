import Core from './Core'
import Logger from './modules/Logger'
import Store from './modules/Store'
import HelmetModule from './modules/HelmetModule'
import Requests from './modules/Requests'
import SSR from './modules/SSR'
import Router from './modules/Router'


const modules = {
    Logger,
    Store,
    Helmet: HelmetModule,
    Requests,
    SSR,
    Router,
}

export {
    Core,
    modules,
}
