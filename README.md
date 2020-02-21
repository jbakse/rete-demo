# Rete Demo

A simple project showing project setup for Rete.js, Vue.js, and Webpack.

References:

- [Webpack Getting Started](https://webpack.js.org/guides/getting-started/)
- [Adding Babel, Async/Await](https://codingitwrong.com/2018/02/05/await-off-my-shoulders.html)

Notes:

- To get custom vue templates to work either:
  - `npm install vue` and then `import` it and provide a fully constructed `new Vue.Component` to the Rete.Conponent or Rete.Control instead of just the config data.
  - add `vue-loader` (and prob `vue-style-loader`, `css-loader`) and compiled single file components
    - https://github.com/retejs/rete/issues/249#issuecomment-462844377

Todo:

### NPM Scripts

- `npm build` build the package with webpack
- `npm start:dev` watch/build package serve on localhost:8080
