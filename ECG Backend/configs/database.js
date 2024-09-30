require('dotenv').config()

const database = {    
    posgresql: {
        host: process.env.POSTGRES_HOST || 'localhost',
        user: process.env.POSTGRES_USERNAME || 'postgresdb-user' ,
        database: process.env.POSTGRES_DB || 'managementportal' ,
        password: process.env.POSTGRES_PASSWORD || 'campro47' ,
        port: process.env.POSTGRES_PORT || '5432' 
    },

    mongodb: {
        host: process.env.MONGO_HOST || 'localhost',
        user: process.env.MONGO_USERNAME || 'username',
        password: process.env.MONGO_PASSWORD || 'password',
        database: process.env.MONGO_DB || 'db',
        port: process.env.MONGO_PORT || '27017' 
    }
}

module.exports = database