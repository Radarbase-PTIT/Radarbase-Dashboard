const mongoose = require('mongoose')
const configs = require('../../configs/index')

const {user, password, host,port,database } = configs.database[configs.database.default].mongodb

let mongoInstance;
const connectionString = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`
try {
    mongoInstance = mongoose.createConnection(connectionString)
} catch (e) {
    console.log(connectionString);
    console.error("Mongodb connection error", e.message);
}

module.exports = mongoInstance