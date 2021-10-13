console.log('hello nodejs')

// 引入（导入）utils.js模块
// 如果模块没有到处，则得到一个空对象
const formatDate = require('./utils')
console.log('formatDate',formatDate)