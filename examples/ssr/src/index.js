import React from 'react'
import ReactDOM from 'react-dom'
import { getOctopus } from './octopusConfig'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import './index.css'
import routes from './routes'


const octopus = getOctopus()
const store = octopus.store.createStore()

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
)
