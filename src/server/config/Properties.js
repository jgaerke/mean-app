module.exports = {

  mode: process.env.NODE_ENV || 'development',

  mongo: {
    url: process.env.MONGO_URL || 'mongodb://some-user:some-password@localhost:27017/app'
  },

  express: {
    port: process.env.EXPRESS_PORT || 3000
  }
};