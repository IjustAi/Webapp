const router = require('koa-router')();
const Sql = require('../utils/sql');
const tbName = 'Goods';
router

  .post('/v1/stocks', async (ctx, next) => {
    console.log(ctx.request.body)
    let obj = {
      name: ctx.request.body.name,
      amount: ctx.request.body.amount
    }
    if (!obj.name) {
      return ctx.body = { message: 'name is required' };
    }
   
    if (!Number.isInteger(obj.amount)) {
      return ctx.body = { message: 'ERROR' };
    }
    const data = await Sql.fun001(tbName, obj);
    ctx.body = data;
  })


  .get('/v1/stocks/', async (ctx, next) => {
    let data = await Sql.fun002_all(tbName);
    const res = data.reduce((pre, el) => { pre[el.name] = el.amount; return pre; }, {}); //order the amount by name 
    ctx.body = res;
  })

  .get('/v1/stocks/:name', async (ctx, next) => {
    let data = await Sql.fun002_name(tbName, ctx.params.name);
    ctx.body = data;
  })




  .post('/v1/sales', async (ctx, next) => {
    const { body } = ctx.request;
    let obj = {
      name: body.name || '',
      amount: body.amount || 1, // default value 1
      price: body.price,
    }
    let dataext = await Sql.fun003_all(tbName, obj);
    if (dataext.length === 0) {
      return ctx.body = { message: 'Goods not found' };
    }
    let amountall = dataext[0].amount;
    if (!amountall) {
      return ctx.body = { message: "Goods's amount is not valid" };
    }
    console.log(dataext)
    await Sql.fun003_sub(tbName, obj, amountall, dataext[0].sales || 0);
    ctx.body = body;
  })


  .get('/v1/sales', async (ctx, next) => {
    let data = await Sql.fun004(tbName, ctx.request.body);
    ctx.body = data;
  })

  


  .get('/',async(ctx,next) =>{
    let data ='cyf';
    ctx.body = data;
  })


  .delete('/v1/stocks', async (ctx, next) => {
    let data = await Sql.fun005(tbName);
    ctx.body = data;
  })

module.exports = router;
