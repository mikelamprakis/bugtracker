import React,{useState} from 'react';
import {userLogin}from '../api/ApiCalls';
import {useHistory} from "react-router-dom";
import {Alert,Spinner} from 'react-bootstrap';


const LoginPage = (...props) => {

    const [values, setValues] = useState({
        username : '',
        password : ''
    })

    const [errorMessage,setErrorMessge]=useState();
    const [loading,setLoading]=useState(false);  

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name] : e.target.value }) )
    }

    let history = useHistory();  

    const handleSubmit = (e) => {
        e.preventDefault();

        userLogin(values).then((response) => {
            setLoading(true)
            if (response.status===200){
                    const userInfo = response.data
                    const userId  = response.data.id
                    localStorage.setItem('USER_ID',userId);
                    history.push(`/dashboard/${userId}`);
            }
        }).catch((error) => {
            console.log("Error : " ,error.response)
            if (error && error.response.status){
                switch (error.response.status){
                    case 401 :
                        console.log("401 HTTP STATUS")
                        setErrorMessge("Invalid login Credentials")
                        break;
                    default :
                        console.log('Something went wrong... Error  : ' + error.response.data.error)
                        setErrorMessge('Something went wrong. Status : ' + error.response.status + ' Trace : ' + error.response.data.trace )
                }
            }else{
                setErrorMessge('Something went wrong')
            }
        })
    }

   
    return (
        <div className = 'container'>
            <main>
              
            <div class="container col-xl-10 col-xxl-8 px-4 py-5">
	        <div class="row align-items-center g-lg-5 py-5">
  
            <div class="container px-4 py-5" id="icon-grid">
            <div class="container">
            <h1><strong>Bug-tracker</strong></h1>
            <br/>
            <br/>
            { errorMessage && <Alert style={{marginTop:'20px'}} variant="danger"> {errorMessage} </Alert> }                   


            <form className="my-login-validation"  noValidate={false} onSubmit={handleSubmit} > 
            <h3>Sign in</h3>
            <hr/>
                <div class="row">
                 <div className="col">
                     <label htmlFor="email">User Name</label>
                     <input id="username" type="text" className="form-control" value={values.username} name="username" required onChange={handleChange} />
                 </div>
                
                 <div className="col">
                     <label>Password </label>
                     <input id="password" type="text" className="form-control" value={values.password} name="password" required onChange={handleChange}/>
                 </div>
                 </div>
                 <br/>
                 <div className="form-group">
                     <div className="custom-control custom-checkbox">
                           <input type="checkbox" className="custom-control-input" id="customCheck1" />
                           <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                     </div>
                 </div>
                     
                 <br/>               
                 <div className="form-group m-0">
                     <button type="submit" className="btn btn-primary"> 
                     Login 
                     {loading && (<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />)}
                     </button>
                 </div>          
            </form>
            </div>
            </div>
            </div>
            </div>
            </main>
        </div>
    )

}
export default LoginPage;