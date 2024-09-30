const mongoInstance = require('../core/database/mongo')
const androidPolarH10EcgSchema = require('../schemas/android_polar_h10_ecg')

const AndroidPolarH10Ecg = mongoInstance.model('AndroidPolarH10Ecg', androidPolarH10EcgSchema, "android_polar_h10_ecg")

module.exports = AndroidPolarH10Ecg