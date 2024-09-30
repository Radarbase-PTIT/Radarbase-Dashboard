import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import insertUrlParams from 'inserturlparams';
import { localAxiosInstance } from '../../_api/axiosInstance';
import routes from '../../routes';

const EditMedicalTest = () => {

    const params = useParams()
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        time_of_test: '',
        notes: '',
        ecg: '',
        source_type_id: '',
        subject_id: ''
    });

    const [file, setFile] = useState(null);

    useEffect(() => {
        async function fetchMedical(testId) {
            const res = await localAxiosInstance.get(insertUrlParams(routes.api.medicalTest.view, {test_id: testId}))
            const {time_of_test, notes,source_type_id, subject_id, ...rest} = res.data
            setFormData({
                time_of_test,
                notes,
                source_type_id,
                subject_id
            })
        }

        fetchMedical(params.test_id)
    }, [params.test_id]);

    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fD = new FormData();
        fD.append('ecg', file);
        fD.append('time_of_test', new Date().toISOString())
        fD.append('notes', formData.notes)
        fD.append('source_type_id', 2001)
        fD.append('subject_id', formData.subject_id)
        try {
            const response = await localAxiosInstance.put(insertUrlParams(routes.api.medicalTest.update, {test_id: params.test_id}), fD, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status >= 200 && response.status <= 300) {
                navigate(routes.browser.home)
            }
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="container">
            <h2 className="mt-4">Edit Medical Test</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label className='mb-1'>ECG</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        name="ecg" 
                        onChange={handleFileChange} 
                        />
                    <div id="emailHelp" className="form-text">If no upload, original file will be used</div>
    
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Notes</label>
                    <textarea 
                        className="form-control" 
                        name="notes" 
                        value={formData.notes} 
                        onChange={handleChange} 
                        required />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Edit Test</button>
            </form>
        </div>
    );
};

export default EditMedicalTest;
