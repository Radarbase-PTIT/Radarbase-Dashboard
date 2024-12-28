import { useEffect, useState } from 'react';

import insertUrlParams from 'inserturlparams';
import { localAxiosInstance } from '../_api/axiosInstance';
import routes from '../routes';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const MeasurementsTable = ({projectId, subjectId}) => {
    const [measurements, setMeasurements] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchTests() {
            if (subjectId !== "") {
                const response = await localAxiosInstance.get(insertUrlParams(routes.api.measurements.list, {patientId: subjectId}));
                // console.log(response)
                setMeasurements(response.data.measurementTimes);
            }
        }
        fetchTests();
    }, [subjectId]);


    const handleDelete = async (subjectId, measurementTime) => {
        const response = await localAxiosInstance.delete(insertUrlParams(routes.api.measurements.delete, {patientId:subjectId, measurement: measurementTime}));
        if (response.status >= 200 && response.status <= 300) {
            const deletedTests = measurements.filter(measurement => {
                return measurement != measurementTime
            })
            setMeasurements(deletedTests)
        }
    }

    return (
        <div className="container">
            <div className='d-flex justify-content-between'>
                <h2>Medical Tests</h2>
            </div>
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Measurement times</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {measurements.length === 0 && <tr><td colSpan={6}>No records</td></tr>}
                    {measurements.map((measurement) => (
                        <tr key={measurement}>
                            <td>{measurement}</td>
                            <td>
                                <button 
                                    className="btn btn-success btn-sm me-2" 
                                    onClick={() => navigate(insertUrlParams(
                                        routes.browser.measurements.viewDetail,
                                        {patientId: subjectId, measurement}
                                    ), {state: {projectId, subjectId}})}>
                                    View
                                </button>
                                <button
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(subjectId, measurement)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MeasurementsTable;