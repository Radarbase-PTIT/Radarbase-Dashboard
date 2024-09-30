import { localAxiosInstance } from '../../_api/axiosInstance';
import routes from '../../routes';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import { useState } from 'react';

const CreateMedicalTest = () => {
    
    const qs = useQuery()

    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        notes: '',
        ecg: '',
        source_type_id: ''
    });

    const [file, setFile] = useState(null);

    const [uploadStatus, setUploadStatus] = useState('');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadStatus('Please select a file first.');
            return;
        }
        const fD = new FormData();
        fD.append('ecg', file);
        fD.append('time_of_test', new Date().toISOString())
        fD.append('notes', formData.notes)
        fD.append('source_type_id', 2001)
        fD.append('subject_id', qs.get('subject_id'))

        try {
            setUploadStatus('Uploading...');
            const response = await localAxiosInstance.post(routes.api.medicalTest.store, fD, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status >= 200 && response.status <= 300) {
                navigate(routes.browser.home)
            }
        } catch (error) {
            console.error('Error uploading the file', error);
            setUploadStatus('Error uploading the file.');
        }
        
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="container">
            <h2 className="mt-4">Add Medical Test</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label className='mb-1'>ECG</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        name="ecg" 
                        onChange={handleFileChange} 
                        required />
                    {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
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
                <button type="submit" className="btn btn-primary mt-2">Add Test</button>
            </form>
        </div>
    );
};

export default CreateMedicalTest;
