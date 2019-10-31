require('dotenv').config(); 

module.exports =  {
  "development": {
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": false
    },
    "omitNull": true,
    "seederStorage": "sequelize",
    "host": process.env["KTL_DB_HOST"],
    "username": process.env["KTL_DB_USERNAME"],
    "password": process.env["KTL_DB_PASSWORD"],
    "database": process.env["KTL_DB_DATABASE"],
    "port": process.env["KTL_DB_PORT"]
  }
}