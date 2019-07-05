const {
  extend
} = require('loadsh');
const {
  join
} = require('path');

let config = {
  "viewDir": join(__dirname, "..", 'views'),
  "staticDir": join(__dirname, "..", 'assets')
}

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    port: 8082,
    baseUrl: 'http://localhost/basic/web/index.php?r='

  }
  config = extend(config, localConfig);
}

if (process.env.NODE_ENV == "production") {
  const localConfig = {
    port: 80,
    baseUrl: 'http://10.26.25.182/basic/web/index.php?r='
  }
  config = extend(config, localConfig);
}

module.exports = config;
