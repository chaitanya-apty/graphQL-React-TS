import React from 'react';

import EmployeeNavigatorComponent from './components/employee.navigator.component';
import { Router, Route as PublicRoute, Redirect, NavLink, Switch } from 'react-router-dom';
import { memHistory } from './common/router-helpers/router';
import EmployeeView from './components/employee-view/view.component';
import PrivateRoute from './common/router-helpers/private-router/route';
import Login from './components/login-component/login.component';

function Header() {
  return (
    <h1 className='w3-container w3-blue'>
      Details ...
  <span style={{ fontSize: '25px' }}> &#9997;</span>
    </h1>
  )
}

function c404() {
  return (
    <div>Error Not Found! <br />
      <NavLink to="/" activeStyle={{ textDecoration: "overline" }}>go Home</NavLink>
    </div>
  )
}

const App: React.FC = (): JSX.Element => {
  return (
    <Router history={memHistory}>
      <Header />
      <Switch>
        <PublicRoute exact path="/login" component={Login}/>
        <PrivateRoute exact path="/" component={() => <Redirect to="/emp" />}/>
        <PrivateRoute exact path='/emp' component={EmployeeNavigatorComponent} />
        <PrivateRoute exact path="/emp/:id" component={EmployeeView} />
        <PublicRoute component={c404} />
      </Switch>
    </Router>
  );
}

export default App;
