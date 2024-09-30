import { useEffect, useState } from 'react';

import PlotECGDiagram from '../../components/PlotECG';
import insertUrlParams from 'inserturlparams';
import { localAxiosInstance } from '../../_api/axiosInstance';
import routes from '../../routes';
import {useNavigate, useParams} from 'react-router-dom';

const MeasurementDetail = () => {

    const navigate = useNavigate()
    
    const params = useParams()

    const [measurementData, setMeasurementData] = useState({})

    useEffect(() => {
        const fetchTest = async () => {
            const response = await localAxiosInstance.get(
                insertUrlParams(routes.api.measurements.show, {patientId: params.patientId, measurement: params.measurement})
            );

           if (response.success) {
               setMeasurementData(response.data);
           }
        };
        
        fetchTest()
    }, []);

    // if (!test) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Medical Test Details</h2>
            <div className="card">
                {Object.keys(measurementData).length === 0 ? <div>No data</div> :
                    <>
                        <div className="card-header">
                            <h4>Measurement time: {params.measurement}</h4>
                        </div>
                        <div className="card-body">
                            <PlotECGDiagram y={measurementData.ecg}/>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(routes.browser.home)}>
                                Back
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default MeasurementDetail;
