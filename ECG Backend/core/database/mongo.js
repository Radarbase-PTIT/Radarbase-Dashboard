const mongoose = require('mongoose')
const configs = require('../../configs/index')

const {user, password, host,port,database } = configs.database[configs.database.default].mongodb

let mongoInstance;

try {
    const connectionString = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`
    mongoInstance = mongoose.createConnection(connectionString)
} catch (e) {
    console.error("Mongodb connection error", e.message);
}

module.exports = mongoInstance