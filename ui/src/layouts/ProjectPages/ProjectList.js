
import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { fetchUserById, fetchProjectList , deleteProjectById} from '../../api/ApiCalls';
import Menu from '../Menu.jsx';

const ProjectList = (props) => {

  const [user, setUser] = useState({})
  const userId = localStorage.getItem('USER_ID')

  useEffect( ()=>{
    fetchUserById(userId).then((res) => { 
       setUser(res.data);
   }).catch((e)=>{
       localStorage.clear();
   })
  },[])


  const [listOfProjects, setListOfProjects] = useState([]);

  useEffect( ()=>{
    fetchProjectList().then((res) => { 
       setListOfProjects(res.data);
   }).catch((e)=>{
       localStorage.clear(); 
   })
  },[])


  const viewProject = (id) => {
    props.history.push(`/view-project/${id}`);
  }

  const goToCreateProject = () => {
    props.history.push(`/create-project`);
  }

  const deleteProject = (id) => {
    deleteProjectById(id).then(() => {
      fetchProjectList().then((res) => { 
        setListOfProjects(res.data);
      })
    }).catch((e)=>{
      localStorage.clear();
      props.history.push('/')
    })
  }


  const editProject = (id) => {
    props.history.push(`/update-project/${id}`);
  }

  
  return(
        <React.Fragment>
          <div>
          <main>        
            <div class="container px-4 py-5" id="icon-grid">
            <Menu/>  
          
              <h1>All Projects</h1>
              <hr/>

              <table className="table table-striped table-bordered">
                      <thead>
                          <tr>
                              <th>Project ID</th>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Contributors</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                              listOfProjects.map(
                                  project =>
                                  <tr key ={project.projectId}>
                                      <td>{project.projectId}</td>
                                      <td>{project.title}</td>  
                                      <td>{project.description}</td>
                                      <td>
                                        {
                                            project.contributors.map(
                                                user =>
                                                <tr key={user}> 
                                                    <td>{user.username}</td>
                                                </tr>
                                            )
                                        }
                                      </td>  
                                      <td> 
                                          <button style={{marginLeft:"10px"}} onClick={ () => viewProject(project.projectId)} className="btn btn-info">View </button>
                                          <button style={{marginLeft:"10px"}} onClick={ () => editProject(project.projectId)} className="btn btn-info">Edit </button>
                                          <button style={{marginLeft:"10px"}} onClick={ () => deleteProject(project.projectId)} className="btn btn-info">Delete </button>
                                      </td>      
                                  </tr>
                              )
                      }
                      </tbody>
                </table>

              <Button style={{marginTop:'5px'}} onClick={() =>goToCreateProject()}>Create Project</Button>
          
              </div>
          </main>
          </div>
        </React.Fragment>
      );
    
}

export default ProjectList;
