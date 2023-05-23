const Koa = require('koa');
const DigestAuth = require('koa-http-auth').Digest ;
const registerRouter = require('./routers/index');
const koaBody = require('koa-body'); 
const app = new Koa();

app.use(koaBody());



app.use(registerRouter());
app.use(DigestAuth('Simple Application'));
app.use(function * (next) {
  if (this.url === '/secret' && this.request.auth == null) { 
    this.body = 'Please log in.'
    return // Middleware will auto give 401 response
  }

  if (this.url === '/secret' && (this.request.auth.user !== 'cyf'||
    this.request.auth.password !=='123456')) {
    this.body = 'Invalid user.'
    delete this.request.auth // Delete request.auth ...
    return // ... will make middleware give 401 response too.
  }

  if (this.url === '/secret' &&(this.request.auth.user == 'cyf' &&
    this.request.auth.password == '123456')) {
    this.body = 'OK'
  }
    this.body ="SUCCESS"
    yield next
})
app.listen(8080);