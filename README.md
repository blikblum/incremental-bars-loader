# incremental-bars loader

Webpack loader for [incremental-bars](https://github.com/atomictag/incremental-bars), an Handlebars backend for [incremental-dom](https://github.com/google/incremental-dom)

### Configuration

```javascript
//webpack.config.js
  ...
  module: {
    rules: [
      ...
      { 
        test: /\.handlebars$/, 
        use: ['babel-loader', 'incremental-bars-loader'] 
      }
    ]
  },
  // workaround to a webpack issue: https://github.com/webpack-contrib/css-loader/issues/447
  node: {
    fs: 'empty'
  }

```

### Usage

```javascript
import template from 'mytemplate.handlebars'
import IncrementalDOM from 'incremental-dom'

let el = document.getElementById('to-render')
let data = {name: 'Hello', message: 'world'}

IncrementalDOM.patch(el, template, data)
```

See a complete application [example](https://github.com/blikblum/marionette.renderers/tree/master/examples/idom-handlebars)