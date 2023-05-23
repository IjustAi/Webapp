const compose = require('koa-compose') //compose the gievn middlesware and return middlware
const glob = require('glob') //whole dir find the file 
const { resolve } = require('path')

registerRouter = () => {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))//at the same time
        .filter(value => (value.indexOf('index.js') === -1)) 
        .map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter
