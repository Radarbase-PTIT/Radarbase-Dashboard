const mongoose = require('mongoose');
const {Schema} = mongoose;

const androidPolarH10EcgSchema = new Schema({
    key: {
        projectId: {
            type: String
        },
        userId: {
            type: String
        },
        sourceId: {
            type: String
        }
    },
    value: {
        time: {
            type: Date,
        },
        timeReceived: {
            type: Date,
        },
        ecg: [{type: Number}],
        heartRate: [{type: Number}],
        measurementTimes: {
            type: Number
        }
    }
});

module.exports = androidPolarH10EcgSchema