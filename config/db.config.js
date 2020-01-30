module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "api",
  dialect: "mysql",
  dialectOptions: {
    useUTC: false
  },
  timezone: 'America/Sao_Paulo',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};