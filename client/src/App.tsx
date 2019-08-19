import React from 'react';

import EmployeeListComponent from './components/employee-list/employee-list.component';
import CreateEmployeeComponent from './components/create-employee/create-employee.component';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <h1>Employee Database Records</h1>
      <br />
      <EmployeeListComponent />
      <CreateEmployeeComponent />
    </div>
  );
}

export default App;
