const path = require('path')
const fs = require('fs')
const csv = require('csv-parser');

function readCSVFile(csvFileName) {
    const csvFilePath = path.join(__dirname + '/../storage/', csvFileName); // Replace with your CSV file path

    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data)
        })
        .on('end', () => {
            return resolve(results)
        })
        .on('error', (error) => {
            reject("Cannot read file: " + error.message);
        });
    })
}

module.exports = readCSVFile