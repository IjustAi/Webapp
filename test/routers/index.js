const compose = require('koa-compose') //compose the gievn middlesware and return middlware
const glob = require('glob') //whole dir find the file 
const { resolve } = require('path')

registerRouter = () => {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))//at the same time
        .filter(value => (value.indexOf('index.js') === -1)) //The indexOf() method returns -1 if the value is not found.
        .map(router => {//router middleware
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter
