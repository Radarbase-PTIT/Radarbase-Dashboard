import React, { useEffect } from "react"

import MedicalTestList from "../../components/MedicalTestList";
import { authManagementPortalAxiosInstance } from "../../_api/axiosInstance"
import insertUrlParams from 'inserturlparams'
import routes from '../../routes'
import { useNavigate } from "react-router-dom";

const AssignECG = () => {

    const [projects, setProjects] = React.useState([]);

    const [selectedProject, setSelectedProject] = React.useState("")

    const [subjects, setSubjects] = React.useState([])

    const [subjectId, setSubjectId] = React.useState("") 

    const [params, setParams] = React.useState({})

    const navigate = useNavigate()
    
    //loading data
    useEffect(() => {
        async function getProjects() {
            const res = await authManagementPortalAxiosInstance.get(routes.api.projects)
            if (res.status === 200) {
                setProjects(res.data)
            }
        }

        function updateSearchParams() {
            // Create a new URL object from the current location
            const currentUrl = new URL(window.location.href);

            // Create a new URLSearchParams object
            const urlParams = new URLSearchParams();

            // Iterate over the paramsObject and set each key-value pair in the URLSearchParams
            Object.keys(params).forEach(key => {
                urlParams.set(key, params[key]);
            });

            // Update the search property of the current URL
            currentUrl.search = urlParams.toString();

            // Replace the current history entry with the new URL
            window.history.replaceState(null, '', currentUrl.toString());
        }
        
        getProjects()
        updateSearchParams()

    }, [params.project_id, params.subject_id]) 

    // Select project
    const handleChooseProject = async (e) => {
        if (e.target.value === "") {
            setSelectedProject("")
            setSubjects([])
            setSubjectId("")
            return;
        }
        const res = await authManagementPortalAxiosInstance.get(insertUrlParams(routes.api.subjectsFromProject, {project: e.target.value}))
        setSelectedProject(e.target.value)
        setParams({
            ...params,
            project_id: e.target.value
        })
        if (res.status === 200) {
            setSubjects(res.data)
        }
    }

    const handleChangeSubject = (e) => {
        setSubjectId(e.target.value)
        setParams({
            ...params,
            subject_id: e.target.value
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate(routes.browser.login)
    }
    
    return (
        <>
            <p className="text-right">Welcome Administrator <a href="#!" onClick={() => handleLogout()}>Logout</a></p>
            <div className="container">
                <div>
                    <div className="row">
                        <label>Project</label>
                    </div>

                    <div className="row">
                        <select className="form-select" onChange={(e) => handleChooseProject(e)} onBlur={(e) => handleChooseProject(e)}>
                            <option value="">-- Select Project --</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.projectName}>{project.projectName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <div className="row">
                        <label>Subject</label>
                    </div>

                    <div className="row">
                        <select className="form-select" onChange={(e) => handleChangeSubject(e)} onBlur={(e) => handleChangeSubject(e)}>
                            {selectedProject !== "" && <option value="">-- Select subject --</option>}
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>{subject.externalId}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <hr/>
            <MedicalTestList key={Date.now()} subjectId={subjectId}/>   
        </>
    )
}

export default AssignECG