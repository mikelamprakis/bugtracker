
import React, { useState, useEffect } from "react";
import ApiCalls, {fetchUserList } from '../../api/ApiCalls';
import Menu from '../Menu.jsx';

const UserList = (props) => {
 
    const [listOfUsers, setListOfProjects] = useState([]);

    useEffect( ()=>{
        fetchUserList().then((res) => { 
        setListOfProjects(res.data);
    }).catch((e)=>{
        localStorage.clear(); 
    })
    },[])


    const viewTickets = (id) => {
        props.history.push(`/view-tickets-by-owner/${id}`);
    }
  

    return(
        <React.Fragment>
            <div>

            <main>
            <div class="container px-4 py-5" id="icon-grid">
            <Menu/>    

            <br></br>
            <h1>User List</h1>
            <hr/>
           
            <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Roles</th>
                            <th>Knowledge</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            listOfUsers.map(
                                user =>
                                <tr key ={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>  {/*attributes have to be extact match with backend*/} 
                                    <td>{user.email}</td>
                                    <td>{user.userType}</td>
                                    <td>
                                    {
                                        user.roles.map(
                                            role =>
                                            <tr key={role}> 
                                                <td>{role}</td>
                                            </tr>
                                        )
                                    }
                                    </td> 
                                    <td>
                                    {
                                        user.roles.map((role) => {
                                            if (role ==="0"){
                                                user.knowledgeBase.map(
                                                    techField => 
                                                     <tr key={techField}> 
                                                        <td>{techField}</td>
                                                     </tr>
                                                )
                                            }
                                        })
                                    }    
                                    </td> 
                                    <td>
                                        <button style={{marginLeft:"10px"}} onClick={ () => viewTickets(user.id)} className="btn btn-info">View Tickets </button>
                                    </td>
                                </tr>
                            )
                    }
                    </tbody>
              </table>
              </div>
              </main>
              </div>
        </React.Fragment>
    );
    
}

export default UserList;
