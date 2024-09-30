const express = require('express');
const app = express();
const port = 5174;
const cors = require('cors');
const androidPolarH10Router = require('./modules/ecg');

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/android_polar_h10_ecg', androidPolarH10Router)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
