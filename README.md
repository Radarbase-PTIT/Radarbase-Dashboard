# Guideline for installation
Make sure to pull the latest commit on RADAR-Docker repository because the repository exposes port 5432 Postgresql inside docker-compose to outside world.

Make sure to import `medical_tests.sql` script to database for creating new table. To connect to Postgresql table, using Navicat or database which can connect to
Postgresql. In Navicat, create new connection to Postgresql, host is VMWare Ip in bridge format. Port is 5432, db username is in .env of `dcompose-stack`,
db password is in .env of `dcompose-stack`. When logged in, import file `medical_tests.sql`

## Prerequisite
1. Make sure to start ManagementPortal first before running the scripts
2. Make sure to install NodeJS
 
## Start ECGBackend
1. Go to folder `ECG Backend`
2. Run command `npm install`
3. Copy `.env.template` to `.env`
4. Modify params inside `.env` to match with Postgresql
5. Create folder `storage` in the same level with ECG Backend
<<<<<<< HEAD

To run backend, run `npm run dev` in ECG backend folder
=======
>>>>>>> Add correct sample data

To run backend, run `npm run dev` in ECG backend folder

## Start ECGFrontend
1. Go to folder `ECG Frontend`
2. Run command `npm install`
3. Copy `.env.template` to `.env`
4. Modify params inside `.env` to match with Vmware host API by running `ifconfig`, the other params leave unchanged.
5. When upload file CSV for testing ECG frontend, choose file `ecg.csv` in this folder, which has the format: `x,y` in the first row. The ability to change column will be implemented later.

To run frontend, run `npm run dev` in ECG backend folder
