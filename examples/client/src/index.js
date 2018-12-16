import React from 'react'
import ReactDOM from 'react-dom'
import { getOctopus } from './octopusConfig'
import { Provider } from 'react-redux'
import UserList from './apps/users/UserList'
import './index.css'


const octopus = getOctopus()
const store = octopus.store.createStore()


ReactDOM.render(
    <Provider store={store}>
        <UserList />
    </Provider>,
    document.getElementById('root'),
)
