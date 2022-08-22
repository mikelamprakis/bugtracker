import React,{useState, useEffect} from 'react';
import {fetchUserById, fetchTicketsByUserId} from '../api/ApiCalls';
import { Button } from 'react-bootstrap';
import Menu from './Menu.jsx';

export const Dashboard = (props) => {

    const [user, setUser] = useState({})

    const userIdFromProps = props.match.params.id

    useEffect( ()=>{
        fetchUserById(userIdFromProps).then((res) => { 
        setUser(res.data);
    }).catch((e)=>{
        localStorage.clear();
    })
    },[])
            
    const username = user.username 
    const listOfRole = user.roles ?? []

    const showCreateUserButton = listOfRole.map((role) => {
            if (role === "ADMIN"){
               return (
                   <div>
                   <Button style={{marginTop:'5px'}} onClick={() =>goToCreateUser()}>Create User</Button>
                   </div>
               )
            }
        })
    

    const [listOfUserTickets, setListOfUserTickets] = useState([]);

    useEffect( ()=>{
        fetchTicketsByUserId(userIdFromProps).then((res) => { 
           setListOfUserTickets(res.data);
       }).catch((e)=>{
           localStorage.clear();
       })
    },[])


    const goToCreateUser= () =>{
        props.history.push('/create-user');
   }  
    
    const viewTicket = (id) => {
        props.history.push(`/view-ticket/${id}`);
    }

    return (
        <div>
            <main>
            <div class="container px-4 py-5" id="icon-grid">
            <Menu/>
            
            <h3><strong><em>Welcome {username} </em></strong> </h3>
            <br/>
            <h4>Main Page</h4>
            <hr/>

            <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Description</th>
                            <th>Summary</th>
                            <th>Reported By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            listOfUserTickets.map(
                                ticket =>
                                <tr key ={ticket.ticketID}>
                                    <td>{ticket.ticketID}</td>
                                    <td>{ticket.description}</td> 
                                    <td>{ticket.summary}</td>
                                    <td>{ticket.reportedByUser.username}</td>
                                    <td> 
                                        <button style={{marginLeft:"10px"}} onClick={ () => viewTicket(ticket.ticketID)} className="btn btn-info">View </button>
                                    </td>      
                                </tr>
                            )
                    }
                    </tbody>
              </table>

            <br/>
            {showCreateUserButton}

            </div>
            </main>
        </div>
    )

}
export default Dashboard;