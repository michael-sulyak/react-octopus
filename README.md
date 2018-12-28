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
- [Ready Solutions (tentacles)](#ready-solutions-tentacles)
    - [tentacles.Store (Redux)](#tentaclesstore-redux)
    - [tentacles.Router](#tentaclesrouter)
    - [tentacles.SSR](#tentaclesssr)
    - [tentacles.Helmet](#tentacleshelmet)
- [How To Create A New Tentacle](#how-to-create-a-new-tentacle)
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

`react-octopus` includes many ready solutions (`tentacles`) for different purposes. A list of `tentacles` must be specified when creating `Octopus`.
```js
const config = {
    tentacles: [tentacles.Store],
}

// Different variants of creation:
core = new Octopus(config)
core = Octopus.getInstance(config) // Use singleton pattern
core = Octopus.getInstance(() => config) // Calls a function if `Octopus` is not created
```
By adding `tentacles` you can change a behavior of your application.

Examples:

- [tentacles.Store](#tentaclesstore-redux) - allows you to create `Redux` store through `Octopus`.
- [tentacles.Store](#tentaclesstore-redux), [tentacles.SSR](#tentaclesssr) - now you can easily render your application on a server.
- [tentacles.Store](#modulesstore-redux), [tentacles.SSR](#tentaclesssr), [tentacles.Helmet](#tentacleshelmet), [modules.Router](#tentaclesrouter) - this adds data for document head (`title`, `meta`, etc) and routing via `react-router`.

[back to top](#table-of-contents)

---

## Ready Solutions (tentacles)

#### tentacles.Store (Redux)
Dependencies: `redux`, `redux-thunk`.
```bash
$ npm install redux redux-thunk
```

Example:
```js
const octopus = new Octopus({
    tentacles: [tentacles.Store, ...],
    store: {
        initialState: {},
        enhancer: applyMiddleware(thunk, createLogger()),
    },
})
```

See [React Redux](https://github.com/reduxjs/react-redux).

[back to top](#table-of-contents)

---

#### tentacles.Router
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

const octopus = new Octopus({
    tentacles: [tentacles.Router, ...],
    routes: routes, // routes for SSR
})
```


See [React Router](https://github.com/ReactTraining/react-router).

[back to top](#table-of-contents)

---

#### tentacles.SSR
> Server-side rendering :sunglasses:

Dependencies: `express`, `react-dom`, `serialize-javascript`.
```bash
$ npm install express react-dom serialize-javascript
```

Example:
```js
require('isomorphic-fetch')

const express = require('express')
const app = express()

app.use('/', (req, res) => {
    const octopus = new Octopus(coreConfig)

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

#### tentacles.Helmet
> Adds `Helmet` data for [tentacles.SSR](#tentaclesssr).

Dependencies: `react-helmet`.
```bash
$ npm install react-helmet
```

See [React Helmet](https://github.com/nfl/react-helmet).

[back to top](#table-of-contents)

---

## How To Create A New Module
See [/src/tentacles/](https://github.com/expert-m/react-octopus/tree/master/src/tentacles).

[back to top](#table-of-contents)

---

## License
MIT
