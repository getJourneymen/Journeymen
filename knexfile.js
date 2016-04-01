module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'journeymen_dev'
    },
    seeds: {
      directory: './seeds'
    }
  }
}
