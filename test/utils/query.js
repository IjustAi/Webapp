const config = require('../config_mysql').database
const mysql = require('mysql')
const pool = mysql.createPool(config)
const query = function (sql, succCb, errCb) { //succCb success callback
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err)
      let data = {
        code: 500,
        message: "FAIL",
        data: err
      };
      errCb(data);
    } else {
      conn.query(sql, function (err, result) { 
        if (err) {
          console.log(err)
          let data = {
            code: 500,
            message: "FAIL",
            data: err
          };
          errCb(data);
        } else {
          succCb(result);
          conn.release();
        }
      })
    }
  })
}
module.exports = query;
