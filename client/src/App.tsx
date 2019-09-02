import React from 'react';

import EmployeeNavigatorComponent from './components/employee.navigator.component';
import { Router, Route, Redirect, NavLink, Switch } from 'react-router-dom';
import { memHistory } from './common/router-helpers/router';
import EmployeeView from './components/employee-view/view.component';

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
        <Route exact path="/" render={() => (<Redirect to="/emp" />)} />
        <Route exact path='/emp' component={EmployeeNavigatorComponent} />
        <Route exact path="/emp/:id" component={EmployeeView} />
        <Route component={c404} />
      </Switch>
    </Router>
  );
}

export default App;
