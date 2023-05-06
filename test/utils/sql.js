const query = require('./query')
const Sql = {



  fun001: function (tb, obj) {
    return new Promise((resolve, reject) => {
      let str = `select * from ${tb} where name = '${obj.name}'`
      query(str, function (res) {
        if (res.length > 0) {

          let str01 = `update ${tb} set amount =  ${obj.amount} where name='${obj.name}'`
          query(str01, function (res01) {
            resolve(obj);
          }, function (err) {
            resolve(err);
          })
        } else {

          let str02 = `insert into ${tb} (name,amount) values ('${obj.name}',${obj.amount})`
          query(str02, function (res02) {
            resolve(obj);
          }, function (err) {
            resolve(err);
          })
        }
        resolve(obj);
      }, function (err) {
        resolve(err);
      })
    })
  },


  fun002_all: function (tb) {
    return new Promise((resolve, reject) => {
      let str = `select name,amount from ${tb}`
      query(str, function (res) {
        resolve(res);
      }, function (err) {
        resolve(err);
      })
    })
  },

  fun002_name: function (tb, name) {
    return new Promise((resolve, reject) => {
      let str = ""
      if (name) {
        str = `select name,amount from ${tb} where name = '${name}'`
      } else {
        str = `select name,amount from ${tb} where`
      }
      query(str, function (res) {
        resolve(res);
      }, function (err) {
        resolve(err);
      })
    })
  },


  fun003_all: function (tb, obj) { // user data check 
    return new Promise((resolve, reject) => {
      let str = `select * from ${tb} where name = '${obj.name}'`
      query(str, function (res) {
        resolve(res);
      }, function (err) {
        resolve(err);
      })
    })
  },

  fun003_sub: function (tb, obj, amountall, sales) {
    return new Promise((resolve, reject) => {

      if (amountall < obj.amount) {
        resolve({
          "message": "ERROR"
        });
      } else {
        let sub = amountall - obj.amount
        let str01 = `update ${tb} set amount = ${sub} ${obj.price ? `, price=${obj.price}, sales=${(sales + obj.price * obj.amount).toFixed(2)}` : ''} where name='${obj.name}'`

        query(str01, function (res01) {
          let data_result = {
            name: obj.name,
            amount: sub,
            price: obj.price
          }

          resolve(
            data_result
          );
          // resolve({
          //   sales:sub * price
          // });
        }, function (err) {
          resolve(err);
        })
      }
    })
  },


  fun004: function (tb, obj) {
    return new Promise((resolve, reject) => {
      let str = `select * from ${tb}`;
      query(str, function (res) {
        let sumsub = 0
        for (let i = 0; i < res.length; i++) {
          if (res[i].price) {
            sumsub = sumsub + res[i].sales
          }

        }
        resolve({
          sales: sumsub.toFixed(2)
        });
      }, function (err) {
        resolve(err);
      })
    })
  },


  fun005: function (tb) {
    return new Promise((resolve, reject) => {
      let str = `delete from ${tb}`;
      query(str, function (res) {
        resolve({
          msg: ' DELETE'
        });
      }, function (err) {
        resolve(err);
      })
    })
  },

}

module.exports = Sql;
