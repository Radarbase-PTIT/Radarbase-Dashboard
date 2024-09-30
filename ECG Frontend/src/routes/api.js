const api = {
    login: 'oauth/token',
    loginManagementPortal: 'oauthserver/oauth/token',
    projects: '/projects',
    subjectsFromProject: '/projects/:project/subjects',
    
    ecgData: '/ecg-data',
    measurements: {
        list: "/android_polar_h10_ecg/patients/:patientId/aggregate-measurements",
        show: "/android_polar_h10_ecg/patients/:patientId/measurements/:measurement"
    }
}

export default api