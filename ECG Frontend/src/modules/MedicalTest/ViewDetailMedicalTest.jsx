import { useEffect, useState } from 'react';

import PlotECGDiagram from '../../components/PlotECG';
import insertUrlParams from 'inserturlparams';
import { localAxiosInstance } from '../../_api/axiosInstance';
import routes from '../../routes';
import { useParams } from 'react-router-dom';

const ViewDetailMedicalTest = () => {
    
    const params = useParams()

    const [test, setTest] = useState(null);

    const [ecgData, setECGData] = useState({})    

    useEffect(() => {
        const fetchTest = async () => {
            const response = await localAxiosInstance.get(insertUrlParams(routes.api.medicalTest.view, {test_id: params.test_id}));
            setTest(response.data);
            const time = response.data.ecgData.map(item => {
                return item.x
            })

            const amplitude = response.data.ecgData.map(item => {
                return item.y
            })

            setECGData({
                time,
                amplitude
            })
        };
        
        fetchTest();
    }, []);

    if (!test) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Medical Test Details</h2>
            <div className="card">
                <div className="card-header">
                    <h4>Test ID: {test.test_id}</h4>
                </div>
                <div className="card-body">
                    <p><strong>Time of Test:</strong> {new Date(test.time_of_test).toLocaleString()}</p>
                    <p><strong>Notes:</strong> {test.notes}</p>
                    <p><strong>SubjectId: </strong>{test.subject_id}</p>
                    <p><strong>ECG Data:</strong> {test.ecg}</p>
                    <PlotECGDiagram x={ecgData.time} y={ecgData.amplitude} />
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => history.back()}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailMedicalTest;
