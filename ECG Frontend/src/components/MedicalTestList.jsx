import { useEffect, useState } from 'react';

import insertUrlParams from 'inserturlparams';
import { localAxiosInstance } from '../_api/axiosInstance';
import routes from '../routes';
import { useNavigate } from 'react-router-dom';

const MedicalTestList = ({subjectId}) => {
    const [tests, setTests] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchTests() {
            if (subjectId != "") {
                const response = await localAxiosInstance.get(insertUrlParams(routes.api.medicalTest.viewMedicalBySubject, {subject_id: subjectId}));
                setTests(response.data);
            }
        }
        fetchTests();
    }, [subjectId]);


    const handleDelete = async (testId) => {
        const response = await localAxiosInstance.delete(insertUrlParams(routes.api.medicalTest.delete, {test_id:testId}));
        if (response.status === 200) {
            const deletedTests = tests.filter(test => test.test_id !== testId)
            setTests(deletedTests)
        }
    }

    return (
        <div className="container">
            <div className='d-flex justify-content-between'>
                <h2>Medical Tests</h2>
                <button className='btn btn-primary btn-sm' onClick={() => navigate(routes.browser.medicalTest.create + "?subject_id=" + subjectId)}>Create medical test</button>
            </div>
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Time of Test</th>
                        <th>Notes</th>
                        <th>ECG</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.length === 0 && <tr><td colSpan={6}>No records</td></tr>}
                    {tests.map((test) => (
                        <tr key={test.test_id}>
                            <td>{test.test_id}</td>
                            <td>{test.time_of_test}</td>
                            <td>{test.notes}</td>
                            <td>{test.ecg}</td>
                            <td>
                                <button 
                                    className="btn btn-success btn-sm me-2" 
                                    onClick={() => navigate(insertUrlParams(routes.browser.medicalTest.viewDetail, {test_id: test.test_id}))}>
                                    View
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm me-2" 
                                    onClick={() => navigate(insertUrlParams(routes.browser.medicalTest.edit, {test_id: test.test_id}))}>
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(test.test_id)}>
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

export default MedicalTestList;