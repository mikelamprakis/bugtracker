import React, {useState} from 'react';
import {saveNewUser} from '../../api/ApiCalls'
import {useHistory} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Menu from '../Menu.jsx';


export const CreateUser = (props) => {

    const projectId = props.match.params.projectID;

    const [user, setUser] = useState({
        username:"",
        password:"",
        email:""
    }) 

    const[roles, setRoles] = useState({
        rolesList: []
    })

    const[knolwdgeBase, setKnolwdgeBase] = useState({
        knowledgeList: []
    })
    

    const handleChange = (e) => {
        e.persist();
        setUser(user => ({ ...user, [e.target.name] : e.target.value }) )
    }

    const handleMultiChangeForRoles = (event) => {
        event.persist();
    let value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setRoles({
        rolesList: value,
      });
      console.log("roles : " + JSON.stringify(roles))
    }

    const handleMultiChangeForKnowledgeBase = (event) => {
      event.persist();
      let value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setKnolwdgeBase({
        knowledgeList: value,
      });
      console.log("knolwdgeBase : " + JSON.stringify(knolwdgeBase))
    }
    
    let history = useHistory();  

    const createNewTicket =(e) => {
        e.preventDefault();
        let newUser = {username: user.username, password: user.password, email: user.email, roles: roles.rolesList , knowledgeBase: knolwdgeBase.knowledgeList} ;
        console.log('newUser ->'  + JSON.stringify(newUser));
        saveNewUser (newUser).then(res =>{
            history.push('/');
        }).catch((error) => {
            if (error && error.response.status){
                switch (error.response.status){
                    case 401 :
                        console.log("401 HTTP STATUS")   
                        break;
                    default :
                        console.log('Something went wrong... Error  : ' + error.response.data.error)
                        console.log('Something went wrong. Status : ' + error.response.status + ' Trace : ' + error.response.data.trace )
                }
            }else{
                console.log("Error : ", error)
            }
        })
    }

    let location = useLocation();   
        
    return (
        <div className = 'container'>

        <main>
            <div class="container px-3 py-4" id="icon-grid">
            <Menu/>

            <h3>Create user</h3>
            <hr/>
           
            <form className="my-login-validation" onSubmit={createNewTicket} > 
                 <div class="">
                    <div class="row">
                        <div className="col">
                            <label htmlFor="email">Username</label>
                            <input id="username" type="text" className="form-control"  value={user.username} name="username"  onChange={handleChange} />
                        </div>
                        
                        <div className="col">
                            <label>Password </label>
                            <input id="password" type="text" className="form-control"  value={user.password} name="password"  onChange={handleChange}/>
                        </div>
                    </div>
                 </div>

                <br/>                 

                 <div className="form-group">
                     <label>Email </label>
                     <input id="email" type="text" className="form-control"  value={user.email} name="email"  onChange={handleChange}/>
                 </div>

                 <br/>

                 <div className="form-group">
                    <label>Account Type</label>
                    <select multiple={true} className="form-control" value={roles.rolesList} name="roles" onChange={handleMultiChangeForRoles} multi>
                        <option value={0}>  DEVELOPER</option>
                        <option value={1}>  ADMIN</option>
                        <option value={2}>  PROJECT MANAGER</option>
                    </select>
                 </div>    
                 <br/>

                 {
                     roles.rolesList.map((role) => {
                         if (role === "0"){
                             return(
                            <div className="form-group">
                            <label>Knowledge Base</label>
                            <select multiple={true} className="form-control" value={knolwdgeBase.knowledgeList} name="knolwdgeBase" onChange={handleMultiChangeForKnowledgeBase} multi>
                                <option value={0}>  JAVA</option>
                                <option value={1}>  SPRINGBOOT</option>
                                <option value={2}>  PYTHON</option>
                                <option value={3}>  JAVASCRIPT</option>
                                <option value={4}>  REACT</option>
                                <option value={5}>  SQL</option>
                                <option value={6}>  DOCKER</option>
                                <option value={7}>  KUBERNATES</option>
                                <option value={8}>  KAFKA</option>
                                <option value={9}>  ISTIO</option>
                                <option value={10}> JENKINS</option>
                            </select>
                         </div> 
                             )  
                         }
                     })
                 }

                 <div className="form-group m-0">
                     <button type="submit" className="btn btn-primary"> Submit </button>
                 </div>          
            </form>
            </div>
            </main>
        </div>
    );

}