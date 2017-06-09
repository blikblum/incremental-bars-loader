var Handlebars = require('incremental-bars')
var loaderUtils = require('loader-utils')

var defaultOptions = {
  minifyInput : true,
  backend : 'idom',
  generateKeysForStaticEl  : false,
  generateKeysForAllEl     : true,
  skipBlockAttributeMarker : 'data-partial-id',
  emptySkipBlocks          : true,
  safeMergeSelfClosing     : true,
}

var functionMap = {
  'elementOpen'      : 'elementOpen',
  'elementClose'     : 'elementClose',
  'elementVoid'      : 'elementVoid',
  'text'             : 'text',
  'elementOpenStart' : 'elementOpenStart',
  'elementOpenEnd'   : 'elementOpenEnd',
  'attr'             : 'attr',
  'skip'             : 'skip'
}

function getStaticsKeys(statics) {
  return Object.keys(statics).reduce((memo, item) => {
    if (item !== '__name') memo += `${item} : ${JSON.stringify(statics[item])},\n`
    return memo
  }, '')
}

module.exports = function(source) {
  var userOptions = loaderUtils.getOptions(this)
  var transpilerOptions = Object.assign(defaultOptions, userOptions, {functionMap: functionMap, hoistedStatics: {}})
  var compiled = Handlebars.precompile(source, {transpilerOptions: transpilerOptions})
  var statics = transpilerOptions.hoistedStatics;
  if (statics.__name) {
    staticsDeclaration = `
      var ${statics.__name} = {${getStaticsKeys(statics)}}
    `
  }
  return `var Handlebars = require('handlebars/runtime')
var IncrementalDOM = require('incremental-dom')
var elementOpen = IncrementalDOM.elementOpen
var elementClose = IncrementalDOM.elementClose
var elementVoid = IncrementalDOM.elementVoid
var text = IncrementalDOM.text
var elementOpenStart = IncrementalDOM.elementOpenStart
var elementOpenEnd = IncrementalDOM.elementOpenEnd
var attr = IncrementalDOM.attr
var skip = IncrementalDOM.skip

${staticsDeclaration}
  
module.exports = Handlebars.template(${compiled})
  `
}