const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

if (!process.argv[2]) {
  console.log(`Usage:
node bin/generate_password.js <password>

Example:
node bin/generate_password.js MyStrongPassword123
  `)
  return 1;
}

bcrypt.hash(process.argv[2], +process.env["SALT_ROUNDS"], function(err, hash) {
  if (err) throw err;
  console.log(hash);

  return 0;
});