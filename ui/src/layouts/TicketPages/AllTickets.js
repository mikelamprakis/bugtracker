import React,{useState, useEffect} from 'react';
import {fetchAllTickets} from '../../api/ApiCalls'
import Menu from '../Menu.jsx';

export const AllTickets = (props) => {
   
    const [listOfTickets, setListOfTickets] = useState([]);

    useEffect( ()=>{
        fetchAllTickets(props.match.params.id).then((res) => { 
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
            <div class="container px-4 py-5" id="icon-grid">
            <Menu/>
            <h3>All Tickets </h3>
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
              </main>
        </div>
    )
}