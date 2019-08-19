import React, { useState, useEffect, memo } from 'react';
import { graphql } from 'react-apollo';
import './employee-list.css';
import { getEmployeeList } from '../../graphclient/queries/queries';

const EmployeeListComponent: React.FC = (props: any): JSX.Element => {
  const [isLoading, setLoading] = useState(true);
  const [employees, setData] = useState([]);

  useEffect(() => {
    const request = props.data;
    setLoading(request.loading);
    if (request.employees) {
      setData([].concat(request.employees));
    }
  }, [props]);

  if (isLoading) {
    return (<div className='loader'></div>)
  } else {
    return (
      <div className="App">
        <ul id='emp_list'>
          {employees.map((emp, i) => {
            return <li key={i}>{emp['name']}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default memo(graphql(getEmployeeList)(EmployeeListComponent));
