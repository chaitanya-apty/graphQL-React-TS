import React, { useState, useEffect, memo, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { equals } from 'ramda';

import './employee-list.css';
import { getEmployeesList } from '../../graphclient/queries/queries';
import { EmployeeDetails } from '../../common/types';
import { NavLink } from 'react-router-dom';
import { deleteEmployeeMutation } from '../../graphclient/queries/mutations';

interface EmployeeDetailsData {
  employees: EmployeeDetails[];
}
const EmployeeListComponent: React.FC = (props: any): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<Array<EmployeeDetails>>([]);
  const [qError, setError] = useState<string>('');

  //Employee Hooks
  const employeesQData = useQuery<EmployeeDetailsData>(getEmployeesList, { displayName: 'EmployeeList' })
  const [deleteEmployeeQ, { error: deleteError }] = useMutation(deleteEmployeeMutation);

  //@Delete Effects
  useEffect(() => {
    if (deleteError && !equals(qError, deleteError.message)) {
      setError(deleteError.message);
    }
  }, [deleteError, qError]);

  //@Employee Effects
  useEffect(() => {
    const { loading } = employeesQData;
    if (!equals(loading, isLoading)) {
      setLoading(loading);
    }
  }, [employeesQData, isLoading]);

  useEffect(() => {
    const { data } = employeesQData;
    if (data && Object.keys(data).length && !equals(data.employees, employees)) {
      setEmployees(data.employees);
    }
  }, [employeesQData, employees])


  async function deleteEmployee(index: number) {
    const id = employees[index].id;
    await deleteEmployeeQ({
      variables: {
        id
      }
    });
    await employeesQData.refetch();
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

export default memo(EmployeeListComponent);