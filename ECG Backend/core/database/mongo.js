const mongoose = require('mongoose')
const config = require('../../configs/database')

const {user, password, host,port,database } = config.mongodb
let mongoInstance;

try {
    mongoInstance = mongoose.createConnection(`mongodb://${user}:${password}@${host}:${port}/${database}?authMechanism=DEFAULT`)
} catch (e) {
    console.error("Mongodb connection error", e.message);
}

module.exports = mongoInstance