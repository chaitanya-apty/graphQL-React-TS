import React from 'react';

import EmployeeNavigatorComponent from './components/employee.navigator.component';
import { Router, Route, Redirect } from "react-router-dom";
import { memHistory } from './common/router-helpers/router';
import EmployeeView from './components/employee-view/view.component';

function Header() {
  return (
  <h1 className='w3-container w3-blue'>
    Employee Details
  <span style={{ fontSize: '25px' }}> &#9997;</span>
  </h1>
  )
}
const App: React.FC = (): JSX.Element => {
  return (
    <Router history={memHistory}>
      <div className="App">
        <Header />
        <Route exact path="/emp/:id" component={EmployeeView} />
        <Route exact path='/emp' component={EmployeeNavigatorComponent} />
        <Route exact path="/" render={() => (<Redirect to="/emp" />)}/>
      </div>
    </Router>
  );
}

export default App;
