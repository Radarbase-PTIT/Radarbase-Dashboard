const express = require('express')
const androidPolarH10EcgRouter = express.Router()
const AndroidPolarH10Ecg = require('../../models/AndroidPolarH10Ecg')

androidPolarH10EcgRouter.get('/patients/:patientId/aggregate-measurements', async (req, res) => {
    const { patientId } = req.params;

    const queryObj = {"key.userId": patientId};

    const measurementTimesArray = (await AndroidPolarH10Ecg.aggregate([
        {
            $match: queryObj
        },
        {
            $group: {
                _id: {
                    measurementTimes: "$value.measurementTimes"
                }
            }
        },
        {
            $project: {
                _id: 0,                  // Exclude the entire _id field
                measurementTimes: "$_id.measurementTimes" // Include only the measurementTimes field
            }
        }
    ]).exec()).map(item => {
        return item.measurementTimes;
    })

   return res.status(200).send({
       success: true,
       data: {
           measurementTimes: measurementTimesArray
       },
       message: 'OK'
   })
})

androidPolarH10EcgRouter.get('/patients/:patientId/measurements/:measurements', async (req, res) => {
    const { patientId, measurements } = req.params;

    const results = {
        heartRates: [],
        ecg: []
    }

    const record = await AndroidPolarH10Ecg.find({"key.userId": patientId, "value.measurementTimes": measurements});


    record.map(item => {
        results.ecg = [...results.ecg, ...item.value.ecg];
        results.heartRates = [...results.heartRates, ...item.value.heartRate];
    })

    return res.status(200).send({
        success: true,
        data: results,
        message: 'OK'
    })
})

androidPolarH10EcgRouter.delete('/patients/:patientId', async (req, res) => {
    const { patientId } = req.params;
    const measurementTimes = req.query('measurementTimes');
    if (measurementTimes) {
        await AndroidPolarH10Ecg.deleteMany({"key.userId": patientId, "value.measurementTimes": measurementTimes});
    }

    return res.status(204).send({
        success: true,
    })
})

module.exports = androidPolarH10EcgRouter