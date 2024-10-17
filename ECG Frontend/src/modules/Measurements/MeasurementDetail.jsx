import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import PlotECGDiagram from '../../components/PlotECG';
import insertUrlParams from 'inserturlparams';
import { localAxiosInstance } from '../../_api/axiosInstance';
import routes from '../../routes';

const MeasurementDetail = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const {projectId, subjectId} = location.state

    const params = useParams()

    const [measurementData, setMeasurementData] = useState({})

    const [loading, setLoading] = useState(false);

    const [, setMeasurementEcgLength] = useState(0)

    const [needUpdateInterval, setNeedUpdateInterval] = useState(true);

    useEffect(() => {
        const fetchTest = async () => {
            setLoading(true);
            const response = await localAxiosInstance.get(
                insertUrlParams(routes.api.measurements.show, {patientId: params.patientId, measurement: params.measurement})
            );

           if (response.success) {
               setLoading(false);
               setMeasurementData(response.data);
               //check need to update or not
               setMeasurementEcgLength(prevState => {
                   if (response.data.heartRates.length === prevState) {
                       setNeedUpdateInterval(false)
                       return prevState;
                   } else {
                       return response.data.heartRates.length 
                   }
               })

           }
        };

        if (needUpdateInterval) { // Only set interval if updates are needed
            const updateInterval = setInterval(() => {
                fetchTest();
            }, 1500);

            return () => clearInterval(updateInterval);
        }

    }, [needUpdateInterval]);


    return (
        <div className="container mt-4">
            <h2 className="mb-4">Medical Test Details</h2>
            <div className="card">
                {
                    loading ? <div>Loading...</div> :
                    <>
                        <div className="card-header">
                            <h4>Measurement time: {params.measurement}</h4>
                        </div>
                        <div className="card-body">
                            <PlotECGDiagram y={measurementData?.ecg || []}/>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(`${routes.browser.home}?project_id=${projectId}&subject_id=${subjectId}`)}>
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
