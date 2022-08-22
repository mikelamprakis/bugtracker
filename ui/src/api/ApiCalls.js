import React from 'react';
import axios from 'axios';


// USER CALLS

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/users/user/login`,
        'data':authRequest,
        headers : {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const fetchUserById=(userId)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/users/get/` + userId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const fetchAllUsers=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/users/all` ,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const saveNewUser=(user)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/users/create/`,
        'data': user,
         headers : {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const fetchUserList=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/users/all`,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


// PROJECT CALLS

export const deleteProject=(projectId)=>{
    return axios({
        method:'DELETE',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/projects/delete/` + projectId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const fetchProjectList=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/projects/all`,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const fetchProjectById=(projectId)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/projects/get/` + projectId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const saveNewProject=(project)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/projects/create`,
        'data': project,
         headers : {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


// TICKET CALLS

export const fetchAllTickets=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/tickets/all`,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


export const fetchTicketsByProjectId=(projectId)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/tickets/getByProject/` + projectId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}

export const fetchTicketsByOwnerId=(userId)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/tickets/getByUserSubmitted/` + userId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


export const fetchTicketById=(ticketId)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/tickets/get/` + ticketId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


export const updateTicketById=(ticketId, newTicket)=>{
    return axios({
        'method':'PUT',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/tickets/update/` + ticketId,
        'data': newTicket,
         headers : {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


export const saveNewTicket=(userId, projectID, ticket)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/tickets/create/` + userId + '/' + projectID,
        'data': ticket,
         headers : {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


export const fetchTicketsByUserId=(userId)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/tickets/getByUserContributor/` + userId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}


export const deleteProjectById=(ticketId)=>{
    return axios({
        method:'DELETE',
        url:`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/projects/delete/` + ticketId,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}



export const updateProjectById=(projectId, newProject)=>{
    return axios({
        'method':'PUT',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/bugtracker/api/v1/projects/update/` + projectId,
        'data': newProject,
         headers : {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
}