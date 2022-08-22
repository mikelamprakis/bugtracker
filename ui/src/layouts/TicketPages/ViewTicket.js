import React,{useState, useEffect} from 'react';
import {fetchTicketById} from '../../api/ApiCalls';
import Menu from '../Menu.jsx';


export const ViewTicket = (props) => {

    
    const [ticket,setTicket]=useState(
        {
            id : props.match.params.id,
            ticketDetails : {}
        }
    );

    
    useEffect( ()=>{
        fetchTicketById(props.match.params.id).then((res) => {
            setTicket({ticketDetails : res.data});
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])


    const dateCreated = ticket.ticketDetails.dateCreated ?? []
    const dateUpdated = ticket.ticketDetails.dateUpdated ?? ""
    const reportedByUser = ticket.ticketDetails.reportedByUser  ?? ""

    const editTicket = (id) => {
        props.history.push(`/update-ticket/${id}`);
    }

    return (
        <div>

            <main>
            <div class="container px-3 py-4" id="icon-grid">
            <Menu/>
           
            <div className = "card col-md-6 offset-md-3">
                <br/>
                <h3 className = "text-center"> View Ticket Details</h3>
                <hr/>
                <button style={{marginLeft:"10px"}} onClick={ () => editTicket(props.match.params.id)} className="btn btn-info">Update Ticket </button>
                <div className = "card-body">
                    
                    <div className = "row">
                        <div className="col-sm">
                            <label> Ticket ID : </label>
                        </div>
                        <div className="col-sm">
                            <div> { ticket.ticketDetails.ticketID }</div>
                        </div>
                    </div>
                    
                    <div className = "row">
                        <div className="col-sm">
                            <label> Description : </label>
                        </div>
                        <div className="col-sm">
                            <div> { ticket.ticketDetails.description }</div>
                        </div>
                    </div>
                    
                    <div className = "row">
                        <div className="col-sm">
                            <label> Summary : </label>
                        </div>
                        <div className="col-sm">
                            <div> { ticket.ticketDetails.summary }</div>
                        </div>
                    </div>
                    
                    <div className = "row">
                        <div className="col-sm">
                            <label> Date Created : </label>
                        </div>
                        <div className="col-sm">
                            <div> {dateCreated[0] + "-" + dateCreated[1] + "-" + dateCreated[2] + " " + dateCreated[3] + ":" + dateCreated[4] + ":" + dateCreated[5]}</div>
                        </div>
                    </div>

                    <div className = "row">
                        <div className="col-sm">
                            <label> Date Updated : </label>
                        </div>
                        <div className="col-sm">
                            {dateUpdated && <div> {dateUpdated[0] + "-" + dateUpdated[1] + "-" + dateUpdated[2] + " " + dateUpdated[3] + ":" + dateUpdated[4] + ":" + dateUpdated[5]}</div>}
                        </div>
                    </div>
                   
                    <div className = "row">
                        <div className="col-sm">
                            <label> Priority : </label>
                        </div>
                        <div className="col-sm">
                            <div> { ticket.ticketDetails.priority }</div>
                        </div>
                    </div>
                   
                    <div className = "row">
                        <div className="col-sm">
                            <label> Reported By User : </label>
                        </div>
                        <div className="col-sm">
                            <div> {reportedByUser.username} </div>
                        </div>
                    </div>
                    
                    <div className = "row">
                        <div className="col-sm">
                            <label> Ticket Type : </label>
                        </div>
                        <div className="col-sm">
                            <div> { ticket.ticketDetails.ticketType }</div>
                        </div>
                    </div>
                   
                    <div className = "row">
                        <div className="col-sm">
                            <label> Status : </label>
                        </div>
                        <div className="col-sm">
                            <div> { ticket.ticketDetails.status }</div>
                        </div>
                    </div>

                    <br/>

                </div>
            </div>
            </div>
            </main>
            
        
        </div>
    )

}    

