import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";


const Menu = () => {

    let history = useHistory(); 

    const goToProjectsList= () =>{
        history.push('/allProjects');
   }   

   const goToAllTickets= () =>{
    history.push('/view-all-tickets');
   } 

   const goToUserList= () =>{
       history.push('/allUsers');
   }   

   const logOut=()=>{
    localStorage.clear();
    history.push('/');
   }

    return(
        <>
            <h2 class="pb-2 border-bottom">Bug tracking app</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
            <div class="col d-flex align-items-start">
                {/* <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#bootstrap"/></svg> */}
                <div>
                <Link onClick={() =>goToUserList()}><h4 class="fw-bold mb-0">View users</h4></Link>
                <p>The list of users along with their detils and the tickets assigned to them.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                {/* <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#cpu-fill"/></svg> */}
                <div>
                <Link onClick={() =>goToProjectsList()}><h4 class="fw-bold mb-0">View Projects</h4></Link>
                <p>The list of all the projects along with all the tickets related to each one.</p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                {/* <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"/></svg> */}
                <div>
                <Link onClick={() =>goToAllTickets()}><h4 class="fw-bold mb-0">View Tickets</h4></Link>
                <p>The total list of tickets from all the projects, along with the all the ticlets details.</p>
                </div>
                
            </div>
            <div class="col d-flex align-items-start">
                {/* <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#home"/></svg> */}
                <div>
                <Link onClick={() =>logOut()}><h4 class="fw-bold mb-0">Logout</h4></Link>
                <p>Logout from the application.</p>
                </div>
            </div>
            </div>
        </>
    )
}

export default Menu;