import { axiosInstance } from '../../_api/axiosInstance'
import routes from '../../routes/index';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [authFail, setAuthFailed] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const login = async (e) => {
    e.preventDefault()
    const item = {
      ...form,
      grant_type: 'password',
    }
    var form_data = new FormData();

    for ( var key in item ) {
        form_data.append(key, item[key]);
    }

    try {
      const res = await axiosInstance.post(routes.api.loginManagementPortal, form_data)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.access_token)
      }
    } catch (e) {
      setAuthFailed(true)
    }
    
    navigate(routes.browser.home)
  }

  const handleClose = () => {
    setAuthFailed(false)
  }

  return (
    <>
      <h1 className='text-center'>Login using management portal</h1>
      
      <form className='container' onSubmit={(e) => login(e)}>
        {authFail && 
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            Wrong credentials
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
          </div>
        }
        <div className='mb-3'>
            <label className='form-label'>Username</label>
            <input className='form-control' type='text' name='username' onChange={(e) => handleChange(e)} />
        </div>

        <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input className='form-control' type='password' name='password' onChange={(e) => handleChange(e)} />
        </div>
        
        <button className='btn btn-primary' onClick={login}>Login</button>
      </form>
    </>
  )
}

export default Login
