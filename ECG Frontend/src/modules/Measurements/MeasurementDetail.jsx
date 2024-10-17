import {useLocation, useNavigate, useParams} from 'react-router-dom';

import PlotECGDiagram from '../../components/PlotECG';
import routes from '../../routes';

const MeasurementDetail = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const {projectId, subjectId} = location.state

    const params = useParams()


    return (
        <div className="container mt-4">
            <h2 className="mb-4">Medical Test Details</h2>
            <div className="card">         
                <>
                    <div className="card-header">
                        <h4>Measurement time: {params.measurement}</h4>
                    </div>
                    <div className="card-body">
                        <PlotECGDiagram params={params}/>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(`${routes.browser.home}?project_id=${projectId}&subject_id=${subjectId}`)}>
                            Back
                        </button>
                    </div>
                </> 
            </div>
        </div>
    );
};

export default MeasurementDetail;
