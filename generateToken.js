// https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/exercicios/70fdf87c-8015-4844-b002-cee02e005b04/agora-a-pratica/ec4d7343-9476-4765-a592-a74c8de5a047?use_case=side_bar
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;
