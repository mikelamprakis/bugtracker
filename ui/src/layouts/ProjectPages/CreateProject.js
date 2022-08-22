import React, {useState, useEffect} from 'react';
import {saveNewProject, fetchAllUsers} from '../../api/ApiCalls';
import {useHistory} from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import Menu from '../Menu.jsx';


export const CreateProject = () => {

    const [project, setProject] = useState({
        title:"",
        description:"",
        
    }) 

    const[contributors, setContributors] = useState({
        contributorsList:[]
    })


    const handleChange = (e) => {
        e.persist();
        setProject(project => ({ ...project, [e.target.name] : e.target.value }) )
    }

    const handleMultiChange = (event) => {
      event.persist();
      let value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setContributors({
        contributorsList: value,
      });
      console.log("project : " + JSON.stringify(contributors))
    }


    let history = useHistory();  

    const createNewProject =(e) => {
        e.preventDefault();
        let newProject = {title: project.title, description: project.description, contributors: contributors.contributorsList.map( (user) => JSON.parse(user) )} ;
        console.log('project -> ' + JSON.stringify(newProject));
        saveNewProject (newProject).then(() =>{
            history.push('/');
        }).catch((error) => {
            console.log("Error : " ,error.response)
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

    const [listofUsers, setListofUsers] = useState([]);

    useEffect( ()=>{
        fetchAllUsers().then((res) => { 
           setListofUsers(res.data);
       }).catch((e)=>{
           localStorage.clear();
           history.push('/')
       })
      },[])
    

    let location = useLocation();
        
        
    return (
        <div className = 'container'>
            <main>
            <div class="container px-3 py-4" id="icon-grid">
            <Menu/>
            <h3>Create project</h3>
            <hr/>
           <form className="my-login-validation" onSubmit={createNewProject} > 
                 <div className="form-group">
                     <label>Tile</label>
                     <input id="title" type="text" className="form-control"  value={project.title} name="title"  onChange={handleChange} />
                 </div>
                
                 <div className="form-group">
                     <label>Description </label>
                     <input id="description" type="text" className="form-control"  value={project.description} name="description"  onChange={handleChange}/>
                 </div>

                 <div className="form-group">
                    <label>Contributors</label>
                    <select multiple={true} className="form-control" value={contributors.contributorsList} name="contributorsList" onChange={handleMultiChange} multi>
                    {listofUsers.map(user => (
                        <option key={user.id} value={JSON.stringify(user)}>
                            {user.username}
                        </option>
                    ))}
                    </select>
                 </div>    

                 <br/>      
                 
                 <div className="form-group m-0">
                     <button type="submit" className="btn btn-primary"> Submit </button>
                 </div>          
            </form>

            </div>
            </main>

        </div>
    );






}