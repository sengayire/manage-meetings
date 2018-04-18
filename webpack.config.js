const developmentConfigs = require('./config/webpack.dev')
const productionConfigs = require('./config/webpack.prod')
const dotenv = require('dotenv').config()

const getConfigs = () => {
  if (process.env.NODE_ENV === 'production') {
    return productionConfigs
  }
  return developmentConfigs
}

const configs = getConfigs();

module.exports = configs;