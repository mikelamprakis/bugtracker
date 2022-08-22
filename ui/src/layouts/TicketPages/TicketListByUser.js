import React,{useState, useEffect} from 'react';
import {fetchUserById, fetchTicketsByOwnerId} from '../../api/ApiCalls'
import Menu from '../Menu.jsx';

export const TicketListByUser = (props) => {

    const [user,setUser]=useState(
        {
            id : props.match.params.id,
            userDetails : {}
        }
    );
    
     useEffect( ()=>{
        fetchUserById(props.match.params.id).then((res) => {
            setUser({userDetails : res.data});
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])
 
    const [listOfTickets, setListOfTickets] = useState([]);

    useEffect( ()=>{
        fetchTicketsByOwnerId(props.match.params.id).then((res) => { 
           setListOfTickets(res.data);
       }).catch((e)=>{
           localStorage.clear();
       })
    },[])


    const viewTicket = (id) => {
        props.history.push(`/view-ticket/${id}`);
    }

    
    return (
        <div>

            <main>
            <div class="container px-3 py-4" id="icon-grid">
            <Menu/>

                <div className = "card-body">
                    <h3 className = ""> View User Details</h3>
                    <hr/>
                    <div className = "row">
                        <div className="col-sm">
                            <h4> <strong>Name :</strong> <em><small>{user.userDetails.username}</small></em> </h4>
                            <h4> <strong>Email :</strong> <em><small>{user.userDetails.email}</small></em> </h4>
                        </div>
                    </div>
                </div>
          

                <div className = "card-body">
                <h3 className = ""> User Tickets</h3>
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
                                listOfTickets.map(
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
                </div>

              </div>
              </main>
        </div>
    )




}