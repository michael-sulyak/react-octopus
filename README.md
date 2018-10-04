<p align="center">
    <img src="https://raw.githubusercontent.com/expert-m/react-octopus/master/logo.png" alt="react-octopus" />
</p>

<h1 align="center">react-octopus</h1>

<h4 align="center">Develop your React applications quickly and easily!</h4>

<p align="center">
    <a href="https://www.npmjs.com/package/react-octopus"><img src="https://img.shields.io/npm/v/react-octopus.svg?style=flat-square" alt="NPM"></a>  <a href="https://scrutinizer-ci.com/g/expert-m/react-octopus/?branch=master"><img src="https://img.shields.io/scrutinizer/g/expert-m/react-octopus.svg?style=flat-square" alt="Scrutinizer Code Quality"></a>  <a href="https://scrutinizer-ci.com/g/expert-m/react-octopus/build-status/master"><img src="https://img.shields.io/scrutinizer/build/g/expert-m/react-octopus.svg?style=flat-square" alt="Build Status"></a>  <a href="https://github.com/expert-m/react-octopus/issues"><img src="https://img.shields.io/github/issues/expert-m/react-octopus.svg?style=flat-square" alt="GitHub Issues"></a>  <a href="https://gitter.im/expert_m/react-octopus"><img src="https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square" alt="Gitter"></a>  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
</p>

<br>

## Table Of Contents
- [Installation](#installation)
    - [npm](#npm)
    - [yarn](#yarn)
- [How To Use](#how-to-use)
- [Ready Solutions (modules)](#ready-solutions-modules)
    - [modules.Store (Redux)](#modulesstore-redux)
    - [modules.Router](#modulesrouter)
    - [modules.SSR](#modulesssr)
    - [modules.Requests](#modulesrequests)
    - [modules.Helmet](#moduleshelmet)
- [How To Create A New Module](#how-to-create-a-new-module)
- [License](#license)

---

## Installation

#### npm
```bash
$ npm install react-octopus
```

#### yarn
```bash
$ yarn add react-octopus
```

---

If you want to use all `modules`:

```bash
$ npm install react-octopus react-dom react-helmet redux react-redux react-router-config react-router-dom
$ npm install --save-dev express isomorphic-fetch
```

or

```bash
$ yarn add react-octopus react-dom react-helmet redux react-redux react-router-config react-router-dom
$ yarn add --dev express isomorphic-fetch
```

[back to top](#table-of-contents)

---

## How To Use
**Examples:**
* [First](https://github.com/expert-m/react-octopus/tree/master/examples/client) ([Demo](https://expert-m.github.io/react-octopus/))
* [Second](https://github.com/expert-m/react-octopus/tree/master/examples/ssr) (with SSR)

`react-octopus` includes many ready solutions (`modules`) for different purposes. A list of `modules` must be specified when creating `Core`.
```js
const config = {
    modules: [modules.Store],
}

// Different variants of creation:
core = new Core(config)
core = Core.getInstance(config) // Use singleton pattern
core = Core.getInstance(() => config) // Calls a function if `Core` is not created
```
By adding modules you can change a behavior of your application.

Examples:

- [modules.Store](#modulesstore-redux) - allows you to create `Redux` store through `Core`.
- [modules.Store](#modulesstore-redux), [modules.SSR](#modulesssr) - now you can easily render your application on a server.
- [modules.Store](#modulesstore-redux), [modules.SSR](#modulesssr), [modules.Helmet](#moduleshelmet), [modules.Router](#modulesrouter) - this adds data for document head (`title`, `meta`, etc) and routing via `react-router`.

[back to top](#table-of-contents)

---

## Ready Solutions (modules)

#### modules.Store (Redux)
Dependencies: `redux`, `redux-thunk`.
```bash
$ npm install redux redux-thunk
```

Example:
```js
const core = new Core({
    modules: [modules.Store, ...],
    store: {
        initialState: {},
        middleware: [createLogger()], // logger for Redux
    }
})
```

See [React Redux](https://github.com/reduxjs/react-redux).

[back to top](#table-of-contents)

---

#### modules.Router
Dependencies: `react-router`, `react-router-config`, `react-router-dom`.
```bash
$ npm install react-router react-router-config react-router-dom
```

**Example:**

```js
const routes = [{
    component: AppRoot,
    routes: [{ path: '/', component: UserList }],
}]

const core = new Core({
    modules: [modules.Router, ...],
    routes: routes, // routes for SSR
})
```


See [React Router](https://github.com/ReactTraining/react-router).

[back to top](#table-of-contents)

---

#### modules.SSR
> Server-side rendering :sunglasses:

Dependencies: `express`, `react-dom`, `serialize-javascript`.
```bash
$ npm install express react-dom serialize-javascript
```

- You have to install [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) if you want to use module [modules.Requests](#modulesrequests) in SSR:
```bash
$ npm install isomorphic-fetch
```

Example:
```js
require('isomorphic-fetch')

const express = require('express')
const app = express()

app.use('/', (req, res) => {
    const core = new Core(coreConfig)

    core.ssr.render(req, res).then(data => {
        res.render('./template.ejs', {
            initialState: serialize(data.props.store.getState(), {isJSON: true}),
            app: data.html,
            helmet: data.helmet,
        })
    })
})
```

[back to top](#table-of-contents)

---

#### modules.Requests
Dependencies: `isomorphic-fetch` (only for [modules.SSR](#modulesssr)).
```bash
$ npm install isomorphic-fetch
```

Example:
```js
const core = new Core({
    modules: [modules.Requests, ...],
    requests: {
        middlewares: {
            prepareData: (data) => {
                data.headers['Content-Type'] = 'application/json'
                data.body = data.body && JSON.stringify(data.body)
            },
            prepareResult: (response) => (
                response.json().then(json => ({
                    json,
                    response,
                    status: response.status,
                    ok: response.ok,
                }))
            ),
        },
        defaultHost: 'https://reqres.in/api', // now you can write: req.get('/users/59/')
    },
})

core.req.get('/users', params).then((data) => {
    console.log(data.ok)
    console.log(data.json)
    console.log(data.status)
    console.log(data.response)
})

core.req.put('https://example2.com/api/users/50', data, headers).then(...)
core.req.post('https://example2.com/api/users/50', data, headers).then(...)
core.req.path('https://example2.com/api/users/50', data, headers).then(...)
core.req.purge('https://example2.com/api/users/50', data, headers).then(...)

core.req.fetch('get', 'https://example2.com/api/users', data, headers).then(...)
```

[back to top](#table-of-contents)

---

#### modules.Helmet
> Adds `Helmet` data for [modules.SSR](#modulesssr).

Dependencies: `react-helmet`.
```bash
$ npm install react-helmet
```

See [React Helmet](https://github.com/nfl/react-helmet).

[back to top](#table-of-contents)

---

## How To Create A New Module
See [/src/modules/](https://github.com/expert-m/react-octopus/tree/master/src/modules).

[back to top](#table-of-contents)

---

## License
MIT
