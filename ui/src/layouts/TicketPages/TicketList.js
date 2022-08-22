import React,{useState, useEffect} from 'react';
import {fetchProjectById, fetchTicketsByProjectId} from '../../api/ApiCalls'
import { Button } from 'react-bootstrap';
import Menu from '../Menu.jsx';

export const TicketList = (props) => {

    const [project,setProject]=useState(
        {
            id : props.match.params.id,
            projectDetails : {}
        }
    );
    
     useEffect( ()=>{
        fetchProjectById(props.match.params.id).then((res) => {
            setProject({projectDetails : res.data});
        }).catch((e)=>{
            localStorage.clear();
            props.history.push(`/`)
        })
    },[])

    const projectId = project.projectDetails.projectId
    const projectTitle = project.projectDetails.title 
    const projectDescription = project.projectDetails.description

   
    const [listOfTickets, setListOfTickets] = useState([]);

    useEffect( ()=>{
        fetchTicketsByProjectId(props.match.params.id).then((res) => { 
           setListOfTickets(res.data);
       }).catch((e)=>{
           localStorage.clear();
       })
    },[])

    const viewTicket = (id) => {
        props.history.push(`/view-ticket/${id}`);
    }

    const goToCreateTicket=(projectID)=>{
        props.history.push(`/create-ticket/${projectID}`);
    }

    
    return (
        <div>
            <main>
            <div class="container px-4 py-5" id="icon-grid">
            <Menu/>
            
            <h3> Project's Ticket List </h3>
            <hr/>
            <div className = "row">
                <div className="col-sm">
                    <h4> <strong><small>Project id :</small></strong> <em><small>{projectId}</small></em> </h4>
                    <h4> <strong><small>Title :</small></strong> <em><small>{projectTitle}</small></em> </h4>
                    <h4> <strong><small>Description :</small></strong> {projectDescription}</h4>
                </div>
            </div>

            <br/>
            
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
              <Button style={{marginTop:'5px'}} onClick={() =>goToCreateTicket(props.match.params.id)}>Create Ticket</Button>
            </div>
            </main>
        </div>
    )




}