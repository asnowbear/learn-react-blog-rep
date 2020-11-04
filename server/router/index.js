const fs = require('fs')

module.exports = (app) => {
  // __dirname代指当前目录（绝对目录）
  fs.readdirSync(__dirname).forEach(file => {
    // 排除index.js
    if (file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}