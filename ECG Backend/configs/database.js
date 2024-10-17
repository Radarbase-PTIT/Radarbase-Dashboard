const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../.env') })


const database = {
    default: process.env.MONGODB_ENVIRONMENT || 'local',
    vmware: {
        postgresql: {
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
    },

    local: {
        postgresql: {
            host: process.env.POSTGRES_HOST || 'localhost',
            user: process.env.POSTGRES_USERNAME || 'postgresdb-user' ,
            database: process.env.POSTGRES_DB || 'managementportal' ,
            password: process.env.POSTGRES_PASSWORD || 'campro47' ,
            port: process.env.POSTGRES_PORT || '5432'
        },

        mongodb: {
            host: 'localhost',
            user: 'root',
            password: 'example',
            database: 'mydb',
            port: '27017'
        }
    }
}

module.exports = database