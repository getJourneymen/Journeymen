module.exports = {

  development: {
    client: 'postgresql',
    connection: {
    	host: '127.0.0.1',
      database: 'journeymen_dev'
    },
    seeds: {
      directory: './seeds'
    }
  }
}
