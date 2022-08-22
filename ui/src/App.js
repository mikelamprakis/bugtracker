import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from './layouts/ProjectPages/ProjectList';
import {TicketList} from './layouts/TicketPages/TicketList';
import {ViewTicket} from './layouts/TicketPages/ViewTicket';
import {UpdateTicket} from './layouts/TicketPages/UpdateTicket';
import {CreateTicket} from './layouts/TicketPages/CreateTicket';
import LoginPage from './layouts/LoginPage';
import { Dashboard } from './layouts/Dashboard';
import { CreateUser } from './layouts/UserPages/CreateUser';
import UserList from './layouts/UserPages/UserList';
import { CreateProject } from './layouts/ProjectPages/CreateProject';
import { UpdateProject } from './layouts/ProjectPages/UpdateProject';
import { TicketListByUser } from './layouts/TicketPages/TicketListByUser';
import { AllTickets } from './layouts/TicketPages/AllTickets';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route exact path="/dashboard/:id" component={Dashboard}/>
      <Route exact path="/allUsers" component={UserList}/>
      <Route exact path="/create-user" component={CreateUser}/>
      <Route exact path="/allProjects" component={ProjectList}/>
      <Route exact path="/create-project" component={CreateProject}/>
      <Route exact path="/update-project/:id" component={UpdateProject}/>
      <Route exact path="/view-tickets-by-owner/:id" component={TicketListByUser}/>
      <Route exact path="/view-all-tickets" component={AllTickets}/>
      <Route exact path="/view-project/:id" component={TicketList}/>
      <Route exact path="/view-ticket/:id" component={ViewTicket}/>
      <Route exact path="/update-ticket/:id" component={UpdateTicket}/>
      <Route exact path="/create-ticket/:projectID" component={CreateTicket}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
