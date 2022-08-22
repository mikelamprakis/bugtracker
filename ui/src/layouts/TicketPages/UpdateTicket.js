import React, {useState} from 'react';
import {updateTicketById} from '../../api/ApiCalls'
import {useHistory} from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';


export const UpdateTicket = (props) => {

    const [ticket, setTicket] = useState({
        id : props.match.params.id,
        dateCreated: new Date().toLocaleDateString(),
        dateUpdated: new Date().toLocaleDateString(),
        summary:"",
        description:"",
        contributers:[], 
        reportedBy:"", 
        priority:0,
        status:0,
    }) 


    const handleChange = (e) => {
        e.persist();
        setTicket(ticket => ({ ...ticket, [e.target.name] : e.target.value }) )
    }

    let history = useHistory();  

    const updateTicket = (e) => {
        e.preventDefault();
        let newTicket = {summary: ticket.summary, description: ticket.description, priority: ticket.priority, status: ticket.status};
        console.log('ticket ->'  + JSON.stringify(newTicket));
        updateTicketById(ticket.id, newTicket).then( res => {
            history.push('/');
        });
    }

    
    let location = useLocation();
        
    return (
            <div className = 'container'>
            <form className="my-login-validation" onSubmit={updateTicket} > 
                 <div className="form-group">
                     <label htmlFor="email">Summary</label>
                     <input id="summary" type="text" className="form-control"  value={ticket.summary} name="summary"  onChange={handleChange} />
                 </div>
                
                 <div className="form-group">
                     <label>Description </label>
                     <input id="description" type="text" className="form-control"  value={ticket.description} name="description"  onChange={handleChange}/>
                 </div>

                 <div className="form-group">
                     <label htmlFor="email">Priority</label>
                     <select id="priority" className="form-control" value={ticket.priority} name="priority" onChange={handleChange} >
                        <option value={0}> LOW </option>
                        <option value={1}> MEDIUM </option>
                        <option value={2}> HIGH </option> 
                     </select>
                 </div>
                
                 <div className="form-group">
                     <label>Status </label>
                     <select id="status" className="form-control" value={ticket.status} name="status" onChange={handleChange} >
                        <option value={0}> SOLVED </option>
                        <option value={1}> NEW </option>
                        <option value={2}> ASSIGNED </option> 
                    </select>
                 </div>
                       
                 <div className="form-group m-0">
                     <button type="submit" className="btn btn-primary"> Submit </button>
                 </div>          
            </form>
        </div>
    );






}