import React, {useState, useEffect} from 'react';
import {saveNewTicket, fetchAllUsers} from '../../api/ApiCalls'
import {useHistory} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Menu from '../Menu.jsx';


export const CreateTicket = (props) => {

    const userIdFromLocalStorage = localStorage.getItem('USER_ID')
    const projectId = props.match.params.projectID;

    const [ticket, setTicket] = useState({
        summary:"",
        description:"",
        priority:0,
        status:0,
        contributers:[], 
        reportedBy:"", 
        ticketType:0, 
        errors: {}, 
    }) 


    const handleChange = (e) => {
        e.persist();
        setTicket(ticket => ({ ...ticket, [e.target.name] : e.target.value }) )
    }


    let history = useHistory();  

    const createNewTicket =(e) => {
        e.preventDefault();
        let newTicket = {summary: ticket.summary, description: ticket.description, priority: ticket.priority, status: ticket.status, assignedDevelopers: [JSON.parse(ticket.contributers)]} ;
        console.log('ticket ->' + JSON.stringify(newTicket));
        saveNewTicket (userIdFromLocalStorage ,projectId, newTicket).then(res =>{
            history.push(`/view-project/${projectId}`);
        }).catch((error) => {
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
                console.log("Error: " , error)
            }
        })
    }

    const [listofUsers, setListofUsers] = useState([]);

    useEffect( ()=>{
        fetchAllUsers().then((res) => { 
           setListofUsers(res.data);
       }).catch((e)=>{
           localStorage.clear();
           props.history.push('/')
       })
      },[])



    let location = useLocation();
        
    return (
        <div className = 'container'>
            <main>
            <div class="container px-3 py-4" id="icon-grid">
            <Menu/>
            <h3>Create ticket</h3>
            <hr/>
           
           <form className="my-login-validation" onSubmit={createNewTicket} > 
                 <div className="form-group">
                     <label htmlFor="email">Summary</label>
                     <input id="summary" type="text" className="form-control"  value={ticket.summary} name="summary"  onChange={handleChange} />
                 </div>

                 <br/>

                 <div className="form-group">
                     <label>Assigned User </label>
                     <select id="status" className="form-control" value={ticket.contributers} name="contributers" onChange={handleChange}>
                     {listofUsers.map(user => (
                        <option key={user.id} value={JSON.stringify(user)}>
                            {user.username}
                        </option>
                      ))}
                      </select>
                 </div>

                 <br/>

                 <div class="row">
                    <div className="col">
                        <label htmlFor="email">Priority</label>
                        <select id="priority" className="form-control" value={ticket.priority} name="priority" onChange={handleChange} >
                            <option value={0}> LOW </option>
                            <option value={1}> MEDIUM </option>
                            <option value={2}> HIGH </option> 
                        </select>
                    </div>
                    
                    <div className="col">
                        <label>Status </label>
                        <select id="status" className="form-control" value={ticket.status} name="status" onChange={handleChange} >
                            <option value={0}> SOLVED </option>
                            <option value={1}> NEW </option>
                            <option value={2}> ASSIGNED </option> 
                        </select>
                    </div>
                 </div> 

                 <br/>
                
                 <div className="form-group">
                     <label>Description </label>
                     <textarea id="description" type="text" className="form-control"  value={ticket.description} name="description"  onChange={handleChange}/>
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