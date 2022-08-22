import React, {useState, useEffect} from 'react';
import {updateProjectById, fetchAllUsers} from '../../api/ApiCalls';
import {useHistory} from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';



export const UpdateProject = (props) => {

    const [project, setProject] = useState({
        id : props.match.params.id,
        title:"",
        description:"",
    }) 


    const [projectContributors, setprojectContributors] = useState({
        projectContributorsList : []
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
        setprojectContributors({
            projectContributorsList: value,
        });
        console.log("project : " + JSON.stringify(projectContributors))
      }

    let history = useHistory();  

    const updateProject = (e) => {
        e.preventDefault();
        let newProject = {title: project.title, description: project.description, contributors: projectContributors.projectContributorsList.map( (user) => JSON.parse(user) )};
        console.log('project ->'  + JSON.stringify(newProject));
        updateProjectById(project.id, newProject).then( res => {
            history.push('/');
        });
    }

    let location = useLocation();  

    const [listofUsers, setListofUsers] = useState([]);

    useEffect( ()=>{
        fetchAllUsers().then((res) => { 
           setListofUsers(res.data);
       }).catch((e)=>{
           localStorage.clear();
           history.push('/')
       })
      },[])
    

    return (
            <div className = 'container'>
           <form className="my-login-validation" onSubmit={updateProject} > 
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
                    <select multiple={true} className="form-control" value={projectContributors.projectContributorsList} name="projectContributorsList" onChange={handleMultiChange} multi>
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
    );






}