import React from 'react'
import ReactDOM from 'react-dom'
import { getCore } from './coreConfig'
import { Provider } from 'react-redux'
import UserList from './apps/users/UserList'
import './index.css'


const core = getCore()
const store = core.store.createStore()


ReactDOM.render(
    <Provider store={store}>
        <UserList />
    </Provider>,
    document.getElementById('root'),
)
