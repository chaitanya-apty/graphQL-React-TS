import React, { useState, useEffect, memo, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import { equals } from 'ramda';

import './employee-list.css';
import { getEmployeeList } from '../../graphclient/queries/queries';
import { deleteEmployeeMutation } from '../../graphclient/queries/mutations';
import { EmployeeDetails } from '../../common/types';
import { NavLink } from 'react-router-dom';

const EmployeeListComponent: React.FC = (props: any): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [employees, setData] = useState<Array<EmployeeDetails>>([]);
  const [qError, setError] = useState<boolean>(false);

  // Delete Handler
  useEffect(() => {
    const request = props.deleteEmployeeMutationResult;
    if (request && request.error && request.error !== qError) {
      setError(!!request.error);
    }
  }, [props.deleteEmployeeMutationResult, qError]);

  // Employees Hooks
  useEffect(() => {
    const request = props.getEmployeeList;
    if (request && request.loading === isLoading) {
      return;
    }
    setLoading(request.loading);
  }, [props.getEmployeeList, isLoading]);

  useEffect(() => {
    const request = props.getEmployeeList;
    if (request.employees && !equals(employees, request.employees)) {
      setData([...request.employees]);
    }
  }, [props.getEmployeeList, employees])


  function deleteEmployee(index: number) {
    const id = employees[index].id;
    props.deleteEmployeeMutation({
      variables: {
        id
      },
      refetchQueries: [{
        query: getEmployeeList
      }]
    })
  }

  return (
    <div className='emp__list'>
      {
        isLoading ? <div className='loader'></div> :
            qError ? 'Failed to Delete ,Please Refresh' :
            <ul id='emp_list' className="w3-ul w3-hoverable">
              {
                employees.length ? employees.map((emp: any, i: number) => {
                  return (
                    <Fragment key={i}>
                      <li
                        className='w3-display-container'>
                        <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to={`/emp/${emp.id}`}>{emp['name']}</NavLink>
                        <span onClick={() => deleteEmployee(i)}
                          className="w3-button w3-display-right">&times;</span>
                      </li>
                    </Fragment>
                  )
                }) : 'Please create Employee Below!'}
            </ul>
      }
    </div>
  );
}

export default memo(compose(
  graphql(getEmployeeList, { name: 'getEmployeeList' }),
  graphql(deleteEmployeeMutation, { name: 'deleteEmployeeMutation' })
)(EmployeeListComponent));
