const api = {
    login: 'oauth/token',
    loginManagementPortal: 'oauthserver/oauth/token',
    projects: '/projects',
    subjectsFromProject: '/projects/:project/subjects',
    
    ecgData: '/ecg-data',
    medicalTest: {
        list: '/medical_tests/:subject_id',
        create: '/medical_tests',
        view: '/medical_tests/:test_id',
        store: '/medical_tests',
        viewMedicalBySubject: '/medical_tests/subject_id/:subject_id',
        update: '/medical_tests/:test_id',
        delete: '/medical_tests/:test_id'
    }
}

export default api