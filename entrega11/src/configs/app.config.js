require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    environment: process.env.ENVIRONMENT,
    environmentMessage: process.env.ENVIRONMENT_MESSAGE,
    environmentLogger: process.env.ENVIRONMENT_LOGGER
}